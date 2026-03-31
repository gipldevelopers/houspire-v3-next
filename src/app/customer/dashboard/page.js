"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Image as ImageIcon, Heart, UserCircle, Plus, ChevronRight, LogOut, UploadCloud, Bell, Search, Menu, Gavel, MessageSquare, PieChart, History } from "lucide-react";
import { motion } from "framer-motion";

const savedRooms = [
  { id: 1, name: "Living Room Redo", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop", status: "Completed", date: "Oct 12, 2026" },
  { id: 2, name: "Master Bedroom", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop", status: "Live Auction", date: "Oct 24, 2026" }
];

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col fixed h-full z-10 hidden md:flex">
        <div className="h-20 flex items-center px-8 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-teal-600 flex items-center justify-center text-white font-black text-sm shadow-sm ring-4 ring-teal-50">H</div>
            <span className="font-extrabold text-slate-900 tracking-tight text-xl">Houspire</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "projects", label: "My Projects", icon: ImageIcon },
            { id: "saved", label: "Saved Products", icon: Heart },
            { id: "auctions", label: "Auction Rooms", icon: Gavel },
            { id: "messages", label: "Messages", icon: MessageSquare },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "profile", label: "Profile & Design DNA", icon: UserCircle },
            { id: "budget", label: "Budget Tracker", icon: PieChart },
            { id: "orders", label: "Order History", icon: History }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === tab.id ? "bg-teal-50 text-teal-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}
            >
              <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? "text-teal-600" : "text-slate-400 stroke-[1.5px]"}`} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-50 mt-auto">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm text-[#FF3B30] hover:bg-red-50 transition-all">
             <div className="h-10 w-10 rounded-full bg-[#2A2A2A] flex items-center justify-center text-white font-medium text-sm">N</div>
             Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
           <div className="flex items-center gap-4 flex-1">
             <button className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-lg">
               <Menu className="h-5 w-5" />
             </button>
             <div className="relative hidden md:block w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="Search projects or products..." className="w-full h-10 pl-10 pr-4 rounded-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all text-sm outline-none font-medium text-slate-800 placeholder:text-slate-400" />
             </div>
           </div>
           
           <div className="flex items-center gap-3 md:gap-4 shrink-0">
              <button className="relative p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-full transition-colors">
                 <Bell className="h-5 w-5" />
                 <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500 border-2 border-white" />
              </button>
              <div className="h-8 w-px bg-slate-200 hidden sm:block" />
              <button className="flex items-center gap-2 hover:bg-slate-50 p-1.5 md:pr-4 rounded-full transition-colors border border-transparent hover:border-slate-100">
                 <div className="h-8 w-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-black text-xs shadow-inner">
                    JD
                 </div>
                 <div className="hidden sm:flex flex-col items-start px-1">
                    <span className="text-xs font-black text-slate-800 leading-tight">John Doe</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Homeowner</span>
                 </div>
              </button>
           </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-8 lg:p-12 flex-1 relative z-10 w-full overflow-hidden">
          {(() => {
            switch(activeTab) {
               case "dashboard": return (
                  <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300">
                    
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-1">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Your Spaces</h1>
                        <p className="text-slate-500 font-medium">Manage your rooms and AI design projects</p>
                      </div>
                      
                      <Link href="/customer/design">
                        <Button className="h-14 px-6 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 active:scale-95 transition-all gap-2">
                          <Plus className="h-5 w-5" /> New Room Project
                        </Button>
                      </Link>
                    </header>

                    {/* Quick Action Banner */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 h-64 w-64 bg-teal-500/10 rounded-full blur-[80px]" />
                      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                         <div className="space-y-4">
                           <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                             <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                             <span className="text-[10px] font-black tracking-widest text-teal-400 uppercase">AI Powered</span>
                           </div>
                           <h2 className="text-3xl font-black text-white leading-tight">Design Your Space with AI Intelligence</h2>
                           <p className="text-slate-400 font-medium text-sm">Upload a photo of your empty or furnished room and let our AI extract the structure, suggest styles, and place real marketplace products inside.</p>
                         </div>
                         <div className="flex justify-end">
                           <Link href="/customer/design">
                              <div className="h-40 w-full md:w-64 border-2 border-dashed border-white/20 rounded-[2rem] bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group-hover:border-teal-500/50">
                                 <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-teal-400">
                                   <UploadCloud className="h-6 w-6" />
                                 </div>
                                 <p className="text-white font-bold text-sm">Upload Room Photo</p>
                              </div>
                           </Link>
                         </div>
                      </div>
                    </div>

                    {/* Room Grid */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <h3 className="text-xl font-black text-slate-900">Recent Projects</h3>
                         <button className="text-teal-600 font-bold text-sm hover:underline">View All</button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedRooms.map((room) => (
                          <motion.div 
                            key={room.id}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                          >
                            <div className="aspect-[4/3] relative overflow-hidden">
                              <img src={room.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={room.name} />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${room.status === 'Completed' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'}`}>
                                  {room.status}
                               </span>
                              </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                              <div className="space-y-1">
                                <h4 className="font-black text-lg text-slate-900">{room.name}</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modified {room.date}</p>
                              </div>
                              <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between">
                                 <span className="text-sm font-bold text-slate-500">6 Items Added</span>
                                 <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-teal-50 text-teal-600"><ChevronRight className="h-4 w-4" /></Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
               );
               
               case "projects": return (
                  <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex items-center justify-between">
                       <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Projects</h1>
                       <Link href="/customer/design">
                          <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold px-6 shadow-xl shadow-teal-500/20 gap-2"><Plus className="h-4 w-4" /> New Project</Button>
                       </Link>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                       {savedRooms.map((room) => (
                          <div key={room.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col sm:flex-row gap-6 hover:shadow-xl transition-all">
                             <div className="w-full sm:w-48 aspect-video sm:aspect-square relative rounded-2xl overflow-hidden shrink-0">
                                <img src={room.image} className="w-full h-full object-cover" />
                                <div className="absolute top-2 left-2"><Badge className={`border-0 text-white ${room.status === 'Completed' ? 'bg-emerald-500' : 'bg-orange-500'}`}>{room.status}</Badge></div>
                             </div>
                             <div className="flex-1 space-y-4 py-2">
                                <div>
                                   <h3 className="text-xl font-black text-slate-900">{room.name}</h3>
                                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Last Update: {room.date}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                   <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100">Minimalist</span>
                                   <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100">AI Staged</span>
                                </div>
                                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                   <div className="space-y-1">
                                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Budget</p>
                                      <p className="text-sm font-black text-slate-800">₹ 1,50,000</p>
                                   </div>
                                   <Button variant="outline" className="h-10 rounded-xl font-bold border-slate-200">View Project</Button>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                  </div>
               );
               
               case "saved": return (
                  <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex items-center justify-between">
                       <h1 className="text-3xl font-black text-slate-900 tracking-tight">Saved Products</h1>
                       <div className="relative hidden w-64 md:block">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input type="text" placeholder="Search saved items..." className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-sm font-medium outline-none" />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                       {[1,2,3,4].map(i => (
                          <div key={i} className="bg-white rounded-[2rem] p-4 border border-slate-100 group hover:shadow-xl transition-all">
                             <div className="aspect-[4/5] bg-slate-50 rounded-2xl relative overflow-hidden mb-4">
                                <img src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format" className="w-full h-full object-cover mix-blend-multiply" />
                                <button className="absolute top-3 right-3 h-8 w-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-teal-600 shadow-sm transition-transform hover:scale-110"><Heart className="h-4 w-4 fill-current" /></button>
                             </div>
                             <div className="space-y-1 px-2">
                                <p className="text-[10px] font-black tracking-widest uppercase text-slate-400">Luxe Interiors</p>
                                <h4 className="font-black text-slate-900 truncate">Modern Floor Lamp</h4>
                                <p className="text-teal-600 font-black text-sm pt-2">₹ 12,400</p>
                             </div>
                          </div>
                       ))}
                    </div>
                  </div>
               );
               
               case "auctions": return (
                  <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
                    <div className="space-y-1">
                       <h1 className="text-3xl font-black text-slate-900 tracking-tight">Active Auctions</h1>
                       <p className="text-slate-500 font-medium">Watch vendors pitch products for your live rooms.</p>
                    </div>
                    <div className="bg-white rounded-[2.5rem] border border-orange-100 shadow-xl shadow-orange-500/5 p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row gap-8">
                       <div className="absolute top-0 right-0 p-8 hidden md:block">
                          <div className="h-16 w-16 bg-orange-50 rounded-2xl flex flex-col items-center justify-center text-orange-600">
                             <span className="text-xl font-black leading-none">14</span>
                             <span className="text-[8px] font-black uppercase tracking-widest mt-1">Hours</span>
                          </div>
                       </div>
                       <div className="w-full md:w-48 aspect-video md:aspect-[3/4] bg-slate-100 rounded-2xl overflow-hidden shrink-0">
                          <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400" className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 space-y-6 pt-2">
                          <div>
                             <Badge className="bg-orange-500 text-white hover:bg-orange-500 border-0 font-black tracking-widest uppercase mb-3">Live Bidding</Badge>
                             <h2 className="text-2xl font-black text-slate-900">Master Bedroom Overhaul</h2>
                          </div>
                          <div className="grid grid-cols-2 gap-4 max-w-sm">
                             <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
                                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Target Budget</p>
                                <p className="text-lg font-black text-slate-800">₹ 2,00,000</p>
                             </div>
                             <div className="bg-orange-50 p-4 rounded-2xl space-y-1">
                                <p className="text-[10px] font-black text-orange-400 tracking-widest uppercase">Total Bids</p>
                                <p className="text-lg font-black text-orange-600">8 pitches</p>
                             </div>
                          </div>
                          <Button className="bg-slate-900 hover:bg-slate-800 text-white h-12 px-8 rounded-xl font-bold w-full sm:w-auto">Review Pitches</Button>
                       </div>
                    </div>
                  </div>
               );
               
               case "messages": return (
                  <div className="max-w-5xl mx-auto h-[600px] bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-80 border-r border-slate-100 hidden md:flex flex-col bg-slate-50/50">
                       <div className="p-6 border-b border-slate-100 bg-white">
                          <h2 className="text-lg font-black tracking-tight mb-4">Conversations</h2>
                          <div className="relative">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                             <input type="text" placeholder="Search..." className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border-transparent text-sm font-medium outline-none focus:bg-white focus:border-slate-200 border transition-colors" />
                          </div>
                       </div>
                       <div className="flex-1 overflow-y-auto">
                          {[1,2,3].map(i => (
                             <div key={i} className={`p-4 border-b border-slate-100 flex gap-4 cursor-pointer hover:bg-white transition-colors ${i===1 ? 'bg-white' : ''}`}>
                                <div className="h-12 w-12 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                                   <img src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=100" className="w-full h-full object-cover grayscale" />
                                </div>
                                <div className="flex-1 min-w-0">
                                   <div className="flex items-center justify-between mb-1">
                                      <span className="font-bold text-sm truncate text-slate-900">Artisan Woodworks</span>
                                      <span className="text-[10px] font-bold text-slate-400">2h ago</span>
                                   </div>
                                   <p className="text-xs text-slate-500 truncate font-medium">The custom sofa will be ready by...</p>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 text-center">
                       <MessageSquare className="h-16 w-16 text-slate-300 mb-4" />
                       <h2 className="text-xl font-black text-slate-900 mb-2">Vendor Chat Interface</h2>
                       <p className="text-slate-500 text-sm max-w-xs font-medium">Select a conversation on the left to negotiate pricing or finalize fabrication details with your vendors.</p>
                       <p className="text-[10px] bg-slate-200 text-slate-600 px-3 py-1 rounded-full uppercase tracking-widest font-black mt-6">WebSocket Ready API</p>
                    </div>
                  </div>
               );
               
               case "notifications": return (
                  <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-8">Notifications</h1>
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-2">
                       {[
                         { icon: Gavel, color: 'text-orange-500 bg-orange-50', text: 'Artisan Woodworks submitted a bid of ₹45,000 for your Master Bedroom.', time: '2 hours ago' },
                         { icon: ImageIcon, color: 'text-teal-500 bg-teal-50', text: 'AI Design render for Living Room Redo complete.', time: '5 hours ago' },
                         { icon: MessageSquare, color: 'text-blue-500 bg-blue-50', text: 'New message from Luxe Interiors regarding fabric choices.', time: 'Yesterday' }
                       ].map((n, i) => (
                          <div key={i} className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border-b border-slate-50 last:border-0">
                             <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${n.color}`}>
                                <n.icon className="h-5 w-5" />
                             </div>
                             <div className="space-y-1 mt-1">
                                <p className="text-sm font-bold text-slate-800">{n.text}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{n.time}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                  </div>
               );
               
               case "profile": return (
                  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-300">
                    <div className="md:col-span-1 space-y-6">
                       <div className="bg-white p-8 rounded-[2rem] border border-slate-100 text-center flex flex-col items-center shadow-sm">
                          <div className="h-24 w-24 rounded-[2rem] bg-teal-600 text-white flex items-center justify-center font-black text-3xl shadow-lg ring-8 ring-teal-50 mb-6">JD</div>
                          <h2 className="text-xl font-black text-slate-900">John Doe</h2>
                          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Premium Homeowner</p>
                          <Button variant="outline" className="w-full mt-6 rounded-xl font-bold h-10 border-slate-200">Edit Profile</Button>
                       </div>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                       <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-teal-500/20 to-transparent blur-2xl pointer-events-none" />
                          <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10"><UserCircle className="h-6 w-6 text-teal-400" /> Your Design DNA</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                             <div className="bg-white/10 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <p className="text-[10px] uppercase font-black text-teal-300 tracking-widest mb-2">Primary Style</p>
                                <p className="text-lg font-black text-white">Modern Minimalist</p>
                                <div className="h-1.5 w-full bg-white/10 rounded-full mt-4 overflow-hidden"><div className="h-full bg-teal-400 w-[85%]" /></div>
                             </div>
                             <div className="bg-white/10 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <p className="text-[10px] uppercase font-black text-teal-300 tracking-widest mb-2">Secondary Style</p>
                                <p className="text-lg font-black text-white">Industrial Urban</p>
                                <div className="h-1.5 w-full bg-white/10 rounded-full mt-4 overflow-hidden"><div className="h-full bg-teal-400 w-[45%]" /></div>
                             </div>
                          </div>
                          <Button className="w-full mt-6 bg-white hover:bg-slate-50 text-slate-900 rounded-xl font-black h-12 text-sm shadow-xl shadow-black/20 relative z-10">Retake AI Style Quiz</Button>
                       </div>
                    </div>
                  </div>
               );
               
               case "budget": return (
                  <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Budget Tracker</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                       <div className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                          <p className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-2">Total Budget Allocated</p>
                          <h3 className="text-2xl lg:text-3xl font-black text-slate-900">₹ 8,50,000</h3>
                       </div>
                       <div className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                          <p className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-2">Total Spent</p>
                          <h3 className="text-2xl lg:text-3xl font-black text-slate-900">₹ 4,25,000</h3>
                       </div>
                       <div className="p-6 bg-teal-600 text-white rounded-[2rem] shadow-xl shadow-teal-500/10">
                          <p className="text-[10px] font-black tracking-widest uppercase text-teal-200 mb-2">Remaining Balance</p>
                          <h3 className="text-2xl lg:text-3xl font-black">₹ 4,25,000</h3>
                       </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                       <h3 className="text-xl font-black text-slate-900 mb-4">Spend by Project</h3>
                       {[
                         { name: "Living Room Redo", spent: 325000, max: 400000, pct: 81 },
                         { name: "Master Bedroom", spent: 100000, max: 450000, pct: 22 }
                       ].map((p,i) => (
                          <div key={i} className="space-y-3">
                             <div className="flex justify-between items-end">
                                <span className="font-bold text-sm text-slate-800">{p.name}</span>
                                <span className="text-xs font-black text-slate-500">₹{p.spent.toLocaleString()} / ₹{p.max.toLocaleString()}</span>
                             </div>
                             <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full transition-all duration-1000 ${p.pct > 80 ? 'bg-orange-500' : 'bg-teal-500'}`} style={{width: `${p.pct}%`}} />
                             </div>
                          </div>
                       ))}
                    </div>
                  </div>
               );
               
               case "orders": return (
                  <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-8">Order History</h1>
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-x-auto">
                       <table className="w-full text-left min-w-[600px]">
                          <thead className="bg-slate-50 border-b border-slate-100">
                             <tr>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Project / Item</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                             </tr>
                          </thead>
                          <tbody>
                             {[
                               { id: "#ORD-8942", date: "Oct 15, 2026", item: "Custom Velvet Sofa", amt: "45,000", status: "In Production", color: "text-blue-600 bg-blue-50" },
                               { id: "#ORD-8810", date: "Oct 02, 2026", item: "Living Room Base Package", amt: "2,80,000", status: "Delivered", color: "text-emerald-600 bg-emerald-50" }
                             ].map((o,i) => (
                                <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                   <td className="p-6 text-sm font-black text-slate-900">{o.id}</td>
                                   <td className="p-6 text-xs font-bold text-slate-500">{o.date}</td>
                                   <td className="p-6 text-sm font-bold text-slate-800">{o.item}</td>
                                   <td className="p-6 text-sm font-black text-slate-900">₹ {o.amt}</td>
                                   <td className="p-6">
                                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${o.color}`}>{o.status}</span>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                  </div>
               );
               
               default: return null;
            }
          })()}
        </div>
      </main>
    </div>
  );
}
