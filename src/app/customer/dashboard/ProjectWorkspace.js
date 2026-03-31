"use client";
import { ProjectProvider } from "@/context/ProjectContext";
import { LeftSteps } from "@/components/workspace/LeftSteps";
import { Canvas } from "@/components/workspace/Canvas";
import { RightPanel } from "@/components/workspace/RightPanel";
const ProjectWorkspace = () => {
  return <ProjectProvider>
      <div className="h-screen flex flex-col bg-background">
        {/* Top Bar */}
        <header className="h-14 flex items-center px-6 border-b border-border bg-card flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xs">H</span>
            </div>
            <h1 className="font-display text-base font-semibold">Houspire</h1>
          </div>
          <div className="ml-6 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
            Living Room Redesign
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