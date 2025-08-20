export type ProjectType = "shredbx" | "reactbook" | "patternbook";

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
    description:
      "Experimental dev lab and monorepo — a living workspace for reusable patterns, tools, and projects",
    logoPath: "https://shredbx.com/logo.png",
  },
  reactbook: {
    id: "reactbook",
    name: "ReactBook",
    url: "https://reactbook.shredbx.com",
    description:
      "Interactive playground for React experiments, demos, and component patterns",
    logoPath: "https://reactbook.shredbx.com/logo.png",
  },
  patternbook: {
    id: "patternbook",
    name: "PatternBook",
    url: "https://github.com/shredbx/shredbx/tree/main/src/packages/patternbook",
    description:
      "Catalog of proven solutions — capture once, reuse everywhere. A recipe book for code and workflows",
    logoPath:
      "https://github.com/shredbx/shredbx/blob/main/src/packages/patternbook/logo.png?raw=true",
  },
} as const;
