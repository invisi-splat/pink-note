<script lang="ts">
    import minimStemUp from "$lib/assets/minimStemUp.png";
    import minimStemUpLedger from "$lib/assets/minimStemUpLedger.png";
    import crotchetStemUp from "$lib/assets/crotchetStemUp.png";
    import crotchetStemUpLedger from "$lib/assets/crotchetStemUpLedger.png"
    
    export let name: string;
    export let url: string;
    export let active: boolean;
    export let ledger: boolean;
    export let bottom: number;
    export let width: number;

    function handleMouseenter(e: Event) {
        let container = e.target as HTMLDivElement;
        let nodeContainer = container.firstChild as HTMLDivElement;
        let name = container.lastChild as HTMLDivElement;
        if (nodeContainer) {
            nodeContainer.style.transform = "rotate(10deg)";
        }
        if (name) {
            name.style.color = "rgba(0, 0, 0, 1)";
        }
    }

    function handleMouseleave(e: Event) {
        let container = e.target as HTMLDivElement;
        let nodeContainer = container.firstChild as HTMLDivElement;
        let name = container.lastChild as HTMLDivElement;
        if (nodeContainer) {
            nodeContainer.style.transform = "rotate(0deg)";
        }
        if (name) {
            name.style.color = "";
        }
    }
</script>

<!-- TODO add smooth page transitions -->

<div class="container" style:width="{width}%" on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave}>
    <a href={url} class="note-container">
        <div class="note" style:bottom="{bottom}vh"><img src={ledger ? (active ? crotchetStemUpLedger : minimStemUpLedger) : (active ? crotchetStemUp : minimStemUp)} alt="minim" /></div>
    </a>
    <a href={url} class="name" class:active>{name}</a>
</div>

<style lang="postcss">
    .container {
        position: relative;
        height: 100%;
        flex-grow: 1;
        cursor: pointer;
    }

    .note-container {
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transform: rotate(0deg);
        transition: transform 0.3s;
    }

    .note {
        height: 25%;
        text-align: center;
        position: relative;
    }

    .note img {
        height: 100%;
        display: inline-block;
    }

    .name {
        height: 30%;
        position: relative;
        bottom: 32%;
        text-align: center;
        text-transform: lowercase;
        font-family: Baskerville, 'Times New Roman', Times, serif;
        font-weight: 500;
        font-size: 120%;
        color: rgba(0, 0, 0, 0.7);
    }

    .name.active {
        color: rgba(0, 0, 0, 1);
    }
</style>