<script lang="ts">
    let { submitCommand, commandText = $bindable(), ...props }: 
        { submitCommand: (event: KeyboardEvent) => void, commandText: string, [x:string]:any } = $props();
</script>

<span {...props} class="flex flex-row items-center {props.class ?? ''}">
    $ <input 
        type="text" 
        bind:value={commandText} onkeypress={(e) => submitCommand(e)}
        class="bg-transparent border-transparent text-[length:inherit] flex-1"
    />
</span>