<script lang="ts">
	import { json } from "@sveltejs/kit";

    type Project = {
        name: string,
        url_name: string,
        img_name: string,
        technologies: string[]
    };

    let { project, key }: { project: Project, key: number } = $props();

</script>

<div class="animate-grow-fade-in opacity-0 border-2 border-sky-300 rounded-md p-2 h-64 hover:p-0 hover:scale-105 hover:border-3 duration-300"
    style="animation-delay: {key * 40}ms"
    >
    <div class="dark:bg-gray-600 bg-gray-300 rounded-md h-full p-0 overflow-clip shadow-md hover:shadow-sky-300 duration-300">
        <a href="/projects/{ project["url_name"] }" class="size-full flex flex-col p-0">
            <div class="w-full h-20 grow p-0">
                <img class="w-full object-contain overflow-hidden" src="/{project["img_name"]}" alt="t"/>
            </div>
            <div class="text-2xl flex flex-col gap-1 items-center p-1 bg-gray-100 dark:bg-[#292929]">
                <h3 class="dark:text-gray-50 text-center">{ project["name"] }</h3>
                <ul class="flex flex-row gap-2">
                    {#each project["technologies"] as tech }
                    <li class="size-8"> 
                        <img 
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{tech}/{tech}-original.svg" 
                            alt={tech}
                            title="{tech}"
                        />
                    </li>
                    {/each}
                </ul>
            </div>
        </a>
    </div>
</div>