<script lang="ts">
    import EventSplitFlapBoardLine from "$lib/components/EventSplitFlapBoardLine.svelte";
    import { flipReset } from "../../routes/stores";

    const n = 10; // number of lines
    let displaySentences = [
        "Mr. Heighway vs. Mr. Price Rap Battle!!",
        "Dryden's House Concert",
        "MusSoc Concert",
        "ABRSM Auditions",
        "Chamber Choir Houses of Parliament Trip"
    ]

    function emitReset() {
        flipReset.set(true);
    }
</script>

<div class="container">
    <div class="board">
        {#each displaySentences as displaySentence}
            <EventSplitFlapBoardLine displaySentence={displaySentence} />
        {/each}
        <div class="reset" on:click={emitReset}>REPLAY ANIMATION</div>
    </div>
</div>

<style lang="postcss">
    .container {
        margin-top: 10vh;
        width: 100vw;
        display: flex;
        justify-content: center;
    }

    .reset {
        color: white;
        margin-top: 5vh;
        padding: 1vh 1vw;
        background-color: var(--color--pale-pink);
        border: 5px ridge pink;
        box-shadow: 3px 3px 3px black;
        cursor: pointer;
    }

    .board {
        width: 90vw;
        min-height: 60vh;
        background-color: rgb(19, 19, 19);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5vh 0;
        box-shadow: 3px 3px 2px black;
        border-radius: 5px;
    }
</style>