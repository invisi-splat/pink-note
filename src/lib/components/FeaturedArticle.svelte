<script lang="ts">
    import sellotape_texture from "$lib/assets/tape-png-0.png";
    import type { ArticleType } from "$lib/types";
    let randomRotation = String((Math.random() * 10) - 5) + "deg";

    // generate featuredArticle sellotape
    let sellotapes: {top: number, left: number, rotation: number}[] = [];
    function generateSellotapes() { // again, fiddle with these params until it looks good
        // top left
        sellotapes.push({
            top: (Math.random() * 5) - 10,
            left: (Math.random() * 5) - 10,
            rotation: (Math.random() * 20) + 80 // between 80 and 100 deg
        });
        // top right
        sellotapes.push({
            top: (Math.random() * 5) - 10,
            left: 100 - ((Math.random() * 5) + 15),
            rotation: (Math.random() * 20) - 10
        });
        // bottom left
        sellotapes.push({
            top: 100 - ((Math.random() * 5) + 10),
            left: (Math.random() * 5) - 10,
            rotation: (Math.random() * 20) - 10
        });
        //bottom right
        sellotapes.push({
            top: 100 - ((Math.random() * 5) + 10),
            left: 100 - ((Math.random() * 5) + 15),
            rotation: (Math.random() * 20) + 80
        })
    }

    generateSellotapes();

    // export props

    export let date: string;
    export let type: ArticleType;
    export let recent: boolean;

    export let title: string;
    export let subtitle: string;
    export let printerLocation: string;
</script>

<div class="article-preview-container">
    <div class="container" style="transform: rotate({randomRotation})">
        <div class="header">
            <div class="date">{date}</div>
            <div class="type" class:recent>{recent ? "new " : "" }{type}</div>
        </div>
        <div class="header-divider"></div>
        <div class="title" class:recent>{title}</div>
        <div class="subtitle">{subtitle}</div>
        <div class="footer-divider"></div>
        <div class="footer">
            <div>Printed from <i>{printerLocation}</i></div>
        </div>
    </div>
    {#each sellotapes as { top, left, rotation }}
    <div class="sellotape" style:background-image="url('{sellotape_texture}')"
        style:top="{top}%"
        style:left="{left}%"
        style:transform="rotate({rotation}deg)"
    ></div>
    {/each}
</div>

<style lang="postcss">
    .article-preview-container {
        width: 30%;
        height: 75vh;
        position: relative;
    }
    .container {
        z-index: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        background-color: rgb(255, 253, 246);
        cursor: pointer;
        box-shadow: -2px 2px 1px rgba(0, 0, 0, 0.6);
        transition: box-shadow 0.5s;
    }

    .container:hover {
        box-shadow: -3px 8px 6px rgba(0, 0, 0, 0.3);
    }

    .container > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .container > div.header { /* specificity to override previous rule */
        flex-grow: 1;
        flex-direction: row;
        justify-content: space-between;
    }

    div.header > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .date {
        font-family: Helvetica, sans-serif;
        padding-left: 5%;
        font-weight: bold;
    }

    .type {
        font-family: Helvetica, sans-serif;
        padding-right: 5%;
        text-transform: uppercase;
        font-weight: 900;
    }

    .header-divider {
        flex-grow: 0.5;
        background-color: black;
        margin: 0 3%;
    }

    .title {
        flex-grow: 1;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 200%;
        text-align: center;
        padding: 0 3%;
    }

    .type.recent {
        color: blue;
    }

    .title.recent {
        color: var(--color--pale-pink);
    }

    .subtitle {
        flex-grow: 3;
        font-size: 120%;
        text-align: center;
        padding: 0 4%;
    }

    .footer-divider {
        flex-grow: 0.01;
        background-color: black;
        margin: 0 3%;
    }

    .container > div.footer { /* similar reasoning */
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: Helvetica, sans-serif;
        font-size: 70%;
    }

    .container > div.footer > div {
        text-align: right;
        padding-right: 5%;
    }

    .sellotape {
        position: absolute;
        top: 0;
        left: 0;
        background-size: cover;
        width: 9.6vw;
        height: 8.7vw;
        z-index: 1000;
        pointer-events: none;
    }
</style>