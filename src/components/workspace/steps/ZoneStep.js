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
  return <div className="flex flex-col h-full">
      <h2 className="font-display text-xl font-semibold mb-2">Zones & Budget</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Set budget for each detected zone.
      </p>

      <div className="space-y-4 flex-1">
        {zones.map((zone, i) => <div key={zone.name} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-accent-foreground">
                {ZONE_ICONS[zone.name] || ZONE_ICONS.bed}
              </div>
              <span className="text-sm font-medium capitalize">{zone.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">₹</span>
              <input type="range" min={1000} max={50000} step={1000} value={zone.budget} onChange={e => updateBudget(i, Number(e.target.value))} className="flex-1 accent-[hsl(var(--primary))]" />
              <span className="text-sm font-semibold w-16 text-right">
                ₹{(zone.budget / 1000).toFixed(0)}K
              </span>
            </div>
          </div>)}
      </div>

      <div className="mt-4 p-4 rounded-xl bg-accent/50 border border-primary/20">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total Budget</span>
          <span className="text-lg font-display font-bold text-foreground">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <button onClick={handleContinue} className="mt-4 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        Continue
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>;
};