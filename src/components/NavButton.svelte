<script lang="ts">
    let { command, terminalHistory = $bindable() }: { command: string, terminalHistory: string[] } = $props();

    function addToHistory() {
        terminalHistory.push(command);
    }
</script>

<button class="bg-transparent border-sky-300 border-2 hover:bg-sky-400 transition-color duration-150 rounded-md text-gray-900 dark:text-gray-50 p-2 font-bold" onclick={addToHistory}>
    $ { command }
</button>