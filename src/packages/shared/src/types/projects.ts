export type ProjectType = "shredbx" | "reactbook";

export interface ProjectInfo {
  id: ProjectType;
  name: string;
  url: string;
  description: string;
  logoPath: string;
}

export const PROJECTS: Record<ProjectType, ProjectInfo> = {
  shredbx: {
    id: "shredbx",
    name: "ShredBX",
    url: "https://shredbx.com",
    description: "The ultimate platform for extreme sports enthusiasts",
    logoPath: "https://shredbx.com/logo.png",
  },
  reactbook: {
    id: "reactbook",
    name: "ReactBook",
    url: "https://reactbook.shredbx.com",
    description: "Interactive React component documentation and examples",
    logoPath: "https://reactbook.shredbx.com/logo.png",
  },
  patternbook: {
    id: "patternbook",
    name: "PatternBook",
    url: "https://github.com/shredbx/shredbx/tree/main/src/packages/patternbook",
    description:
      "PatternBook is a catalog of proven solutions you have already built. Instead of re-inventing, you capture them once and reuse them across projects.",
    logoPath:
      "https://github.com/shredbx/shredbx/blob/main/src/packages/patternbook/logo.png?raw=true",
  },
} as const;
