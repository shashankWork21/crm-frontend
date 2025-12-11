import Link from "next/link";
import { Sparkles, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 border-t border-slate-800">
      {/* Subtle Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-oxford-blue/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white font-bold text-xl mb-4 hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span>SmartAlgorhythm</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Intelligent CRM solutions that help coaches and creators build
              stronger customer relationships through AI-powered automation.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:support@smartalgorhythm.com"
                className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                support@smartalgorhythm.com
              </a>
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/pricing"
                  className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                >
                  Start Free Trial
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-refund-policy"
                  className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Icosihenagon Technologies LLP. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/terms-and-conditions"
                className="text-slate-500 hover:text-amber-400 text-xs transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy-policy"
                className="text-slate-500 hover:text-amber-400 text-xs transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/cancellation-refund-policy"
                className="text-slate-500 hover:text-amber-400 text-xs transition-colors"
              >
                Refunds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
