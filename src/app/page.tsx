// app/page.tsx  (Next.js 13+)
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Zap,
  MessageSquare,
  Users,
  BarChart3,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center px-6 py-24 overflow-hidden bg-rich-black text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-rich-black-400 via-oxford-blue-400 to-rich-black-500 opacity-90" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            The <span className="text-sunglow-500">CRM</span> where
            <span className="block text-powder-blue-400">Tech Meets Sales</span>
          </h1>
          <p className="text-lg md:text-xl text-powder-blue-800 mb-10 max-w-2xl mx-auto">
            Built for coaches and service providers who get engagement but lose
            leads. Automate DMs, segment prospects, and close 40% more clients —
            without burning hours in your inbox.
          </p>
          <div className="flex flex-col items-center gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-sunglow-500 hover:bg-sunglow-400 text-rich-black-500 font-semibold px-8 py-3 cursor-pointer"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="mt-2 text-sm text-powder-blue-700 text-center">
              No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Before / After Section */}
      <section className="bg-white text-rich-black-500 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            From Inbox Chaos → Client Clarity
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Before */}
            <div className="bg-powder-blue-800/30 p-8 rounded-2xl border border-powder-blue-700">
              <h3 className="text-xl font-semibold mb-4">Before</h3>
              <ul className="space-y-3 text-powder-blue-100">
                <li>• DMs scattered across Instagram / WhatsApp / Email</li>
                <li>• No idea who’s hot, warm, or cold</li>
                <li>• Manual follow-ups that eat the day</li>
                <li>• “Maybe later” leads that vanish forever</li>
              </ul>
            </div>
            {/* After */}
            <div className="bg-sunglow-900/50 p-8 rounded-2xl border border-sunglow-600">
              <h3 className="text-xl font-semibold mb-4">After</h3>
              <ul className="space-y-3 text-rich-black-400">
                <li>• Every lead captured & auto-categorized</li>
                <li>• Hot leads surfaced instantly for your attention</li>
                <li>• Warm leads nurtured until they’re ready to buy</li>
                <li>• You work on sales — not in your inbox</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-rich-black-400 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to Convert Conversations into Clients
          </h2>
          <p className="text-powder-blue-700 mb-14 max-w-2xl mx-auto">
            Each feature is designed to remove friction, increase conversion,
            and save hours every week.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-oxford-blue-400/30 border border-oxford-blue-600 hover:bg-oxford-blue-400/50 transition-all p-6 text-left">
              <CardHeader>
                <MessageSquare className="w-8 h-8 text-sunglow-500 mb-3" />
                <CardTitle className="text-xl mb-2 text-white">
                  Automated DM Flows
                </CardTitle>
                <CardDescription className="text-powder-blue-700">
                  Capture every comment, send the right message, and never lose
                  a lead again.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-oxford-blue-400/30 border border-oxford-blue-600 hover:bg-oxford-blue-400/50 transition-all p-6 text-left">
              <CardHeader>
                <Users className="w-8 h-8 text-sunglow-500 mb-3" />
                <CardTitle className="text-xl mb-2 text-white">
                  Smart Segmentation
                </CardTitle>
                <CardDescription className="text-powder-blue-700">
                  AI-powered categorization of leads into hot, warm, or cold so
                  you focus on who’s ready.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-oxford-blue-400/30 border border-oxford-blue-600 hover:bg-oxford-blue-400/50 transition-all p-6 text-left">
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-sunglow-500 mb-3" />
                <CardTitle className="text-xl mb-2 text-white">
                  Conversion Insights
                </CardTitle>
                <CardDescription className="text-powder-blue-700">
                  Track opens, clicks, and conversation quality with visual
                  analytics that guide smarter follow-ups.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-oxford-blue-400/30 border border-oxford-blue-600 hover:bg-oxford-blue-400/50 transition-all p-6 text-left">
              <CardHeader>
                <Clock className="w-8 h-8 text-sunglow-500 mb-3" />
                <CardTitle className="text-xl mb-2 text-white">
                  Smart Follow-Ups
                </CardTitle>
                <CardDescription className="text-powder-blue-700">
                  Automate reminders and re-engagement messages so no lead slips
                  through the cracks.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 5 */}
            <Card className="bg-oxford-blue-400/30 border border-oxford-blue-600 hover:bg-oxford-blue-400/50 transition-all p-6 text-left">
              <CardHeader>
                <CheckCircle2 className="w-8 h-8 text-sunglow-500 mb-3" />
                <CardTitle className="text-xl mb-2 text-white">
                  AI Sales Coach
                </CardTitle>
                <CardDescription className="text-powder-blue-700">
                  Real-time feedback on your messages to help you improve tone,
                  empathy, and closing effectiveness.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 6 */}
            <Card className="bg-oxford-blue-400/30 border border-oxford-blue-600 hover:bg-oxford-blue-400/50 transition-all p-6 text-left">
              <CardHeader>
                <Zap className="w-8 h-8 text-sunglow-500 mb-3" />
                <CardTitle className="text-xl mb-2 text-white">
                  Integrations & Workflows
                </CardTitle>
                <CardDescription className="text-powder-blue-700">
                  Connect Instagram, WhatsApp, and Email into one pipeline —
                  your unified hub for client communication.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-transparent text-rich-black-500 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Turn Conversations into Clients?
          </h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto">
            Join the next generation of coaches and creators scaling with
            systems — not stress.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-rich-black-500 text-sunglow-500 hover:bg-rich-black-400 px-8 py-3 text-lg font-semibold"
            >
              Start Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
