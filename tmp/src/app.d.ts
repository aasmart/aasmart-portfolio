// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        interface PageState {
            terminalHistory: string | undefined;
            lastScrollPosition: number | undefined;
        }
        // interface Platform {}
    }
}

export { };
