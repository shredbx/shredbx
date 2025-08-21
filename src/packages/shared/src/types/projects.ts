export type ProjectType =
  | "shredbx"
  | "reactbook"
  | "patternbook"
  | "dynamic_forms";

export interface ProjectInfo {
  id: ProjectType;
  name: string;
  url: string;
  description: string;
  logoPath: string;
  logoGifPath: string;
  github: string;
}

export const PROJECTS: Record<ProjectType, ProjectInfo> = {
  shredbx: {
    id: "shredbx",
    name: "ShredBX",
    url: "https://shredbx.com",
    github: "https://github.com/shredbx/shredbx",
    description:
      "Experimental dev lab and monorepo — a living workspace for reusable patterns, tools, and projects",
    logoPath: "https://shredbx.com/references/logo-shredbx.png",
    logoGifPath: "https://shredbx.com/references/logo-shredbx-animated.gif",
  },
  reactbook: {
    id: "reactbook",
    name: "ReactBook",
    url: "https://reactbook.shredbx.com",
    github:
      "https://github.com/shredbx/shredbx/tree/main/src/apps/reactbook-web",
    description:
      "Interactive playground for React experiments, demos, and component patterns",
    logoPath: "https://shredbx.com/references/logo-reactbook.png",
    logoGifPath: "https://shredbx.com/references/logo-reactbook-animated.gif",
  },
  patternbook: {
    id: "patternbook",
    name: "PatternBook",
    url: "https://github.com/shredbx/shredbx/tree/main/src/packages/patternbook",
    github:
      "https://github.com/shredbx/shredbx/tree/main/src/packages/patternbook",
    description:
      "Catalog of proven solutions — capture once, reuse everywhere. A recipe book for code and workflows",
    logoPath: "https://shredbx.com/references/logo-patternbook.png",
    logoGifPath: "https://shredbx.com/references/logo-patternbook-animated.gif",
  },
  dynamic_forms: {
    id: "dynamic_forms",
    name: "Dynamic Forms",
    url: "https://ex-nextjs-zustand-dynamic-forms-demo.vercel.app/en",
    github: "https://github.com/shredbx/ex-nextjs-zustand-dynamic-forms-demo",
    description: "Dynamic forms with Next.js, Zustand, and React Hook Form",
    logoPath: "https://shredbx.com/references/logo-dynamic-forms.png",
    logoGifPath:
      "https://shredbx.com/references/logo-dynamic-forms-animated.gif",
  },
} as const;
