<svelte:head>
    <title>Pink Note</title>
</svelte:head>

<script lang="ts"> // TODO: Dark mode
    /** @type {import('./$types').PageData} */
    export let data;
    import Bowser from "bowser";
    import { onMount } from "svelte";

    import Navbar from "$lib/components/Navbar.svelte";
    import Title from "$lib/components/Title.svelte";
    import FeaturedArticle from "$lib/components/FeaturedArticle.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import BrowserWarning from "$lib/components/BrowserWarning.svelte";
    import Announcement from "$lib/components/Announcement.svelte";
    import RecentArticles from "$lib/components/RecentArticles.svelte";

    import white_concrete_texture from "$lib/assets/white-concrete-texture.jpg";

    function parseArticleDate(datetime: string) {
        const dt: Date = new Date(datetime);
        const unformattedHour: number = dt.getHours();
        const formattedHour: string = unformattedHour < 10 ? "0" + String(unformattedHour) : String(unformattedHour);
        const unformattedMinute: number = dt.getMinutes();
        const formattedMinute: string = unformattedMinute < 10 ? "0" + String(unformattedMinute) : String(unformattedMinute);
        return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} ${formattedHour}:${formattedMinute}`;
    }

    function parseArticleRecency(datetime: string, recencyThresholdSeconds: number) {
        const dt: Date = new Date(datetime);
        const now: number = Date.now();
        const diff_milliseconds: number = now - dt.valueOf();
        return diff_milliseconds < recencyThresholdSeconds; // 7 days
    } // FIXME Refactor code so that the processing occurs within the components

    const { imgURLs, featuredArticles, articles, announcements } = data;
    let browserName: string | undefined;
    onMount(() => {
        browserName = Bowser.getParser(window.navigator.userAgent).getBrowser().name;
    })
</script>

<Title n={10} imgURLs={imgURLs} />
<Navbar />

<div class="stuff-container" style:background-image="url('{white_concrete_texture}')">  <!-- please find attached: the stuff -->
    <!-- TODO Make realistic objects more interactive (peel off sellotape, write on whiteboard, pull out pins, etc.) -->
    {#if browserName !== "Chrome" && browserName}
        <BrowserWarning { browserName } />
    {/if}
    <div class="announcement-container"> <!-- TODO Hide when no recent announcements -->
        <Announcement data={announcements[0].attributes} /> <!-- take only first announcement -->
    </div>
    <div class="featured-article-container">
        {#each featuredArticles as { id, attributes }} <!-- TODO remove id if not necessary -->
            <FeaturedArticle
                date={parseArticleDate(attributes.Blog.Datetime)}
                type="article"
                recent={parseArticleRecency(attributes.Blog.Datetime, 604800000)}
                title={attributes.Blog.Title}
                subtitle={attributes.Blog.Subtitle}
                printerLocation={"insert printer here"}
            />
        {/each}
    </div>
    <RecentArticles data={articles}/>
    <div class="footer-spacer"></div>
</div>

<Footer />
<style lang="postcss">
    :global(body) {
        overflow-x: hidden;
        height: auto;
    }

    .stuff-container {
        width: 100%;
        min-height: 100%;
        background-size: 60%;
        position: relative;
        z-index: 2;
    }
    .announcement-container {
        padding-top: 5%;
        position: relative;
        display: flex;
        justify-content: center;
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