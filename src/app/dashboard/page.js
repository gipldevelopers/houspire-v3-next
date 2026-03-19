"use client";

import { 
  Eye, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ChevronRight,
  Clock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { dashboardStats, recentInquiries } from "@/lib/mock-data";
import { motion } from "framer-motion";

const statsConfig = [
  { key: "profileViews", label: "Profile Views", icon: Eye, color: "accent" },
  { key: "productViews", label: "Product Views", icon: Users, color: "primary" },
  { key: "inquiries", label: "New Inquiries", icon: MessageSquare, color: "success" },
  { key: "conversionRate", label: "Conv. Rate", icon: TrendingUp, color: "warning" },
];

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((config, i) => {
          const stat = dashboardStats[config.key];
          const Icon = config.icon;
          const isPositive = stat.change >= 0;

          return (
            <motion.div
              key={config.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-3xl border p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className={`h-12 w-12 rounded-2xl bg-${config.color}/10 flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 text-${config.color}`} />
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-black ${isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                  {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <div className="mt-6 space-y-1">
                <p className="text-3xl font-black text-foreground tracking-tighter tabular-nums">
                  {config.key === "conversionRate" ? `${stat.value}%` : stat.value.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{config.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Chart Area Placeholder */}
        <div className="xl:col-span-2 bg-card rounded-3xl border p-8 space-y-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
               <h2 className="text-xl font-black text-foreground tracking-tight">Analytics Overview</h2>
               <p className="text-xs text-muted-foreground font-medium">Business performance over last 30 days</p>
            </div>
            <div className="flex gap-2">
               {['Views', 'Inquiries'].map(tab => (
                 <Button key={tab} variant="ghost" size="sm" className={`h-8 px-4 text-xs font-bold rounded-xl ${tab === 'Views' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>
                   {tab}
                 </Button>
               ))}
            </div>
          </div>
          <div className="aspect-[16/7] bg-muted/50 rounded-2xl border border-dashed flex items-center justify-center text-muted-foreground font-medium relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
             <div className="flex flex-col items-center gap-4 relative">
                <TrendingUp className="h-10 w-10 text-muted-foreground/20" />
                <p className="text-sm">Detailed performance graph will appear here</p>
             </div>
          </div>
        </div>

        {/* Recent Inquiries Card */}
        <div className="bg-card rounded-3xl border p-8 space-y-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-foreground tracking-tight">Latest Leads</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><ArrowUpRight className="h-4 w-4" /></Button>
          </div>
          <div className="space-y-4">
             {recentInquiries.slice(0, 4).map((inquiry, i) => (
                <div key={inquiry.id} className="group relative flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-bold text-xs shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                     {inquiry.customerName[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                       <p className="text-sm font-bold text-foreground truncate">{inquiry.customerName}</p>
                       <span className="text-[10px] text-muted-foreground font-medium shrink-0 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 2h
                       </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate font-medium mt-0.5">{inquiry.product}</p>
                  </div>
                  <button className="absolute inset-0 z-10 opacity-0" />
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors" opacity={0.5} />
                </div>
             ))}
          </div>
          <Button variant="outline" className="w-full h-12 rounded-xl border-border border-2 font-bold text-xs gap-2 group">
             View All Contacts <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
