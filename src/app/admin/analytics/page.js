"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Users, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Calendar, 
  Filter, 
  Globe, 
  Zap, 
  Layers, 
  PieChart, 
  LineChart, 
  Flame,
  MousePointer2,
  Clock,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
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

const performanceData = [
  { name: "Mon", inquiries: 4000, revenue: 2400 },
  { name: "Tue", inquiries: 3000, revenue: 1398 },
  { name: "Wed", inquiries: 2000, revenue: 9800 },
  { name: "Thu", inquiries: 2780, revenue: 3908 },
  { name: "Fri", inquiries: 1890, revenue: 4800 },
  { name: "Sat", inquiries: 2390, revenue: 3800 },
  { name: "Sun", inquiries: 3490, revenue: 4300 },
];

const categoryData = [
  { name: "Living Room", value: 45, color: "#4F46E5" },
  { name: "Kitchen Hub", value: 25, color: "#10B981" },
  { name: "Flooring", value: 15, color: "#F59E0B" },
  { name: "Lightings", value: 10, color: "#EF4444" },
  { name: "Outdoor", value: 5, color: "#6366F1" },
];

const stats = [
  { label: "GMV Terminal", value: "₹48.2M", change: "+14.2%", icon: ShoppingCart, color: "text-primary" },
  { label: "Ecosystem Users", value: "112k", change: "+4.5%", icon: Users, color: "text-success" },
  { label: "Lead Velocity", value: "84%", change: "+2.1%", icon: TrendingUp, color: "text-primary" },
  { label: "Conversion Rate", value: "3.4%", change: "-0.5%", icon: Activity, color: "text-destructive" },
];

export default function GlobalAnalyticsPage() {
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
            <Card className="bg-white border-2 border-border/60 shadow-sm rounded-3xl group hover:border-primary/40 transition-all overflow-hidden relative">
               <CardContent className="p-8">
                <div className={cn("h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-border/40 mb-6", stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center justify-between mb-1">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">{stat.label}</p>
                   <div className={cn("flex items-center gap-1 text-[10px] font-black italic uppercase tracking-widest", stat.change.startsWith('+') ? 'text-success' : 'text-destructive')}>
                      {stat.change.startsWith('+') ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {stat.change}
                   </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums">{stat.value}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Multi-Factor Growth Terminal */}
         <Card className="lg:col-span-2 bg-white border-2 border-border/60 rounded-[3rem] shadow-sm overflow-hidden">
            <CardHeader className="p-10 border-b border-border/40 flex flex-row items-center justify-between">
               <div className="space-y-1">
                  <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tighter italic uppercase underline decoration-primary decoration-4 underline-offset-8">
                     Growth Terminal <Zap className="h-5 w-5 text-primary" />
                  </CardTitle>
                  <CardDescription className="text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-none">Market Volatility & Performance Index</CardDescription>
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="outline" className="h-10 px-6 rounded-xl border-border/60 font-black text-[10px] uppercase tracking-widest bg-white shadow-sm hover:scale-105 transition-all">
                     <Calendar className="h-4 w-4 mr-2" /> 7 Days
                  </Button>
               </div>
            </CardHeader>
            <CardContent className="p-10">
               <div className="h-[400px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={performanceData}>
                        <defs>
                           <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                           </linearGradient>
                           <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94A3B8'}} dy={15} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94A3B8'}} />
                        <Tooltip 
                           contentStyle={{backgroundColor: '#0F172A', border: 'none', borderRadius: '12px', padding: '12px'}}
                           itemStyle={{fontSize: '10px', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase'}}
                        />
                        <Area type="monotone" dataKey="inquiries" stroke="#4F46E5" strokeWidth={4} fillOpacity={1} fill="url(#colorInquiries)" />
                        <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
               <div className="mt-10 flex flex-wrap gap-8 items-center justify-center border-t border-border/40 pt-10">
                  <div className="flex items-center gap-3">
                     <div className="h-3 w-3 rounded-full bg-primary" />
                     <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] italic">Lead Velocity Index</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="h-3 w-3 rounded-full bg-success" />
                     <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] italic">Revenue Yield Delta</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="h-3 w-3 rounded-full bg-slate-200" />
                     <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] italic">Platform Overhead</span>
                  </div>
               </div>
            </CardContent>
         </Card>

         <div className="space-y-8">
            <Card className="bg-white border-2 border-border/60 rounded-[3rem] shadow-sm p-10 space-y-8">
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Market Composition</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Category Dominance Tier</p>
               </div>
               <div className="space-y-6">
                  {categoryData.map((cat, i) => (
                     <div key={i} className="space-y-2 group">
                        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-slate-900">
                           <span className="flex items-center gap-2 italic">
                              <div className="h-2 w-2 rounded-full" style={{backgroundColor: cat.color}} />
                              {cat.name}
                           </span>
                           <span className="tabular-nums">{cat.value}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-border/40">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${cat.value}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className="h-full rounded-full shadow-[0_0_10px_rgba(var(--primary),0.2)]" 
                              style={{backgroundColor: cat.color}} 
                           />
                        </div>
                     </div>
                  ))}
               </div>
               <Button className="w-full h-12 rounded-2xl bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all">
                  Deep Category Audit
               </Button>
            </Card>

            <Card className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Flame className="h-32 w-32 text-primary" />
               </div>
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
                        <TrendingUp className="h-5 w-5" />
                     </div>
                     <div>
                        <h4 className="text-lg font-black text-white tracking-tighter uppercase italic">Hot Zones</h4>
                        <p className="text-[9px] font-black text-primary uppercase tracking-widest">Inquiry Surge Detected</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300">Ahmadabad Cluster</span>
                        <Badge className="bg-success text-white border-0 font-black text-[9px] h-5">+24%</Badge>
                     </div>
                     <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300">Mumbai West</span>
                        <Badge className="bg-success text-white border-0 font-black text-[9px] h-5">+12%</Badge>
                     </div>
                  </div>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
