"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowUpRight, 
  TrendingUp, 
  Users, 
  Zap, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  BarChart3,
  Mail,
  Phone,
  ArrowRight,
  Download,
  Calendar,
  Layers,
  Activity,
  UserPlus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const leads = [
  { id: "L-1021", user: "Vikram Malhotra", source: "Direct Inquiry", vendor: "Vogue Interiors", category: "Full Home", value: 450000, date: "2 mins ago", status: "Active" },
  { id: "L-2032", user: "Ananya Sharma", source: "Project Match", vendor: "Modular Hub", category: "Kitchen", value: 125000, date: "15 mins ago", status: "Converted" },
  { id: "L-3043", user: "Rohan Gupta", source: "Ad Campaign", vendor: "Luxe Lightings", category: "Lighting", value: 25000, date: "1h ago", status: "Active" },
  { id: "L-4054", user: "Sonal Singh", source: "Direct Inquiry", vendor: "Earthly Elements", category: "Outdoor", value: 85000, date: "3h ago", status: "Cold" },
  { id: "L-5065", user: "Priya Das", source: "Referral", vendor: "None (Waitlist)", category: "Furniture", value: 320000, date: "5h ago", status: "Pending" },
];

const stats = [
  { label: "Total Inquiries", value: "8,943", icon: MessageSquare, color: "text-primary" },
  { label: "Conversion rate", value: "24.5%", icon: TrendingUp, color: "text-success" },
  { label: "Waitlisted Leads", value: "112", icon: Clock, color: "text-warning" },
  { label: "Generated Value", value: "₹4.2M", icon: Activity, color: "text-primary" },
];

export default function LeadMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter(l => 
    l.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-white border-2 border-border/60 shadow-sm rounded-3xl group hover:border-primary/40 transition-all">
               <CardContent className="p-8">
                <div className={cn("h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-border/40 mb-6", stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums">{stat.value}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
         <div className="xl:col-span-3 space-y-8">
            <Card className="bg-white border-2 border-border/60 rounded-[3rem] shadow-sm overflow-hidden">
               <CardHeader className="p-10 border-b border-border/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                     <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tighter italic uppercase">
                        Lead Marketplace <Layers className="h-5 w-5 text-primary" />
                     </CardTitle>
                     <CardDescription className="text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-none">Global Inquiry Flow & Conversion Matrix</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input 
                           placeholder="Analyze lead ID or username..." 
                           className="h-12 pl-12 bg-slate-50 border-border/60 rounded-2xl text-xs font-bold focus-visible:ring-primary shadow-inner"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                     </div>
                     <Button className="h-12 px-8 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2">
                        <Download className="h-4 w-4" /> Export
                     </Button>
                  </div>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="bg-slate-50 border-b border-border/40">
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">User / Lead ID</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Target Vendor</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Project Value</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Status</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic text-right">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                           <AnimatePresence>
                              {filteredLeads.map((lead, i) => (
                                 <motion.tr 
                                    key={lead.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group hover:bg-slate-50/50 transition-colors"
                                 >
                                    <td className="px-10 py-7">
                                       <div className="flex items-center gap-4">
                                          <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs">
                                             {lead.user.charAt(0)}
                                          </div>
                                          <div className="space-y-0.5">
                                             <h4 className="font-black text-slate-900 group-hover:text-primary transition-colors tracking-tight">{lead.user}</h4>
                                             <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                                ID: <span className="text-primary tracking-normal">{lead.id}</span>
                                                <span className="h-1 w-1 rounded-full bg-slate-200" />
                                                {lead.source}
                                             </div>
                                          </div>
                                       </div>
                                    </td>
                                    <td className="px-10 py-7">
                                       <div className="flex items-center gap-2">
                                          <div className="h-6 w-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] text-white">
                                             <Users className="h-3 w-3" />
                                          </div>
                                          <span className="text-sm font-black text-slate-900 tracking-tight italic uppercase">{lead.vendor}</span>
                                       </div>
                                    </td>
                                    <td className="px-10 py-7">
                                       <div className="space-y-0.5">
                                          <p className="text-sm font-black text-slate-900 tabular-nums uppercase">₹{lead.value.toLocaleString()}</p>
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{lead.category}</p>
                                       </div>
                                    </td>
                                    <td className="px-10 py-7">
                                       <Badge className={cn("font-black text-[9px] uppercase tracking-widest px-3 h-6 border-0",
                                          lead.status === 'Active' ? 'bg-primary/10 text-primary' :
                                          lead.status === 'Converted' ? 'bg-success/10 text-success' :
                                          lead.status === 'Cold' ? 'bg-slate-200 text-slate-500' :
                                          'bg-warning/10 text-warning'
                                       )}>
                                          {lead.status}
                                       </Badge>
                                    </td>
                                    <td className="px-10 py-7 text-right">
                                       <div className="flex items-center justify-end gap-2">
                                          <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary hover:bg-slate-100">
                                             <Zap className="h-4 w-4" />
                                          </Button>
                                          <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-900 border border-transparent hover:border-border/40 transition-all">
                                             <MoreVertical className="h-4 w-4" />
                                          </Button>
                                       </div>
                                    </td>
                                 </motion.tr>
                              ))}
                           </AnimatePresence>
                        </tbody>
                     </table>
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="space-y-8">
            <Card className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-32 w-32 text-primary" />
               </div>
               <div className="relative z-10 space-y-6">
                  <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-2xl">
                     <TrendingUp className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-2xl font-black text-white uppercase tracking-widest italic">Lead Velocity</h3>
                     <p className="text-slate-400 text-sm font-medium italic">Conversion rates are <span className="text-success font-black">+12% higher</span> for leads generated via "Project Match".</p>
                  </div>
                  <Button className="w-full h-12 rounded-2xl bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all">
                     View All Metrics
                  </Button>
               </div>
            </Card>

            <Card className="bg-white border-2 border-border/60 rounded-[3rem] p-10 shadow-sm space-y-8">
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Recent Activity</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Real-time marketplace feed</p>
               </div>
               <div className="space-y-6">
                  {[
                     { user: "Rajesh K.", action: "New Lead", time: "2m ago", icon: UserPlus, color: "bg-primary/10 text-primary" },
                     { user: "Modular Hub", action: "Converted", time: "15m ago", icon: CheckCircle2, color: "bg-success/10 text-success" },
                     { user: "Sonia V.", action: "Active", time: "1h ago", icon: MessageSquare, color: "bg-warning/10 text-warning" },
                     { user: "System", action: "Lead Expired", time: "3h ago", icon: Clock, color: "bg-slate-100 text-slate-400" },
                  ].map((activity, i) => (
                     <div key={i} className="flex items-center gap-4 group">
                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border border-transparent shadow-sm group-hover:scale-105 transition-transform", activity.color)}>
                           <activity.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-black text-slate-900 truncate tracking-tight">{activity.user}</h4>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none italic">{activity.action} · {activity.time}</p>
                        </div>
                     </div>
                  ))}
               </div>
               <Button variant="ghost" className="w-full h-10 rounded-xl text-primary font-black uppercase text-[10px] tracking-widest hover:bg-primary/5">
                  View Full Audit Log
               </Button>
            </Card>
         </div>
      </div>
    </div>
  );
}
