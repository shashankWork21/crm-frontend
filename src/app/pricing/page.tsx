import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Star, Brain, Zap, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/10 to-slate-800/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Star className="w-4 h-4" />
              Simple, Transparent Pricing
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Choose the Perfect
              <span className="text-slate-600 block">Plan for Your Team</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Start with our Standard plan for essential CRM features, or
              upgrade to Advanced for AI-powered insights and automation.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Standard Plan */}
            <Card className="border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Standard
                </CardTitle>
                <CardDescription className="text-slate-600 mt-2">
                  Perfect for small teams getting started with CRM
                </CardDescription>
                <div className="mt-6">
                  <div className="text-4xl font-bold text-slate-900">
                    ₹500
                    <span className="text-lg font-normal text-slate-600">
                      /month/seat
                    </span>
                  </div>
                  <div className="text-sm text-slate-500 mt-2">
                    or ₹2,000/month for 5 seats
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Contact Management</span>
                      <p className="text-sm text-slate-600">
                        Organize and track all your contacts with intelligent
                        categorization
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Activity Tracking</span>
                      <p className="text-sm text-slate-600">
                        Add and manage activities for all your contacts
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">
                        Organization Management
                      </span>
                      <p className="text-sm text-slate-600">
                        Manage client organizations and basic structure
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Team Collaboration</span>
                      <p className="text-sm text-slate-600">
                        Basic team management and user roles
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Smart Tagging</span>
                      <p className="text-sm text-slate-600">
                        Categorize contacts, activities, and organizations
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Basic Analytics</span>
                      <p className="text-sm text-slate-600">
                        Essential reporting and dashboard views
                      </p>
                    </div>
                  </li>
                </ul>
                <Link href="/register">
                  <Button className="w-full bg-slate-600 hover:bg-slate-700 text-white">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Advanced Plan - Most Popular */}
            <Card className="border-blue-200 ring-2 ring-blue-100 hover:ring-blue-200 transition-all duration-300 hover:shadow-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Advanced
                </CardTitle>
                <CardDescription className="text-slate-600 mt-2">
                  AI-powered features for growing businesses
                </CardDescription>
                <div className="mt-6">
                  <div className="text-4xl font-bold text-slate-900">
                    ₹2,000
                    <span className="text-lg font-normal text-slate-600">
                      /month/seat
                    </span>
                  </div>
                  <div className="text-sm text-slate-500 mt-2">
                    or ₹7,000/month for 5 seats
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-blue-700 font-medium">
                    <Zap className="w-4 h-4" />
                    150 AI Tokens Included
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Use AI features like lead scoring, pitch generation, and
                    automated emails
                  </p>
                </div>

                <p className="text-sm font-medium text-slate-900 mb-4">
                  Everything in Standard, plus:
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">
                        Organizational Clustering
                      </span>
                      <p className="text-sm text-slate-600">
                        Custom hierarchy and clustering based on your org
                        structure
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">
                        Advanced Team Management
                      </span>
                      <p className="text-sm text-slate-600">
                        Complex role hierarchies and permission management
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Follow-up Tracking</span>
                      <p className="text-sm text-slate-600">
                        Automated follow-up reminders and scheduling
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">AI Lead Scoring</span>
                      <p className="text-sm text-slate-600">
                        Intelligent lead prioritization and scoring
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">AI Pitch Generation</span>
                      <p className="text-sm text-slate-600">
                        Generate personalized sales pitches automatically
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">AI Follow-up Emails</span>
                      <p className="text-sm text-slate-600">
                        Automated, personalized follow-up email generation
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Calendar Integration</span>
                      <p className="text-sm text-slate-600">
                        Sync with Google Calendar and other calendar apps
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Advanced Analytics</span>
                      <p className="text-sm text-slate-600">
                        Comprehensive reporting with AI insights
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Priority Support</span>
                      <p className="text-sm text-slate-600">
                        Dedicated support team with faster response times
                      </p>
                    </div>
                  </li>
                </ul>
                <Link href="/register">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Start Advanced Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* AI Tokens Add-on */}
            <Card className="border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-slate-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">
                  AI Tokens
                </CardTitle>
                <CardDescription className="text-slate-600 mt-2">
                  Extend your AI capabilities with additional tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">
                      1 Token = 1 AI Task
                    </div>
                    <p className="text-sm text-slate-700 mt-2">
                      Use for any AI feature in your CRM
                    </p>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Lead Scoring</span>
                      <p className="text-sm text-slate-600">
                        AI-powered lead analysis and scoring
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Pitch Generation</span>
                      <p className="text-sm text-slate-600">
                        Create personalized sales pitches
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Email Generation</span>
                      <p className="text-sm text-slate-600">
                        Generate follow-up and outreach emails
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Smart Insights</span>
                      <p className="text-sm text-slate-600">
                        Get AI-powered business insights
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="space-y-3 mb-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-900 mb-2">
                      Token Packages:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>50 tokens</span>
                        <span className="font-medium">₹500</span>
                      </div>
                      <div className="flex justify-between">
                        <span>100 tokens</span>
                        <span className="font-medium">₹900</span>
                      </div>
                      <div className="flex justify-between">
                        <span>250 tokens</span>
                        <span className="font-medium">₹2,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-slate-600 hover:bg-slate-700 text-white">
                  Purchase Tokens
                  <Zap className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Feature Comparison
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See what&apos;s included in each plan to make the best choice for
              your team
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-900">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-slate-900">
                      Standard
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-slate-900">
                      Advanced
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      Contact Management
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      Activity Tracking
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      Organization Management
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      Team Collaboration
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      Organizational Clustering
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-400">—</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      Advanced Team Management
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-400">—</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      Smart Tagging
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      Follow-up Tracking
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-400">—</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      AI Lead Scoring
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-400">—</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      AI Pitch Generation
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-400">—</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      AI Follow-up Emails
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-400">—</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      Calendar Integration
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-400">—</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      AI Tokens Included
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-400">0</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-green-600 font-medium">
                        150/month
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                What happens if I run out of AI tokens?
              </h3>
              <p className="text-slate-600">
                You can purchase additional AI token packages at any time. Your
                account won&apos;t be disrupted, and you can continue using all
                non-AI features normally.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-slate-600">
                Yes, you can change your plan at any time. When upgrading,
                you&apos;ll have immediate access to new features. When
                downgrading, changes take effect at your next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Is there a free trial available?
              </h3>
              <p className="text-slate-600">
                Yes, we offer a 7-day free trial for both Standard and Advanced
                plans. No credit card required to start your trial.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                How do AI tokens work?
              </h3>
              <p className="text-slate-600">
                Each AI feature (lead scoring, pitch generation, email
                generation, etc.) consumes 1 token per use. Advanced plan
                includes 150 tokens monthly, and unused tokens don&apos;t roll
                over.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-slate-600">
                We accept all major credit cards, debit cards, UPI, and bank
                transfers. All payments are processed securely through our
                payment partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-600 to-slate-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-100 mb-10 max-w-2xl mx-auto">
            Join thousands of businesses that have transformed their customer
            relationships with our CRM platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-slate-600 hover:bg-slate-100 px-8 py-3 text-lg font-semibold"
              >
                Start Free Trial
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
