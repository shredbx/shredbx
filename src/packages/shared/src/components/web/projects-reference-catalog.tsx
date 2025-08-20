"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { ProjectType, PROJECTS } from "../../types/projects";
import { ProjectReference } from "./project-reference";

interface ProjectsReferenceCatalogProps {
  currentProject?: ProjectType;
  className?: string;
  title?: string;
}

export function ProjectsReferenceCatalog({
  currentProject,
  className,
  title = "shredbx - eXperimental lab - projects",
}: ProjectsReferenceCatalogProps) {
  const projectsToShow = currentProject
    ? (Object.keys(PROJECTS).filter(
        (projectId) => projectId !== currentProject
      ) as ProjectType[])
    : (Object.keys(PROJECTS) as ProjectType[]);

  if (projectsToShow.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "w-full flex items-center justify-center px-4 py-8",
        className
      )}
    >
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>

        {/* Desktop: Horizontal scroll layout */}
        <div className="hidden lg:block">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent justify-center">
            {projectsToShow.map((project) => (
              <div key={project} className="flex-shrink-0 w-80">
                <ProjectReference project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical layout */}
        <div className="lg:hidden space-y-4">
          {projectsToShow.map((project) => (
            <ProjectReference key={project} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
