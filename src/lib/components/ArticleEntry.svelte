<script lang="ts">
    import type { BlogType, TagsType } from "$lib/types";
    interface ArticleType {
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        Blog: BlogType;
        Tags: TagsType;
    }

    export let data: {id: number, attributes: ArticleType};
    export let r: number;
    export let s: number;

    const randomSelfRotationDegrees = Math.floor(Math.random() * 2) - 1

    function parseDate(datetime: string) {
        const dt: Date = new Date(datetime);
        return [`${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`];
    }
</script>

<div class="centring-container">
    <div class="drop-shadow-container">
        <a href="/articles/id-{data.id}?r={r}&s={s}" class="container" style:transform="rotate({randomSelfRotationDegrees}deg)">
            <div class="article">
                <div class="title">{data.attributes.Blog.Title}</div>
                <div class="author">{data.attributes.Blog.AuthorName}, {data.attributes.Blog.AuthorHouse} on {parseDate(data.attributes.Blog.Datetime)}</div>
            </div>
        </a>
    </div>
</div>

<style lang="postcss">
    a {
        color: black;
    }

    .centring-container {
        width: 100vw;
        height: 15vh;
        margin: 3vh 0;
        display: flex;
        justify-content: center;
    }

    .drop-shadow-container {
        width: 80vw;
        height: 100%;
        position: relative;
        filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.5));
        transition: filter 0.2s;
    }

    .drop-shadow-container:hover {
        filter: drop-shadow(10px 8px 10px rgba(0, 0, 0, 0.6));
        cursor: pointer;
    }

    .container {
        clip-path: polygon(0 0, 0 15vh, 80vw 15vh, 80vw 3.5vh, calc(80vw - 3.5vh) 0);
        width: 100%; height: 100%;
        background-color: rgb(255, 253, 246);
        transition: clip-path 0.2s ease-out;
        z-index: 10;
        overflow: visible;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .container:hover {
        clip-path: polygon(0 0, 0 15vh, 80vw 15vh, 80vw 1.5vh, calc(80vw - 1.5vh) 0);
    }

    .article {
        font-size: 200%;
        display: flex;
        justify-content: space-between;
    }

    .title {
        padding: 0 2vw;
        font-weight: 700;
        text-transform: uppercase;
    }

    .author {
        padding: 0 2vw;
        text-align: right;
    }
</style>