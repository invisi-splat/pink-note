<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;

    import { marked } from "marked";
    import DOMPurify from "isomorphic-dompurify";
    import Navbar from "$lib/components/Navbar.svelte";

    import pinboard_texture from "$lib/assets/paperboard-simple-fiber-dusty-texture.jpg";

    const { article } = data;

    function parseArticleDate(datetime: string) {
        const dt: Date = new Date(datetime);
        const unformattedHour: number = dt.getHours();
        const formattedHour: string = unformattedHour < 10 ? "0" + String(unformattedHour) : String(unformattedHour);
        const unformattedMinute: number = dt.getMinutes();
        const formattedMinute: string = unformattedMinute < 10 ? "0" + String(unformattedMinute) : String(unformattedMinute);
        return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} ${formattedHour}:${formattedMinute}`;
    }
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
        </div>
        <div class="title">{article.attributes.Blog.Title}</div>
        {#if article.attributes.Blog.Subtitle}
            <div class="subtitle">{article.attributes.Blog.Subtitle}</div>
        {/if}
        <br />
        <div class="body">{@html DOMPurify.sanitize(marked.parse(article.attributes.Blog.Body))}</div>
    </div>
</div>

<style lang="postcss">
    .container {
        width: 100vw;
        min-height: 100vh;
        background-size: contain;
        display: flex;
        justify-content: center;
    }

    .paper {
        margin: 15vh 0;
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
        width: 17vw;
        margin-left: 3vw;
        margin-bottom: 2vh;
    }

    .info > div {
        display: flex;
        justify-content: space-between;
    }
</style>