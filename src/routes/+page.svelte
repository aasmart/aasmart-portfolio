<script lang="ts">
	import Command from "../components/Command.svelte";
	import CommandInput from "../components/CommandInput.svelte";
    // let counter = $state(0);
    // let effect = $state(false);

    // let idk = $derived.by((): string[] => {
    //     let text: string[] = [];
    //     for(let i = 1; i <= Math.floor(counter / 10); ++i) {
    //         text.push(`Wow, you clicked the button ${i * 10} times!`)
    //     }
    //     return text
    // })

    // function buttonClick() {
    //     ++counter;
    //     effect = true;
    // }
    import NavButton from "../components/NavButton.svelte";
    import PromptArrow from "../components/PromptArrow.svelte";
	import UnknownCommandResult from "../components/UnknownCommandResult.svelte";

    let terminalHistory: string[] = $state([]);

    let terminalInput = $state("");
    function submitTerminalInput(e: KeyboardEvent) {
        const key = e.code || e.key;
        if(key == "Enter") {
            terminalHistory.push(terminalInput);
            terminalInput = "";
        }
    }
</script>

<!-- <div class="flex justify-center items-center flex-col outline-4 h-dvh gap-4">
    <button 
        class="{ effect && "animate-wiggle-enlarge" } bg-blue-200 rounded-lg p-4 hover:bg-blue-300 transition-colors shadow-md" 
        onclick={ buttonClick }
        onanimationend={() => effect = false}
    >
        Pressed the button <span class="font-bold">{counter}</span> times
    </button>

    <ol class="text-white list-decimal">
    {#each idk as str }
        <li>{str}</li>
    {/each}
    </ol>
</div> -->

<header>
    <nav>
        <div class="sticky flex flex-row items-center h-12 gap-4">
            <h1 class="text-gray-900 dark:text-gray-50 text-4xl"><span class="text-sky-400">❯</span> aasmart</h1>
        </div>
        <ul class="flex flex-row gap-2">
            <NavButton command={"about"} bind:terminalHistory={terminalHistory}/>
            <NavButton command={"projects"} bind:terminalHistory={terminalHistory}/>
            <NavButton command={"experience"} bind:terminalHistory={terminalHistory}/>
        </ul>
    </nav>
</header>

<ul>
    {#each terminalHistory as history}
        <li class="my-2">
            <Command name={history}/>
        </li>
    {/each}
    <li class="my-2">
        <CommandInput class="dark:text-gray-50 text-2xl" bind:commandText={terminalInput} submitCommand={submitTerminalInput}/>
    </li>
</ul>

<style>
</style>