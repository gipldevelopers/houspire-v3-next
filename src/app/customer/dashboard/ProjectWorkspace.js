"use client";
import { ProjectProvider } from "@/context/ProjectContext";
import { LeftSteps } from "@/components/workspace/LeftSteps";
import { Canvas } from "@/components/workspace/Canvas";
import { RightPanel } from "@/components/workspace/RightPanel";
import { Bell, Search, User, Settings, HelpCircle, LogOut, ChevronDown, Sparkles } from "lucide-react";

const ProjectWorkspace = () => {
  return <ProjectProvider>
      <div className="dark h-screen flex flex-col bg-[#0f172a] text-slate-100 font-sans transition-colors duration-300">
        {/* Premium Top Navbar */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex-shrink-0 z-50 sticky top-0 shadow-sm">
          {/* Logo & Breadcrumbs */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-display font-black text-lg tracking-tighter">H</span>
              </div>
              <h1 className="font-display text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Houspire</h1>
            </div>
            
            <div className="hidden md:flex items-center h-8">
              <div className="w-px h-full bg-slate-200 dark:bg-slate-700 mx-2" />
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Living Room Redesign</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </div>
            </div>
          </div>

          {/* Right Header Navigation */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <div className="relative hidden lg:block group">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search catalog, styles..." 
                className="w-64 h-11 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-teal-500/50 rounded-full pl-10 pr-4 text-sm outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:shadow-[0_0_0_4px_rgba(20,184,166,0.1)] dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="relative w-11 h-11 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900" />
              </button>
              <button className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <HelpCircle className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

            {/* User Profile */}
            <div className="flex items-center gap-3 cursor-pointer p-1.5 pr-4 rounded-full border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 border border-white dark:border-slate-800 dark:bg-slate-700">
                <img src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=100&h=100&auto=format&fit=crop" alt="User Profile" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Sarah Miller</span>
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Premium Homeowner</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Main workspace */}
        <div className="flex-1 flex overflow-hidden">
          <LeftSteps />
          <Canvas />
          <RightPanel />
        </div>
      </div>
    </ProjectProvider>;
};
export default ProjectWorkspace;