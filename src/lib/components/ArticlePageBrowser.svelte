<script lang="ts">
    import lcd_texture from "$lib/assets/lcd_display.png";

    export let articles_json: Record<string, any>;
    export let pageSize: string | number;

    const LCDRotation: number = Math.floor(Math.random() * 5) - 2.5;
    let buttonRotations: number[] = [];
    for (let i = 0; i < 6; i++) {
        buttonRotations.push(Math.floor(Math.random() * 8) - 4);
    }

    const page = articles_json.meta.pagination.page;
    let selectedPage = page;
</script>

<div class="page-browser-container">
    <div class="page-browser">
        <div class="lcd-display-container">
            <div class="lcd-display" style:background-image="url({lcd_texture})" style:transform="rotate({LCDRotation}deg)">
                <div>Page {page}</div>
            </div>
        </div>
        <div class="buttons-container">
            {#if page !== 1}
            <div class="left button">
                <div class="button-container">
                    <a data-sveltekit-reload href="/articles/{page - 1}?pagesize={pageSize}" class="button-obj" style:transform="rotate({buttonRotations[0]}deg)">
                        <div class="button-circle"></div>
                    </a>
                    <div class="button-label" style:transform="rotate({buttonRotations[1]}deg)">Prev</div>
                </div>
            </div>
            {/if}
            <div class="page-selection">
                <div class="button-container">
                    <a data-sveltekit-reload href="/articles/{selectedPage}?pagesize={pageSize}" class="button-obj red" style:transform="rotate({buttonRotations[2]}deg)">
                        <div class="button-circle"></div>
                    </a>
                    <input type="number" bind:value={selectedPage} class="button-label input-label" style:transform="rotate({buttonRotations[3]}deg)" />
                </div>
            </div>
            {#if page !== articles_json.meta.pagination.pageCount}
            <div class="right button">
                <div class="button-container">
                    <a data-sveltekit-reload href="/articles/{page + 1}?pagesize={pageSize}" class="button-obj" style:transform="rotate({buttonRotations[4]}deg)">
                        <div class="button-circle"></div>
                    </a>
                    <div class="button-label" style:transform="rotate({buttonRotations[5]}deg)">Next</div>
                </div>
            </div>
            {/if}
        </div>
        <div class="page-size-selection-container">
            <div class="page-size-selection">
                <div><span>Show </span><input type="number" bind:value={pageSize} class="page-size-input" /><span> articles per page</span></div>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    a {
        cursor: default; /* don't show pointer when not directly on button (of course, the anchor still works) */
    }

    .page-browser-container {
        width: 100vw;
        min-height: 20vh;
        display: flex;
        justify-content: center;
        margin: 3vh 0 2vh;
    }

    .page-browser {
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
    }

    .lcd-display-container {
        width: 100%;
        height: 10vh;
        display: flex;
        justify-content: center;
    }

    .lcd-display {
        width: calc(10vh * (427 / 143)); /* image dimensions */
        height: 10vh;
        background-size: contain;
        background-repeat: no-repeat;
        box-shadow: 2px 2px 2px black;
        -webkit-backface-visibility: hidden; /* removes jagged edges */ /* TODO check for browser compatibility for backface visibility */
        font-family: VT323, 'Courier New', Courier, monospace;
        font-size: 5vh;
        text-align: center;
        position: relative;
        pointer-events: none;
    }

    .lcd-display > div {
        position: relative;
        top: 1vh;
    }

    .buttons-container {
        width: 100%;
        height: 15vh;
        display: flex;
        justify-content: space-evenly;
        margin: 5vh 0 2vh;
    }

    .page-selection {
        display: flex;
        justify-content: center;
    }

    .button {
        display: flex;
        justify-content: center;
    }

    .button-container {
        width: 5vw;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .button-obj {
        width: 3vw;
        height: 3vw;
        background-color: rgb(182, 197, 187);
        border-radius: 1vw;
        margin-bottom: 1vh;
        box-shadow: 1px 2px 4px black;
        border: 0.15vw solid rgb(26, 26, 26);
        transition: box-shadow 0.1s;
    }

    .red {
        background-color: rgb(197, 182, 182);
    }

    .button-obj:hover {
        box-shadow: 1px 2px 2px black;
    }

    .button-circle {
        position: relative;
        width: 1.5vw; height: 1.5vw; left: calc(0.75vw - 0.15vw); top: calc(0.75vw - 0.15vw); border-radius: 1.5vw;
        border: 0.2vw solid rgb(26, 25, 25);
        background-color: rgb(58, 56, 56);
        filter: drop-shadow(5px 5px 5px black);
        transition: filter 0.1s;
        cursor: pointer;
    }

    .button-circle:hover {
        filter: drop-shadow(3px 3px 3px black);
    }

    .button-label {
        font-size: 150%;
        background-color: rgb(255, 253, 246);
        padding: 1vh 1vw;
        box-shadow: 1px 2px 4px black;
        cursor: default;
        text-align: center;
        width: 6vw;
    }

    .input-label {
        font-family: "Montserrat", sans-serif;
        width: 6vw;
        text-align: center;
        padding: 1vh 1vw 1vh 1.5vw; /* HACK an attempt to fix the centring -- maybe come up with a better solution */
        cursor: text;
        border: none;
    }

    .input-label:focus {
        outline: none;
    }

    .page-size-selection-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .page-size-selection {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgb(253, 253, 253);
        padding: 1vh 1vw;
        box-shadow: 1px 2px 3px black;
    }

    .page-size-input {
        border: none;
        background: none;
        text-decoration: underline;
        width: 3vw;
        text-align: center;
        font-family: "Edu SA Beginner", "Caveat", cursive;
        font-weight: 700;
    }

    .page-size-input:focus {
        outline: none;
        border: none;
    }
</style>