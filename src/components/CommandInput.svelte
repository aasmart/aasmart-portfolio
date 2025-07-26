<script lang="ts">
	let {
		submitCommand,
		commandText = $bindable(),
		...props
	}: {
		submitCommand: (event: KeyboardEvent) => void;
		commandText: string;
		[x: string]: unknown;
	} = $props();
</script>

<div {...props} class="flex flex-row items-center bg-light-bg dark:bg-gray-bg {props.class ?? ''}">
	<span class="mr-2 text-neutral-400">~/</span>
	<span class="mr-1 text-blue-400">❯</span>
	<input
		type="text"
		bind:value={commandText}
		onkeypress={(e) => submitCommand(e)}
		class="flex-1 border-transparent bg-transparent text-[length:inherit]"
		placeholder="Type commmand here..."
	/>
</div>
