import { useState } from "react";
import { useProject } from "@/context/ProjectContext";
import { ArrowRight, Bed, Sofa, Lamp, Armchair } from "lucide-react";
const ZONE_ICONS = {
  bed: <Bed className="w-5 h-5" />,
  sofa: <Sofa className="w-5 h-5" />,
  lighting: <Lamp className="w-5 h-5" />,
  chair: <Armchair className="w-5 h-5" />
};
const DEFAULT_BUDGETS = {
  bed: 20000,
  sofa: 15000,
  lighting: 5000,
  chair: 8000
};
export const ZoneStep = () => {
  const {
    project,
    setZones,
    setStage
  } = useProject();
  const [zones, setLocalZones] = useState(project.detectedObjects.map(name => ({
    name,
    budget: DEFAULT_BUDGETS[name] || 10000,
    icon: name
  })));
  const updateBudget = (index, budget) => {
    const updated = [...zones];
    updated[index] = {
      ...updated[index],
      budget
    };
    setLocalZones(updated);
  };
  const total = zones.reduce((s, z) => s + z.budget, 0);
  const handleContinue = () => {
    setZones(zones);
    setStage("MODE");
  };
  return <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="font-display text-2xl font-black text-slate-800 dark:text-white mb-2">Set Budgets</h2>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
        Allocate budgets for the detected zones to get tailored recommendations.
      </p>

      <div className="space-y-4 flex-1">
        {zones.map((zone, i) => <div key={zone.name} className="p-5 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-800/20 backdrop-blur-sm shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 shadow-sm flex items-center justify-center text-teal-600 dark:text-teal-400">
                  {ZONE_ICONS[zone.name] || ZONE_ICONS.bed}
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 capitalize">{zone.name}</span>
              </div>
              <span className="text-sm font-black text-teal-600 dark:text-teal-400">
                ₹{zone.budget.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center gap-4 px-1">
              <span className="text-xs font-bold text-slate-400">₹1K</span>
              <input type="range" min={1000} max={50000} step={1000} value={zone.budget} onChange={e => updateBudget(i, Number(e.target.value))} className="flex-1 accent-teal-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-teal-500/30" />
              <span className="text-xs font-bold text-slate-400">₹50K</span>
            </div>
          </div>)}
      </div>

      <div className="mt-6 p-5 rounded-[1.5rem] bg-slate-900 border border-slate-800 shadow-xl shadow-slate-900/10">
        <div className="flex justify-between items-center text-white">
          <span className="text-sm font-medium text-slate-400">Total Budget Strategy</span>
          <span className="text-xl font-display font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <button onClick={handleContinue} className="mt-4 w-full py-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-xl shadow-teal-500/20 active:scale-95 group">
        Proceed to Mode
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>;
};