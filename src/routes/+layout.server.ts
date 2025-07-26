import { base } from "$app/paths";
import type { LayoutServerLoad } from "./$types";

export const prerender = true;
export const trailingSlash = 'always';

export type Project = {
    name: string;
    id: string;
    img_name: string;
    technologies: string[];
    description: string,
    github_url?: string,
    start_date: string,
    end_date?: string
};

export type PersonalExperience = {
    title: string;
    description: string;
    start_date: string;
    end_date?: string;
    name: string;
};

async function getProjects(fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) {
    return fetch(`${base}/projects/project_cards.json`)
        .then((res) => res.json())
        .then((proj: [Project]) => {
            return new Map<string, Project>(proj.map(p => [p.id, p]));
        });
}

async function getExperiences(fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) {
    return fetch(`${base}/experiences/experiences.json`)
        .then((res) => res.json()) as Promise<[PersonalExperience]>

}
export const load: LayoutServerLoad = async ({ fetch }) => {
    return {
        projects: await getProjects(fetch),
        experiencese: await getExperiences(fetch)
    };
};
