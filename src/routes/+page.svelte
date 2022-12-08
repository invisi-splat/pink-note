<svelte:head>
  <title>Pink Note</title>
</svelte:head>

<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Title from "$lib/components/Title.svelte";
    import FeaturedArticle from "$lib/components/FeaturedArticle.svelte";
    import Footer from "$lib/components/Footer.svelte";

    import white_concrete_texture from "$lib/assets/white-concrete-texture.jpg";
</script>

<Title />
<Navbar />

<div class="stuff-container" style:background-image="url('{white_concrete_texture}')">  <!-- please find attached: the stuff -->
    <div class="featured-article-container">
        <!-- maximum 3 featured articles (any more and formatting breaks)-->
        <FeaturedArticle date="5/6/22 14:58" type="article" recent={true}
            title="Would J.S. Bach Appreciate It If We Dubstep-Remixed His Cello Suite No. 1?"
            subtitle="We discuss it here (and release a sneak preview of what it would sound like)."
            printerLocation="manoukian kitchen m401"
            />
        <FeaturedArticle date="2/6/22 14:58" type="article" recent={false}
            title="A defense of John Cage's 4'33"
            subtitle="I promise you, I'm not an idiot for liking it! It's sophisticated, I swear!"
            printerLocation="library photocopier c5860"
            />
        <FeaturedArticle date="1/6/22 14:58" type="event" recent={false}
            title="Mr. Price vs. Mr. Garrard Rap Battle"
            subtitle="Going live soon - don't miss it! Click here to find the link."
            printerLocation="bowen's prusa mini+"
            />
    </div>
    <div class="footer-spacer"></div>
</div>

<Footer />
<style>
    :global(body) {
        overflow-x: hidden;
    }

    .stuff-container {
        padding-top: 5%;
        width: 100%;
        min-height: 100%;
        background-size: 60%;
        position: relative;
        z-index: 2;
    }
    .featured-article-container {
        z-index: 2;
        position: relative;
        display: flex;
        justify-content: space-evenly;
    }
    .footer-spacer {
        height: 60vh;
    }
</style>