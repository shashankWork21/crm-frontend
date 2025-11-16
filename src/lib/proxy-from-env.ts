const DEFAULT_PORTS: Record<string, number> = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443,
};

const stringEndsWith =
  String.prototype.endsWith ||
  function endsWith(this: string, search: string) {
    return (
      search.length <= this.length &&
      this.indexOf(search, this.length - search.length) !== -1
    );
  };

type UrlLike =
  | string
  | {
      protocol?: string;
      host?: string;
      hostname?: string;
      port?: string | number;
    }
  | URL;

type ParsedUrl = {
  protocol?: string;
  host?: string;
  hostname?: string;
  port?: string;
};

function parseWithWhatwg(target: UrlLike | undefined | null): ParsedUrl {
  if (!target) {
    return {};
  }

  if (typeof target === "object" && !(target instanceof URL)) {
    return {
      protocol: target.protocol,
      host:
        target.host ??
        (target.hostname
          ? `${target.hostname}${target.port ? `:${String(target.port)}` : ""}`
          : undefined),
      hostname: target.hostname,
      port: target.port ? String(target.port) : undefined,
    };
  }

  try {
    const stringValue = String(target);
    const hasScheme = stringValue.includes("://");
    const candidate = hasScheme ? stringValue : `http://${stringValue}`;
    const url = new URL(candidate);

    return {
      protocol: url.protocol,
      host: url.host,
      hostname: url.hostname,
      port: url.port,
    };
  } catch {
    return {};
  }
}

function shouldProxy(hostname: string, port: number): boolean {
  const rawNoProxy = (
    getEnv("npm_config_no_proxy") || getEnv("no_proxy")
  ).toLowerCase();

  if (!rawNoProxy) {
    return true;
  }

  if (rawNoProxy === "*") {
    return false;
  }

  return rawNoProxy.split(/[,\s]/).every((proxySegment) => {
    if (!proxySegment) {
      return true;
    }

    const match = proxySegment.match(/^(.+):(\d+)$/);
    const parsedProxyHostname = match ? match[1] : proxySegment;
    const parsedProxyPort = match ? parseInt(match[2], 10) : 0;

    if (parsedProxyPort && parsedProxyPort !== port) {
      return true;
    }

    if (!/^[.*]/.test(parsedProxyHostname)) {
      return hostname !== parsedProxyHostname;
    }

    let wildcardHost = parsedProxyHostname;
    if (wildcardHost.startsWith("*")) {
      wildcardHost = wildcardHost.slice(1);
    }

    return !stringEndsWith.call(hostname, wildcardHost);
  });
}

function getEnv(key: string): string {
  return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || "";
}

export function getProxyForUrl(url: UrlLike): string {
  const parsedUrl = parseWithWhatwg(url);
  let { protocol, hostname } = parsedUrl;
  const { port, host } = parsedUrl;
  if (!protocol || !host || !hostname) {
    return "";
  }

  protocol = protocol.split(":", 1)[0];
  hostname = hostname.replace(/:\d*$/, "");
  const numericPort = parseInt(port ?? "", 10) || DEFAULT_PORTS[protocol] || 0;

  if (!shouldProxy(hostname, numericPort)) {
    return "";
  }

  let proxy =
    getEnv(`npm_config_${protocol}_proxy`) ||
    getEnv(`${protocol}_proxy`) ||
    getEnv("npm_config_proxy") ||
    getEnv("all_proxy");

  if (proxy && !proxy.includes("://")) {
    proxy = `${protocol}://${proxy}`;
  }

  return proxy;
}

const proxyFromEnv = {
  getProxyForUrl,
};

export default proxyFromEnv;

if (typeof module !== "undefined") {
  module.exports = proxyFromEnv;
}
