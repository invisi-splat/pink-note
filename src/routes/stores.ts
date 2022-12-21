import { writable } from "svelte/store";

export const pageStore = writable(1);
export const pageSizeStore = writable(10);

export const flipReset = writable(false);