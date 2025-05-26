<script lang="ts">
    let { submitCommand, commandText = $bindable(), ...props }: 
        { submitCommand: (event: KeyboardEvent) => void, commandText: string, [x:string]:any } = $props();
</script>

<div {...props} class="flex flex-row items-center bg-light-bg dark:bg-gray-bg {props.class ?? ''}">
    <span class="text-neutral-400 mr-2">~/</span>
    <span class="text-sky-400 mr-1">❯</span>
    <input 
        type="text" 
        bind:value={commandText} onkeypress={(e) => submitCommand(e)}
        class="bg-transparent border-transparent text-[length:inherit] flex-1"
        placeholder="Type commmand here..."
    />
</div>