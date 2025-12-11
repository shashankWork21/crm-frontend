"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw, CheckCircle2, Clock } from "lucide-react";

export default function CancellationRefundPolicy() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunglow-500/10 border border-sunglow-500/30 text-sunglow-500 text-sm font-semibold mb-6">
            <RotateCcw className="w-4 h-4" />
            <span>Fair Refund Policy</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Cancellation and Refund Policy
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
              At Icosihenagon Technologies LLP, we are committed to providing
              exceptional CRM solutions and ensuring complete customer
              satisfaction. This comprehensive Cancellation and Refund Policy
              outlines our terms, procedures, and commitments regarding
              refunds for our software services and solutions.
            </p>

            <div className="bg-linear-to-br from-sunglow-500/10 to-transparent border border-sunglow-500/20 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">
                Quick Overview
              </h3>
              <ul className="text-white/70 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sunglow-500 shrink-0 mt-0.5" />
                  <span>15-day refund window from date of purchase</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sunglow-500 shrink-0 mt-0.5" />
                  <span>3-5 business day processing time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sunglow-500 shrink-0 mt-0.5" />
                  <span>Full refund to original payment method</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sunglow-500 shrink-0 mt-0.5" />
                  <span>No questions asked policy within eligibility period</span>
                </li>
              </ul>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                1. Refund Eligibility
              </h2>
              <div className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  Customers are eligible for a full refund within{" "}
                  <strong className="text-sunglow-500">15 calendar days</strong>{" "}
                  from the date of purchase. This policy applies to all our
                  CRM software packages, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-white/70">
                  <li>Starter CRM Package</li>
                  <li>Professional CRM Suite</li>
                  <li>Enterprise CRM Solution</li>
                  <li>Custom CRM Development Services</li>
                  <li>Additional modules and integrations</li>
                </ul>
                <div className="bg-linear-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl p-4 mt-4">
                  <p className="text-yellow-200">
                    <strong>Important:</strong> Refund requests submitted
                    after the 15-day period will be evaluated on a
                    case-by-case basis and may not be eligible for a full
                    refund.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                2. How to Request a Refund
              </h2>
              <div className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  To initiate a refund request, please follow these simple
                  steps:
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-white/[0.03] border border-white/10 p-6 rounded-xl">
                    <div className="w-8 h-8 bg-sunglow-500 text-rich-black rounded-full flex items-center justify-center font-bold mb-3">
                      1
                    </div>
                    <h3 className="font-semibold text-white mb-2">Contact Support</h3>
                    <p className="text-sm text-white/70">
                      Email us at{" "}
                      <a
                        href="mailto:support@smartalgorhythm.com"
                        className="text-sunglow-500 hover:text-sunglow-400 transition-colors"
                      >
                        support@smartalgorhythm.com
                      </a>{" "}
                      within 15 days
                    </p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 p-6 rounded-xl">
                    <div className="w-8 h-8 bg-sunglow-500 text-rich-black rounded-full flex items-center justify-center font-bold mb-3">
                      2
                    </div>
                    <h3 className="font-semibold text-white mb-2">Provide Details</h3>
                    <p className="text-sm text-white/70">
                      Include your order number, purchase date, and reason for
                      refund
                    </p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 p-6 rounded-xl">
                    <div className="w-8 h-8 bg-sunglow-500 text-rich-black rounded-full flex items-center justify-center font-bold mb-3">
                      3
                    </div>
                    <h3 className="font-semibold text-white mb-2">Review Process</h3>
                    <p className="text-sm text-white/70">
                      Our team will review and respond within 24 hours
                    </p>
                  </div>
                </div>
                <div className="mt-6 bg-white/[0.03] border border-white/10 p-4 rounded-xl">
                  <h3 className="font-semibold text-white mb-3">
                    Required Information:
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-white/70">
                    <li>Order/Invoice number</li>
                    <li>Date of purchase</li>
                    <li>Email address used for purchase</li>
                    <li>
                      Brief reason for refund request (optional but helpful)
                    </li>
                    <li>Payment method details (for verification)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                3. Refund Processing Timeline
              </h2>
              <div className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  Once your refund request is approved, we ensure prompt
                  processing:
                </p>
                <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-xl p-6">
                  <h3 className="font-semibold text-white mb-3">
                    Processing Timeline
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-white/70">
                        <strong className="text-white">0-24 hours:</strong> Initial review and
                        approval
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-white/70">
                        <strong className="text-white">1-2 business days:</strong> Refund initiated
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-white/70">
                        <strong className="text-white">3-5 business days:</strong> Amount credited to
                        your account
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm mt-4">
                  <strong>Note:</strong> Processing times may vary depending
                  on your bank or payment provider. International transactions
                  may take 7-10 business days.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                4. Exceptions and Special Cases
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-linear-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-xl p-4">
                    <h3 className="font-semibold text-white mb-2">
                      Non-Refundable Items
                    </h3>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Custom development work (&gt;50% complete)</li>
                      <li>• Third-party license fees</li>
                      <li>• Setup and migration services (completed)</li>
                    </ul>
                  </div>
                  <div className="bg-linear-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-4">
                    <h3 className="font-semibold text-white mb-2">
                      Partial Refunds
                    </h3>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Pro-rated refunds for annual subscriptions</li>
                      <li>• Unused months in multi-month packages</li>
                      <li>• Add-on modules (if separable)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/10 pb-2">
                5. Contact Information
              </h2>
              <div className="rounded-xl p-6 bg-white/[0.03] border border-white/10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      Support Team
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
                        <strong className="text-white">Business Hours:</strong> Monday-Friday, 9:00
                        AM - 6:00 PM IST
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      Company Details
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
                Questions? We&apos;re Here to Help!
              </h3>
              <p className="text-white/70">
                Our customer success team is committed to ensuring your
                satisfaction. If you have any questions about our refund
                policy or need assistance with your CRM solution, don&apos;t
                hesitate to reach out.
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
