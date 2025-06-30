<script lang="ts">
	let { command, terminalHistory = $bindable() }: { command: string; terminalHistory: string[] } =
		$props();

	function addToHistory() {
		terminalHistory.push(command);
	}
</script>

<button
	class="transition-color rounded-md border-2 border-blue-400 bg-transparent p-2 font-bold text-gray-900 duration-150 hover:bg-sky-400 dark:text-gray-50"
	onclick={addToHistory}
>
	$ {command}
</button>

