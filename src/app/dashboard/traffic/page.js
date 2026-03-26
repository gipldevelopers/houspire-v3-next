"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight, 
  Eye, 
  Users, 
  TrendingUp, 
  Map, 
  Search, 
  ChevronRight,
  Info,
  Calendar,
  Layers,
  Sparkles
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
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const trafficData = [
  { name: "Mon", visits: 120, leads: 12 },
  { name: "Tue", visits: 180, leads: 15 },
  { name: "Wed", visits: 250, leads: 22 },
  { name: "Thu", visits: 210, leads: 18 },
  { name: "Fri", visits: 320, leads: 30 },
  { name: "Sat", visits: 280, leads: 25 },
  { name: "Sun", visits: 190, leads: 16 },
];

const categoryData = [
  { name: "Modular Kitchen", value: 45, color: "#6366f1" },
  { name: "Solid Wood", value: 30, color: "#8b5cf6" },
  { name: "Lighting", value: 15, color: "#ec4899" },
  { name: "Decor", value: 10, color: "#f43f5e" },
];

const topKeywords = [
  { word: "modular kitchen mumbai", count: 820, trend: "+12%" },
  { word: "teak wood furniture", count: 640, trend: "+8%" },
  { word: "custom wardrobes", count: 520, trend: "-3%" },
  { word: "luxury dining sets", count: 410, trend: "+25%" },
  { word: "office workstation pune", count: 350, trend: "+15%" },
];

