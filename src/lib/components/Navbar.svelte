<!-- this is the tricky one -->

<script lang="ts">
    // numbers to note:
    // stave height: 2.65vh
    // width between one note: 2.65 * 0.125 = 0.33125vh
    // width between two notes: 0.6625vh
    import trebleClefPinkTexture from "$lib/assets/treble-clef-pink.png";
    import NavbarDoubleBarline from "./NavbarDoubleBarline.svelte";
    import NavbarEndBarline from "./NavbarEndBarline.svelte";
    import NavbarMenuItem from "./NavbarMenuItem.svelte";

    // bottom: displace x vh upwards
    let menuItems: {name: string, url: string, active: boolean, ledger: boolean, bottom: number}[] = [
        {name: "Home", url: "/", active: false, ledger: false, bottom: -0.6625},
        {name: "Announcements", url: "/announcements", active: false, ledger: false, bottom: -0.33125},
        {name: "Articles", url: "/articles", active: false, ledger: false, bottom: 0},
        {name: "Events", url: "/events", active: false, ledger: false, bottom: 0.33125},
        {name: "About", url: "/about", active: false, ledger: false, bottom: -0.33125},
        {name: "FAQ", url: "/faq", active: false, ledger: true, bottom: -0.99375},
        {name: "Other sites", url: "/other_sites", active: false, ledger: false, bottom: -0.6625}
    ];
    let barLines: number[] = []; // list of left offsets
    const n = menuItems.length; // dev variable, please change (like title component)
    const width = 100 / n;
    for (let i = 1; i < n; i++) { // starting from 1 as we don't want a barline at 0%
        barLines.push(width * i);
    }

    export let activeItem: number;
    menuItems[activeItem].active = true;
</script>

<div class="container">
    <div class="stave">
        <div class="stave-line"></div>
        <div class="stave-line"></div>
        <div class="stave-line"></div>
        <div class="stave-line"></div>
        <div class="stave-line"></div>
    </div>
    <div class="clef">
        <img src={trebleClefPinkTexture} alt="treble clef" />
    </div>
    {#each barLines as offset}
        <NavbarDoubleBarline left={offset}/>
    {/each}
    <NavbarEndBarline />

    <div class="navbar-container">
        {#each menuItems as menuItem}
        <NavbarMenuItem {...menuItem} width={width} />
        {/each}
    </div>
</div>

<style lang="postcss">
    .container {
        position: relative;
        z-index: 10;
        background-color: white;
        user-select: none;
        position: sticky;
        top: 0px;
        height: 10vh;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .navbar-container {
        position: relative;
        height: 100%;
        display: flex;
        justify-content: center;
    }

    .stave {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .stave-line {
        height: 0.07vh;
        margin: 0.29vh 0;
        background-color: black;
    }

    .clef {
        position: absolute;
        left: -1%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
    }

    .clef > img {
        height: 75%;
    }
</style>