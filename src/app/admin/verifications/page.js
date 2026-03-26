"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info,
  Clock,
  ChevronRight,
  FileText,
  UserCheck,
  Building2,
  Phone,
  Mail,
  Zap,
  ShieldAlert,
  Fingerprint,
  ExternalLink
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
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const queue = [
  { id: "KYC-8821", name: "Artisan Kitchens", type: "Modular Lab", date: "2 mins ago", status: "Critical", risk: "Low", docs: ["GSTIN", "PAN", "Bank Statement"] },
  { id: "KYC-9922", name: "Luxe Stone Co", type: "Flooring", date: "15 mins ago", status: "Medium", risk: "Low", docs: ["GSTIN", "CIN"] },
  { id: "KYC-4433", name: "Houspire Decor", type: "Furniture", date: "1h ago", status: "Low", risk: "Low", docs: ["GSTIN", "PAN"] },
  { id: "KYC-1102", name: "Glow Masters", type: "Lighting", date: "3h ago", status: "Low", risk: "Medium", docs: ["GSTIN", "PAN", "MOA"] },
  { id: "KYC-7788", name: "Fab Wood", type: "Hardware", date: "5h ago", status: "Critical", risk: "High", docs: ["GSTIN"] },
];

const stats = [
  { label: "Pending Reviews", value: "3", icon: Clock, color: "text-warning" },
  { label: "Verified Today", value: "14", icon: UserCheck, color: "text-success" },
  { label: "High Risk Alerts", value: "2", icon: ShieldAlert, color: "text-destructive" },
  { label: "Avg Review Time", value: "12m", icon: Zap, color: "text-primary" },
];

