import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Users,
  Target,
  Heart,
  Shield,
  Lightbulb,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/10 to-slate-800/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              About
              <span className="text-slate-600 block">SmartAlgorhythm CRM</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              We&apos;re on a mission to revolutionize how businesses build and
              maintain customer relationships through intelligent, AI-powered
              CRM solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Founded in 2025, SmartAlgorhythm CRM was born from a simple
                  observation: traditional CRM systems were too complex, too
                  rigid, and didn&apos;t adapt to the way modern businesses
                  actually work.
                </p>
                <p>
                  Our visoin is simple and straight-forward: to create a CRM
                  platform that&apos;s not just powerful, but intuitive,
                  intelligent, and genuinely helpful for businesses of all
                  sizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape how we build
              relationships with our customers and each other.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Innovation First
                </CardTitle>
                <CardDescription className="text-slate-600">
                  We constantly push boundaries to deliver cutting-edge
                  solutions that solve real business problems with intelligent
                  automation and AI.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Customer-Centric
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Every feature we build, every decision we make, is driven by
                  our commitment to delivering exceptional value to our
                  customers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Trust & Security
                </CardTitle>
                <CardDescription className="text-slate-600">
                  We maintain the highest standards of data security and
                  privacy, ensuring your business information is always
                  protected.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Results-Driven
                </CardTitle>
                <CardDescription className="text-slate-600">
                  We measure our success by the tangible results our customers
                  achieve - improved efficiency, better relationships, increased
                  revenue.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Collaborative Growth
                </CardTitle>
                <CardDescription className="text-slate-600">
                  We believe in growing together with our customers, partners,
                  and team members through open collaboration and shared
                  success.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Excellence
                </CardTitle>
                <CardDescription className="text-slate-600">
                  We strive for excellence in every aspect of our work, from
                  code quality to customer service, continuous learning and
                  improvement.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                Our Mission
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Empowering Business Success Through Intelligent CRM
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Our mission is to democratize access to powerful CRM technology
                by making it simple, affordable, and intelligent. We believe
                every business, regardless of size, deserves tools that help
                them build meaningful customer relationships and achieve
                sustainable growth.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Through our AI-powered platform, we&apos;re breaking down the
                barriers that have traditionally made CRM systems complex and
                expensive, making enterprise-grade functionality accessible to
                businesses of all sizes.
              </p>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Globe className="w-4 h-4" />
                Our Vision
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                A World Where Every Business Thrives
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We envision a future where technology seamlessly integrates with
                human insight to create extraordinary business outcomes. A world
                where every interaction is meaningful, every opportunity is
                captured, and every relationship is nurtured to its full
                potential.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                By 2030, we aim to be the global leader in intelligent CRM
                solutions, powering millions of businesses worldwide and setting
                the standard for what customer relationship management can
                achieve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Innovation Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Powered by Innovation
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our platform leverages cutting-edge technologies to deliver
              intelligent, scalable, and secure CRM solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Artificial Intelligence
              </h3>
              <p className="text-slate-600">
                Advanced AI algorithms power our lead scoring, pitch generation,
                and automated follow-up features, helping you work smarter, not
                harder.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Enterprise Security
              </h3>
              <p className="text-slate-600">
                Bank-grade encryption, regular security audits, and compliance
                with international standards ensure your data is always
                protected.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Cloud-Native Architecture
              </h3>
              <p className="text-slate-600">
                Built on modern cloud infrastructure for 99.9% uptime, automatic
                scaling, and seamless integration with your existing tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Have questions about our platform or want to learn more about how
              we can help your business? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Email Us</h3>
                <p className="text-slate-600 mb-4">
                  Get in touch for general inquiries
                </p>
                <Link
                  href="mailto:hello@smartalgorhythm.com"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  support@smartalgorhythm.com
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Call Us</h3>
                <p className="text-slate-600 mb-4">
                  Speak with our support team
                </p>
                <Link
                  href="tel:+917349172510"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  +91-7349172510
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Visit Us</h3>
                <p className="text-slate-600 mb-4">Our headquarters</p>
                <address className="text-purple-600 hover:text-purple-700 font-medium not-italic">
                  Bangalore, Karnataka
                  <br />
                  India
                </address>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-600 to-slate-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join Our Journey?
          </h2>
          <p className="text-xl text-slate-100 mb-10 max-w-2xl mx-auto">
            Whether you&apos;re a customer, partner, or potential team member,
            we&apos;re always looking for amazing people to join our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-slate-600 hover:bg-slate-100 px-8 py-3 text-lg font-semibold"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
