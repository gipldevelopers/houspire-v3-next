// "use client";

// import { useState } from "react";
// import { 
//   Eye, 
//   Users, 
//   MessageSquare, 
//   TrendingUp, 
//   TrendingDown,
//   ArrowUpRight,
//   ChevronRight,
//   Clock,
//   ArrowRight,
//   Target,
//   Crown,
//   CheckCircle2,
//   AlertCircle,
//   Briefcase,
//   Star,
//   Sparkles
// } from "lucide-react";
// import Link from "next/link";
// import { 
//   AreaChart, 
//   Area, 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell
// } from "recharts";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { dashboardStats, recentInquiries, analyticsData, inquiryDistribution, vendorProducts } from "@/lib/mock-data";
// import { motion, AnimatePresence } from "framer-motion";

// const statsConfig = [
//   { key: "profileViews", label: "Profile Views", icon: Eye, color: "accent" },
//   { key: "productViews", label: "Product Views", icon: Users, color: "primary" },
//   { key: "inquiries", label: "New Inquiries", icon: MessageSquare, color: "success" },
//   { key: "conversionRate", label: "Conv. Rate", icon: TrendingUp, color: "warning" },
// ];

// const COLORS = ['#BF953F', '#22C55E', '#3B82F6', '#94A3B8'];

// export default function DashboardOverviewPage() {
//   const [activeTab, setActiveTab] = useState('views');

//   return (
//     <div className="space-y-6 pb-12 animate-in fade-in-0 duration-500">
//       {/* Welcome Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//          <div>
//             <h1 className="text-2xl font-black text-foreground tracking-tighter">Good morning, Woodworks Studio!</h1>
//             <p className="text-sm text-muted-foreground font-medium">Your business performance is up <span className="text-success font-bold">12.5%</span>.</p>
//          </div>
//          <div className="flex items-center gap-3">
//             <div className="px-4 py-2 rounded-xl bg-card border flex items-center gap-3 shadow-sm">
//                <div className="h-6 w-6 rounded-lg bg-accent/20 flex items-center justify-center">
//                   <Crown className="h-3.5 w-3.5 text-accent" />
//                </div>
//                <div>
//                   <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Status</p>
//                   <p className="text-xs font-bold">Premium Vendor</p>
//                </div>
//             </div>
//             <Button className="h-10 px-5 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/10">
//                Generate Report
//             </Button>
//          </div>
//       </div>



//       {/* Profile Health Progress */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//          <Card className="lg:col-span-2 p-6 rounded-3xl border border-border/50 bg-accent/5 overflow-hidden group">
//             <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
//                <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
//                    <Target className="h-7 w-7 text-accent group-hover:scale-110 transition-transform" />
//                </div>
//                <div className="flex-1 space-y-3">
//                   <div className="flex items-center justify-between">
//                      <h3 className="text-lg font-black tracking-tight">Complete Your Profile</h3>
//                      <Badge className="bg-accent/20 text-accent font-black text-[9px] border-0 h-5 px-2">75% Complete</Badge>
//                   </div>
//                   <Progress value={75} className="h-2 rounded-full bg-accent/10" indicatorClassName="bg-accent" />
//                   <p className="text-[13px] text-muted-foreground font-medium">Add <span className="text-foreground font-bold">GST Certificate</span> to unlock higher visibility.</p>
//                </div>
//                <Link href="/dashboard/settings">
//                   <Button variant="outline" className="h-10 px-6 rounded-lg border font-black text-[9px] uppercase tracking-widest bg-card hover:bg-accent hover:text-accent-foreground transition-all">
//                      Tasks
//                   </Button>
//                </Link>
//             </div>
//          </Card>
//       </div>



//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {statsConfig.map((config, i) => {
//           const stat = dashboardStats[config.key];
//           const Icon = config.icon;
//           const isPositive = stat.change >= 0;

//           return (
//             <motion.div
//               key={config.key}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.05 }}
//               className="bg-card rounded-2xl border border-border/50 p-5 hover:shadow-lg transition-all hover:-translate-y-1 relative overflow-hidden group"
//             >
//               <div className="flex items-start justify-between relative z-10">
//                 <div className={`h-10 w-10 rounded-xl bg-${config.color}/10 flex items-center justify-center border border-${config.color}/10`}>
//                   <Icon className={`h-5 w-5 text-${config.color}`} />
//                 </div>
//                 <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black ${isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
//                   {isPositive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
//                   {Math.abs(stat.change)}%
//                 </div>
//               </div>
//               <div className="mt-4 space-y-0.5 relative z-10">
//                 <p className="text-2xl font-black text-foreground tracking-tighter tabular-nums leading-none">
//                   {config.key === "conversionRate" ? `${stat.value}%` : stat.value.toLocaleString()}
//                 </p>
//                 <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{config.label}</p>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>


