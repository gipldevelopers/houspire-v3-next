"use client";

import { 
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  LogIn, UserPlus, ShoppingBag, Store, 
  Mail, Phone, ArrowRight, ShieldCheck, 
  MapPin, CheckCircle2, Star, Chrome, Facebook
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function AuthModal({ isOpen, onOpenChange, defaultTab = "user" }) {
  const [method, setMethod] = useState("phone"); // phone or email

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-[2.5rem] border-0 shadow-2xl">
        <div className="flex flex-col md:flex-row h-full min-h-[600px]">
          
          {/* Left Side: Illustration / Trust (Desktop) */}
          <div className="hidden md:flex md:w-5/12 bg-slate-900 p-10 flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-teal-500/10 to-transparent pointer-events-none" />
             
             <div className="relative z-10 space-y-8">
                <div className="h-12 w-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                   <ShieldCheck className="h-7 w-7 text-white" />
                </div>
                <div className="space-y-4">
                   <h2 className="text-3xl font-black text-white leading-tight tracking-tight uppercase">Join India's <span className="text-teal-400 italic">Largest</span> Interior Hub</h2>
                   <p className="text-slate-400 text-sm font-medium leading-relaxed">Access 2.4K+ verified vendors and exclusive trade pricing for architectural projects.</p>
                </div>
                
                <div className="space-y-4 pt-8 border-t border-white/10">
                   {[
                     { text: "Verified Buyer Network", icon: CheckCircle2 },
                     { text: "Secure B2B Payments", icon: ShieldCheck },
                     { text: "Top House Vendors", icon: Star }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 text-white/70">
                        <item.icon className="h-4 w-4 text-teal-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.text}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="relative z-10 mt-auto pt-10">
                <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                   <p className="text-[10px] text-teal-200 font-black italic">"Houspire transformed how we source luxury furniture for our Mumbai projects."</p>
                </div>
             </div>
          </div>

          {/* Right Side: Tabs / Forms */}
          <div className="flex-1 p-8 md:p-12 bg-white flex flex-col">
             <Tabs defaultValue={defaultTab} className="w-full flex-1 flex flex-col">
                <TabsList className="grid grid-cols-2 h-14 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 mb-10">
                   <TabsTrigger value="user" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-teal-600">
                      I'm a Buyer
                   </TabsTrigger>
                   <TabsTrigger value="vendor" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-teal-600">
                      I'm a Vendor
                   </TabsTrigger>
                </TabsList>

                <TabsContent value="user" className="flex-1 flex flex-col space-y-8 mt-0 border-0 outline-none">
                   <div className="space-y-2">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">User Sign In</h3>
                      <p className="text-sm text-slate-400 font-bold">Access your inquiries and saved products.</p>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-4">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mobile Number</Label>
                            <div className="relative group">
                               <div className="absolute left-4 top-1/2 -translate-y-1/2 border-r pr-3 h-1/2 flex items-center text-sm font-black text-teal-600">+91</div>
                               <Input placeholder="Enter mobile number" className="h-14 pl-16 rounded-2xl border-slate-200 focus:border-teal-500 font-bold" />
                            </div>
                         </div>
                         <Button className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black text-base shadow-xl shadow-teal-500/10">
                            Get OTP <ArrowRight className="h-4 w-4 ml-2" />
                         </Button>
                      </div>

                      <div className="relative py-4 flex items-center justify-center">
                         <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-50"></div></div>
                         <span className="relative bg-white px-4 text-[10px] font-black uppercase tracking-widest text-slate-300">Or continue with</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <Button variant="outline" className="h-12 rounded-xl border-slate-100 font-black text-[10px] gap-2 uppercase tracking-widest hover:bg-slate-50 transition-all">
                            <Chrome className="h-4 w-4" /> Google
                         </Button>
                         <Button variant="outline" className="h-12 rounded-xl border-slate-100 font-black text-[10px] gap-2 uppercase tracking-widest hover:bg-slate-50 transition-all">
                            <Facebook className="h-4 w-4" /> Facebook
                         </Button>
                      </div>
                   </div>
                </TabsContent>

                <TabsContent value="vendor" className="flex-1 flex flex-col space-y-8 mt-0 border-0 outline-none">
                   <div className="space-y-2">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Grow your Business</h3>
                      <p className="text-sm text-slate-400 font-bold">Sign in or register to reach 2.4M buyers.</p>
                   </div>

                   <div className="grid grid-cols-1 gap-4">
                      <div className="bg-teal-50/50 p-6 rounded-[2rem] border border-teal-100/50 space-y-4">
                         <div className="space-y-1">
                            <h4 className="text-sm font-black text-teal-900 uppercase">Already a Seller?</h4>
                            <p className="text-[10px] text-teal-700 font-bold">Access your vendor dashboard and manage leads.</p>
                         </div>
                         <Link href="/signin">
                            <Button className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-black text-xs uppercase tracking-widest mt-2" onClick={() => onOpenChange(false)}>
                               Login to Dashboard
                            </Button>
                         </Link>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
                         <div className="space-y-1">
                            <h4 className="text-sm font-black text-slate-900 uppercase">New to Houspire?</h4>
                            <p className="text-[10px] text-slate-400 font-bold">Start selling your interior products today.</p>
                         </div>
                         <Link href="/vendor-register">
                            <Button variant="outline" className="w-full h-12 border-slate-200 text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest mt-2 hover:bg-white" onClick={() => onOpenChange(false)}>
                               Vendor Registration
                            </Button>
                         </Link>
                      </div>
                   </div>
                </TabsContent>
             </Tabs>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
