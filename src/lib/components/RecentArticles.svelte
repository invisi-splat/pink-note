<script lang="ts">
    import type { BlogType, TagsType } from "$lib/types";
    import whiteboard_texture from "$lib/assets/whiteboard.png";

    interface ArticleType {
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        Blog: BlogType;
        Tags: TagsType;
    }

    function parseDate(datetime: string) {
        const dt: Date = new Date(datetime);
        return [`${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`];
    }

    export let data: {id: number, attributes: ArticleType}[];
</script>

<div class="container">
    <div class="whiteboard" style:border-image-source="url({whiteboard_texture})">
        <div class="shouty-title">OTHER RECENT ARTICLES</div>
        {#each data as { attributes }}
        <div class="article">
            <div class="left-column">
                <div class="title">{attributes.Blog.Title}</div>
                {#if attributes.Blog.Subtitle}
                <div class="subtitle">{attributes.Blog.Subtitle}</div>
                {/if}
            </div>
            <div class="right-column">Posted {parseDate(attributes.Blog.Datetime)} by {attributes.Blog.AuthorName}, {attributes.Blog.AuthorHouse}</div>
        </div>
        {/each}
        <a href="/articles" class="see-more">See more...</a>
    </div>
</div>

<style lang="postcss">
    a {
        color: black;
    }
    .container {
        width: 100vw;
        margin-top: 20vh;
        display: flex;
        justify-content: center;
    }

    .whiteboard {
        width: 90vw;
        min-height: 80vh;
        background-color: white;
        border-style: solid;
        border-width: 35px;
        border-image-slice: 23; /* from measuring the image */
        border-image-width: 1;
        box-shadow: -1px 6px 10px rgba(0, 0, 0, 0.6);
        font-family: "Edu SA Beginner", "Caveat", cursive;
        font-size: 200%;
        padding: 5vh 5vw;
    }

    .whiteboard > div {
        cursor: default;
    }

    .shouty-title {
        font-size: 150%;
        font-weight: bold;
        margin-bottom: 7vh;
    }

    .title {
        font-weight: 500;
    }

    .title:hover, .see-more:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .subtitle {
        font-size: 70%;
    }

    .article {
        margin: 4vh 0;
        display: flex;
        justify-content: space-between;
    }

    .see-more {
        margin-top: 10vh;
    }
</style>