//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         {/* Main Chart Area */}
//         <div className="xl:col-span-2 bg-card rounded-3xl border border-border/50 p-6 space-y-6 shadow-md overflow-hidden relative">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
//             <div>
//                <h2 className="text-lg font-black text-foreground tracking-tight">Performance Analytics</h2>
//                <p className="text-xs text-muted-foreground font-medium">Business footprint in real-time</p>
//             </div>
//             <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50">
//                {[
//                  { id: 'views', label: 'Views', icon: Eye },
//                  { id: 'inquiries', label: 'Inquiries', icon: MessageSquare }
//                ].map(tab => (
//                  <button 
//                    key={tab.id}
//                    onClick={() => setActiveTab(tab.id)}
//                    className={`h-8 px-4 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all ${activeTab === tab.id ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted font-bold'}`}
//                  >
//                    <tab.icon className="h-3 w-3" />
//                    {tab.label}
//                  </button>
//                ))}
//             </div>
//           </div>
          
//           <div className="h-[300px] w-full relative z-10">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={analyticsData}>
//                 <defs>
//                   <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#BF953F" stopOpacity={0.1}/>
//                     <stop offset="95%" stopColor="#BF953F" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
//                 <XAxis 
//                   dataKey="name" 
//                   axisLine={false} 
//                   tickLine={false} 
//                   tick={{ fontSize: 9, fontWeight: 900, fill: '#94A3B8' }} 
//                   dy={10}
//                 />
//                 <YAxis 
//                   axisLine={false} 
//                   tickLine={false} 
//                   tick={{ fontSize: 9, fontWeight: 900, fill: '#94A3B8' }} 
//                   dx={-5}
//                 />
//                 <Tooltip 
//                   content={({ active, payload }) => {
//                     if (active && payload && payload.length) {
//                       return (
//                         <div className="bg-card border border-border p-3 rounded-xl shadow-xl">
//                           <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">{payload[0].payload.name}</p>
//                           <p className="text-base font-black text-foreground">{payload[0].value.toLocaleString()}</p>
//                         </div>
//                       );
//                     }
//                     return null;
//                   }}
//                 />
//                 <Area 
//                   type="monotone" 
//                   dataKey={activeTab} 
//                   stroke="#BF953F" 
//                   strokeWidth={3} 
//                   fillOpacity={1} 
//                   fill="url(#colorValue)" 
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>


//         {/* Inquiry Distribution Pie Chart */}
//         <div className="bg-card rounded-3xl border border-border/50 p-6 space-y-6 shadow-md">
//            <div className="space-y-0.5">
//               <h2 className="text-lg font-black text-foreground tracking-tight">Lead Insights</h2>
//               <p className="text-xs text-muted-foreground font-medium">By product category</p>
//            </div>
           
//            <div className="h-[200px] w-full">
//              <ResponsiveContainer width="100%" height="100%">
//                <PieChart>
//                  <Pie
//                    data={inquiryDistribution}
//                    cx="50%"
//                    cy="50%"
//                    innerRadius={60}
//                    outerRadius={80}
//                    paddingAngle={6}
//                    dataKey="value"
//                  >
//                    {inquiryDistribution.map((entry, index) => (
//                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
//                    ))}
//                  </Pie>
//                  <Tooltip 
//                     content={({ active, payload }) => {
//                       if (active && payload && payload.length) {
//                         return (
//                           <div className="bg-card border border-border shadow-md p-2 rounded-lg text-[10px] font-black uppercase">
//                             {payload[0].name}: {payload[0].value}%
//                           </div>
//                         );
//                       }
//                       return null;
//                     }}
//                  />
//                </PieChart>
//              </ResponsiveContainer>
//            </div>
           
//            <div className="grid grid-cols-2 gap-2">
//               {inquiryDistribution.map((item, i) => (
//                  <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-muted/30">
//                     <div className="flex items-center gap-2">
//                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
//                        <span className="text-[10px] font-black text-foreground/80 uppercase tracking-tighter truncate max-w-[60px]">{item.name}</span>
//                     </div>
//                     <span className="text-[10px] font-black text-foreground">{item.value}%</span>
//                  </div>
//               ))}
//            </div>
//         </div>
//       </div>


