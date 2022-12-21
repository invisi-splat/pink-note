<script lang="ts">
    import nailhead_texture from "$lib/assets/nailhead.png";
    import announcement_wordart from "$lib/assets/announcement-rainbow-wordart.png";
    import type { BlogType } from "$lib/types";

    interface AnnouncementType {
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        Importance: "I" | "II" | "III" | "IV";
        AnnouncementStart: string;
        AnnouncementLength: string;
        Blog: BlogType
    }

    export let data: AnnouncementType;
</script>

<div class="container">
    <div class="nails">
        <img class="nail-1" src={nailhead_texture} alt="nailhead"/>
        <img class="nail-2" src={nailhead_texture} alt="nailhead"/>
    </div>
    <div class="announcement">
        <div class="announcement-content importance-{data.Importance}">
            {#if data.Importance === "IV" || data.Importance === "III" }
                <div class="big-shouty-attention-grabber">
                    <img alt="ANNOUNCEMENT" src={announcement_wordart} />
                </div>
            {/if}
            <div class="title">{data.Blog.Title}</div>
        </div>
    </div>
</div>

<style lang="postcss">
    .container {
        width: 80vw;
        height: 20vh;
        background-color: rgb(255, 247, 234);
        box-shadow: -2px 2px 1px rgba(0, 0, 0, 0.3);
        transition: box-shadow 0.5s;
    }

    .container:hover {
        box-shadow: -2px 2px 6px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    .nails {
        height: 5vh;
    }

    .nails > img {
        position: relative;
        width: 1.5vw;
    }

    .nail-1 {
        left: 1vw;
        top: 1vw;
    }

    .nail-2 {
        left: 77.5vw; /* not sure why this works when 77.5 + 1.5 = 79 but oh well */
        bottom: 0.5vw; /* gets both nails inline (1vw - (-0.5vw) = 1.5vw) */
    }

    .announcement {
        height: 15vh; /* broke up with %; vh is my best friend */
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .announcement-content {
        display: flex;
        padding-bottom: 5vh; /* fix wonky flex centre due to nails */
        justify-content: space-between;
    }

    .announcement-content > div {
        font-size: 250%;
        text-align: center;
        font-family: "Comic Sans MS", Arial, Helvetica, sans-serif;
    }

    .big-shouty-attention-grabber {
        flex-grow: 1;
        padding: 0 5vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .big-shouty-attention-grabber > img {
        width: 30vw;
    }

    .title {
        flex-grow: 3;
        font-weight: 700;
        padding: 0 2vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .importance-I {
        color: rgb(26, 0, 0);
    }

    .importance-II {
        color: rgb(80, 4, 42);
    }

    .importance-III {
        color: rgb(128, 2, 59);
    }

    .importance-IV {
        color: rgb(168, 5, 68);
    }
</style>