import { useProject } from "@/context/ProjectContext";
import { STAGE_ORDER, STAGE_LABELS } from "@/types/project";
import { motion } from "framer-motion";
import { Upload, Scan, Palette, MapPin, GitFork, ShoppingBag, Gavel, CheckCircle } from "lucide-react";
const STAGE_ICONS = {
  UPLOAD: <Upload className="w-4 h-4" />,
  ANALYSIS: <Scan className="w-4 h-4" />,
  DNA: <Palette className="w-4 h-4" />,
  ZONES: <MapPin className="w-4 h-4" />,
  MODE: <GitFork className="w-4 h-4" />,
  BROWSE: <ShoppingBag className="w-4 h-4" />,
  AUCTION: <Gavel className="w-4 h-4" />,
  FINAL: <CheckCircle className="w-4 h-4" />
};
export const LeftSteps = () => {
  const {
    project
  } = useProject();
  const currentIndex = STAGE_ORDER.indexOf(project.stage);

  // Filter out BROWSE or AUCTION depending on mode
  const visibleStages = STAGE_ORDER.filter(s => {
    if (s === "BROWSE" && project.mode === "auction") return false;
    if (s === "AUCTION" && project.mode === "browse") return false;
    if (s === "BROWSE" && !project.mode && project.stage !== "BROWSE") return true;
    if (s === "AUCTION" && !project.mode && project.stage !== "AUCTION") return true;
    return true;
  });
  return <div className="w-72 flex-shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-800/60 p-8 flex flex-col shadow-sm relative z-10 transition-colors duration-300">
      <h3 className="font-display text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8">
        Steps
      </h3>
      <div className="space-y-1 flex-1">
        {visibleStages.map((stage, i) => {
        const stageIndex = STAGE_ORDER.indexOf(stage);
        const isCurrent = stage === project.stage;
        const isPast = stageIndex < currentIndex;
        return <div key={stage} className="relative flex items-center gap-4 mb-4">
              {i < visibleStages.length - 1 && <div className={`absolute left-[19px] top-[40px] w-0.5 h-8 transition-colors duration-500 ${isPast ? "bg-teal-500" : "bg-slate-200 dark:bg-slate-800"}`} />}
              <motion.div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-sm ${isCurrent ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-teal-500/20 scale-110" : isPast ? "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"}`} animate={isCurrent ? {
            boxShadow: ["0px 0px 0px rgba(20,184,166,0)", "0px 0px 15px rgba(20,184,166,0.3)", "0px 0px 0px rgba(20,184,166,0)"]
          } : {}} transition={{
            duration: 2,
            repeat: Infinity
          }}>
                {STAGE_ICONS[stage]}
              </motion.div>
              <span className={`text-sm font-bold tracking-wide transition-colors duration-300 ${isCurrent ? "text-slate-900 dark:text-white" : isPast ? "text-slate-600 dark:text-slate-300" : "text-slate-400 dark:text-slate-600"}`}>
                {STAGE_LABELS[stage]}
              </span>
            </div>;
      })}
      </div>
    </div>;
};