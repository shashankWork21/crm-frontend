import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-8 py-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Terms and Conditions
            </h1>
            <p className="text-slate-100 text-lg">
              Effective Date: August 22, 2025 | Last Updated: August 22, 2025
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <div className="prose max-w-none">
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                Welcome to SmartAlgorhythm CRM. These Terms and Conditions
                (&quot;Terms&quot;) govern your use of our CRM platform and
                services. By accessing or using our platform, you agree to be
                bound by these terms. Please read them carefully before using
                our services.
              </p>

              <div className="bg-slate-50 border-l-4 border-slate-500 p-6 mb-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Agreement Overview
                </h3>
                <ul className="text-slate-700 space-y-1">
                  <li>
                    • These terms form a legal agreement between you and
                    SmartAlgorhythm
                  </li>
                  <li>
                    • By using our services, you accept these terms in full
                  </li>
                  <li>
                    • If you disagree with any part, please discontinue use
                  </li>
                  <li>• Terms may be updated periodically with notice</li>
                </ul>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                  1. Definitions and Interpretation
                </h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-slate-800 mb-3">
                        Key Terms
                      </h3>
                      <ul className="text-slate-700 text-sm space-y-2">
                        <li>
                          <strong>&quot;Service&quot;</strong> - SmartAlgorhythm
                          CRM platform and related services
                        </li>
                        <li>
                          <strong>&quot;User&quot;</strong> - Individual or
                          entity using our platform
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
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-slate-800 mb-3">
                        Parties
                      </h3>
                      <ul className="text-slate-700 text-sm space-y-2">
                        <li>
                          <strong>
                            &quot;We&quot;, &quot;Us&quot;, &quot;Our&quot;
                          </strong>{" "}
                          - SmartAlgorhythm Pvt. Ltd.
                        </li>
                        <li>
                          <strong>&quot;You&quot;, &quot;Your&quot;</strong> -
                          The user of our services
                        </li>
                        <li>
                          <strong>&quot;Platform&quot;</strong> - Our CRM
                          software and infrastructure
                        </li>
                        <li>
                          <strong>&quot;Agreement&quot;</strong> - These Terms
                          and Conditions
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                  2. Acceptable Use Policy
                </h2>
                <div className="space-y-4">
                  <p className="text-slate-700">
                    You agree to use the SmartAlgorhythm CRM platform
                    responsibly and in compliance with all applicable laws. The
                    following activities are strictly prohibited:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-semibold text-red-800 mb-3">
                        Prohibited Activities
                      </h3>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>• Unauthorized access or hacking attempts</li>
                        <li>• Uploading malicious software or viruses</li>
                        <li>• Harassment or abusive behavior</li>
                        <li>• Spam or unsolicited communications</li>
                        <li>• Violation of intellectual property rights</li>
                        <li>• Illegal or fraudulent activities</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-3">
                        Permitted Uses
                      </h3>
                      <ul className="text-green-700 text-sm space-y-1">
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
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                  3. Account Management and Security
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-3">
                      Your Responsibilities
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Maintain confidentiality of login credentials</li>
                        <li>• Use strong, unique passwords</li>
                        <li>
                          • Enable two-factor authentication when available
                        </li>
                        <li>• Monitor account activity regularly</li>
                      </ul>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Report suspicious activity immediately</li>
                        <li>• Keep contact information current</li>
                        <li>• Ensure authorized users only</li>
                        <li>• Comply with your organization&apos;s policies</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-2">
                      Account Suspension
                    </h3>
                    <p className="text-yellow-700 text-sm">
                      We reserve the right to suspend or terminate accounts that
                      violate these terms, engage in fraudulent activity, or
                      pose security risks to our platform or other users.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                  4. Intellectual Property Rights
                </h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-indigo-800 mb-3">
                        Our Intellectual Property
                      </h3>
                      <ul className="text-indigo-700 text-sm space-y-1">
                        <li>• Software code and architecture</li>
                        <li>• User interface and design</li>
                        <li>• Trademarks and brand elements</li>
                        <li>• Documentation and training materials</li>
                        <li>• Proprietary algorithms and processes</li>
                      </ul>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-teal-800 mb-3">
                        Your Content Rights
                      </h3>
                      <ul className="text-teal-700 text-sm space-y-1">
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
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                  5. Service Availability and Performance
                </h2>
                <div className="space-y-4">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-3">
                      Service Level Commitment
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-700">
                          99.9%
                        </div>
                        <div className="text-sm text-green-600">
                          Uptime Target
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-700">
                          &lt;2s
                        </div>
                        <div className="text-sm text-green-600">
                          Response Time
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-700">
                          24/7
                        </div>
                        <div className="text-sm text-green-600">Monitoring</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">
                    While we strive to maintain high availability, we cannot
                    guarantee uninterrupted service due to factors beyond our
                    control, including internet connectivity, third-party
                    services, and scheduled maintenance.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                  6. Limitation of Liability
                </h2>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="font-semibold text-red-800 mb-3">
                      Liability Limitations
                    </h3>
                    <p className="text-red-700 text-sm mb-3">
                      SmartAlgorhythm shall not be liable for any direct,
                      indirect, incidental, special, or consequential damages
                      arising from:
                    </p>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Use or inability to use the platform</li>
                      <li>• Data loss or corruption</li>
                      <li>• Business interruption or lost profits</li>
                      <li>• Third-party integrations or services</li>
                      <li>• Force majeure events</li>
                    </ul>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Our total liability to you for any claims shall not exceed
                    the amount paid by you for the service in the 12 months
                    preceding the claim.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                  7. Payment and Billing Terms
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-3">
                      Payment Obligations
                    </h3>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Fees are due according to your billing cycle</li>
                      <li>• All prices are exclusive of applicable taxes</li>
                      <li>• Late payments may incur additional charges</li>
                      <li>
                        • Failed payments may result in service suspension
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-3">
                      Billing Policies
                    </h3>
                    <ul className="text-slate-700 text-sm space-y-1">
                      <li>• Automatic renewal unless cancelled</li>
                      <li>• 30-day notice for plan changes</li>
                      <li>• Pro-rated charges for mid-cycle upgrades</li>
                      <li>• Refunds subject to our refund policy</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                  8. Termination and Data Handling
                </h2>
                <div className="space-y-4">
                  <p className="text-slate-700">
                    Either party may terminate this agreement with appropriate
                    notice. Upon termination:
                  </p>
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-3">
                          Your Responsibilities
                        </h3>
                        <ul className="text-slate-700 text-sm space-y-1">
                          <li>• Export your data before termination</li>
                          <li>• Pay any outstanding fees</li>
                          <li>• Return any confidential information</li>
                          <li>• Cease using our services immediately</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-3">
                          Our Commitments
                        </h3>
                        <ul className="text-slate-700 text-sm space-y-1">
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
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                  9. Governing Law and Dispute Resolution
                </h2>
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-slate-800 mb-3">
                    Legal Framework
                  </h3>
                  <ul className="text-slate-700 text-sm space-y-2">
                    <li>• These terms are governed by the laws of India</li>
                    <li>• Disputes subject to Bengaluru jurisdiction</li>
                    <li>• Mediation preferred before litigation</li>
                    <li>• Arbitration available for commercial disputes</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                  10. Contact Information
                </h2>
                <div className="bg-slate-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-3">
                        Legal Inquiries
                      </h3>
                      <div className="space-y-2 text-slate-700">
                        <p>
                          <strong>Email:</strong>{" "}
                          <a
                            href="mailto:legal@smartalgorhythm.com"
                            className="text-blue-600 underline"
                          >
                            legal@smartalgorhythm.com
                          </a>
                        </p>
                        <p>
                          <strong>Phone:</strong> +91-7349172510
                        </p>
                        <p>
                          <strong>Business Hours:</strong> Monday-Friday, 9:00
                          AM - 6:00 PM IST
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-3">
                        Registered Office
                      </h3>
                      <div className="space-y-2 text-slate-700">
                        <p>
                          <strong>Icosihenagon Technologies LLP</strong>
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

              <div className="bg-slate-600 text-white p-6 rounded-lg mt-8">
                <h3 className="font-semibold mb-2">
                  Questions About These Terms?
                </h3>
                <p className="text-slate-100">
                  If you have any questions or need clarification regarding
                  these Terms and Conditions, please contact our legal team.
                  We&apos;re here to help ensure you understand your rights and
                  obligations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
