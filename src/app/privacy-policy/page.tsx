import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-transparent py-12">
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="bg-white rounded-lg border border-gray-50 overflow-hidden">
          {/* Header */}
          <div className="bg-black-900 px-8 py-12">
            <h1 className="text-4xl font-bold text-rich-black mb-4">
              Privacy Policy
            </h1>
            <p className="text-oxford-blue text-lg">
              Effective Date: August 22, 2025 | Last Updated: August 22, 2025
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <div className="prose max-w-none">
              <p className="text-lg text-rich-black mb-8 leading-relaxed">
                SmartAlgorhythm is committed to protecting your privacy and
                ensuring the security of your personal information. This
                comprehensive Privacy Policy describes how we collect, use,
                store, and safeguard your data when you use our CRM platform and
                related services.
              </p>

              <div className="bg-gray-100 border-l-4 border-rich-black-700 p-6 mb-8">
                <h3 className="text-lg font-semibold text-oxford-blue mb-2">
                  Your Privacy Rights
                </h3>
                <ul className="text-oxford-blue space-y-1">
                  <li>• Right to know what data we collect</li>
                  <li>• Right to access your personal information</li>
                  <li>• Right to correct or update your data</li>
                  <li>• Right to delete your information</li>
                  <li>• Right to data portability</li>
                </ul>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-rich-black mb-4 border-b-2 border-slate-200 pb-2">
                  1. Information We Collect
                </h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-lg p-4">
                      <h3 className="font-semibold text-rich-black mb-3">
                        Personal Information
                      </h3>
                      <ul className="text-rich-black text-sm space-y-1">
                        <li>• Name and contact details</li>
                        <li>• Email address and phone number</li>
                        <li>• Company information</li>
                        <li>• Job title and role</li>
                        <li>• Billing and payment information</li>
                      </ul>
                    </div>
                    <div className="rounded-lg p-4">
                      <h3 className="font-semibold text-rich-black mb-3">
                        Usage Information
                      </h3>
                      <ul className="text-rich-black text-sm space-y-1">
                        <li>• Platform usage patterns</li>
                        <li>• Feature utilization data</li>
                        <li>• Login and session information</li>
                        <li>• Device and browser information</li>
                        <li>• IP address and location data</li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg">
                    <h3 className="font-semibold text-rich-black mb-2">
                      Data Sources
                    </h3>
                    <p className="text-rich-black text-sm">
                      We collect information directly from you during
                      registration, through your use of our platform, from
                      cookies and tracking technologies, and from third-party
                      integrations you authorize.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-rich-black mb-4 border-b-2 border-slate-200 pb-2">
                  2. How We Use Your Information
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-lg">
                    <h3 className="font-semibold text-rich-black mb-3">
                      Service Delivery
                    </h3>
                    <ul className="text-rich-black text-sm space-y-1">
                      <li>• Provide CRM functionality</li>
                      <li>• Process transactions</li>
                      <li>• Manage your account</li>
                      <li>• Provide customer support</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg">
                    <h3 className="font-semibold text-rich-black mb-3">
                      Improvement
                    </h3>
                    <ul className="text-rich-black text-sm space-y-1">
                      <li>• Enhance platform features</li>
                      <li>• Analyze usage patterns</li>
                      <li>• Optimize performance</li>
                      <li>• Develop new features</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg">
                    <h3 className="font-semibold text-rich-black mb-3">
                      Communication
                    </h3>
                    <ul className="text-sm text-rich-black space-y-1">
                      <li>• Send service updates</li>
                      <li>• Security notifications</li>
                      <li>• Marketing communications</li>
                      <li>• Product announcements</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-rich-black mb-4 border-b-2 border-slate-200 pb-2">
                  3. Data Sharing and Disclosure
                </h2>
                <div className="space-y-4">
                  <p className="text-rich-black">
                    We respect your privacy and do not sell your personal
                    information. We may share your data only in the following
                    limited circumstances:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-semibold text-rich-black mb-2">
                        When We May Share
                      </h3>
                      <ul className="text-rich-black text-sm space-y-1">
                        <li>• With your explicit consent</li>
                        <li>• Legal compliance requirements</li>
                        <li>• Protection of rights and safety</li>
                        <li>• Business transfers (mergers, acquisitions)</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-rich-black mb-2">
                        Trusted Partners
                      </h3>
                      <ul className="text-rich-black text-sm space-y-1">
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
                <h2 className="text-2xl font-bold text-rich-black mb-4 border-b-2 border-slate-200 pb-2">
                  4. Data Security Measures
                </h2>
                <div className="space-y-4">
                  <p className="text-rich-black">
                    We implement comprehensive security measures to protect your
                    data from unauthorized access, alteration, disclosure, or
                    destruction:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-rich-black mb-3">
                        Technical Safeguards
                      </h3>
                      <ul className="space-y-2 text-rich-black">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-powder-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>
                            End-to-end encryption for data transmission
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-powder-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>AES-256 encryption for data at rest</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-powder-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Multi-factor authentication</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-powder-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>
                            Regular security audits and penetration testing
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-rich-black mb-3">
                        Operational Safeguards
                      </h3>
                      <ul className="space-y-2 text-rich-black">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-powder-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>
                            Access controls and role-based permissions
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-powder-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Employee training on data protection</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-powder-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Incident response procedures</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-powder-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Regular backup and disaster recovery</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-rich-black mb-4 border-b-2 border-slate-200 pb-2">
                  5. Your Rights and Choices
                </h2>
                <div className="p-6 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-rich-black mb-3">
                        Data Access Rights
                      </h3>
                      <ul className="text-rich-black text-sm space-y-1">
                        <li>• Request a copy of your data</li>
                        <li>• Correct inaccurate information</li>
                        <li>• Update your preferences</li>
                        <li>• Download your data (portability)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-rich-black mb-3">
                        Control Options
                      </h3>
                      <ul className="text-rich-black text-sm space-y-1">
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
                <h2 className="text-2xl font-bold text-rich-black mb-4 border-b-2 border-slate-200 pb-2">
                  6. Data Retention
                </h2>
                <div className="space-y-4">
                  <p className="text-rich-black">
                    We retain your personal information only as long as
                    necessary to provide our services and comply with legal
                    obligations:
                  </p>
                  <div className="rounded-lg p-4">
                    <h3 className="font-semibold text-rich-black mb-2">
                      Retention Periods
                    </h3>
                    <ul className="text-rich-black text-sm space-y-1">
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
                <h2 className="text-2xl font-bold text-rich-black mb-4 border-b-2 border-slate-200 pb-2">
                  7. Contact Information
                </h2>
                <div className="bg-slate-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-2 text-rich-black">
                        <p>
                          <strong>Email:</strong>{" "}
                          <a
                            href="mailto:privacy@smartalgorhythm.com"
                            className="text-oxford-blue underline"
                          >
                            support@smartalgorhythm.com
                          </a>
                        </p>
                        <p>
                          <strong>Phone:</strong> +91-7349172510
                        </p>
                        <p>
                          <strong>Response Time:</strong> Within 2 days
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-rich-black mb-3">
                        Company Address
                      </h3>
                      <div className="space-y-2 text-rich-black">
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

              <div className="bg-rich-black text-white p-6 rounded-lg mt-8">
                <h3 className="font-semibold mb-2">
                  Questions About Your Privacy?
                </h3>
                <p className="text-white">
                  We&apos;re committed to transparency and protecting your
                  privacy. If you have any questions about this policy or how we
                  handle your data, please don&apos;t hesitate to contact our
                  privacy team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