//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//         {/* Top Products */}
//         <div className="bg-card rounded-3xl border border-border/50 p-6 space-y-6 shadow-md">
//            <div className="flex items-center justify-between">
//               <div className="space-y-0.5">
//                  <h2 className="text-lg font-black text-foreground tracking-tight">Top Products</h2>
//                  <p className="text-xs text-muted-foreground font-medium">By traffic and interest</p>
//               </div>
//               <Link href="/dashboard/products">
//                  <Button variant="outline" className="h-8 px-4 rounded-lg border font-black text-[9px] uppercase tracking-widest gap-2">
//                     Inventory <ChevronRight className="h-3 w-3" />
//                  </Button>
//               </Link>
//            </div>

           
//            <div className="space-y-3">
//               {vendorProducts.slice(0, 3).map((product, i) => (
//                  <div key={i} className="flex items-center justify-between p-2 rounded-2xl border border-transparent hover:border-border/30 hover:bg-muted/20 transition-all group">
//                     <div className="flex items-center gap-4">
//                        <div className="h-12 w-12 rounded-xl bg-muted overflow-hidden border border-border/30">
//                           <img src="/placeholder-product.jpg" alt={product.title} className="w-full h-full object-cover" />
//                        </div>
//                        <div className="space-y-0.5">
//                           <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{product.category}</p>
//                           <h4 className="text-sm font-black text-foreground tracking-tight truncate max-w-[150px]">{product.title}</h4>
//                           <div className="flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase">
//                              <span className="text-success">{product.views} Views</span>
//                              <span className="opacity-30">•</span>
//                              <span>{product.status}</span>
//                           </div>
//                        </div>
//                     </div>
//                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
//                        <ArrowUpRight className="h-4 w-4" />
//                     </Button>
//                  </div>
//               ))}
//            </div>
//         </div>


//         {/* Latest Leads / Recent Inquiries */}
//         <div className="bg-card rounded-3xl border border-border/50 p-6 space-y-6 shadow-md overflow-hidden relative">
//           <div className="flex items-center justify-between relative z-10">
//             <div className="space-y-0.5">
//                <h2 className="text-lg font-black text-foreground tracking-tight">Recent Leads</h2>
//                <p className="text-xs text-muted-foreground font-medium">Potential customers awaiting response</p>
//             </div>
//             <Link href="/dashboard/inquiries">
//                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground rounded-lg"><ArrowUpRight className="h-4 w-4" /></Button>
//             </Link>
//           </div>

          
//           <div className="space-y-2 relative z-10">
//              {recentInquiries.slice(0, 3).map((inquiry, i) => (
//                 <div key={inquiry.id} className="group relative flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-accent/10 hover:bg-accent/[0.01] transition-all cursor-pointer">
//                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-black text-sm shrink-0 border border-primary/10">
//                       {inquiry.customerName[0]}
//                    </div>
//                    <div className="min-w-0 flex-1 space-y-0.5">
//                      <div className="flex items-center justify-between gap-2">
//                         <p className="text-sm font-black text-foreground truncate">{inquiry.customerName}</p>
//                         <Badge className={`uppercase text-[8px] font-black tracking-widest h-5 px-2 border-0 rounded-full ${
//                            inquiry.status === 'new' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
//                         }`}>
//                            {inquiry.status === 'new' ? 'NEW' : 'REPLIED'}
//                         </Badge>
//                      </div>
//                      <p className="text-[10px] text-muted-foreground truncate font-black uppercase tracking-tighter opacity-70">
//                         {inquiry.product} • 2h ago
//                      </p>
//                    </div>
//                 </div>
//              ))}
//           </div>
          
