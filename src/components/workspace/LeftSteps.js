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
  return <div className="w-56 flex-shrink-0 bg-card border-r border-border p-6 flex flex-col">
      <h3 className="font-display text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-6">
        Steps
      </h3>
      <div className="space-y-1 flex-1">
        {visibleStages.map((stage, i) => {
        const stageIndex = STAGE_ORDER.indexOf(stage);
        const isCurrent = stage === project.stage;
        const isPast = stageIndex < currentIndex;
        return <div key={stage} className="relative flex items-center gap-3">
              {i < visibleStages.length - 1 && <div className={`absolute left-[15px] top-[32px] w-0.5 h-6 ${isPast ? "bg-primary" : "bg-border"}`} />}
              <motion.div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isCurrent ? "bg-primary text-primary-foreground" : isPast ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`} animate={isCurrent ? {
            scale: [1, 1.1, 1]
          } : {}} transition={{
            duration: 1.5,
            repeat: Infinity
          }}>
                {STAGE_ICONS[stage]}
              </motion.div>
              <span className={`text-sm font-medium ${isCurrent ? "text-foreground" : isPast ? "text-foreground/70" : "text-muted-foreground"}`}>
                {STAGE_LABELS[stage]}
              </span>
            </div>;
      })}
      </div>
    </div>;
};