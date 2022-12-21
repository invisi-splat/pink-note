<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;

    import { marked } from "marked";
    import DOMPurify from "isomorphic-dompurify";
    import Navbar from "$lib/components/Navbar.svelte";

    import pinboard_texture from "$lib/assets/paperboard-simple-fiber-dusty-texture.jpg";
	import { onMount } from "svelte";

    const { article, returnPage, returnPageSize } = data;
    let url: string;

    function parseArticleDate(datetime: string) {
        const dt: Date = new Date(datetime);
        const unformattedHour: number = dt.getHours();
        const formattedHour: string = unformattedHour < 10 ? "0" + String(unformattedHour) : String(unformattedHour);
        const unformattedMinute: number = dt.getMinutes();
        const formattedMinute: string = unformattedMinute < 10 ? "0" + String(unformattedMinute) : String(unformattedMinute);
        return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} ${formattedHour}:${formattedMinute}`;
    }

    let copied = false;

    function copyText() {
        navigator.clipboard.writeText(url);
        copied = true;
    }

    onMount(() => {
        url = window.location.origin + window.location.pathname;
    })
</script>

<svelte:head>
    <title>{article.attributes.Blog.Title}</title>
</svelte:head>

<Navbar activeItem={2}/>

<div class="container" style:background-image="url({pinboard_texture})">
    <div class="paper">
        <div class="info">
            <div><div>Author: </div><b>{article.attributes.Blog.AuthorName}, {article.attributes.Blog.AuthorHouse}</b></div>
            <div><div>Year: </div><b>{article.attributes.Blog.AuthorYearGroup}</b></div>
            <div><div>Published: </div><div>{parseArticleDate(article.attributes.Blog.Datetime)}</div></div>
            <div><div>Tags: </div><i>{article.attributes.Tags.Tags}</i></div>
            <div style:position="relative"><div>Share link: </div><div class="link" on:click={copyText} class:copied >{url}</div></div>
        </div>
        <div class="title">{article.attributes.Blog.Title}</div>
        {#if article.attributes.Blog.Subtitle}
            <div class="subtitle">{article.attributes.Blog.Subtitle}</div>
        {/if}
        <br />
        <div class="body">{@html DOMPurify.sanitize(marked.parse(article.attributes.Blog.Body))}</div>
    </div>
    <div class="return">
        <a href="/articles/{returnPage}?pagesize={returnPageSize}">Back to articles...</a>
    </div>
</div>

<style lang="postcss">
    a {
        color: white;
    }
    a:hover {
        text-decoration: underline;
    }
    .container {
        width: 100vw;
        min-height: 100vh;
        background-size: contain;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .paper {
        margin: 15vh 0 5vh;
        width: 80vw;
        background-color: rgb(255, 253, 246);
        box-shadow: 2px 2px 4px black;
        padding: 7vh 5vw;
        white-space: pre-line;
    }

    .title {
        font-size: 300%;
        font-weight: 700;
        text-transform: uppercase;
    }

    .subtitle {
        font-size: 170%;
        font-style: italic;
    }

    .body {
        font-size: 120%;
    }

    .info {
        float: right;
        font-size: 130%;
        width: 22vw;
        margin-left: 3vw;
        margin-bottom: 2vh;
        font-family: Helvetica, Arial, sans-serif;
    }

    .link {
        font-size: 80%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        cursor: copy;
        transition: font-size 0.2s, color 0.2s, transform 0.1s;
        transform: rotate(0deg);
    }

    .link:hover {
        font-size: 82%;
    }

    .link:active {
        font-size: 85%;
    }

    .copied::after {
        content: "copied!";
        transform: rotate(2.7deg);
        position: absolute;
        top: 100%;
        left: 50%;
        pointer-events: none;
    }

    .copied {
        color: grey;
        transform: rotate(2.7deg);
        pointer-events: none;
    }

    .info > div {
        display: flex;
        justify-content: space-between;
    }

    .return {
        width: 40vw;
        height: 10vh;
        background-color: var(--color--pale-pink);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 3vh 0 10vh;
        font-size: 200%;
        box-shadow: 2px 2px 3px black;
        transition: box-shadow 0.2s;
    }

    .return:hover {
        box-shadow: 3px 3px 5px black;
    }
</style>