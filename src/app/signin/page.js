"use client";

import { 
  Mail, Lock, ArrowRight, User, CheckCircle2, 
  ShieldCheck, Globe, Star,
  Facebook, Github, Chrome, Terminal,
  Eye, EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication logic
    setTimeout(() => {
      if (email === "vendor@houspire.com" && password === "password123") {
        toast.success("Successfully authenticated!");
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials", {
          description: "Please use the demo credentials provided below."
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      
      {/* LEFT SIDE: Marketing / Trust (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative p-16 flex-col justify-between overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 h-full w-2/3 bg-gradient-to-l from-teal-500/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        
        <div className="relative z-10 space-y-12">
           <Link href="/" className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-teal-500 flex items-center justify-center shadow-2xl shadow-teal-500/20">
                 <span className="text-white font-black text-2xl">H</span>
              </div>
              <div className="flex flex-col -gap-0.5">
                 <span className="text-white font-black text-2xl tracking-tighter">Houspire</span>
                 <span className="text-[10px] text-teal-400 font-black uppercase tracking-[0.3em]">Marketplace</span>
              </div>
           </Link>

           <div className="space-y-6 max-w-lg">
              <h1 className="text-5xl font-black text-white leading-tight tracking-tight">Discover the <span className="text-teal-400 italic underline decoration-teal-500/30 underline-offset-4">finest products</span> for every interior.</h1>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">Join India's most trusted B2B hub for architects, designers, and premium house vendors.</p>
           </div>

           <div className="grid grid-cols-2 gap-6 pt-12 border-t border-white/10">
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-teal-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-black uppercase tracking-widest leading-none">Verified Buyers</span>
                 </div>
                 <p className="text-slate-500 text-xs font-bold uppercase leading-relaxed tracking-wider">Connect with 2.4k+ active interior designers daily.</p>
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-orange-400">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-sm font-black uppercase tracking-widest leading-none">TrustSEAL Gold</span>
                 </div>
                 <p className="text-slate-500 text-xs font-bold uppercase leading-relaxed tracking-wider">Secure payments and verified business profiles only.</p>
              </div>
           </div>
        </div>

        <div className="relative z-10">
           <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 bg-teal-500/20 rounded-full flex items-center justify-center p-0.5">
                    <img src="https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=100&h=100&fit=crop" className="rounded-full h-full w-full object-cover" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs font-black text-white uppercase tracking-tighter italic">"Best B2B platform for my architectural firm in Mumbai!"</p>
                    <div className="flex items-center gap-1.5">
                       {[1,2,3,4,5].map(s => <Star key={s} className="h-2 w-2 text-orange-400 fill-orange-400" />)}
                       <span className="text-[10px] text-slate-400 font-black ml-1 uppercase">— Rajesh K. Interior Design Studio</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-10">
           <div className="space-y-4">
              <h2 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em] text-center">Authentication</h2>
              <h1 className="text-4xl font-black text-slate-900 text-center tracking-tight uppercase">Welcome <span className="text-teal-600">Back</span></h1>
              <p className="text-slate-400 text-center font-bold text-sm">Please enter your details to sign in</p>
           </div>

           <div className="space-y-8">
              <form onSubmit={handleSignIn} className="space-y-6">
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</label>
                       <div className="relative">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                          <Input 
                             type="email" 
                             required
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             placeholder="name@company.com" 
                             className="h-16 pl-14 rounded-2xl border-slate-200 focus-visible:ring-teal-500/20 focus-visible:border-teal-500 font-bold text-lg shadow-sm"
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
                       <div className="relative group/pass">
                          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within/pass:text-teal-600 transition-colors" />
                          <Input 
                             type={showPassword ? "text" : "password"} 
                             required
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             placeholder="Enter your password" 
                             className="h-16 pl-14 pr-14 rounded-2xl border-slate-200 focus-visible:ring-teal-500/20 focus-visible:border-teal-500 font-bold text-lg shadow-sm transition-all"
                          />
                          <button 
                             type="button"
                             onClick={() => setShowPassword(!showPassword)}
                             className="absolute right-5 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center text-slate-300 hover:text-teal-600 transition-colors focus:outline-none"
                          >
                             {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                       </div>
                       <div className="flex justify-end">
                          <button type="button" className="text-[10px] font-black text-teal-600 hover:underline uppercase tracking-widest">Forgot Password?</button>
                       </div>
                    </div>
                 </div>
                 <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-16 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black text-lg gap-2 shadow-2xl shadow-teal-500/20 transition-all flex items-center justify-center active:scale-95 group"
                 >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                         <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         <span>Authenticating...</span>
                      </div>
                    ) : (
                      <>Sign In <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></>
                    )}
                 </Button>
              </form>

              {/* Demo Credentials Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-teal-700">
                       <Terminal className="h-4 w-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest italic">Demo Terminal</span>
                    </div>
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                 </div>
                 <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                       <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Login ID</span>
                       <span className="text-xs font-bold text-slate-700 select-all">vendor@houspire.com</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Passcode</span>
                       <span className="text-xs font-bold text-slate-700 select-all">password123</span>
                    </div>
                 </div>
              </div>

              <div className="relative py-4 flex items-center justify-center">
                 <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                 </div>
                 <div className="relative bg-white px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Or continue with</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                 <button className="h-14 border-2 border-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all hover:border-slate-100 active:scale-95 shadow-sm">
                    <Chrome className="h-5 w-5 text-slate-400" />
                 </button>
                 <button className="h-14 border-2 border-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all hover:border-slate-100 active:scale-95 shadow-sm">
                    <Facebook className="h-5 w-5 text-slate-400" />
                 </button>
                 <button className="h-14 border-2 border-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all hover:border-slate-100 active:scale-95 shadow-sm">
                    <Github className="h-5 w-5 text-slate-400" />
                 </button>
              </div>
           </div>

           <div className="text-center space-y-4">
              <p className="text-sm font-bold text-slate-500">
                 New to Houspire? <Link href="/vendor-register" className="text-teal-600 hover:underline">Register as Vendor</Link>
              </p>
           </div>
        </div>
      </div>

    </div>
  );
}
