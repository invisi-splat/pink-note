<svelte:head>
    <title>Pink Note</title>
</svelte:head>

<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;
    import Bowser from "bowser";
    import { onMount } from "svelte";

    import Navbar from "$lib/components/Navbar.svelte";
    import Title from "$lib/components/Title.svelte";
    import FeaturedArticle from "$lib/components/FeaturedArticle.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import BrowserWarning from "$lib/components/BrowserWarning.svelte";

    import white_concrete_texture from "$lib/assets/white-concrete-texture.jpg";

    function parseDate(datetime: string) {
        const dt: Date = new Date(datetime);
        const unformattedHour: number = dt.getHours();
        const formattedHour: string = unformattedHour < 10 ? "0" + String(unformattedHour) : String(unformattedHour);
        const unformattedMinute: number = dt.getMinutes();
        const formattedMinute: string = unformattedMinute < 10 ? "0" + String(unformattedMinute) : String(unformattedMinute);
        console.log(datetime + " " + dt.getDay());
        return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} ${formattedHour}:${formattedMinute}`;
    }

    function parseRecency(datetime: string) {
        const dt: Date = new Date(datetime);
        const now: number = Date.now();
        const diff_milliseconds: number = now - dt.valueOf();
        return diff_milliseconds < 604800000; // 7 days
    }

    const { imgURLs, featuredArticles } = data;
    let browserName: string | undefined;
    onMount(() => {
        browserName = Bowser.getParser(window.navigator.userAgent).getBrowser().name;
    })
</script>

<Title n={10} imgURLs={imgURLs} />
<Navbar />

<div class="stuff-container" style:background-image="url('{white_concrete_texture}')">  <!-- please find attached: the stuff -->
    {#if browserName !== "Chrome" && browserName}
        <BrowserWarning { browserName } />
    {/if}
    <div class="featured-article-container">
        {#each featuredArticles as { id, attributes }}
            <FeaturedArticle
                date={parseDate(attributes.Blog.Datetime)}
                type="article"
                recent={parseRecency(attributes.Blog.Datetime)}
                title={attributes.Blog.Title}
                subtitle={attributes.Blog.Subtitle}
                printerLocation={"insert printer here"}
            />
        {/each}
    </div>
    <div class="footer-spacer"></div>
</div>

<Footer />
<style lang="postcss">
    :global(body) {
        overflow-x: hidden;
    }

    .stuff-container {
        width: 100%;
        min-height: 100%;
        background-size: 60%;
        position: relative;
        z-index: 2;
    }
    .featured-article-container {
        padding-top: 5%;
        z-index: 2;
        position: relative;
        display: flex;
        justify-content: space-evenly;
    }
    .footer-spacer {
        height: 60vh;
    }
</style>