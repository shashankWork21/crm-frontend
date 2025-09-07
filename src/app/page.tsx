import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Users,
  Building2,
  MapPin,
  Tag,
  Calendar,
  BarChart3,
  Zap,
} from "lucide-react";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/10 to-slate-800/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              Smart CRM for Modern Teams
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
              Transform Your
              <span className="text-slate-600 block">
                Customer Relationships
              </span>
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Streamline your business operations with our intelligent CRM
              platform. Manage contacts, organizations, and activities with
              unprecedented ease and efficiency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 text-lg font-semibold"
                >
                  Start Exploring
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-3 text-lg"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to help you build stronger
              relationships and grow your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-slate-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Smart Contact Management
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Organize and track all your contacts with intelligent
                  categorization and powerful search capabilities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-slate-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Organization Insights
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Get deep insights into your client organizations with
                  comprehensive analytics and relationship mapping.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-slate-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Activity Tracking
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Never miss a follow-up with automated activity tracking and
                  intelligent scheduling reminders.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-slate-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Regional Management
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Manage your business across multiple regions with localized
                  data and regional insights.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Tag className="w-6 h-6 text-slate-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Smart Tagging
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Categorize and segment your contacts with intelligent tagging
                  for better organization and targeting.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-slate-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Advanced Analytics
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Make data-driven decisions with comprehensive analytics and
                  performance insights.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-600 to-slate-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-slate-100 mb-10 max-w-2xl mx-auto">
            Join thousands of businesses that have already streamlined their
            customer relationships with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-slate-600 hover:bg-slate-100 px-8 py-3 text-lg font-semibold"
              >
                Start Exploring
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
