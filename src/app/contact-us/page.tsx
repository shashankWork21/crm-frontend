import React from "react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-12">
            <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-slate-200 text-lg">
              Get in touch with our team - we&apos;re here to help you succeed
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <div className="prose max-w-none">
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                Thank you for your interest in SmartAlgorhythm. Our dedicated
                team is committed to providing exceptional support and
                assistance. Whether you have questions about our CRM platform,
                need technical support, or want to explore our services,
                we&apos;re here to help.
              </p>

              {/* Contact Methods */}
              <div className="flex flex-col md:flex-row gap-8 mb-12 justify-center">
                <div className="bg-slate-50 p-6 rounded-lg text-center w-fit">
                  <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Email Support
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Get detailed assistance via email
                  </p>
                  <a
                    href="mailto:support@smartalgorhythm.com"
                    className="text-slate-600 underline font-medium"
                  >
                    support@smartalgorhythm.com
                  </a>
                  <p className="text-xs text-slate-500 mt-2">
                    Response within 24 hours
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg text-center w-fit">
                  <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Phone Support
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Speak directly with our team
                  </p>
                  <a
                    href="tel:+917349172510"
                    className="text-slate-600 font-medium text-lg"
                  >
                    +91-7349172510
                  </a>
                  <p className="text-xs text-slate-500 mt-2">
                    Monday-Friday, 9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>

              {/* Department-specific contacts */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                  Department Contacts
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-4">
                      Sales & Business Inquiries
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="w-20 text-sm text-slate-600">
                          Email:
                        </span>
                        <a
                          href="mailto:sales@smartalgorhythm.com"
                          className="text-slate-600 underline"
                        >
                          sales@smartalgorhythm.com
                        </a>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-sm text-slate-600">
                          Phone:
                        </span>
                        <span className="text-slate-800">+91-7349172510</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-20 text-sm text-slate-600 pt-1">
                          For:
                        </span>
                        <span className="text-slate-700 text-sm">
                          Product demos, pricing, enterprise solutions,
                          partnerships
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-4">
                      Technical Support
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="w-20 text-sm text-slate-600">
                          Email:
                        </span>
                        <a
                          href="mailto:support@smartalgorhythm.com"
                          className="text-slate-600 underline"
                        >
                          support@smartalgorhythm.com
                        </a>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-sm text-slate-600">
                          Phone:
                        </span>
                        <span className="text-slate-800">+91-7349172510</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-20 text-sm text-slate-600 pt-1">
                          For:
                        </span>
                        <span className="text-slate-700 text-sm">
                          Platform issues, integrations, training, account setup
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Business Hours */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                  Business Hours
                </h2>
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-lg max-w-lg mx-auto">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-4 text-center">
                      Support Hours
                    </h3>
                    <div className="space-y-2 text-slate-700">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span className="font-medium">
                          9:00 AM - 6:00 PM IST
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span className="font-medium">
                          10:00 AM - 2:00 PM IST
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="font-medium text-red-600">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Office Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                  Office Information
                </h2>
                <div className="bg-slate-50 rounded-lg p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-4">
                        Registered Office
                      </h3>
                      <div className="space-y-2 text-slate-700">
                        <p className="font-medium text-lg">
                          Icosihenagon Technologies LLP
                        </p>
                        <div className="space-y-1">
                          <p>943, 16th cross, 1st stage</p>
                          <p>Kumaraswamy Layout, Bengaluru</p>
                          <p>Karnataka 560078</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-4">
                        Visit Our Office
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <h4 className="font-medium text-slate-700 mb-2">
                            By Appointment Only
                          </h4>
                          <p className="text-slate-600 text-sm">
                            We welcome visits to our office for business
                            meetings and demonstrations. Please schedule an
                            appointment in advance.
                          </p>
                        </div>
                        <div className="space-y-2 text-slate-700 text-sm">
                          <p>
                            <strong>Nearest Metro:</strong> Yelachenahalli metro
                            station
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
