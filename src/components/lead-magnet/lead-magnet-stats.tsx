import { Card, CardContent } from "@/components/ui/card";
import { Download, Users, TrendingUp } from "lucide-react";

export default function LeadMagnetStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="bg-oxford-blue border-slate-700 rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Download className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-100">--</p>
              <p className="text-xs text-slate-400">Downloads</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-oxford-blue border-slate-700 rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-100">--</p>
              <p className="text-xs text-slate-400">Leads Captured</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-oxford-blue border-slate-700 rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-100">--</p>
              <p className="text-xs text-slate-400">Conversion Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
