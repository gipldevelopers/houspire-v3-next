"use client";

import { useState } from "react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogClose 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  CheckCircle2, X, Phone, User, MessageSquare, 
  Package, IndianRupee, MapPin, ShieldCheck, Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export function InquiryModal({ isOpen, onOpenChange, product }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Enquiry sent successfully!");
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden rounded-3xl border-0 shadow-2xl">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative"
            >
              {/* Header with Product Preview or General Header */}
              {product ? (
                <div className="bg-slate-900 p-6 flex items-center gap-4 text-white">
                   <div className="h-14 w-14 rounded-xl overflow-hidden bg-white/10 shrink-0 border border-white/20">
                      <img src={product.image} className="w-full h-full object-cover" alt={product.title} />
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400">Requesting latest price for</p>
                      <h3 className="text-sm font-black line-clamp-1 leading-none">{product.title}</h3>
                      <p className="text-[10px] text-white/50 font-bold flex items-center gap-1.5"><MapPin className="h-2.5 w-2.5" /> Distributed by {product.vendorName || product.vendor}</p>
                   </div>
                </div>
              ) : (
                <div className="bg-slate-900 p-8 text-white space-y-2 border-b border-white/5">
                   <h2 className="text-2xl font-black uppercase tracking-tighter">Business Inquiry Hub</h2>
                   <p className="text-[10px] font-black uppercase text-teal-400 tracking-[0.2em] leading-none">Global Sourcing • Trade Quotations • Project Support</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
                 <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mobile Number <span className="text-red-500">*</span></label>
                          <div className="relative">
                             <div className="absolute left-3 top-1/2 -translate-y-1/2 h-full flex items-center border-r pr-3 text-xs font-black text-slate-400">+91</div>
                             <Input 
                                required 
                                type="tel" 
                                placeholder="Phone number" 
                                className="h-12 pl-16 rounded-xl border-slate-200 focus:border-teal-500 font-bold"
                             />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Name</label>
                          <Input 
                             placeholder="Your Name" 
                             className="h-12 rounded-xl border-slate-200 focus:border-teal-500 font-bold"
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quantity Required</label>
                          <Input 
                             type="number" 
                             placeholder="Quantity" 
                             className="h-12 rounded-xl border-slate-200 focus:border-teal-500 font-bold"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unit</label>
                          <Select defaultValue="PCS">
                             <SelectTrigger className="h-12 rounded-xl border-slate-200 font-bold">
                                <SelectValue placeholder="Select Unit" />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="PCS">PCS</SelectItem>
                                <SelectItem value="Sets">Sets</SelectItem>
                                <SelectItem value="Units">Units</SelectItem>
                                <SelectItem value="Sq.ft">Sq.ft</SelectItem>
                                <SelectItem value="Kg">Kg</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Specific Requirements</label>
                       <Textarea 
                          placeholder="Please include details like material, size, or lead time needed..." 
                          className="min-h-[100px] rounded-xl border-slate-200 focus:border-teal-500 font-medium text-sm p-4 leading-relaxed"
                       />
                    </div>
                 </div>

                 <div className="flex items-center gap-3 bg-teal-50/50 p-4 rounded-xl border border-teal-100/50">
                    <ShieldCheck className="h-5 w-5 text-teal-600 shrink-0" />
                    <p className="text-[10px] font-bold text-teal-800 leading-tight">Your inquiry will be sent directly to the vendor's verified sales team for an immediate response.</p>
                 </div>

                 <Button 
                    disabled={isSubmitting} 
                    className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-black text-lg transition-all shadow-xl shadow-teal-500/20 active:scale-95"
                 >
                    {isSubmitting ? (
                       <span className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...
                       </span>
                    ) : "Get Best Price Now"}
                 </Button>

                 <p className="text-center text-[10px] text-slate-400 font-medium">By clicking submit, you agree to receive seller responses via call/SMS.</p>
              </form>
            </motion.div>
          ) : (
            <motion.div 
               key="success"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="p-12 text-center space-y-6 bg-white flex flex-col items-center"
            >
               <div className="h-24 w-24 bg-teal-50 rounded-full flex items-center justify-center mb-4 relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-full w-full bg-teal-50 rounded-full border-4 border-teal-100 flex items-center justify-center"
                  >
                     <CheckCircle2 className="h-12 w-12 text-teal-600" />
                  </motion.div>
                  <motion.div 
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 bg-teal-100 rounded-full -z-10"
                  />
               </div>
               
               <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Requirement Sent!</h2>
                  <p className="text-sm font-bold text-slate-500 max-w-xs mx-auto">The vendor will contact you shortly with the best pricing for your project.</p>
               </div>

               <Button 
                  onClick={() => {
                    setIsSuccess(false);
                    onOpenChange(false);
                  }}
                  className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black text-sm px-8"
               >
                  Done
               </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
