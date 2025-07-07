import { writable } from "svelte/store";

export const homeScrollTop = writable(0);
export const terminalCommandHistory = writable<string[]>(undefined);
