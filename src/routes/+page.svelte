<svelte:head>
    <title>Pink Note</title>
</svelte:head>

<script lang="ts"> // TODO: Dark mode
    /** @type {import('./$types').PageData} */
    export let data;
    import Bowser from "bowser";
    import { onMount } from "svelte";
    import type { BlogType } from "$lib/types";    

    import Navbar from "$lib/components/Navbar.svelte";
    import Title from "$lib/components/Title.svelte";
    import FeaturedArticle from "$lib/components/FeaturedArticle.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import BrowserWarning from "$lib/components/BrowserWarning.svelte";
    import Announcement from "$lib/components/Announcement.svelte";
    import RecentArticles from "$lib/components/RecentArticles.svelte";

    import white_concrete_texture from "$lib/assets/white-concrete-texture.jpg";
	import EventSplitFlapBoard from "$lib/components/EventSplitFlapBoard.svelte";

    interface AnnouncementType {
        id: string;
        attributes: {
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            Importance: "I" | "II" | "III" | "IV";
            AnnouncementStart: string;
            AnnouncementLength: string;
            Blog: BlogType
        }
    }

    function parseArticleDate(datetime: string) {
        const dt: Date = new Date(datetime);
        const unformattedHour: number = dt.getHours();
        const formattedHour: string = unformattedHour < 10 ? "0" + String(unformattedHour) : String(unformattedHour);
        const unformattedMinute: number = dt.getMinutes();
        const formattedMinute: string = unformattedMinute < 10 ? "0" + String(unformattedMinute) : String(unformattedMinute);
        return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} ${formattedHour}:${formattedMinute}`;
    }

    function parseRecency(datetime: string, recencyThresholdSeconds: number) {
        const dt: Date = new Date(datetime);
        const now: number = Date.now();
        const diff_milliseconds: number = now - dt.valueOf();
        return diff_milliseconds < recencyThresholdSeconds;
    } // FIXME Refactor code so that the processing occurs within the components

    const { imgURLs, featuredArticles, articles, announcements } = data;
    let browserName: string | undefined;
    onMount(() => {
        browserName = Bowser.getParser(window.navigator.userAgent).getBrowser().name;
    })

    function groupAnnouncementsByImportance() {
        let outputObj: { "I": AnnouncementType[], "II": AnnouncementType[], "III": AnnouncementType[], "IV": AnnouncementType[] } = { "I": [], "II": [], "III": [], "IV": [] };
        for (let i = 0; i < announcements.length; i++) {
            const importance: "I" | "II" | "III" | "IV" = announcements[i].attributes.Importance;
            outputObj[importance].push(announcements[i]);
        }
        return outputObj;
    }

    const groupedAnnouncements = groupAnnouncementsByImportance();
</script>

<Title text="PINK  NOTE" n={10} imgURLs={imgURLs} />
<Navbar activeItem={0}/>

<div class="stuff-container" style:background-image="url('{white_concrete_texture}')">  <!-- please find attached: the stuff -->
    <!-- TODO Make realistic objects more interactive (peel off sellotape, write on whiteboard, pull out pins, etc.) -->
    {#if browserName !== "Chrome" && browserName}
        <BrowserWarning { browserName } />
    {/if}
    {#each groupedAnnouncements["IV"] as announcement}
        {#if parseRecency(announcement.attributes.Blog.Datetime, Number(announcement.attributes.AnnouncementLength) * 86400000)}
            <div class="announcement-container">
                <Announcement data={announcement.attributes} />
            </div>
        {/if}
    {/each}
    {#each groupedAnnouncements["III"] as announcement}
        {#if parseRecency(announcement.attributes.Blog.Datetime, Number(announcement.attributes.AnnouncementLength) * 86400000)}
            <div class="announcement-container">
                <Announcement data={announcement.attributes} />
            </div>
        {/if}
    {/each}
    <div class="featured-article-container">
        {#each featuredArticles as { id, attributes }} <!-- TODO remove id if not necessary -->
            <FeaturedArticle
                id={id}
                date={parseArticleDate(attributes.Blog.Datetime)}
                type="article"
                recent={parseRecency(attributes.Blog.Datetime, 604800000)}
                title={attributes.Blog.Title}
                subtitle={attributes.Blog.Subtitle}
                printerLocation={"insert printer here"}
            />
        {/each}
    </div>
    {#each groupedAnnouncements["II"] as announcement}
        {#if parseRecency(announcement.attributes.Blog.Datetime, Number(announcement.attributes.AnnouncementLength) * 86400000)}
                <div class="announcement-container II">
                    <Announcement data={announcement.attributes} />
                </div>
        {/if}
    {/each}
    <RecentArticles data={articles}/>
    {#each groupedAnnouncements["I"] as announcement}
        {#if parseRecency(announcement.attributes.Blog.Datetime, Number(announcement.attributes.AnnouncementLength) * 86400000)}
                <div class="announcement-container I">
                    <Announcement data={announcement.attributes} />
                </div>
        {/if}
    {/each}
    <EventSplitFlapBoard />
    <div class="footer-spacer"></div>
</div>

<Footer />
<style lang="postcss">
    .stuff-container {
        width: 100%;
        min-height: 100%;
        background-size: 60%;
        position: relative;
        z-index: 2;
    }
    .announcement-container {
        padding-top: 2%;
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
    .II {
        padding-top: 10%;
    }
</style>