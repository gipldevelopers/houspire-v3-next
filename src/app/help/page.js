"use client";

import { 
  Search, HelpCircle, ShoppingBag, Store, 
  CreditCard, ShieldCheck, ChevronRight, MessageCircle, 
  Phone, Mail, FileText, Zap, User, Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion } from "framer-motion";

const HelpCategory = ({ icon: Icon, title, description, count }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-teal-500/30 hover:shadow-2xl transition-all group cursor-pointer"
  >
    <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors">
      <Icon className="h-7 w-7" />
    </div>
    <div className="space-y-2">
      <h3 className="text-lg font-black text-slate-900 leading-tight uppercase tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">{description}</p>
    </div>
    <div className="mt-6 flex items-center justify-between">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{count} Articles</span>
      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-teal-600 transition-colors" />
    </div>
  </motion.div>
);

const FAQItem = ({ question }) => (
  <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-50 hover:border-teal-100 transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="h-8 w-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-teal-600 group-hover:bg-teal-50 transition-colors font-black text-xs">?</div>
      <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">{question}</span>
    </div>
    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-teal-600" />
  </div>
);

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-500/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-orange-500/10 to-transparent pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-teal-500/30">
              <HelpCircle className="h-3.5 w-3.5" /> Houspire Help Center
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">How can we <span className="text-teal-400">help you</span> today?</h1>
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">Search our knowledge base or browse categories below to find answers to your questions.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
            <Input 
              placeholder="Search for articles, keywords, or topics..."
              className="h-16 pl-16 pr-8 bg-white/5 border-white/10 text-white rounded-2xl text-lg focus-visible:ring-teal-500/50 placeholder:text-slate-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-4 bg-slate-50/50">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.3em]">Knowledge Base</h2>
            <p className="text-3xl font-black text-slate-900 uppercase">Browse categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HelpCategory 
              icon={ShoppingBag} 
              title="Buying" 
              description="Learn how to find products, verify sellers, and place inquiries."
              count={24}
            />
            <HelpCategory 
              icon={Store} 
              title="Selling" 
              description="Manage your store, add products, and respond to buyer leads."
              count={38}
            />
            <HelpCategory 
              icon={CreditCard} 
              title="Payments" 
              description="Understanding invoicing, safe payments, and refund policies."
              count={12}
            />
            <HelpCategory 
              icon={ShieldCheck} 
              title="Trust & Safety" 
              description="Reporting violations, TrustSEAL verification, and security."
              count={15}
            />
          </div>
        </div>
      </section>

      {/* Popular FAQs Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl space-y-12">
          <div className="flex items-end justify-between border-b-4 border-slate-100 pb-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Frequent Questions</h2>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Top picks from our support team</p>
            </div>
            <Link href="#" className="text-xs font-black text-teal-600 hover:underline uppercase tracking-widest">View All</Link>
          </div>

          <div className="space-y-4">
            <FAQItem question="How do I contact a seller directly?" />
            <FAQItem question="What is TrustSEAL and how do I get it?" />
            <FAQItem question="How to add multiple products to my catalog?" />
            <FAQItem question="Are my payments protected by Houspire?" />
            <FAQItem question="How to manage leads effectively from the dashboard?" />
            <FAQItem question="What should I do if a seller is not responding?" />
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-teal-600 rounded-[3rem] p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
            <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 h-48 w-48 bg-black/10 rounded-full -ml-24 -mb-24" />
            
            <div className="space-y-6 relative z-10 text-center lg:text-left">
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-white leading-tight tracking-tight">Still need help?</h2>
                <p className="text-teal-50 font-medium text-lg max-w-md">Our support team is available 24/7 to assist you with any inquiries or issues.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Button className="h-14 px-8 bg-white text-teal-700 hover:bg-teal-50 rounded-2xl font-black flex items-center gap-2 shadow-xl">
                  <MessageCircle className="h-5 w-5 fill-teal-700" /> Start Chat
                </Button>
                <Button variant="outline" className="h-14 px-8 border-white/30 text-white hover:bg-white/10 rounded-2xl font-black flex items-center gap-2">
                  <Phone className="h-5 w-5" /> Call Support
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10 shrink-0">
               {[
                 { label: "Phone", value: "+91 800 123 4567", icon: Phone },
                 { label: "Email", value: "support@houspire.com", icon: Mail },
                 { label: "WhatsApp", value: "+91 999 888 7777", icon: MessageCircle },
                 { label: "Documents", value: "Help Guide (PDF)", icon: FileText },
               ].map((contact) => (
                 <div key={contact.label} className="bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-2 min-w-[200px]">
                    <contact.icon className="h-5 w-5 text-teal-300" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-teal-200 opacity-60">{contact.label}</p>
                    <p className="text-xs font-black text-white">{contact.value}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer Credits */}
      <footer className="py-12 text-center border-t border-slate-50 overflow-hidden">
         <div className="container mx-auto space-y-4">
            <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Houspire Help Center • Version 2.0</p>
         </div>
      </footer>
    </div>
  );
}
