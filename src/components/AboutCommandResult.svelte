<script lang="ts">
	import type { Action } from "svelte/action";

    let { focusCommand }: { focusCommand: () => void } = $props();
    $effect(() => {
        focusCommand();
    });
    let focus: Action = (_) => {
        focusCommand();
    };
</script>

<section use:focus class="flex flex-row gap-4 border-2 border-sky-300 rounded-md p-2 w-max animate-grow-fade-in">
    {focusCommand()}
    <img class="rounded-md shadow-lg" src={"/dog.jpg"} alt="e">
    <div class="flex flex-col dark:text-gray-50 h-auto">
        <h2 class="text-2xl font-bold">Alexander Smart</h2>
        <h3 class="dark:text-gray-100 text-xl">Software Engineer</h3>
        <hr class="border-1 rounded-full my-1"/>
        <p>Hi! <span>👋</span> I'm currently an undergraduate student at the University of Michigan -- Ann Arbor.</p>
        <ul class="flex flex-row gap-3 text-4xl text-sky-300 mt-auto">
            <li>
                <a href="https://github.com/aasmart" aria-label="LinkedIn">
                    <i class="fa-brands fa-github"></i>
                </a>
            </li>
            <li>
                <a href="https://linkedin.com/in/aasmart" aria-label="Github">
                    <i class="fa-brands fa-linkedin"></i>
                </a>
            </li>
        </ul>
    </div>
</section>