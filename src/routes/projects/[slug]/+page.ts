import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { base } from '$app/paths';

export const prerender = true;

const projectDir = `${base}/projects`;
const getMarkdown = (fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>, markdownFile: string) => {
    const projectUrl = `${projectDir}/${markdownFile}.md`;
    return fetch(projectUrl)
        .then((res) => res.text())
        .catch(() => error(404, 'Not found'));
}

export const load: PageLoad = async ({ fetch, params }) => {
    return {
        markdownFile: params.slug,
        markdown: await getMarkdown(fetch, params.slug)
    };
};
