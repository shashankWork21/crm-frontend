"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-rich-black overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sunglow-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-powder-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-500 rounded-lg"
          >
            <img src="/initial_logo.svg" alt="Smart CRM Logo" className="w-10 h-10" />
            <span>Smart CRM</span>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="relative z-10 px-6 pt-12 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-powder-blue-500/10 border border-powder-blue-500/30 text-powder-blue-500 text-sm font-semibold mb-6">
            <Shield className="w-4 h-4" />
            <span>Your Data, Protected</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-white/60 text-lg">
            Effective Date: August 22, 2025 | Last Updated: August 22, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Smart CRM is committed to protecting your privacy and
              ensuring the security of your personal information. This
              comprehensive Privacy Policy describes how we collect, use,
              store, and safeguard your data when you use our CRM platform and
              related services.
            </p>

            <div className="bg-linear-to-br from-powder-blue-500/10 to-transparent border border-powder-blue-500/20 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">
                Your Privacy Rights
              </h3>
              <ul className="text-white/70 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-powder-blue-500 shrink-0 mt-0.5" />
                  <span>Right to know what data we collect</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-powder-blue-500 shrink-0 mt-0.5" />
                  <span>Right to access your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-powder-blue-500 shrink-0 mt-0.5" />
                  <span>Right to correct or update your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-powder-blue-500 shrink-0 mt-0.5" />
                  <span>Right to delete your information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-powder-blue-500 shrink-0 mt-0.5" />
                  <span>Right to data portability</span>
                </li>
              </ul>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                1. Information We Collect
              </h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="rounded-xl p-4 bg-white/[0.03] border border-white/10">
                    <h3 className="font-semibold text-white mb-3">
                      Personal Information
                    </h3>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Name and contact details</li>
                      <li>• Email address and phone number</li>
                      <li>• Company information</li>
                      <li>• Job title and role</li>
                      <li>• Billing and payment information</li>
                    </ul>
                  </div>
                  <div className="rounded-xl p-4 bg-white/[0.03] border border-white/10">
                    <h3 className="font-semibold text-white mb-3">
                      Usage Information
                    </h3>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Platform usage patterns</li>
                      <li>• Feature utilization data</li>
                      <li>• Login and session information</li>
                      <li>• Device and browser information</li>
                      <li>• IP address and location data</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <h3 className="font-semibold text-white mb-2">
                    Data Sources
                  </h3>
                  <p className="text-white/70 text-sm">
                    We collect information directly from you during
                    registration, through your use of our platform, from
                    cookies and tracking technologies, and from third-party
                    integrations you authorize.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                2. How We Use Your Information
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    Service Delivery
                  </h3>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Provide CRM functionality</li>
                    <li>• Process transactions</li>
                    <li>• Manage your account</li>
                    <li>• Provide customer support</li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    Improvement
                  </h3>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Enhance platform features</li>
                    <li>• Analyze usage patterns</li>
                    <li>• Optimize performance</li>
                    <li>• Develop new features</li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    Communication
                  </h3>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Send service updates</li>
                    <li>• Security notifications</li>
                    <li>• Marketing communications</li>
                    <li>• Product announcements</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                3. Data Sharing and Disclosure
              </h2>
              <div className="space-y-4">
                <p className="text-white/80">
                  We respect your privacy and do not sell your personal
                  information. We may share your data only in the following
                  limited circumstances:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-linear-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-xl p-4">
                    <h3 className="font-semibold text-white mb-2">
                      When We May Share
                    </h3>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• With your explicit consent</li>
                      <li>• Legal compliance requirements</li>
                      <li>• Protection of rights and safety</li>
                      <li>• Business transfers (mergers, acquisitions)</li>
                    </ul>
                  </div>
                  <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-xl p-4">
                    <h3 className="font-semibold text-white mb-2">
                      Trusted Partners
                    </h3>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Cloud hosting providers</li>
                      <li>• Payment processors</li>
                      <li>• Analytics services</li>
                      <li>• Customer support tools</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                4. Data Security Measures
              </h2>
              <div className="space-y-4">
                <p className="text-white/80">
                  We implement comprehensive security measures to protect your
                  data from unauthorized access, alteration, disclosure, or
                  destruction:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      Technical Safeguards
                    </h3>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-powder-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                        <span>
                          End-to-end encryption for data transmission
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-powder-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                        <span>AES-256 encryption for data at rest</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-powder-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                        <span>Multi-factor authentication</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-powder-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                        <span>
                          Regular security audits and penetration testing
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      Operational Safeguards
                    </h3>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-powder-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                        <span>
                          Access controls and role-based permissions
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-powder-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                        <span>Employee training on data protection</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-powder-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                        <span>Incident response procedures</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-powder-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                        <span>Regular backup and disaster recovery</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                5. Your Rights and Choices
              </h2>
              <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      Data Access Rights
                    </h3>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Request a copy of your data</li>
                      <li>• Correct inaccurate information</li>
                      <li>• Update your preferences</li>
                      <li>• Download your data (portability)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      Control Options
                    </h3>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Opt-out of marketing emails</li>
                      <li>• Manage cookie preferences</li>
                      <li>• Request account deletion</li>
                      <li>• Restrict processing activities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                6. Data Retention
              </h2>
              <div className="space-y-4">
                <p className="text-white/80">
                  We retain your personal information only as long as
                  necessary to provide our services and comply with legal
                  obligations:
                </p>
                <div className="rounded-xl p-4 bg-white/[0.03] border border-white/10">
                  <h3 className="font-semibold text-white mb-2">
                    Retention Periods
                  </h3>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>
                      • Active account data: Duration of subscription + 1 year
                    </li>
                    <li>• Billing information: 7 years (tax compliance)</li>
                    <li>• Usage logs: 2 years</li>
                    <li>
                      • Marketing data: Until opt-out or 3 years of inactivity
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                7. Contact Information
              </h2>
              <div className="rounded-xl p-6 bg-white/[0.03] border border-white/10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-2 text-white/70">
                      <p>
                        <strong className="text-white">Email:</strong>{" "}
                        <a
                          href="mailto:support@smartalgorhythm.com"
                          className="text-sunglow-500 hover:text-sunglow-400 transition-colors"
                        >
                          support@smartalgorhythm.com
                        </a>
                      </p>
                      <p>
                        <strong className="text-white">Phone:</strong> +91-7349172510
                      </p>
                      <p>
                        <strong className="text-white">Response Time:</strong> Within 2 days
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      Company Address
                    </h3>
                    <div className="space-y-2 text-white/70">
                      <p>
                        <strong className="text-white">Icosihenagon Technologies LLP</strong>
                      </p>
                      <p>
                        943, 16th cross, 1st stage, Kumaraswamy Layout
                        <br />
                        Bengaluru, Karnataka 560078
                        <br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="bg-linear-to-br from-sunglow-500/20 via-sunglow-500/10 to-transparent border border-sunglow-500/30 p-6 rounded-2xl mt-8">
              <h3 className="font-semibold text-white mb-2">
                Questions About Your Privacy?
              </h3>
              <p className="text-white/70">
                We&apos;re committed to transparency and protecting your
                privacy. If you have any questions about this policy or how we
                handle your data, please don&apos;t hesitate to contact our
                privacy team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="p-10 rounded-3xl bg-linear-to-br from-sunglow-500/20 via-sunglow-500/10 to-transparent border border-sunglow-500/30 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Start your free trial today and see how Smart CRM can help
              you close more clients with less effort.
            </p>
            <Link href="/register">
              <Button className="bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-bold px-8 py-6 text-lg rounded-xl shadow-lg shadow-sunglow-500/25 hover:shadow-sunglow-500/40 transition-all duration-300 group">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
