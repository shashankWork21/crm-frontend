import { siInstagram } from "simple-icons";

export default function InstagramBrandIcon(
  props: React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="Instagram"
      fill="currentColor"
      {...props}
    >
      <path d={siInstagram.path} />
    </svg>
  );
}
