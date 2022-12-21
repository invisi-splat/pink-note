<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;
    import Bowser from "bowser";
    import { onMount } from "svelte";

    import Title from "$lib/components/Title.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import BrowserWarning from "$lib/components/BrowserWarning.svelte";

    import white_concrete_texture from "$lib/assets/white-concrete-texture.jpg";
	import ArticlePageBrowser from "$lib/components/ArticlePageBrowser.svelte";

    const { imgURLs, articles_json, pageSize } = data;
    let browserName: string | undefined;
    onMount(() => {
        browserName = Bowser.getParser(window.navigator.userAgent).getBrowser().name;
    })
</script>

<Title n={10} imgURLs={imgURLs} text="ANNOUNCEMENTS" shrink={true}/>
<Navbar activeItem={1} />

<div class="stuff-container" style:background-image="url('{white_concrete_texture}'">
    {#if browserName !== "Chrome" && browserName}
        <BrowserWarning { browserName } />
    {/if}
    <div class="footer-spacer"></div>
</div>



<Footer />

<style lang="postcss">
    .stuff-container {
        width: 100%;
        min-height: 100vh; /* FIXME remove after testing */
        background-size: 60%;
        position: relative;
        z-index: 2;
    }
</style>