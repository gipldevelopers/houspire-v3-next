"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  UploadCloud, ArrowRight, Loader2, Sparkles, 
  Check, Maximize2, Repeat, ShoppingBag, 
  Gavel, Clock, ChevronLeft, Heart, Image as ImageIcon 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function DesignFlow() {
  const [step, setStep] = useState(1); // 1: Upload, 2: Loading, 3: Result, 4: Style, 5: Mode, 6: Browse/Auction
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingText, setLoadingText] = useState("Analyzing your room...");
  const [selectedMode, setSelectedMode] = useState(null);
  const [hoveredObject, setHoveredObject] = useState(null);
  
  // Auction specific
  const [auctionTime, setAuctionTime] = useState(3600); // 1 hour
  const [bids, setBids] = useState([]);

  // Mock Detected Objects
  const detectedObjects = [
    { id: "sofa", label: "Sofa", confidence: 94, x: 20, y: 50, w: 40, h: 30, color: "Neutral", material: "Fabric", style: "Modern" },
    { id: "table", label: "Coffee Table", confidence: 88, x: 35, y: 75, w: 20, h: 15, color: "Wood", material: "Oak", style: "Minimal" },
    { id: "lamp", label: "Floor Lamp", confidence: 92, x: 75, y: 30, w: 10, h: 50, color: "Gold", material: "Metal", style: "Luxury" }
  ];

  const catalogProducts = [
    { id: 1, name: "Minimalist Fabric Sofa", price: "₹ 45,000", vendor: "Luxe Furnishings", image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=400&auto=format&fit=crop", category: "sofa" },
    { id: 2, name: "Oak Wood Coffee Table", price: "₹ 15,000", vendor: "TimberCraft", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=400&auto=format&fit=crop", category: "table" },
    { id: 3, name: "Brass Floor Lamp", price: "₹ 8,500", vendor: "Lumina Studios", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=400&auto=format&fit=crop", category: "lamp" }
  ];

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const startAnalysis = () => {
    setStep(2);
    const texts = ["Detecting furniture...", "Understanding style...", "Mapping 3D space...", "Matching with marketplace..."];
    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(texts[i]);
      i++;
      if (i >= texts.length) {
        clearInterval(interval);
        setTimeout(() => setStep(3), 1000);
      }
    }, 1500);
  };

  const startAuction = () => {
    setStep(6);
    setSelectedMode("auction");
    // Simulate incoming bids
    setTimeout(() => {
      setBids(prev => [...prev, { id: 1, vendor: "ModernSpaces", price: "₹ 42,000", score: 9.2, product: "Linen Sofa" }]);
    }, 3000);
    setTimeout(() => {
      setBids(prev => [...prev, { id: 2, vendor: "TimberCraft", price: "₹ 12,000", score: 8.8, product: "Glass Table" }]);
    }, 6000);
  };

  // 1. UPLOAD SCREEN
  const renderUpload = () => (
    <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center space-y-4 mb-10">
         <h1 className="text-4xl font-black text-slate-900 uppercase">Upload Room Photo</h1>
         <p className="text-slate-500 font-medium">Upload a photo of your space to extract products and redesign using AI.</p>
      </div>

      <div className="border-2 border-dashed border-slate-200 rounded-[3rem] p-12 bg-white flex flex-col items-center justify-center text-center hover:border-teal-500/50 hover:bg-teal-50/50 transition-colors relative group">
        <input type="file" onChange={handleUpload} accept="image/jpeg, image/png, image/heic" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
        
        {selectedImage ? (
          <div className="w-full h-64 md:h-96 relative rounded-2xl overflow-hidden shadow-lg">
             <img src={selectedImage} alt="Room" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" className="text-white border-white bg-white/20 hover:bg-white hover:text-black">Replace Image</Button>
             </div>
          </div>
        ) : (
          <div className="space-y-6 flex flex-col items-center pointer-events-none">
            <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-xl transition-all">
              <UploadCloud className="h-8 w-8 text-teal-600" />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">Drag & Drop or Click to Upload</p>
              <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">JPG, PNG, HEIC up to 10MB</p>
            </div>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="mt-8 flex justify-center">
          <Button onClick={startAnalysis} className="h-16 px-12 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-teal-500/20 active:scale-95 transition-all gap-3">
             <Sparkles className="h-5 w-5" /> Analyze Room
          </Button>
        </div>
      )}
    </div>
  );

  // 2. LOADING SCREEN
  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in fade-in">
      <div className="relative">
        <div className="h-32 w-32 rounded-full border-4 border-slate-100 flex items-center justify-center relative overflow-hidden">
           {selectedImage && <img src={selectedImage} className="absolute inset-0 w-full h-full object-cover opacity-30" />}
           <Loader2 className="h-10 w-10 text-teal-600 animate-spin relative z-10" />
        </div>
        <div className="absolute -inset-4 bg-teal-500/20 rounded-full blur-xl animate-pulse" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">AI Vision Engine</h2>
        <p className="text-teal-600 font-bold uppercase tracking-widest text-sm animate-pulse">{loadingText}</p>
      </div>
    </div>
  );

  // 3. AI ANALYSIS RESULT
  const renderResult = () => (
    <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-8">
      <div className="lg:col-span-12 flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase">Room Analysis Complete</h1>
          <p className="text-sm font-medium text-slate-500">We detected {detectedObjects.length} primary furniture items.</p>
        </div>
        <Button onClick={() => setStep(4)} className="h-12 bg-slate-900 hover:bg-slate-800 text-white px-8 rounded-xl font-bold uppercase tracking-widest gap-2">
           Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* LEFT: Image with Bounding Boxes */}
      <div className="lg:col-span-7 bg-slate-200 rounded-[2rem] overflow-hidden relative shadow-inner aspect-[4/3]">
        <img src={selectedImage || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200"} className="w-full h-full object-cover" />
        
        {/* Draw bounding boxes */}
        {detectedObjects.map((obj) => (
          <div 
            key={obj.id}
            onMouseEnter={() => setHoveredObject(obj.id)}
            onMouseLeave={() => setHoveredObject(null)}
            className={`absolute border-2 transition-all duration-300 cursor-pointer flex items-center justify-center group ${hoveredObject === obj.id ? 'border-teal-500 bg-teal-500/20 z-10' : 'border-white/50 bg-white/10'}`}
            style={{ left: `${obj.x}%`, top: `${obj.y}%`, width: `${obj.w}%`, height: `${obj.h}%` }}
          >
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-lg transition-opacity ${hoveredObject === obj.id ? 'opacity-100' : 'opacity-0'}`}>
              {obj.label} • {obj.confidence}%
            </div>
            {hoveredObject === obj.id && (
               <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-teal-600 shadow-xl scale-in">
                  <Maximize2 className="h-4 w-4" />
               </div>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT: List of Products */}
      <div className="lg:col-span-5 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        {detectedObjects.map((obj) => (
          <div 
            key={obj.id}
            onMouseEnter={() => setHoveredObject(obj.id)}
            onMouseLeave={() => setHoveredObject(null)}
            className={`bg-white p-5 rounded-3xl border transition-all duration-300 ${hoveredObject === obj.id ? 'border-teal-500 shadow-xl scale-[1.02]' : 'border-slate-100 shadow-sm'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-lg text-slate-900 uppercase">{obj.label}</h3>
                  <Badge className="bg-emerald-50 text-emerald-600 border-0 text-[9px] uppercase font-black uppercase tracking-widest">{obj.confidence}% Match</Badge>
                </div>
                <p className="text-xs font-bold text-slate-400">Extracted from Room</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
               <div className="bg-slate-50 p-2 rounded-xl text-center">
                 <p className="text-[9px] uppercase font-black text-slate-400">Color</p>
                 <p className="text-xs font-bold text-slate-700">{obj.color}</p>
               </div>
               <div className="bg-slate-50 p-2 rounded-xl text-center">
                 <p className="text-[9px] uppercase font-black text-slate-400">Material</p>
                 <p className="text-xs font-bold text-slate-700">{obj.material}</p>
               </div>
               <div className="bg-slate-50 p-2 rounded-xl text-center">
                 <p className="text-[9px] uppercase font-black text-slate-400">Style</p>
                 <p className="text-xs font-bold text-slate-700">{obj.style}</p>
               </div>
            </div>

            <div className="flex gap-2">
               <Button className="flex-1 bg-teal-50 text-teal-700 hover:bg-teal-100 border-0 font-bold text-xs uppercase tracking-widest">Find Similar</Button>
               <Button variant="outline" className="flex-1 font-bold text-xs uppercase tracking-widest"><Repeat className="h-3 w-3 mr-2" /> Replace</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 4. DESIGN DNA / STYLE SELECTION
  const renderStyleSelection = () => (
    <div className="max-w-4xl mx-auto py-16 px-4 text-center animate-in fade-in zoom-in-95 duration-500">
      <Badge className="bg-teal-50 text-teal-600 border-teal-100 font-black uppercase tracking-[0.2em] mb-6 px-4 py-1.5">Design DNA</Badge>
      <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-4">Confirm Your Preferred Style</h2>
      <p className="text-slate-500 font-medium mb-12 max-w-lg mx-auto">Based on your room, we detected a modern minimalistic vibe. Would you like to keep this or explore a new direction?</p>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {['Modern Minimalist', 'Classic Luxury', 'Industrial', 'Bohemian'].map((style, i) => (
          <div key={i} onClick={() => setStep(5)} className={`aspect-square bg-white rounded-3xl border-2 p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-2xl transition-all duration-300 ${i === 0 ? 'border-teal-500 bg-teal-50/10 scale-105 shadow-xl' : 'border-slate-100 hover:border-teal-200'}`}>
            <div className={`h-16 w-16 rounded-full flex items-center justify-center ${i === 0 ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
               <Check className="h-8 w-8" />
            </div>
            <p className="font-black text-slate-900 uppercase text-sm">{style}</p>
            {i === 0 && <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded">AI Recommended</span>}
          </div>
        ))}
      </div>
    </div>
  );

  // 5. MODE SELECTION
  const renderModeSelection = () => (
    <div className="max-w-5xl mx-auto py-16 px-4 animate-in fade-in slide-in-from-bottom-8">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">How would you like to proceed?</h2>
        <p className="text-slate-500 font-medium">Choose between exploring verified products yourself or letting vendors compete for your project.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Browse Mode */}
        <div onClick={() => { setSelectedMode("browse"); setStep(6); }} className="bg-white rounded-[3rem] p-10 border-2 border-slate-100 hover:border-teal-500 hover:shadow-2xl transition-all cursor-pointer group flex flex-col items-center text-center">
           <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-teal-50 mb-8 transition-colors">
              <ShoppingBag className="h-10 w-10 text-slate-400 group-hover:text-teal-600" />
           </div>
           <h3 className="text-2xl font-black text-slate-900 uppercase mb-4">Browse Marketplace</h3>
           <p className="text-slate-500 font-medium leading-relaxed mb-8">View AI-matched products from our massive catalog of verified vendors and purchase directly.</p>
           <ul className="text-left space-y-3 w-full mb-8 bg-slate-50 p-6 rounded-2xl">
             <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><Check className="h-4 w-4 text-teal-500" /> Instant product matches</li>
             <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><Check className="h-4 w-4 text-teal-500" /> Apply budget filters</li>
             <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><Check className="h-4 w-4 text-teal-500" /> Save items to your room</li>
           </ul>
           <Button className="w-full h-14 bg-slate-900 text-white font-black uppercase tracking-widest rounded-2xl group-hover:bg-teal-600">Select Browse Mode</Button>
        </div>

        {/* Auction Mode */}
        <div onClick={startAuction} className="bg-slate-900 rounded-[3rem] p-10 border-2 border-slate-800 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 transition-all cursor-pointer group flex flex-col items-center text-center">
           <div className="absolute top-0 right-0 p-6 opacity-40 group-hover:opacity-100 transition-opacity">
              <Badge className="bg-orange-500 text-white border-0 text-[10px] uppercase font-black tracking-widest">Premium Choice</Badge>
           </div>
           <div className="h-24 w-24 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-orange-500/10 mb-8 transition-colors">
              <Gavel className="h-10 w-10 text-white group-hover:text-orange-400" />
           </div>
           <h3 className="text-2xl font-black text-white uppercase mb-4">Start Vendor Auction</h3>
           <p className="text-slate-400 font-medium leading-relaxed mb-8">Submit your room layout to our network of 3,200+ vendors and let them bid on your project.</p>
           <ul className="text-left space-y-3 w-full mb-8 bg-white/5 p-6 rounded-2xl">
             <li className="flex items-center gap-3 text-sm font-bold text-slate-300"><Check className="h-4 w-4 text-orange-400" /> Vendors pitch their products</li>
             <li className="flex items-center gap-3 text-sm font-bold text-slate-300"><Check className="h-4 w-4 text-orange-400" /> Competitive pricing models</li>
             <li className="flex items-center gap-3 text-sm font-bold text-slate-300"><Check className="h-4 w-4 text-orange-400" /> Specialized custom solutions</li>
           </ul>
           <Button className="w-full h-14 bg-white text-slate-900 font-black uppercase tracking-widest rounded-2xl group-hover:bg-orange-500 group-hover:text-white">Start Live Auction</Button>
        </div>
      </div>
    </div>
  );

  // 6. FINAL VIEW: BROWSE OR AUCTION
  const renderFinalView = () => {
    if (selectedMode === "browse") {
      return (
        <div className="max-w-7xl mx-auto py-8 px-4 animate-in fade-in">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
             <div>
               <h2 className="text-2xl font-black text-slate-900 uppercase">AI Matched Catalog</h2>
               <p className="text-sm font-medium text-slate-500">Filtered by: Modern Minimalist, Your Room Layout</p>
             </div>
             <div className="flex items-center gap-4">
                <Button variant="outline" className="font-bold uppercase tracking-widest text-xs h-10">Filters</Button>
                <Button onClick={() => setStep(7)} className="bg-teal-600 font-bold uppercase tracking-widest text-xs h-10">Save Project</Button>
             </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {catalogProducts.concat(catalogProducts).map((product, i) => (
              <div key={i} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden group hover:shadow-xl transition-all">
                 <div className="aspect-[4/5] overflow-hidden relative">
                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                       <Badge className="bg-white/90 text-slate-900 text-[9px] uppercase font-black uppercase tracking-widest border-0">Replaces {product.category}</Badge>
                    </div>
                    <div className="absolute -bottom-16 left-0 right-0 p-4 group-hover:bottom-0 transition-all duration-300 bg-gradient-to-t from-black/80 to-transparent">
                       <Button className="w-full bg-teal-600 hover:bg-teal-700 font-black uppercase text-xs">Preview in Room</Button>
                    </div>
                 </div>
                 <div className="p-5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{product.vendor}</p>
                    <h4 className="font-bold text-slate-900 text-sm mb-2">{product.name}</h4>
                    <p className="text-lg font-black text-slate-900">{product.price}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (selectedMode === "auction") {
      return (
        <div className="max-w-7xl mx-auto py-8 px-4 animate-in fade-in">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden mb-12">
             <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-[80px] rounded-full" />
             <div className="space-y-4 relative z-10 w-full md:w-1/2">
                <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-500/30">
                  <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" /> Live Bidding
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight">Your Room is Live</h2>
                <p className="text-slate-400 font-medium">Vendors are currently reviewing your AI-extracted room and placing bids with their best matching products.</p>
             </div>
             
             <div className="flex flex-col items-center justify-center relative z-10 bg-white/5 p-8 rounded-3xl border border-white/10 w-full md:w-auto min-w-[300px]">
                <Clock className="h-8 w-8 text-orange-400 mb-2" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Time Remaining</p>
                <p className="text-4xl font-black font-mono tracking-tighter">
                  00:59:{(auctionTime % 60).toString().padStart(2, '0')}
                </p>
             </div>
          </div>

          <div className="space-y-6">
             <h3 className="text-xl font-black text-slate-900 uppercase">Incoming Vendor Proposals ({bids.length})</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <AnimatePresence>
                 {bids.map((bid) => (
                   <motion.div 
                    key={bid.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="bg-white rounded-[2rem] border-2 border-orange-100 p-6 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all flex flex-col gap-6"
                  >
                     <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-orange-400 font-extrabold italic text-sm">{bid.vendor[0]}</div>
                           <p className="font-extrabold text-slate-900 text-sm uppercase">{bid.vendor}</p>
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-600 border-0 text-[10px] font-black uppercase tracking-widest">{bid.score}/10 Fit</Badge>
                     </div>
                     
                     <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Proposed Item</p>
                        <p className="font-bold text-slate-800">{bid.product}</p>
                        <p className="text-2xl font-black text-slate-900">{bid.price}</p>
                     </div>

                     <div className="flex gap-2 pt-4">
                        <Button className="flex-1 bg-orange-50 text-orange-600 hover:bg-orange-100 font-black uppercase text-[10px] tracking-widest h-12 shadow-none">View Render</Button>
                        <Button onClick={() => setStep(7)} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase text-[10px] tracking-widest h-12">Accept Bid</Button>
                     </div>
                   </motion.div>
                 ))}
               </AnimatePresence>
               
               {bids.length === 0 && (
                 <div className="col-span-full py-12 flex flex-col items-center justify-center text-center opacity-50">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-400 mb-4" />
                    <p className="text-sm font-bold uppercase tracking-widest">Waiting for vendors to pitch...</p>
                 </div>
               )}
             </div>
          </div>
        </div>
      );
    }
  };

  // 7. PROJECT KICKOFF AND CHECKOUT
  const renderCheckout = () => (
    <div className="max-w-4xl mx-auto py-16 px-4 animate-in fade-in slide-in-from-bottom-8">
      <div className="text-center mb-12">
        <Badge className="bg-emerald-50 text-emerald-600 border-0 font-black uppercase tracking-widest px-4 py-1.5 mb-6"><Check className="h-4 w-4 mr-2" /> Vendor Selected</Badge>
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Project Kickoff</h2>
        <p className="text-slate-500 font-medium">Review your order and start the manufacturing process.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl mb-8 flex flex-col md:flex-row gap-12">
         <div className="w-full md:w-1/3 aspect-[4/5] bg-slate-100 rounded-[2rem] overflow-hidden relative shadow-inner">
            <img src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500" className="w-full h-full object-cover mix-blend-multiply" />
         </div>
         <div className="flex-1 space-y-8">
            <div>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Winning Bid by Luxe Furnishings</p>
               <h3 className="text-2xl font-black text-slate-900 leading-tight uppercase">Minimalist Fabric Sofa</h3>
               <p className="text-sm font-bold text-teal-600 uppercase tracking-widest mt-1">Custom Built to Room Specs</p>
            </div>
            
            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl">
               <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                  <span>Manufacturing</span>
                  <span>₹ 45,000</span>
               </div>
               <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                  <span>Direct Delivery to Site</span>
                  <span className="text-emerald-500">Free</span>
               </div>
               <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="text-sm font-black uppercase tracking-widest text-slate-900">Total Project Cost</span>
                  <span className="text-2xl font-black text-slate-900">₹ 45,000</span>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 border border-slate-100 rounded-xl space-y-1 bg-white">
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 font-medium">Est. Delivery</p>
                  <p className="text-sm font-black text-slate-800">10-14 Business Days</p>
               </div>
               <div className="p-4 border border-slate-100 rounded-xl space-y-1 bg-white">
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 font-medium">Installation</p>
                  <p className="text-sm font-black text-slate-800">Included on Delivery</p>
               </div>
            </div>
         </div>
      </div>

      <div className="flex justify-center">
         <Button onClick={() => window.location.href='/customer/dashboard'} className="h-16 px-16 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-lg rounded-[1.5rem] shadow-xl shadow-slate-900/20 active:scale-95 transition-all">Confirm & Pay Deposit</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sticky top-0 z-50">
         <div className="flex items-center gap-4">
            <Link href={step === 1 ? "/customer/dashboard" : "#"} onClick={(e) => {
              if(step > 1) {
                e.preventDefault();
                setStep(step - 1);
              }
            }}>
               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ChevronLeft className="h-4 w-4" /></Button>
            </Link>
            <div className="flex items-center gap-2">
               <div className="h-6 w-6 rounded bg-teal-600 flex items-center justify-center text-white font-black text-[10px]">H</div>
               <span className="font-black text-slate-900 text-sm uppercase tracking-tight">Design Studio</span>
            </div>
         </div>
         
         <div className="hidden md:flex items-center gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map(s => (
              <div key={s} className="flex items-center">
                 <div className={`h-2 w-2 rounded-full transition-all ${step >= s ? 'bg-teal-500' : 'bg-slate-200'}`} />
                 {s < 7 && <div className={`w-8 h-px transition-all ${step > s ? 'bg-teal-500' : 'bg-slate-200'}`} />}
              </div>
            ))}
         </div>

         <div className="flex items-center gap-3">
            <Link href="/customer/dashboard"><Button variant="outline" className="h-8 text-[10px] uppercase font-bold tracking-widest px-4">Exit</Button></Link>
         </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {step === 1 && renderUpload()}
        {step === 2 && renderLoading()}
        {step === 3 && renderResult()}
        {step === 4 && renderStyleSelection()}
        {step === 5 && renderModeSelection()}
        {step === 6 && renderFinalView()}
        {step === 7 && renderCheckout()}
      </main>
    </div>
  );
}
