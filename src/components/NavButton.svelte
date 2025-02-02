<script lang="ts">
    let { command, terminalHistory = $bindable() }: { command: string, terminalHistory: string[] } = $props();

    function addToHistory() {
        terminalHistory.push(command);
    }
</script>

<button class="bg-gray-50 rounded-md p-1" onclick={addToHistory}>
    $ { command }
</button>