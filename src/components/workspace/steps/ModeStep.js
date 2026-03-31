import { useProject } from "@/context/ProjectContext";
import { motion } from "framer-motion";
import { ShoppingBag, Gavel } from "lucide-react";
export const ModeStep = () => {
  const {
    setMode,
    setStage
  } = useProject();
  const handleBrowse = () => {
    setMode("browse");
    setStage("BROWSE");
  };
  const handleAuction = () => {
    setMode("auction");
    setStage("AUCTION");
  };
  return <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="font-display text-2xl font-black text-slate-800 dark:text-white mb-2">Choose Plan</h2>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8">
        How would you like to source products for your new space?
      </p>

      <div className="flex-1 flex flex-col gap-4 justify-center">
        <motion.button whileHover={{
        scale: 1.02,
        y: -4
      }} whileTap={{
        scale: 0.98
      }} onClick={handleBrowse} className="p-8 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500/50 bg-white/50 dark:bg-slate-800/20 backdrop-blur-md shadow-lg shadow-slate-200/50 dark:shadow-black/20 hover:shadow-teal-500/10 text-left transition-all duration-300 group">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:scale-110 transition-all duration-300 shadow-sm border border-teal-100 dark:border-teal-500/20">
            <ShoppingBag className="w-7 h-7 text-teal-600 dark:text-teal-400 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-display text-xl font-bold mb-2 text-slate-800 dark:text-white">Direct Catalog</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Curate and preview premium products from our trusted vendor pool directly into your room.
          </p>
        </motion.button>

        <motion.button whileHover={{
        scale: 1.02,
        y: -4
      }} whileTap={{
        scale: 0.98
      }} onClick={handleAuction} className="p-8 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-500/50 bg-white/50 dark:bg-slate-800/20 backdrop-blur-md shadow-lg shadow-slate-200/50 dark:shadow-black/20 hover:shadow-violet-500/10 text-left transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[10px] uppercase font-black tracking-widest rounded-bl-xl z-10">Best Value</div>
          <div className="w-14 h-14 rounded-2xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center mb-6 group-hover:bg-violet-500 group-hover:scale-110 transition-all duration-300 shadow-sm border border-violet-100 dark:border-violet-500/20">
            <Gavel className="w-7 h-7 text-violet-600 dark:text-violet-400 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-display text-xl font-bold mb-2 text-slate-800 dark:text-white">Live Reverse Auction</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Let hundreds of certified vendors submit live competitive bids for your complete room setup.
          </p>
        </motion.button>
      </div>
    </div>;
};