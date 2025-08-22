"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { ProjectType, PROJECTS } from "@shredbx/core";
import { ProjectReference } from "./project-reference";

interface ProjectsReferenceCatalogProps {
  currentProject?: ProjectType;
  className?: string;
  title?: string;
}

export function ProjectsReferenceCatalog({
  currentProject,
  className,
  title = "ShredBX — eXperimental Open Source Lab",
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
    <div className={cn("w-full flex px-4 py-8", className)}>
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>

        {/* Desktop: Horizontal scroll layout */}
        <div className="hidden md:block w-full">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent justify-start">
            {projectsToShow.map((project) => (
              <div key={project} className="min-h-48">
                <ProjectReference project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical layout */}
        <div className="block md:hidden w-full space-y-4 px-4">
          {projectsToShow.map((project) => (
            <ProjectReference key={project} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
