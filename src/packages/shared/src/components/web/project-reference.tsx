"use client";

import * as React from "react";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "../../lib/utils";
import { ProjectType, PROJECTS } from "../../types/projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface ProjectReferenceProps {
  project: ProjectType;
  className?: string;
}

export function ProjectReference({
  project,
  className,
}: ProjectReferenceProps) {
  const projectInfo = PROJECTS[project];

  const handleGithubClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(projectInfo.github, "noopener,noreferrer");
  };

  return (
    <Card
      className={cn(
        "group hover:shadow-lg transition-all duration-200",
        className
      )}
    >
      <a
        href={projectInfo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer"
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
        <CardContent className="space-y-4">
          <CardDescription>{projectInfo.description}</CardDescription>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleGithubClick}
              className="text-xs h-8 px-3"
            >
              <Github className="w-3 h-3 mr-2" />
              GitHub
            </Button>
          </div>
        </CardContent>
      </a>
    </Card>
  );
}
