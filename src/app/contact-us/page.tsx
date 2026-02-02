"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactUs() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormStatus("success");

    // Reset after 3 seconds
    setTimeout(() => setFormStatus("idle"), 3000);
  };

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
            <Image
              src="/initial_logo.svg"
              alt="Smart CRM Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
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

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-12 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunglow-500/10 border border-sunglow-500/30 text-sunglow-500 text-sm font-semibold mb-6">
            <MessageSquare className="w-4 h-4" />
            <span>We typically respond within 24 hours</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Let&apos;s Start a
            <span className="text-sunglow-500"> Conversation</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Have questions about Smart CRM? We&apos;re here to help you succeed.
            Reach out and let&apos;s discuss how we can transform your business.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="p-8 rounded-3xl bg-white/3 border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Send us a Message
                </h2>

                {formStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-white/60">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-white/80">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          required
                          className="h-12 border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-white/80">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          required
                          className="h-12 border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/80">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="h-12 border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white/80">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help?"
                        required
                        className="h-12 border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white/80">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your needs..."
                        required
                        rows={5}
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full h-12 bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-bold rounded-xl shadow-lg shadow-sunglow-500/25 hover:shadow-sunglow-500/40 transition-all duration-300 group"
                    >
                      {formStatus === "submitting" ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-rich-black/30 border-t-rich-black rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Contact Cards */}
              <div className="p-6 rounded-2xl bg-linear-to-br from-sunglow-500/10 to-transparent border border-sunglow-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sunglow-500/20 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-sunglow-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Email Us
                    </h3>
                    <p className="text-white/50 text-sm mb-2">
                      For general inquiries
                    </p>
                    <a
                      href="mailto:support@smartalgorhythm.com"
                      className="text-sunglow-500 hover:text-sunglow-400 font-medium transition-colors"
                    >
                      support@smartalgorhythm.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/3 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Call Us
                    </h3>
                    <p className="text-white/50 text-sm mb-2">
                      Mon-Fri, 9AM-6PM IST
                    </p>
                    <a
                      href="tel:+917349172510"
                      className="text-white hover:text-sunglow-500 font-medium transition-colors"
                    >
                      +91-7349172510
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/3 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Visit Us
                    </h3>
                    <p className="text-white/50 text-sm mb-2">
                      By appointment only
                    </p>
                    <address className="text-white/70 not-italic text-sm leading-relaxed">
                      Icosihenagon Technologies LLP
                      <br />
                      943, 16th cross, 1st stage
                      <br />
                      Kumaraswamy Layout, Bengaluru
                      <br />
                      Karnataka 560078
                    </address>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/3 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Business Hours
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/50">Monday - Friday</span>
                        <span className="text-white font-medium">
                          9:00 AM - 6:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Saturday</span>
                        <span className="text-white font-medium">
                          10:00 AM - 2:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Sunday</span>
                        <span className="text-red-400 font-medium">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Section */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Reach the Right Team
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/3 border border-white/10 hover:border-white/20 transition-colors group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-sunglow-500/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-sunglow-500" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Sales & Partnerships
                </h3>
              </div>
              <p className="text-white/50 text-sm mb-4">
                Product demos, pricing, enterprise solutions, and partnership
                opportunities
              </p>
              <a
                href="mailto:sales@smartalgorhythm.com"
                className="inline-flex items-center gap-2 text-sunglow-500 hover:text-sunglow-400 font-medium transition-colors group"
              >
                sales@smartalgorhythm.com
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white/3 border border-white/10 hover:border-white/20 transition-colors group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-powder-blue-500/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-powder-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Technical Support
                </h3>
              </div>
              <p className="text-white/50 text-sm mb-4">
                Platform issues, integrations, training, and account setup
                assistance
              </p>
              <a
                href="mailto:support@smartalgorhythm.com"
                className="inline-flex items-center gap-2 text-powder-blue-500 hover:text-powder-blue-400 font-medium transition-colors group"
              >
                support@smartalgorhythm.com
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="p-10 rounded-3xl bg-linear-to-br from-sunglow-500/20 via-sunglow-500/10 to-transparent border border-sunglow-500/30 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Start your free trial today and see how Smart CRM can help you
              close more clients with less effort.
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
