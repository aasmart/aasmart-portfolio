import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;
export const load: PageLoad = async ({ params }) => {
    return {
        markdownFile: params.slug
    }
};
