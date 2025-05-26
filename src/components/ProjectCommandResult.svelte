<script lang="ts">
	import type { Action } from "svelte/action";
    // ============
    // TODO: PROJECT RESULT SHOULD ONLY SHOW A ROW AT A TIME
    // ============

	import ProjectCard from "./ProjectCard.svelte";

    let { focusCommand }: { focusCommand: () => void } = $props();

    let projectsPromise = fetch("/projects/project_cards.json")
        .then(res => res.json());

    let focus: Action = (_) => {
        focusCommand();
    }
</script>
{#await projectsPromise}
    <p>Loading...</p>
{:then projects} 
    <section use:focus class="min-w-max">
        <p class="text-gray-900 dark:text-gray-50 text-2xl my-3 display:block">
            Found <span class="text-sky-300 font-bold">{projects["projects"].length}</span> projects...
        </p>

        <div class="grid grid-cols-[repeat(auto-fill,clamp(18em,23%,24.5em))] gap-3">
            {#each projects["projects"] as project, index}
                <ProjectCard project={project} key={index} />
            {/each}
        </div>
    </section>
{/await}