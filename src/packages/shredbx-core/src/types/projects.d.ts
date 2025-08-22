export type ProjectType = "shredbx" | "reactbook" | "patternbook" | "dynamic_forms" | "bestays";
export interface ProjectInfo {
    id: ProjectType;
    name: string;
    url: string;
    description: string;
    logoPath: string;
    logoGifPath?: string | undefined;
    github?: string | undefined;
}
export declare const PROJECTS: Record<ProjectType, ProjectInfo>;
//# sourceMappingURL=projects.d.ts.map