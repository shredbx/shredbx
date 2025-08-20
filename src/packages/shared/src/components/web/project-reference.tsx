"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "../../lib/utils";
import { ProjectType, PROJECTS } from "../../types/projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ProjectReferenceProps {
  project: ProjectType;
  className?: string;
}

export function ProjectReference({
  project,
  className,
}: ProjectReferenceProps) {
  const projectInfo = PROJECTS[project];

  return (
    <Card
      className={cn(
        "group hover:shadow-lg hover:scale-[1.15] transition-all duration-200 cursor-pointer",
        className
      )}
    >
      <a
        href={projectInfo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={projectInfo.logoPath}
                alt={`${projectInfo.name} logo`}
                className="w-8 h-8 object-contain"
              />
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {projectInfo.name}
              </CardTitle>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>{projectInfo.description}</CardDescription>
        </CardContent>
      </a>
    </Card>
  );
}
