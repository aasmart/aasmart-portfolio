<script lang="ts">
	import { base } from '$app/paths';
	import { getContext } from 'svelte';
	import type { Action } from 'svelte/action';

	let focusCommand = getContext<() => void>('requestFocus');

	let focus: Action = () => {
		focusCommand();
	};
</script>

<section
	use:focus
	class="flex max-w-[100rem] animate-grow-fade-in flex-col items-center gap-4 rounded-md
		border-[1px] border-neutral-400 bg-gray-100 p-2 shadow-md hover:-translate-y-2 dark:border-neutral-700 dark:bg-neutral-800 lg:flex-row"
>
	<img
		class="aspect-square max-h-[18em] rounded-full shadow-lg sm:w-auto"
		src={`${base}/me.png`}
		alt="Me"
	/>
	<div class="flex h-auto flex-col dark:text-gray-50">
		<h2 class="text-center text-xl font-bold lg:text-start">Alexander Smart</h2>
		<h3 class="text-center text-lg dark:text-gray-100 lg:text-start">Student and Developer</h3>
		<hr class="border-1 my-1 w-full rounded-full" />
		<p class="h-max w-full text-center lg:text-start">
			Hi! <span>👋</span> I'm currently an undergraduate student at the University of Michigan
			&mdash; Ann Arbor. I enjoy (with various levels of interest) an array of topics from
			programming, CS thoery, and hardware. However, I've discovered that I especially enjoy
			programming languages, systems, and building useful software.
			<br /><br />
			Outside of computer programming, I frequently go to the gym and mainly do calisthenics (I have
			a long background in gymnastics!). I also dabble in the arts, as I have some 3D modeling and drawing
			capabilities. I do enjoy playing video games when time permits, with some favorites of mine being
			Satisfactory, Terraria, and ARK 🦖.
		</p>
		<ul
			class="mt-auto flex flex-row flex-wrap items-center justify-center gap-3 pt-2 text-4xl
				lg:justify-start"
		>
			<li>
				<a
					class="text-blue-400 transition-colors duration-200 hover:text-blue-500
						focus:text-blue-500"
					href="https://github.com/aasmart"
					aria-label="LinkedIn"
					target="_blank"
				>
					<i class="fa-brands fa-github"></i>
				</a>
			</li>
			<li>
				<a
					class="text-blue-400 transition-colors duration-200 hover:text-blue-500
						focus:text-blue-500"
					href="https://linkedin.com/in/aasmart"
					aria-label="Github"
					target="_blank"
				>
					<i class="fa-brands fa-linkedin"></i>
				</a>
			</li>
			<li class="h-full break-all text-center align-text-bottom text-lg text-blue-400">
				aasmart[at]umich[dot].edu
			</li>
		</ul>
	</div>
</section>
