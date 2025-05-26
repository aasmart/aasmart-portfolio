<script lang="ts">
	import type { Action } from "svelte/action";
	import AboutCommandResult from "./AboutCommandResult.svelte";
	import ProjectCommandResult from "./ProjectCommandResult.svelte";
	import UnknownCommandResult from "./UnknownCommandResult.svelte";

    let { name, isLastCommand }: { name: string, isLastCommand: boolean } = $props();
    let commandName: HTMLParagraphElement;

    // I'm not sure how to correctly do this, but essentially this is duplicated
    // because awaits happen late, but some elements need to focus when the command is
    // bound.
    let requestFocus = () => {
        focusAction(commandName);
    };

    let focusAction: Action = (node: HTMLElement) => {
        if(node && isLastCommand) {
            node.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };
</script>

<div bind:this={commandName} use:focusAction>
    <p class="text-gray-900 dark:text-gray-50 text-2xl my-3">
        <span class="text-sky-400">❯</span> { name }
    </p>
    {#if name.toLocaleLowerCase() == "about"}
        <AboutCommandResult focusCommand={requestFocus}/>
    {:else if name.toLocaleLowerCase() == "projects"}
        <ProjectCommandResult focusCommand={requestFocus}/>
    {:else}
        <UnknownCommandResult name={name} focusCommand={requestFocus}/>
    {/if}
</div>