<svelte:head>
    <title>Articles</title>
</svelte:head>

<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;
    import Bowser from "bowser";
    import { onMount } from "svelte";

    import Title from "$lib/components/Title.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import BrowserWarning from "$lib/components/BrowserWarning.svelte";
	import ArticleEntry from "$lib/components/ArticleEntry.svelte";

    import white_concrete_texture from "$lib/assets/white-concrete-texture.jpg";
	import ArticlePageBrowser from "$lib/components/ArticlePageBrowser.svelte";

    const { imgURLs, articles_json, pageSize } = data;
    let browserName: string | undefined;
    onMount(() => {
        browserName = Bowser.getParser(window.navigator.userAgent).getBrowser().name;
    })

    console.log(articles_json.data)
</script>

<Title text="Articles" n={10} imgURLs={imgURLs} />
<Navbar activeItem={2}/>

<div class="stuff-container" style:background-image="url('{white_concrete_texture}'">
    {#if browserName !== "Chrome" && browserName}
        <BrowserWarning { browserName } />
    {/if}
    <div class="article-container">
        <div class="page-heading">Recent articles</div>
        {#if articles_json.data.length} <!-- wtf js -->
        <ArticlePageBrowser articles_json={articles_json} pageSize={pageSize} />
            {#each articles_json.data as data}
                <ArticleEntry data={data} />
            {/each}
            {#if articles_json.data.length > 3} <!-- not using pageSize in case the user is on the final page -->
                <ArticlePageBrowser articles_json={articles_json} pageSize={pageSize} />
            {/if}
        {:else}
        <div class="error-container">
            <div class="error">
                <div>No articles found on page {articles_json.meta.pagination.page} (we've not written that many articles yet!)</div>
                <a data-sveltekit-reload href="/articles/1?pagesize={pageSize}">Return to page 1...</a>
            </div>
        </div>
        {/if}
    </div>
    <div class="footer-spacer"></div>
</div>

<Footer />

<style lang="postcss">
    @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

    .stuff-container {
        width: 100%;
        min-height: 100%;
        background-size: 60%;
        position: relative;
        z-index: 2;
    }

    .page-heading {
        font-size: 350%;
        font-weight: 700;
        text-align: center;
        margin-bottom: 5vh;
        text-shadow: -2px 0 white, 0 2px white, 2px 0 white, 0 -2px white;
    }
    
    .footer-spacer {
        height: 60vh;
    }

    .article-container {
        width: 100vw;
        min-height: 60vh;
        padding: 7vh 0 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .error {
        width: 80vw;
        height: 10vh;
        background-color: rgb(255, 253, 246);
    }
</style>