<script lang="ts">
	let { technologies }: { technologies: string[] } = $props();
</script>

<ul class="flex flex-1 flex-row flex-wrap gap-1">
	{#each technologies as techString}
		{@const techStringLower = techString.toLowerCase()}
		<li
			class="flex h-min flex-row items-center gap-2 rounded-md border-2 border-neutral-400 p-2
                                    text-sm transition-colors hover:border-blue-400 dark:border-neutral-700 dark:hover:border-blue-400"
		>
			<img
				class="size-6"
				src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{techStringLower}/{techStringLower}-original.svg"
				alt={techString}
				title={techString}
			/>
		</li>
	{/each}
</ul>
