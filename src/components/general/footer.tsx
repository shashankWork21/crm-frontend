import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-50 py-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              SmartAlgorhythm CRM
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Intelligent CRM solutions that help businesses build stronger
              customer relationships and drive growth through AI-powered
              automation.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/pricing"
                  className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                >
                  Start Free Trial
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-refund-policy"
                  className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600 text-sm">
              © 2025 SmartAlgorhythm CRM. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link
                href="/terms-and-conditions"
                className="text-slate-500 hover:text-slate-700 text-xs transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy-policy"
                className="text-slate-500 hover:text-slate-700 text-xs transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/cancellation-refund-policy"
                className="text-slate-500 hover:text-slate-700 text-xs transition-colors"
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
