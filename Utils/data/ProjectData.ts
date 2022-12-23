export type Category = "js" | "react" | "python" | "java" | "static";

export interface IProject {
    id: string;
    priority?: number;
    name: string;
    date?: string;
    description: string;
    image_path: string;
    deployed_url: string | null;
    github_url: string;
    category: Category[];
    key_techs: string[];
}
