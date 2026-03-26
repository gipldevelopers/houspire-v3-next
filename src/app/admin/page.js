"use client";

import { 
  Users, 
  Box, 
  TrendingUp, 
  ShieldCheck, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  Activity, 
  Clock, 
  Filter, 
  ExternalLink,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const globalTraffic = [
  { name: "Mon", users: 4500, inquiries: 320, approved: 12 },
  { name: "Tue", users: 5200, inquiries: 410, approved: 18 },
  { name: "Wed", users: 4800, inquiries: 380, approved: 15 },
  { name: "Thu", users: 6100, inquiries: 540, approved: 22 },
  { name: "Fri", users: 5900, inquiries: 480, approved: 20 },
  { name: "Sat", users: 7200, inquiries: 610, approved: 30 },
  { name: "Sun", users: 8100, inquiries: 720, approved: 35 },
];

const pendingVerifications = [
  { id: "V001", business: "Artisan Kitchens", type: "Modular Lab", date: "2m ago", status: "Critical" },
  { id: "V002", business: "Luxe Stone Co", type: "Flooring", date: "15m ago", status: "Medium" },
  { id: "V003", business: "Houspire Decor", type: "Furniture", date: "1h ago", status: "Low" },
];

const topCategories = [
  { name: "Modular Kitchen", count: 1240, growth: "+12%" },
  { name: "Luxury Lighting", count: 856, growth: "+8%" },
  { name: "Solid Wood Furniture", count: 634, growth: "+15%" },
  { name: "Italian Flooring", count: 478, growth: "+4%" },
];

const activityLog = [
  { id: 1, type: "registration", msg: "New Vendor: 'Vogue Interiors'", time: "4m ago", icon: Users, color: "text-primary" },
  { id: 2, type: "verification", msg: "KYC Uploaded: 'Stonecraft India'", time: "12m ago", icon: ShieldCheck, color: "text-success" },
  { id: 3, type: "compliance", msg: "Flagged Content: 'Cheap Wood Pro'", time: "45m ago", icon: AlertTriangle, color: "text-warning" },
  { id: 4, type: "inquiry", msg: "High Value Lead Generated (₹5.2L)", time: "1h ago", icon: Zap, color: "text-accent" },
];

export default function AdminOverviewPage() {
  const router = useRouter();

  const handleQuickAction = (action) => {
    toast.success(`Triggering ${action} ...`, {
      description: "Asset provisioning cluster synchronized.",
    });
  };
  return (
    <div className="space-y-12 animate-in fade-in-0 slide-in-from-bottom-6 duration-1000">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Vendors", value: "1,248", change: "+4.2%", icon: Users, color: "text-primary" },
          { title: "Product Pool", value: "48,230", change: "+12.1%", icon: Box, color: "text-accent" },
          { title: "Global Inquiries", value: "8,943", change: "+18.5%", icon: TrendingUp, color: "text-success" },
          { title: "Pending KYC", value: "42", change: "Critical", icon: ShieldCheck, color: "text-warning" },
        ].map((stat, i) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card 
              className="bg-white border-border/60 shadow-sm rounded-2xl overflow-hidden group hover:border-primary/40 transition-all border-2 cursor-pointer"
              onClick={() => handleQuickAction(stat.title)}
            >
               <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                     <div className={cn("h-9 w-9 rounded-xl bg-slate-50 flex items-center justify-center border border-border/40", stat.color)}>
                        <stat.icon className="h-4.5 w-4.5" />
                     </div>
                     <Badge className={cn("bg-slate-50 border-0 font-black text-[9px] uppercase tracking-widest px-2 h-5", 
                        stat.change.includes('+') ? 'text-success' : 
                        stat.change === 'Critical' ? 'text-destructive' : 'text-warning'
                     )}>
                        {stat.change}
                     </Badge>
                  </div>
                  <div className="space-y-0.5">
                     <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic leading-none">{stat.title}</p>
                     <h3 className="text-xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">{stat.value}</h3>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                     <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden mr-3">
                        <div className={cn("h-full w-[65%] rounded-full", stat.color.replace('text-', 'bg-'))} />
                     </div>
                     <span className="text-[9px] font-black italic text-slate-400">65%</span>
                  </div>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Intelligence Chart */}
        <Card className="lg:col-span-2 bg-white border-2 border-border/60 rounded-[2rem] shadow-sm overflow-hidden">
           <CardHeader className="p-8 border-b border-border/40">
              <div className="flex items-center justify-between">
                 <div className="space-y-0.5">
                    <CardTitle className="text-lg font-black text-slate-900 flex items-center gap-2.5 tracking-tighter uppercase italic">
                       Market Performance <Activity className="h-4 w-4 text-primary" />
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-[10px] font-medium italic">Global node engagement and conversion velocity.</CardDescription>
                 </div>
                 <div className="flex bg-slate-50 rounded-xl p-1 border border-border/40">
                    {['7D', '30D', 'ALL'].map(t => (
                      <Button key={t} size="sm" variant="ghost" className={cn(
                        "h-8 px-4 rounded-lg text-[9px] font-black uppercase tracking-widest",
                        t === '7D' ? "bg-white text-primary shadow-sm border border-border/40" : "text-slate-400 hover:text-slate-600"
                      )}>
                        {t}
                      </Button>
                    ))}
                 </div>
              </div>
           </CardHeader>
           <CardContent className="p-8">
              <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={globalTraffic}>
                       <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                             <stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                       <XAxis 
                         dataKey="name" 
                         stroke="#94A3B8" 
                         fontSize={10} 
                         fontWeight="bold" 
                         axisLine={false} 
                         tickLine={false}
                         tick={{fill: '#94A3B8', fontWeight: 900}}
                       />
                       <YAxis 
                         stroke="#94A3B8" 
                         fontSize={10} 
                         fontWeight="bold" 
                         axisLine={false} 
                         tickLine={false}
                         tick={{fill: '#94A3B8', fontWeight: 900}}
                       />
                       <Tooltip 
                         contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "20px", border: "1px solid #E2E8F0", padding: "15px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                         itemStyle={{ fontWeight: "bold", fontSize: "12px", color: "#0F172A" }}
                       />
                       <Area type="monotone" dataKey="users" stroke="var(--primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                 {[
                   { label: "Conversion Rate", value: "4.8%", color: "text-primary" },
                   { label: "Avg Session", value: "12m 45s", color: "text-success" },
                   { label: "Node Latency", value: "24ms", color: "text-accent" },
                 ].map(i => (
                   <div key={i.label} className="bg-slate-50 rounded-3xl p-6 border border-border/40">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">{i.label}</p>
                      <h4 className={cn("text-xl font-black tracking-tighter tabular-nums", i.color)}>{i.value}</h4>
                   </div>
                 ))}
              </div>
           </CardContent>
        </Card>

        {/* Intelligence Feeds */}
        <div className="space-y-8">
           {/* Activity Log */}
           <Card className="bg-white border-2 border-border/60 rounded-[3rem] shadow-sm">
              <CardHeader className="p-8 border-b border-border/40">
                 <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2 italic">
                       System Logs <Clock className="h-4 w-4 text-slate-400" />
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary font-black text-[10px] uppercase tracking-widest gap-1">
                       View All <ChevronRight className="h-4 w-4" />
                    </Button>
                 </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                 {activityLog.map((log) => (
                    <div key={log.id} className="flex items-start gap-4 group cursor-pointer">
                       <div className={cn("h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-border/40 group-hover:scale-110 transition-transform", log.color)}>
                          <log.icon className="h-5 w-5" />
                       </div>
                       <div className="flex-1 space-y-1">
                          <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{log.msg}</p>
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                             {log.type} <span className="h-1 w-1 rounded-full bg-slate-200" /> {log.time}
                          </div>
                       </div>
                    </div>
                 ))}
              </CardContent>
           </Card>

           {/* Moderation Alert */}
           <Card className="bg-primary/5 border-2 border-primary/10 rounded-[3rem] p-8 relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 h-32 w-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-1000" />
              <div className="relative z-10 flex flex-col gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm">
                    <Zap className="h-6 w-6" />
                 </div>
                 <h3 className="text-xl font-black text-slate-900 tracking-widest italic uppercase">Action Required</h3>
                 <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    You have <span className="text-slate-900 font-black">12 Pending Verifications</span> from the last 24 hours. Failure to approve may result in vendor churn.
                 </p>
                 <Button className="w-full h-12 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all mt-2">
                    Open Queue
                 </Button>
              </div>
           </Card>
        </div>
      </div>

      {/* Verification Queue Preview */}
      <Card className="bg-white border-2 border-border/60 rounded-[2rem] shadow-sm overflow-hidden">
         <CardHeader className="p-8 border-b border-border/40 flex flex-row items-center justify-between">
            <div className="space-y-0.5">
               <CardTitle className="text-lg font-black text-slate-900 flex items-center gap-2.5 tracking-tighter italic uppercase">
                  Pending Verifications <ShieldCheck className="h-4 w-4 text-success" />
               </CardTitle>
               <CardDescription className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Global Moderation Buffer</CardDescription>
            </div>
            <div className="flex items-center gap-3">
               <div className="relative hidden md:block group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-2.5 w-2.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input placeholder="Fast search..." className="h-8 w-40 pl-8 bg-slate-50 border border-border/40 rounded-lg text-[9px] font-bold text-slate-900 focus:ring-1 focus:ring-primary outline-none" />
               </div>
               <Button variant="outline" className="h-8 px-4 rounded-lg border-border/60 font-black text-[9px] uppercase tracking-widest bg-white shadow-sm">
                  <Filter className="h-3.5 w-3.5 mr-2" /> Global Filter
               </Button>
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50/50 border-b border-border/40">
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Vendor ID</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Business Profile</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Category Hub</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Entry Time</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Risk Profile</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic text-right">Moderator Control</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                     {pendingVerifications.map((v) => (
                        <tr key={v.id} className="group hover:bg-slate-50/50 transition-colors">
                           <td className="px-10 py-7">
                              <span className="text-xs font-black text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/20">{v.id}</span>
                           </td>
                           <td className="px-10 py-7">
                              <div className="flex items-center gap-4 text-slate-900">
                                 <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-xs text-slate-600 border border-border/40">
                                    {v.business.charAt(0)}
                                 </div>
                                 <span className="font-bold text-sm tracking-tight">{v.business}</span>
                              </div>
                           </td>
                           <td className="px-10 py-7">
                              <Badge variant="ghost" className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">{v.type}</Badge>
                           </td>
                           <td className="px-10 py-7">
                              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                 <Clock className="h-3 w-3" /> {v.date}
                              </div>
                           </td>
                           <td className="px-10 py-7">
                              <Badge className={cn("font-black text-[9px] uppercase tracking-widest h-6 px-3 border-0",
                                 v.status === 'Critical' ? 'bg-destructive text-white shadow-md shadow-destructive/10' :
                                 v.status === 'Medium' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/10' :
                                 'bg-success text-white shadow-md shadow-success/10'
                              )}>
                                 {v.status}
                              </Badge>
                           </td>
                           <td className="px-10 py-7 text-right">
                              <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Button 
                                  size="icon" 
                                  className="h-10 w-10 rounded-xl bg-success/5 text-success border border-success/20 hover:bg-success hover:text-white transition-all shadow-sm"
                                  onClick={() => toast.success(`Approved: ${v.business}`, { description: "Identity verified in global pool." })}
                                 >
                                    <CheckCircle2 className="h-5 w-5" />
                                 </Button>
                                 <Button 
                                  size="icon" 
                                  className="h-10 w-10 rounded-xl bg-destructive/5 text-destructive border border-destructive/20 hover:bg-destructive hover:text-white transition-all shadow-sm"
                                  onClick={() => toast.error(`Rejected: ${v.business}`, { description: "Asset flagged for compliance violation." })}
                                 >
                                    <XCircle className="h-5 w-5" />
                                 </Button>
                                 <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary hover:bg-slate-50"
                                  onClick={() => toast.info(`Accessing full audit logs for ${v.id}...`)}
                                 >
                                    <MoreVertical className="h-5 w-5" />
                                 </Button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-8 border-t border-border/40 bg-slate-50/30 flex items-center justify-center">
               <Button 
                variant="ghost" 
                className="text-primary font-black text-[10px] uppercase tracking-widest gap-2"
                onClick={() => router.push("/admin/vendors")}
               >
                  View Full Registry <ChevronRight className="h-4 w-4" />
               </Button>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