//           <Link href="/dashboard/inquiries">
//              <Button variant="outline" className="w-full h-10 rounded-xl border font-black text-[9px] uppercase tracking-widest gap-2 bg-card hover:bg-muted transition-all relative z-10">
//                 Open Lead Center <ArrowRight className="h-3 w-3" />
//              </Button>
//           </Link>
//         </div>
//       </div>


      
//       {/* Premium Tips / System Notifications */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="p-6 rounded-3xl bg-indigo-600 text-white shadow-xl group cursor-pointer overflow-hidden relative">
//               <div className="relative z-10 space-y-4">
//                  <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
//                     <CheckCircle2 className="h-5 w-5" />
//                  </div>
//                  <div className="space-y-1">
//                     <h3 className="text-lg font-black tracking-tight">Boost Your Visibility</h3>
//                     <p className="text-white/80 font-medium text-xs leading-relaxed">Vendors with complete profiles get 2.5x more inquiries.</p>
//                  </div>
//                  <Link href="/dashboard/support">
//                     <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
//                        View Tips <ArrowRight className="h-3 w-3" />
//                     </button>
//                  </Link>
//               </div>
//           </div>

          
//           <div className="p-6 rounded-3xl bg-orange-500 text-white shadow-xl group cursor-pointer overflow-hidden relative">
//               <div className="relative z-10 space-y-4">
//                  <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
//                     <AlertCircle className="h-5 w-5" />
//                  </div>
//                  <div className="space-y-1">
//                     <h3 className="text-lg font-black tracking-tight">Security Alert</h3>
//                     <p className="text-white/80 font-medium text-xs leading-relaxed">Update your backup phone number for secure payouts.</p>
//                  </div>
//                  <Link href="/dashboard/settings">
//                     <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
//                        Secure Account <ArrowRight className="h-3 w-3" />
//                     </button>
//                  </Link>
//               </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//              <Link href="/dashboard/projects" className="group">
//                 <Card className="p-5 rounded-[2rem] border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all bg-card/40 flex flex-col items-center text-center gap-3">
//                    <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
//                       <Briefcase className="h-6 w-6" />
//                    </div>
//                    <div className="space-y-0.5">
//                       <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Portfolio</p>
//                       <p className="text-xs font-bold text-foreground">3 Projects</p>
//                    </div>
//                 </Card>
//              </Link>
//              <Link href="/dashboard/reviews" className="group">
//                 <Card className="p-5 rounded-[2rem] border shadow-sm hover:shadow-xl hover:border-accent/20 transition-all bg-card/40 flex flex-col items-center text-center gap-3">
//                    <div className="h-12 w-12 rounded-2xl bg-accent/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
//                       <Star className="h-6 w-6" />
//                    </div>
//                    <div className="space-y-0.5">
//                       <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Reputation</p>
//                       <p className="text-xs font-bold text-foreground">4.8 Rating</p>
//                    </div>
//                 </Card>
//              </Link>
//           </div>

//       </div>

//     </div>
//   );
// }

// function Card({ className, children }) {
//   return (
//     <div className={`bg-card rounded-3xl border shadow-sm ${className}`}>
//       {children}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  ChevronRight,
  ArrowRight,
  Target,
  Crown,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Star,
  ShieldCheck,
  Zap,
  PhoneCall,
  PackageSearch,
  IndianRupee,
  MoreHorizontal,
  Plus,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  dashboardStats, 
  recentInquiries, 
  analyticsData, 
  inquiryDistribution, 
  vendorProducts 
} from "@/lib/mock-data";

const COLORS = ['#0f172a', '#2563eb', '#10b981', '#f59e0b'];