export default function TrafficPage() {
  const [timeRange, setTimeRange] = useState("7D");

  return (
    <div className="space-y-10 animate-in fade-in-0 duration-700 pb-20">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
           <h2 className="text-4xl font-black text-foreground tracking-tight underline decoration-primary/20 decoration-8 underline-offset-8">Traffic Intelligence</h2>
           <div className="text-sm text-muted-foreground font-medium">Actionable insights on how customers find your profile</div>
        </div>
        <div className="flex bg-muted rounded-2xl p-1 shadow-inner h-14 w-fit shrink-0">
           {['24H', '7D', '30D', '1Y'].map(range => (
              <button
                 key={range}
                 onClick={() => setTimeRange(range)}
                 className={`px-8 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    timeRange === range ? "bg-card shadow-lg text-primary" : "text-muted-foreground hover:text-foreground"
                 }`}
              >
                 {range}
              </button>
           ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
           title="Total Impressions" 
           value="12,482" 
           trend="+15.4%" 
           up={true} 
           icon={Eye} 
           color="primary"
        />
        <StatCard 
           title="Profile Visits" 
           value="4,820" 
           trend="+8.2%" 
           up={true} 
           icon={Users} 
           color="accent"
        />
        <StatCard 
           title="Lead Conversion" 
           value="3.8%" 
           trend="+1.2%" 
           up={true} 
           icon={TrendingUp} 
           color="success"
        />
        <StatCard 
           title="Avg. Time" 
           value="2m 14s" 
           trend="-0.5%" 
           up={false} 
           icon={Calendar} 
           color="warning"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         {/* Main Traffic Chart */}
         <Card className="xl:col-span-2 rounded-[3rem] border-2 border-border/50 shadow-xl overflow-hidden bg-card/50 backdrop-blur-xl group">
            <CardHeader className="p-10 pb-0">
               <div className="flex items-center justify-between">
                  <div>
                     <CardTitle className="text-2xl font-black tracking-tight">Traffic vs Conversion</CardTitle>
                     <CardDescription className="text-sm font-medium">Daily breakdown of visitors and successful leads</CardDescription>
                  </div>
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Visitors</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-accent" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Leads</span>
                     </div>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="p-10 pt-8">
               <div className="h-[400px] w-full group-hover:scale-[1.01] transition-transform duration-700">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={trafficData}>
                        <defs>
                           <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                           </linearGradient>
                           <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis 
                           dataKey="name" 
                           axisLine={false} 
                           tickLine={false} 
                           tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} 
                           dy={10}
                        />
                        <YAxis 
                           axisLine={false} 
                           tickLine={false} 
                           tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} 
                        />
                        <Tooltip 
                           contentStyle={{ 
                              backgroundColor: '#fff', 
                              borderRadius: '16px', 
                              border: 'none', 
                              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' 
                           }}
                           labelStyle={{ fontWeight: 900, marginBottom: '8px', color: '#1e293b' }}
                        />
                        <Area type="monotone" dataKey="visits" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorVisits)" />
                        <Area type="monotone" dataKey="leads" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorLeads)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
         </Card>

         <div className="space-y-8">
            {/* Category Interest Pie */}
            <Card className="rounded-[2.5rem] border-2 border-border/50 shadow-xl overflow-hidden bg-card/50 backdrop-blur-xl">
               <CardHeader className="p-10 pb-6">
                  <CardTitle className="text-xl font-black tracking-tight flex items-center gap-2">
                     <Layers className="h-5 w-5 text-accent" /> Interest by Category
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-10 pt-0 flex flex-col items-center">
                  <div className="h-48 w-full mb-6">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={8}
                              dataKey="value"
                           >
                              {categoryData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                           </Pie>
                        </PieChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="w-full space-y-3">
                     {categoryData.map(cat => (
                        <div key={cat.name} className="flex items-center justify-between text-xs font-bold">
                           <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                              <span className="text-muted-foreground">{cat.name}</span>
                           </div>
                           <span className="text-foreground font-black">{cat.value}%</span>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            {/* Top Keywords */}
            <Card className="rounded-[2.5rem] border-2 border-border/50 shadow-xl overflow-hidden bg-card/50 backdrop-blur-xl p-8 space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                  Top Search Queries <Search className="h-4 w-4 opacity-50" />
               </h4>
               <div className="space-y-4">
                  {topKeywords.map((kw, i) => (
                     <div key={kw.word} className="flex items-center justify-between group cursor-help transition-all hover:translate-x-1">
                        <div className="space-y-0.5">
                           <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{kw.word}</div>
                           <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">{kw.count} queries</div>
                        </div>
                        <Badge className={`bg-success/10 text-success text-[10px] font-black border-0 ${kw.trend.startsWith('-') ? 'bg-destructive/10 text-destructive' : ''}`}>
                           {kw.trend}
                        </Badge>
                     </div>
                  ))}
               </div>
               <Button variant="ghost" className="w-full h-10 rounded-xl text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary/5">View Full Keywords Explorer <ChevronRight className="h-4 w-4 ml-1" /></Button>
            </Card>
         </div>
      </div>

      {/* Intelligence Tip Card */}
      <div className="bg-gradient-to-r from-accent/10 to-transparent border-2 border-accent/20 rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-12 text-center md:text-left relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
            <Map className="h-64 w-64" />
         </div>
         <div className="h-20 w-20 rounded-3xl bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
            <Sparkles className="h-10 w-10 text-accent animate-pulse" />
         </div>
         <div className="flex-1 space-y-3 relative z-10">
            <h3 className="text-2xl font-black tracking-tight uppercase">Expansion Opportunity Found</h3>
            <div className="text-muted-foreground font-medium max-w-2xl">We've identified a <span className="text-accent font-black">240% surge</span> in search volume for <span className="text-foreground font-black tracking-tight underline decoration-accent/30 decoration-4">"Sustainable Office Furniture"</span> in your region. Consider listing products in this sub-category to capture emerging leads.</div>
         </div>
         <Button className="h-14 px-10 rounded-2xl bg-accent text-accent-foreground font-black shadow-xl shadow-accent/20 relative z-10 hover:scale-105 transition-all">Enable Smart Listing</Button>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, up, icon: Icon, color }) {
   const colorMap = {
      primary: "bg-primary/10 text-primary border-primary/20",
      accent: "bg-accent/10 text-accent border-accent/20",
      success: "bg-success/20 text-success border-success/20",
      warning: "bg-warning/20 text-warning border-warning/20"
   };

   return (
      <Card className="rounded-[2.5rem] p-8 border-2 border-border/50 shadow-xl bg-card/50 backdrop-blur-md group hover:border-primary/20 transition-all">
         <div className="flex items-start justify-between mb-6">
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 ${colorMap[color]}`}>
               <Icon className="h-7 w-7" />
            </div>
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${up ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
               {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />} {trend}
            </div>
         </div>
         <div className="space-y-1">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{title}</div>
            <h4 className="text-3xl font-black text-foreground tracking-tighter tabular-nums">{value}</h4>
         </div>
         <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between text-[10px] font-black uppercase text-muted-foreground tracking-widest italic opacity-50">
            <span>Since last month</span>
            <Info className="h-3 w-3" />
         </div>
      </Card>
   );
}
