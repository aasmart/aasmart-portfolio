<script lang="ts">
	let { command, addToHistory }: { command: string; addToHistory: (cmd: string) => void } =
		$props();
</script>

<button
	class="transition-color whitespace-nowrap rounded-md border-2 border-blue-400 bg-transparent p-2
		font-bold text-gray-900 duration-150 hover:bg-sky-400 dark:text-gray-50"
	onclick={() => addToHistory(command)}
>
	$ {command}
</button>
