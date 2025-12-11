"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Users,
  BarChart3,
  Clock,
  CheckCircle2,
  ArrowRight,
  Zap,
  Play,
  Star,
  Shield,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Animated counter hook
function useCountUp(
  end: number,
  duration: number = 2000,
  startOnView: boolean = true
) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
    }
  }, [startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  useEffect(() => {
    if (!startOnView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  return { count, ref };
}

// Testimonial data
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Business Coach",
    avatar: "PS",
    content:
      "Smart CRM transformed my DM chaos into a sales machine. I closed 12 clients in my first month.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Course Creator",
    avatar: "RV",
    content:
      "I was drowning in Instagram DMs. Now I respond in seconds with personalized messages. Game changer.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    role: "Fitness Coach",
    avatar: "AD",
    content:
      "The lead scoring alone saved me 10+ hours a week. I only talk to people ready to buy.",
    rating: 5,
  },
];

// Trust badges
const trustBadges = [
  { label: "Secure & Encrypted", icon: Shield },
  { label: "No Credit Card Required", icon: CheckCircle2 },
  { label: "Cancel Anytime", icon: TrendingUp },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const conversionCount = useCountUp(40, 2000);
  const hoursCount = useCountUp(10, 2000);
  const captureCount = useCountUp(99, 2000);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-rich-black overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sunglow-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-powder-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--rich-black)_70%)]" />
      </div>

      {/* Navigation */}
      <nav
        className="relative z-50 px-6 py-6"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rich-black rounded-lg"
            aria-label="Smart CRM Home"
          >
            <img src="/initial_logo.svg" alt="Smart CRM Logo" className="w-10 h-10" aria-hidden="true" />
            <span>Smart CRM</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/pricing"
              className="text-white/70 hover:text-white transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-500 rounded-lg px-2 py-1"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-white/70 hover:text-white transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-500 rounded-lg px-2 py-1"
            >
              About
            </Link>
            <Link
              href="/contact-us"
              className="text-white/70 hover:text-white transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-500 rounded-lg px-2 py-1"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-white hover:text-sunglow-500 hover:bg-white/5 font-semibold focus-visible:ring-2 focus-visible:ring-sunglow-500"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-bold px-6 shadow-lg shadow-sunglow-500/25 hover:shadow-sunglow-500/40 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sunglow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-rich-black">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative z-10 px-6 pt-16 pb-24 md:pt-24 md:pb-32"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-6xl mx-auto">
          {/* Urgency Badge */}
          <div
            className="flex justify-center mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunglow-500/10 border border-sunglow-500/30 text-sunglow-500 text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sunglow-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sunglow-500" />
              </span>
              <span>Limited: 7-Day Free Trial — No Card Required</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center">
            <h1
              id="hero-heading"
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-[0.95] animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
            >
              <span className="text-white block">Stop Losing Leads</span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-sunglow-400 via-sunglow-500 to-sunglow-300 block mt-2">
                Start Closing Clients
              </span>
            </h1>

            <p
              className="text-xl md:text-2xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
            >
              The CRM built for coaches and creators who get engagement but lose
              sales.
              <span className="text-white font-semibold">
                {" "}
                Automate your DMs, score your leads,{" "}
              </span>
              and close{" "}
              <span className="text-sunglow-500 font-bold">
                40% more clients.
              </span>
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-bold px-10 py-7 text-lg shadow-xl shadow-sunglow-500/30 hover:shadow-sunglow-500/50 hover:scale-105 transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-sunglow-300"
                >
                  <span>Start Your Free Trial</span>
                  <ArrowRight
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </Link>

              <Link href="/contact-us">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-10 py-7 text-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/50 group"
                >
                  <Play
                    className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span>Watch Demo</span>
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50 animate-fade-in"
              style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}
            >
              {trustBadges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <Icon
                      className="w-4 h-4 text-sunglow-500/70"
                      aria-hidden="true"
                    />
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section
        className="relative z-10 py-12 border-y border-white/10 bg-white/2"
        aria-label="Statistics"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div ref={conversionCount.ref}>
              <div className="text-5xl md:text-6xl font-black text-sunglow-500 mb-2">
                {conversionCount.count}%
              </div>
              <div className="text-white/60 uppercase tracking-widest text-sm font-medium">
                More Conversions
              </div>
            </div>
            <div ref={hoursCount.ref}>
              <div className="text-5xl md:text-6xl font-black text-sunglow-500 mb-2">
                {hoursCount.count}hr
              </div>
              <div className="text-white/60 uppercase tracking-widest text-sm font-medium">
                Saved Per Week
              </div>
            </div>
            <div ref={captureCount.ref}>
              <div className="text-5xl md:text-6xl font-black text-sunglow-500 mb-2">
                {captureCount.count}%
              </div>
              <div className="text-white/60 uppercase tracking-widest text-sm font-medium">
                Lead Capture Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain → Solution Section */}
      <section
        className="relative z-10 py-24 px-6"
        aria-labelledby="transformation-heading"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              id="transformation-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
            >
              From Inbox Chaos to
              <span className="text-sunglow-500"> Client Clarity</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              See what changes when you stop managing leads manually
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Before Card */}
            <div
              className="relative p-8 lg:p-10 rounded-3xl bg-linear-to-br from-red-500/10 to-transparent border border-red-500/20 group hover:border-red-500/40 transition-colors"
              role="region"
              aria-labelledby="before-heading"
            >
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
                Before
              </div>
              <h3
                id="before-heading"
                className="text-2xl lg:text-3xl font-bold text-white mb-8"
              >
                The Daily Struggle
              </h3>
              <ul className="space-y-5" role="list">
                {[
                  "DMs scattered across Instagram, WhatsApp & Email",
                  "No idea who's ready to buy vs. just browsing",
                  "Manual follow-ups eating your entire day",
                  '"Maybe later" leads that vanish forever',
                  "Opportunities slipping through the cracks",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-white/60 group-hover:text-white/70 transition-colors"
                  >
                    <span
                      className="shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-sm font-bold"
                      aria-hidden="true"
                    >
                      ✕
                    </span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After Card */}
            <div
              className="relative p-8 lg:p-10 rounded-3xl bg-linear-to-br from-sunglow-500/10 to-transparent border border-sunglow-500/30 group hover:border-sunglow-500/50 transition-colors"
              role="region"
              aria-labelledby="after-heading"
            >
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-sunglow-500/20 text-sunglow-400 text-xs font-bold uppercase tracking-wider">
                After
              </div>
              <h3
                id="after-heading"
                className="text-2xl lg:text-3xl font-bold text-white mb-8"
              >
                Your New Reality
              </h3>
              <ul className="space-y-5" role="list">
                {[
                  "Every lead captured & auto-categorized instantly",
                  "Hot leads surfaced for immediate attention",
                  "Warm leads nurtured automatically until ready",
                  "Smart follow-ups that feel personal, not robotic",
                  "You focus on closing—not chasing",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-white/80 group-hover:text-white transition-colors"
                  >
                    <CheckCircle2
                      className="shrink-0 w-6 h-6 text-sunglow-500"
                      aria-hidden="true"
                    />
                    <span className="text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="relative z-10 py-24 px-6 bg-linear-to-b from-transparent via-white/2 to-transparent"
        aria-labelledby="features-heading"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-sunglow-500/10 text-sunglow-500 text-sm font-semibold mb-6 uppercase tracking-wider">
              Features
            </span>
            <h2
              id="features-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
            >
              Everything You Need to
              <span className="text-sunglow-500"> Win</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Built to remove friction, increase conversion, and save hours
              every week
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "Automated DM Flows",
                description:
                  "Capture every comment, send the right message, and never lose a lead again. Works with Instagram, WhatsApp, and Email.",
                highlight: true,
              },
              {
                icon: Users,
                title: "Smart Lead Scoring",
                description:
                  "AI-powered categorization into hot, warm, or cold. Focus your energy on prospects ready to buy.",
                highlight: false,
              },
              {
                icon: BarChart3,
                title: "Conversion Analytics",
                description:
                  "Track opens, clicks, and conversation quality with beautiful visual dashboards.",
                highlight: false,
              },
              {
                icon: Clock,
                title: "Intelligent Follow-Ups",
                description:
                  "Automate reminders and re-engagement that feel personal. No lead slips through the cracks.",
                highlight: false,
              },
              {
                icon: Sparkles,
                title: "AI Sales Coach",
                description:
                  "Real-time feedback on your messages to improve tone, empathy, and closing effectiveness.",
                highlight: true,
              },
              {
                icon: Zap,
                title: "Unified Pipeline",
                description:
                  "Connect all your channels into one powerful dashboard. See everything, miss nothing.",
                highlight: false,
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <article
                  key={i}
                  className={`
                    relative p-8 rounded-2xl transition-all duration-300 group
                    ${
                      feature.highlight
                        ? "bg-linear-to-br from-sunglow-500/10 to-transparent border-2 border-sunglow-500/30 hover:border-sunglow-500/50"
                        : "bg-white/3 border border-white/10 hover:border-white/20 hover:bg-white/5"
                    }
                  `}
                >
                  {feature.highlight && (
                    <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-sunglow-500 text-rich-black text-xs font-bold uppercase">
                      Popular
                    </div>
                  )}
                  <div
                    className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110
                      ${feature.highlight ? "bg-sunglow-500/20" : "bg-white/10"}
                    `}
                  >
                    <Icon
                      className={`w-7 h-7 ${
                        feature.highlight ? "text-sunglow-500" : "text-white"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="relative z-10 py-24 px-6"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-sunglow-500/10 text-sunglow-500 text-sm font-semibold mb-6 uppercase tracking-wider">
              Testimonials
            </span>
            <h2
              id="testimonials-heading"
              className="text-4xl md:text-5xl font-black text-white mb-4"
            >
              Loved by Coaches & Creators
            </h2>
          </div>

          {/* Testimonial Card */}
          <div
            className="relative p-10 rounded-3xl bg-linear-to-br from-white/5 to-transparent border border-white/10"
            role="region"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* Stars */}
            <div
              className="flex gap-1 mb-6"
              role="img"
              aria-label={`${testimonials[activeTestimonial].rating} out of 5 stars`}
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-sunglow-500 text-sunglow-500"
                  aria-hidden="true"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl text-white font-medium leading-relaxed mb-8">
              &quot;{testimonials[activeTestimonial].content}&quot;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full bg-linear-to-br from-sunglow-400 to-sunglow-600 flex items-center justify-center text-rich-black font-bold text-lg"
                aria-hidden="true"
              >
                {testimonials[activeTestimonial].avatar}
              </div>
              <div>
                <div className="text-white font-semibold text-lg">
                  {testimonials[activeTestimonial].name}
                </div>
                <div className="text-white/50">
                  {testimonials[activeTestimonial].role}
                </div>
              </div>
            </div>

            {/* Dots Navigation */}
            <div
              className="flex justify-center gap-2 mt-8"
              role="tablist"
              aria-label="Testimonial navigation"
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rich-black
                    ${
                      i === activeTestimonial
                        ? "bg-sunglow-500 w-8"
                        : "bg-white/30 hover:bg-white/50"
                    }
                  `}
                  role="tab"
                  aria-selected={i === activeTestimonial}
                  aria-label={`View testimonial ${i + 1} from ${
                    testimonials[i].name
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="relative z-10 py-24 px-6"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 md:p-16 rounded-3xl bg-linear-to-br from-sunglow-500/20 via-sunglow-500/10 to-transparent border border-sunglow-500/30 overflow-hidden">
            {/* Background Glow */}
            <div
              className="absolute inset-0 bg-linear-to-br from-sunglow-500/20 to-transparent blur-3xl"
              aria-hidden="true"
            />

            <div className="relative text-center">
              <h2
                id="cta-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
              >
                Ready to Convert
                <span className="text-sunglow-500"> More Leads?</span>
              </h2>

              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Join thousands of coaches and creators who stopped losing leads
                and started closing clients. Your 7-day free trial is waiting.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-bold px-12 py-7 text-lg shadow-xl shadow-sunglow-500/30 hover:shadow-sunglow-500/50 hover:scale-105 transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-sunglow-300"
                  >
                    <span>Start Free Trial Now</span>
                    <ArrowRight
                      className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Button>
                </Link>

                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-12 py-7 text-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="w-5 h-5 text-sunglow-500"
                    aria-hidden="true"
                  />
                  <span>7-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="w-5 h-5 text-sunglow-500"
                    aria-hidden="true"
                  />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="w-5 h-5 text-sunglow-500"
                    aria-hidden="true"
                  />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Bar (Mobile) */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-rich-black/95 backdrop-blur-lg border-t border-white/10 md:hidden"
        role="complementary"
        aria-label="Mobile call to action"
      >
        <Link href="/register" className="block">
          <Button className="w-full bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-bold py-4 text-lg shadow-lg shadow-sunglow-500/30 focus-visible:ring-2 focus-visible:ring-sunglow-300">
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </Button>
        </Link>
      </div>

      {/* Bottom Padding for Mobile Sticky Bar */}
      <div className="h-20 md:h-0" aria-hidden="true" />
    </main>
  );
}