export default function RedesignedVendorDashboard() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 space-y-8 pb-20 font-sans">
      
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Woodworks Studio</h1>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-3 py-0.5 rounded-full flex items-center gap-1 text-[10px] font-bold">
              <ShieldCheck className="h-3 w-3" /> VERIFIED
            </Badge>
          </div>
          <p className="text-slate-500 font-medium text-sm">Member since 2024 • <span className="text-slate-900 font-bold">GSTIN: 27AAAAA0000A1Z5</span></p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-4 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trust Score</p>
              <p className="text-lg font-black text-blue-600">88%</p>
            </div>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Response</p>
              <p className="text-lg font-black text-slate-900">2.4h</p>
            </div>
          </div>
          {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-6 rounded-xl shadow-lg shadow-blue-500/20">
            <Plus className="mr-2 h-5 w-5" /> Add Product
          </Button> */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Content Area (3 Columns) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <MetricCard title="New Leads" value="24" change="+12%" icon={MessageSquare} color="blue" />
             <MetricCard title="Total Views" value="1.2k" change="+5.4%" icon={Eye} color="indigo" />
             <MetricCard title="Buy Leads Left" value="08" change="Refills in 2d" icon={Zap} color="orange" />
          </div>

          {/* Lead Analytics & Management */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Lead Performance</h2>
                  <p className="text-sm text-slate-500 font-medium">Tracking inquiry volume across India</p>
               </div>
               <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl">
                  <Button variant="ghost" size="sm" className="bg-white shadow-sm text-xs font-bold px-4">Weekly</Button>
                  <Button variant="ghost" size="sm" className="text-xs font-bold px-4 text-slate-500">Monthly</Button>
               </div>
            </div>
            <div className="p-8 h-[350px]">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={analyticsData}>
                    <defs>
                      <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="views" stroke="#2563eb" strokeWidth={4} fill="url(#chartColor)" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* Product & Inquiry Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Product Catalog Summary */}
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Live Products</h3>
                  <Link href="/dashboard/products" className="text-blue-600 text-xs font-bold flex items-center hover:underline">
                    Manage All <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {vendorProducts.slice(0, 3).map((product, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100 group">
                      <div className="h-14 w-14 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                        <img src="/placeholder-product.jpg" alt="product" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-slate-900 truncate">{product.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-900">{product.views}</p>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase">Views</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             {/* Recent Lead Cards */}
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Latest Inquiries</h3>
                  <Link href="/dashboard/leads" className="text-blue-600 text-xs font-bold flex items-center hover:underline">
                    Lead Center <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentInquiries.slice(0, 3).map((lead, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center group cursor-pointer hover:border-blue-200 transition-all">
                       <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-black text-blue-600 text-xs shadow-sm">
                            {lead.customerName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{lead.customerName}</p>
                            <p className="text-[10px] font-bold text-slate-400 truncate w-32">{lead.product}</p>
                          </div>
                       </div>
                       <Button size="icon" variant="ghost" className="rounded-full group-hover:bg-blue-600 group-hover:text-white">
                          <PhoneCall className="h-4 w-4" />
                       </Button>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar (1 Column) - Business Health & Tools */}
        <div className="space-y-6">
          
          {/* Profile Score Card */}
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
             <div className="absolute -right-4 -top-4 h-24 w-24 bg-blue-600 rounded-full blur-3xl opacity-50" />
             <div className="relative z-10 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-black tracking-tight">Profile Health</h3>
                  <p className="text-slate-400 text-xs font-medium">Rank higher in searches</p>
                </div>
                <div className="flex items-center justify-center relative py-4">
                   <svg className="h-32 w-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-800" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="364" strokeDashoffset={364 - (364 * 75) / 100} className="text-blue-500" strokeLinecap="round" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-2xl font-black">75%</p>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Complete</p>
                   </div>
                </div>
                <Link href="/dashboard/settings" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl h-12">
                     Complete Profile
                  </Button>
                </Link>
             </div>
          </div>

          {/* Quick Tools Grid */}
          <div className="grid grid-cols-2 gap-3">
             <ToolIcon icon={PackageSearch} label="Catalog" />
             <ToolIcon icon={IndianRupee} label="Payments" />
             <ToolIcon icon={Star} label="Reviews" />
             <ToolIcon icon={Target} label="Ads" />
          </div>

          {/* Premium Banner (IndiaMart Style) */}
          <div className="bg-gradient-to-br from-amber-400 to-orange-600 p-8 rounded-[2.5rem] text-white space-y-4 shadow-lg shadow-orange-500/20 group cursor-pointer">
             <Crown className="h-10 w-10 text-white/50 group-hover:scale-110 transition-transform" />
             <div className="space-y-1">
                <h4 className="text-lg font-black tracking-tight">TrustSeal</h4>
                <p className="text-xs font-medium text-white/80">Get 10x more visibility with verified business badge.</p>
             </div>
             <div className="pt-2">
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/30">
                  Upgrade Now <ArrowRight className="h-3 w-3" />
                </button>
             </div>
          </div>

          {/* Account Manager Card */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                <Users className="h-6 w-6 text-slate-400" />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Manager</p>
                <p className="text-sm font-black text-slate-900">Vikram Singh</p>
                <p className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-1">
                  Connect Now <ArrowUpRight className="h-2 w-2" />
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function MetricCard({ title, value, change, icon: Icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100"
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
      <div className="space-y-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h4>
          <span className="text-[10px] font-black text-emerald-500">{change}</span>
        </div>
      </div>
      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center border ${colors[color]} group-hover:scale-110 transition-transform`}>
        <Icon className="h-7 w-7" />
      </div>
    </div>
  );
}

function ToolIcon({ icon: Icon, label }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col items-center gap-3 hover:bg-slate-50 cursor-pointer transition-colors group">
       <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
          <Icon className="h-5 w-5" />
       </div>
       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
    </div>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{payload[0].payload.name}</p>
        <p className="text-base font-black">{payload[0].value.toLocaleString()} <span className="text-[10px] text-slate-500 font-bold uppercase ml-1">Traffic</span></p>
      </div>
    );
  }
  return null;
}