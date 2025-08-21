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
import { AnimatedImage } from "./animated-image";

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
    window.open(projectInfo.github, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      className={cn(
        "group hover:shadow-lg transition-all duration-200 w-full h-full  flex flex-col",
        className
      )}
    >
      <a
        href={projectInfo.url}
        rel="noopener noreferrer"
        className="block cursor-pointer flex-1 flex-col"
      >
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AnimatedImage
                src={projectInfo.logoPath}
                gifSrc={projectInfo.logoGifPath}
                alt={`${projectInfo.name} logo`}
                className="w-16 h-16 object-contain"
                width={64}
                height={64}
              />
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {projectInfo.name}
              </CardTitle>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col ">
          <CardDescription
            className="flex-1 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              lineHeight: "1.4em",
              maxHeight: "4.2em",
            }}
          >
            {projectInfo.description}
          </CardDescription>

          <div className="flex justify-end items-end pt-4">
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
