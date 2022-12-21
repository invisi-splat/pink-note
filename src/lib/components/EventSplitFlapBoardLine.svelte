<script lang="ts">
    import EventSplitFlapBoardChar from "$lib/components/EventSplitFlapBoardChar.svelte"

    export let displaySentence: string;
    const n = 40; // number of chars
    let showChars: string[] = [];
    const splitSentence: string[] = displaySentence.toLowerCase().split("");
    for (let i = 0; i < n; i++) { showChars.push(splitSentence[i] || " ") };
</script>

<div class="line-container">
    {#each showChars as showChar}
        <EventSplitFlapBoardChar showChar={showChar} />
    {/each}
</div>

<style lang="postcss">
    .line-container {
        width: 95%;
        display: flex;
        justify-content: space-evenly;
        margin: 1vh 0;
    }
</style>