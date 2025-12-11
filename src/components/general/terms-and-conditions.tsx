"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, FileText } from "lucide-react";

export default function TermsAndConditionsContent() {
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
            <FileText className="w-4 h-4" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Terms and Conditions
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
              Welcome to Smart CRM. These Terms and Conditions
              (&quot;Terms&quot;) govern your use of our CRM platform and
              services. By accessing or using our platform, you agree to be
              bound by these terms. Please read them carefully before using our
              services.
            </p>

            <div className="bg-linear-to-br from-powder-blue-500/10 to-transparent border border-powder-blue-500/20 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">
                Agreement Overview
              </h3>
              <ul className="text-white/70 space-y-2">
                <li>
                  • These terms form a legal agreement between you and
                  Smart CRM
                </li>
                <li>• By using our services, you accept these terms in full</li>
                <li>
                  • If you disagree with any part, please discontinue the use of
                  our services
                </li>
                <li>
                  • Terms will be updated periodically with notice based on
                  changes in regulations or our business practices.
                </li>
              </ul>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                1. Definitions and Interpretation
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl">
                    <h3 className="font-semibold text-white mb-3">
                      Key Terms
                    </h3>
                    <ul className="text-white/70 text-sm space-y-2">
                      <li>
                        <strong>&quot;Service&quot;</strong> - Smart CRM
                        CRM platform and related services
                      </li>
                      <li>
                        <strong>&quot;User&quot;</strong> - Individual or entity
                        using our platform
                      </li>
                      <li>
                        <strong>&quot;Account&quot;</strong> - Your registered
                        user profile and data
                      </li>
                      <li>
                        <strong>&quot;Content&quot;</strong> - Data,
                        information, and materials you upload
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl">
                    <h3 className="font-semibold text-white mb-3">
                      Parties
                    </h3>
                    <ul className="text-white/70 text-sm space-y-2">
                      <li>
                        <strong>
                          &quot;We&quot;, &quot;Us&quot;, &quot;Our&quot;
                        </strong>{" "}
                        - Smart CRM Pvt. Ltd.
                      </li>
                      <li>
                        <strong>&quot;You&quot;, &quot;Your&quot;</strong> - The
                        user of our services
                      </li>
                      <li>
                        <strong>&quot;Platform&quot;</strong> - Our CRM software
                        and infrastructure
                      </li>
                      <li>
                        <strong>&quot;Agreement&quot;</strong> - These Terms and
                        Conditions
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                2. Acceptable Use Policy
              </h2>
              <div className="space-y-4">
                <p className="text-white/80">
                  You agree to use the Smart CRM platform responsibly
                  and in compliance with all applicable laws. The following
                  activities are strictly prohibited:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="rounded-xl p-4 bg-white/[0.03] border border-white/10">
                    <h3 className="font-semibold text-white mb-3">
                      Prohibited Activities
                    </h3>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Unauthorized access or hacking attempts</li>
                      <li>• Uploading malicious software or viruses</li>
                      <li>• Harassment or abusive behavior</li>
                      <li>• Spam or unsolicited communications</li>
                      <li>• Violation of intellectual property rights</li>
                      <li>• Illegal or fraudulent activities</li>
                    </ul>
                  </div>
                  <div className="rounded-xl p-4 bg-white/[0.03] border border-white/10">
                    <h3 className="font-semibold text-white mb-3">
                      Permitted Uses
                    </h3>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Managing customer relationships</li>
                      <li>• Storing and organizing business data</li>
                      <li>• Creating reports and analytics</li>
                      <li>• Team collaboration and communication</li>
                      <li>• Integration with authorized third-party tools</li>
                      <li>• Legitimate business operations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                3. Account Management and Security
              </h2>
              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    Your Responsibilities
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Maintain confidentiality of login credentials</li>
                      <li>• Use strong, unique passwords</li>
                      <li>• Enable two-factor authentication when available</li>
                      <li>• Monitor account activity regularly</li>
                    </ul>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Report suspicious activity immediately</li>
                      <li>• Keep contact information current</li>
                      <li>• Ensure authorized users only</li>
                      <li>• Comply with your organization&apos;s policies</li>
                    </ul>
                  </div>
                </div>
                <div className="rounded-xl p-4 bg-white/[0.03] border border-white/10">
                  <h3 className="font-semibold text-white mb-2">
                    Account Suspension
                  </h3>
                  <p className="text-white/70 text-sm">
                    We reserve the right to suspend or terminate accounts that
                    violate these terms, engage in fraudulent activity, or pose
                    security risks to our platform or other users.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                4. Intellectual Property Rights
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <h3 className="font-semibold text-white mb-3">
                      Our Intellectual Property
                    </h3>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Software code and architecture</li>
                      <li>• User interface and design</li>
                      <li>• Trademarks and brand elements</li>
                      <li>• Documentation and training materials</li>
                      <li>• Proprietary algorithms and processes</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <h3 className="font-semibold text-white mb-3">
                      Your Content Rights
                    </h3>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• You retain ownership of your data</li>
                      <li>• You grant us license to process your data</li>
                      <li>• You&apos;re responsible for content legality</li>
                      <li>• You can export your data anytime</li>
                      <li>• We don&apos;t claim ownership of your content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                5. Service Availability and Performance
              </h2>
              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    Service Level Commitment
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-sunglow-500">
                        99.9%
                      </div>
                      <div className="text-sm text-white/60">
                        Uptime Target
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-sunglow-500">
                        &lt;2s
                      </div>
                      <div className="text-sm text-white/60">
                        Response Time
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-sunglow-500">
                        24/7
                      </div>
                      <div className="text-sm text-white/60">Monitoring</div>
                    </div>
                  </div>
                </div>
                <p className="text-white/70 text-sm">
                  While we strive to maintain high availability, we cannot
                  guarantee uninterrupted service due to factors beyond our
                  control, including internet connectivity, third-party
                  services, and scheduled maintenance.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                6. Limitation of Liability
              </h2>
              <div className="space-y-4">
                <div className="rounded-xl p-6 bg-white/[0.03] border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    Liability Limitations
                  </h3>
                  <p className="text-white/70 text-sm mb-3">
                    Smart CRM shall not be liable for any direct,
                    indirect, incidental, special, or consequential damages
                    arising from:
                  </p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Use or inability to use the platform</li>
                    <li>• Data loss or corruption</li>
                    <li>• Business interruption or lost profits</li>
                    <li>• Third-party integrations or services</li>
                    <li>• Force majeure events</li>
                  </ul>
                </div>
                <p className="text-white/70 text-sm">
                  Our total liability to you for any claims shall not exceed the
                  amount paid by you for the service in the 12 months preceding
                  the claim.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                7. Payment and Billing Terms
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    Payment Obligations
                  </h3>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Fees are due according to your billing cycle</li>
                    <li>• All prices are exclusive of applicable taxes</li>
                    <li>• Late payments may incur additional charges</li>
                    <li>• Failed payments may result in service suspension</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    Billing Policies
                  </h3>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Automatic renewal unless cancelled</li>
                    <li>• 30-day notice for plan changes</li>
                    <li>• Pro-rated charges for mid-cycle upgrades</li>
                    <li>• Refunds subject to our refund policy</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                8. Termination and Data Handling
              </h2>
              <div className="space-y-4">
                <p className="text-white/80">
                  Either party may terminate this agreement with appropriate
                  notice. Upon termination:
                </p>
                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-white mb-3">
                        Your Responsibilities
                      </h3>
                      <ul className="text-white/70 text-sm space-y-1">
                        <li>• Export your data before termination</li>
                        <li>• Pay any outstanding fees</li>
                        <li>• Return any confidential information</li>
                        <li>• Cease using our services immediately</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-3">
                        Our Commitments
                      </h3>
                      <ul className="text-white/70 text-sm space-y-1">
                        <li>• Provide 30-day data export window</li>
                        <li>• Securely delete your data afterward</li>
                        <li>• Process final billing within 30 days</li>
                        <li>• Maintain confidentiality obligations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                9. Governing Law and Dispute Resolution
              </h2>
              <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
                <h3 className="font-semibold text-white mb-3">
                  Legal Framework
                </h3>
                <ul className="text-white/70 text-sm space-y-2">
                  <li>• These terms are governed by the laws of India</li>
                  <li>• Disputes subject to Bengaluru jurisdiction</li>
                  <li>• Mediation preferred before litigation</li>
                  <li>• Arbitration available for commercial disputes</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                10. Contact Information
              </h2>
              <div className="rounded-xl p-6 bg-white/[0.03] border border-white/10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      Legal Inquiries
                    </h3>
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
                        <strong className="text-white">Business Hours:</strong> Monday-Friday, 9:00 AM
                        - 6:00 PM IST
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      Registered Office
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
                Questions About These Terms?
              </h3>
              <p className="text-white/70">
                If you have any questions or need clarification regarding these
                Terms and Conditions, please contact our legal team. We&apos;re
                here to help ensure you understand your rights and obligations.
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
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