export default function VerificationQueuePage() {
  const [selectedVendor, setSelectedVendor] = useState(null);

  return (
    <div className="space-y-12">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-white border-2 border-border/60 shadow-sm rounded-2xl group hover:border-primary/40 transition-all">
               <CardContent className="p-5">
                <div className={cn("h-9 w-9 rounded-xl bg-slate-50 flex items-center justify-center border border-border/40 mb-3", stat.color)}>
                  <stat.icon className="h-4.5 w-4.5" />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic mb-0.5 leading-none">{stat.label}</p>
                <h3 className="text-xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">{stat.value}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white border-2 border-border/60 rounded-[2rem] shadow-sm overflow-hidden">
               <CardHeader className="p-8 border-b border-border/40 flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                     <CardTitle className="text-lg font-black text-slate-900 flex items-center gap-2.5 tracking-tighter italic uppercase leading-none">
                        Moderation Hub <ShieldCheck className="h-4 w-4 text-success" />
                     </CardTitle>
                     <CardDescription className="text-slate-400 font-bold uppercase text-[9px] tracking-widest leading-none">Global Application Stream</CardDescription>
                  </div>
                  <Button variant="outline" className="h-8 px-4 rounded-lg border-border/60 font-black text-[9px] uppercase tracking-widest bg-white shadow-sm gap-2">
                     <Filter className="h-3.5 w-3.5" /> Filter
                  </Button>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="bg-slate-50 border-b border-border/40">
                              <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Account ID</th>
                              <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Business Profile</th>
                              <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Severity Index</th>
                              <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic text-right">Moderation</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                           {queue.map((v) => (
                              <tr key={v.id} className={cn("group hover:bg-slate-50 transition-colors cursor-pointer", selectedVendor?.id === v.id && "bg-slate-50")} onClick={() => setSelectedVendor(v)}>
                                 <td className="px-10 py-7">
                                    <span className="text-xs font-black text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/20">{v.id}</span>
                                 </td>
                                 <td className="px-10 py-7">
                                    <div className="flex items-center gap-4 text-slate-900">
                                       <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center font-black text-xs text-white">
                                          {v.name.charAt(0)}
                                       </div>
                                       <div>
                                          <span className="font-bold text-sm tracking-tight block">{v.name}</span>
                                          <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{v.type}</span>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-10 py-7">
                                    <Badge className={cn("font-black text-[9px] uppercase tracking-widest h-6 px-3 border-0 shadow-sm",
                                       v.status === 'Critical' ? 'bg-destructive text-white shadow-destructive/10' :
                                       v.status === 'Medium' ? 'bg-orange-500 text-white shadow-orange-500/10' :
                                       'bg-success text-white shadow-success/10'
                                    )}>
                                       {v.status}
                                    </Badge>
                                 </td>
                                 <td className="px-10 py-7 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                       <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-success hover:bg-success/5">
                                          <CheckCircle2 className="h-5 w-5" />
                                       </Button>
                                       <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-destructive hover:bg-destructive/5">
                                          <XCircle className="h-5 w-5" />
                                       </Button>
                                       <ChevronRight className="h-4 w-4 text-slate-300 ml-2" />
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="space-y-8">
            <AnimatePresence mode="wait">
               {selectedVendor ? (
                  <motion.div
                     key={selectedVendor.id}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 20 }}
                  >
                      <Card className="bg-white border-2 border-border/60 rounded-[2rem] shadow-sm overflow-hidden sticky top-20 ring-1 ring-slate-200/50">
                        <CardHeader className="p-6 border-b border-border/40 bg-slate-50/50">
                           <div className="flex items-center justify-between mb-3">
                              <Badge className="bg-primary/10 text-primary border-primary/20 font-black text-[8px] uppercase tracking-widest h-5 px-2">Vetting Phase</Badge>
                              <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-tighter italic leading-none">
                                 <Clock className="h-2.5 w-2.5" /> {selectedVendor.date}
                              </div>
                           </div>
                           <h3 className="text-lg font-black text-slate-900 tracking-tighter uppercase mb-0.5 leading-tight">{selectedVendor.name}</h3>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{selectedVendor.id} / {selectedVendor.type}</p>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                           <div className="space-y-4">
                              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic border-b border-border/20 pb-2">Compliance Documents</h4>
                              <div className="space-y-3">
                                 {selectedVendor.docs.map(doc => (
                                    <div key={doc} className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-border/40 group hover:border-primary/40 transition-all">
                                       <div className="flex items-center gap-3">
                                          <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center border border-border/40 text-primary">
                                             <FileText className="h-4 w-4" />
                                          </div>
                                          <span className="text-xs font-black text-slate-700 tracking-tight">{doc}</span>
                                       </div>
                                       <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-slate-400 hover:text-primary">
                                          <ExternalLink className="h-4 w-4" />
                                       </Button>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           <div className="space-y-4">
                              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic border-b border-border/20 pb-2">Business Health</h4>
                              <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative group">
                                 <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-primary/20 to-transparent" />
                                 <div className="relative z-10 flex items-center justify-between">
                                    <div className="space-y-1">
                                       <p className="text-[9px] font-black uppercase tracking-widest text-primary italic">Risk Assessment</p>
                                       <h4 className="text-2xl font-black tracking-tighter uppercase">{selectedVendor.risk} RISK</h4>
                                    </div>
                                    <ShieldCheck className="h-10 w-10 text-primary" />
                                 </div>
                              </div>
                           </div>

                           <div className="pt-6 border-t border-border/20 grid grid-cols-2 gap-4">
                              <Button 
                                className="h-12 rounded-2xl bg-success text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-success/10 flex items-center gap-2"
                                onClick={() => toast.success(`Approved: ${selectedVendor.name}`, { description: "Credential bundle committed to global pool." })}
                              >
                                 <CheckCircle2 className="h-4 w-4" /> Approve
                              </Button>
                              <Button 
                                className="h-12 rounded-2xl bg-destructive text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-destructive/10 flex items-center gap-2"
                                onClick={() => toast.error(`Rejected: ${selectedVendor.name}`, { description: "Compliance breach detected in KYC cluster." })}
                              >
                                 <XCircle className="h-4 w-4" /> Reject
                              </Button>
                              <Button 
                                variant="outline" 
                                className="col-span-2 h-12 rounded-2xl border-2 border-border/60 bg-white font-black uppercase text-[10px] tracking-widest shadow-sm flex items-center justify-center gap-2"
                                onClick={() => toast.info(`Clarification link dispatched to ${selectedVendor.id}...`)}
                              >
                                 <AlertTriangle className="h-4 w-4 text-warning" /> Flag for Clarification
                              </Button>
                           </div>
                        </CardContent>
                     </Card>
                  </motion.div>
               ) : (
                  <Card className="bg-slate-50 border-2 border-dashed border-border/60 rounded-[3rem] p-12 text-center flex flex-col items-center justify-center space-y-4 h-[600px]">
                     <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center border-2 border-border/40 text-slate-200">
                        <Fingerprint className="h-10 w-10" />
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-lg font-black text-slate-400 tracking-tighter uppercase italic">Select an application</h4>
                        <p className="text-xs text-slate-300 font-medium">Verify documents and perform risk profiling.</p>
                     </div>
                  </Card>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
