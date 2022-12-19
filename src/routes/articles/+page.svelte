<svelte:head>
    <title>Articles</title>
</svelte:head>

<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;

    import Title from "$lib/components/Title.svelte";
    import Navbar from "$lib/components/Navbar.svelte";

    const { imgURLs } = data;
</script>

<Title text="Articles" n={10} imgURLs={imgURLs} />
<Navbar activeItem={2}/>