"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, Image as ImageIcon, CheckCircle2, 
  MapPin, Clock, UploadCloud, Search, Check, Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const openRooms = [
  { id: 1, customer: "Ar. Mehta", location: "Mumbai", budget: "₹ 50,000", style: "Modern Minimalist", objects: ["Sofa", "Table"], time: "1h 45m" },
  { id: 2, customer: "Private Client", location: "Delhi", budget: "₹ 1,20,000", style: "Luxury Classic", objects: ["Dining Set", "Chandelier"], time: "3h 20m" },
  { id: 3, customer: "Studio Z", location: "Bangalore", budget: "₹ 35,000", style: "Industrial", objects: ["Lighting", "Decor"], time: "0h 50m" },
];

export default function VendorRoomsPanel() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [biddingStep, setBiddingStep] = useState(1); // 1: overview, 2: pitch
  const [pitchSent, setPitchSent] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Live Room Bidding</h2>
            <p className="text-sm text-slate-500 font-medium">Pitch your catalog directly into homeowner's AI-analyzed rooms.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Open Requests */}
        <div className="lg:col-span-5 space-y-6">
           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Available Rooms ({openRooms.length})</h3>
           
           <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
             {openRooms.map((room) => (
               <div 
                  key={room.id}
                  onClick={() => { setSelectedRoom(room); setBiddingStep(1); setPitchSent(false); }}
                  className={`bg-white rounded-[2rem] p-6 border-2 transition-all cursor-pointer group ${selectedRoom?.id === room.id ? 'border-orange-500 shadow-xl scale-[1.02]' : 'border-slate-100 hover:border-orange-200 shadow-sm'}`}
               >
                  <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-50">
                     <div className="flex gap-4 items-center">
                        <div className="h-12 w-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                           <ImageIcon className="h-6 w-6" />
                        </div>
                        <div>
                           <h4 className="font-extrabold text-slate-900 uppercase">{room.customer}</h4>
                           <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {room.location}
                           </p>
                        </div>
                     </div>
                     <Badge className="bg-slate-900 text-white border-0 text-[10px] font-black uppercase tracking-widest">{room.time} Left</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Req. Style</p>
                        <p className="text-xs font-bold text-slate-800">{room.style}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Budget Max</p>
                        <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">{room.budget}</p>
                     </div>
                     <div className="space-y-1 col-span-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">AI Extracted Objects</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                           {room.objects.map(obj => (
                             <span key={obj} className="bg-slate-50 px-2 py-1 rounded text-[10px] font-bold text-slate-600 border border-slate-100">
                               {obj}
                             </span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Right Side: Detailed Room Pitch View */}
        <div className="lg:col-span-7">
           {selectedRoom ? (
             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl sticky top-8 animate-in fade-in slide-in-from-right-8">
               
               {/* Header */}
               <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase">Project #{selectedRoom.id}</h3>
                    <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mt-1">AI Match Score: <span className="text-emerald-500 font-extrabold">92%</span></p>
                  </div>
                  {biddingStep === 2 && !pitchSent && (
                     <Button variant="outline" onClick={() => setBiddingStep(1)} className="font-bold uppercase text-[10px] tracking-widest">Back</Button>
                  )}
               </div>

               {/* Step 1: Overview */}
               <AnimatePresence mode="wait">
                 {biddingStep === 1 && (
                   <motion.div key="overview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="aspect-video bg-slate-900 rounded-3xl relative overflow-hidden group">
                         <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                         <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white font-black uppercase tracking-widest text-sm">Customer's Uploaded Room</p>
                            <p className="text-slate-300 font-medium text-xs">AI mapped 3 primary spaces for placement.</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                         {selectedRoom.objects.map(obj => (
                           <div key={obj} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                              <span className="text-xs font-black text-slate-900 uppercase mb-2">{obj}</span>
                              <Badge className="bg-emerald-100 text-emerald-700 border-0 font-black text-[9px] uppercase tracking-widest">In Catalog</Badge>
                           </div>
                         ))}
                      </div>

                      <Button onClick={() => setBiddingStep(2)} className="w-full h-16 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase text-sm tracking-widest rounded-[1.5rem] shadow-xl shadow-orange-500/20">
                        Create Render & Pitch
                      </Button>
                   </motion.div>
                 )}

                 {/* Step 2: Pitch & Submit */}
                 {biddingStep === 2 && !pitchSent && (
                   <motion.div key="pitch" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      
                      {/* Select Product to Pitch */}
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Select Your Product to Auto-Render</h4>
                         <div className="grid grid-cols-2 gap-4">
                            {[
                              { name: "Linen Modern Sofa", price: "₹ 38,000", image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=300" },
                              { name: "Oak Core Table", price: "₹ 15,000", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=300" }
                            ].map((prod, i) => (
                              <div key={i} className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${i === 0 ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-slate-300 bg-slate-50'}`}>
                                 <img src={prod.image} className="w-full h-24 object-cover rounded-xl mb-3 shadow-inner" />
                                 <p className="font-bold text-slate-900 text-xs truncate">{prod.name}</p>
                                 <p className="text-[10px] font-black text-orange-600 tracking-widest">{prod.price}</p>
                              </div>
                            ))}
                         </div>
                      </div>

                      {/* AI Re-Render Preview */}
                      <div className="bg-slate-900 p-6 rounded-3xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4">
                            <Badge className="bg-orange-500 text-white border-0 text-[9px] tracking-widest uppercase font-black"><Check className="h-3 w-3 mr-1" /> AI Rendered</Badge>
                         </div>
                         <h4 className="text-white font-black uppercase text-lg mb-2">Visual Preview</h4>
                         <p className="text-slate-400 font-medium text-xs mb-6 max-w-sm">Houspire AI has placed your selected product into the customer's room lighting and perspective.</p>
                         <div className="h-40 bg-slate-800 rounded-2xl relative border border-slate-700 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800" className="opacity-40 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                               <p className="bg-black/50 backdrop-blur text-white px-4 py-2 text-xs font-bold rounded-lg border border-white/10 uppercase tracking-widest">Final Overlay Preview</p>
                            </div>
                         </div>
                      </div>

                      <Button onClick={() => setPitchSent(true)} className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase text-sm tracking-widest rounded-[1.5rem] shadow-xl shadow-slate-900/20">
                        Submit To Homeowner
                      </Button>
                   </motion.div>
                 )}

                 {/* Step 3: Success */}
                 {pitchSent && (
                   <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-20 px-8">
                      <div className="h-24 w-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 animate-bounce shadow-xl shadow-emerald-500/20">
                         <Send className="h-10 w-10" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 uppercase">Pitch Dispatched!</h3>
                      <p className="text-slate-500 font-medium mt-4 max-w-sm">Your product render and pricing has been sent. The homeowner will notify you if selected.</p>
                      <Button variant="outline" onClick={() => setSelectedRoom(null)} className="mt-8 font-black uppercase text-xs tracking-widest h-14 px-8 rounded-2xl border-slate-200">View Other Rooms</Button>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
           ) : (
             <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-center min-h-[500px] p-12 opacity-60">
                <Search className="h-12 w-12 text-slate-300 mb-6" />
                <h3 className="text-2xl font-black text-slate-400 uppercase tracking-tight">Select a Live Room</h3>
                <p className="text-slate-400 font-medium text-sm mt-2 max-w-sm">Click on any available room on the left to analyze requirements and submit your visual pitch.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
