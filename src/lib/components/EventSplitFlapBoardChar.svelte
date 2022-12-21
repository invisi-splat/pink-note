<script lang="ts">
	import { onMount } from "svelte";
    import { flipReset } from "../../routes/stores";

    // components are split like this to allow each char to have its own "flip" function
    // TODO check for lag; optimise for slower computers (this already takes up 15% of a 3080)
    // TODO make flip speed customisable
    export let showChar = "a";
    export let speed = 100;

    let charDiv: HTMLDivElement;

    const chars: string[] = " abcdefghijklmnopqrstuvwxyz1234567890!\"#$%&')*+,-./:;<=>?@[\\]^_`{|}~".split("");
    let charPos = 0;
    let divs: HTMLCollectionOf<HTMLDivElement>;

    let newTopFlip = false;
    let bottomFlip = false;
    let newTopAnimate = false;
    let bottomAnimate = false;

    function flip() {
        bottomAnimate = true;
        newTopAnimate = true;
        setTimeout(() => {bottomFlip = true}, 1);
        setTimeout(() => {newTopFlip = true}, speed + 1);
        setTimeout(() => {
            bottomAnimate = false;
            newTopAnimate = false;
            charPos = charPos + 1;
            divs[0].innerHTML = chars[charPos];
            divs[1].innerHTML = chars[charPos];
            divs[2].innerHTML = chars[charPos + 1];
            divs[3].innerHTML = chars[charPos + 1];
            bottomFlip = false;
            newTopFlip = false;
        }, 2 * speed + 1);
    }

    function find(char: string) {
        let index = chars.indexOf(char) || 0;
        let diff = index - charPos;
        diff = diff < 0 ? diff + chars.length : diff;
        for (let i = 0; i < diff; i++) {
            setTimeout(() => { flip() }, i * (2.1 * speed + 1)); // 2.1 to create leeway between each flip
        }
    }

    onMount(() => {
        divs = charDiv.getElementsByTagName("div");
        let options = {
            rootMargin: '0px',
            threshold: 1.0
        };
        let observer = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                find(showChar);
                observer.disconnect();
            }
        }, options);
        observer.observe(charDiv);
    })

    function reset() {
        charPos = 0;
        find(showChar);
    }

    $: {
        if ($flipReset) {
            reset();
        }
    };
</script>

<div class="char-container" on:click={flip} bind:this={charDiv}>
    <div class="char top">{chars[charPos]}</div>
    <div class="char bottom" style="--speed: {speed}ms" class:flip={bottomFlip} class:animate={bottomAnimate}>{chars[charPos]}</div>
    <div class="char new-top" style="--speed: {speed}ms" class:flip={newTopFlip} class:animate={newTopAnimate}>{chars[(charPos + 1) % chars.length]}</div>
    <div class="char new-bottom">{chars[(charPos + 1) % chars.length]}</div>
</div>

<style lang="postcss">
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500&display=swap');
    .char-container {
        font-size: 2.2vw;
        width: 1.7vw;
        height: 3.5vw;
        color: white;
        font-family: "Barlow Condensed";
        text-transform: uppercase;
        box-shadow: inset 2px 3px 3px black;
        position: relative;
        border-radius: 4px;
        cursor: pointer;
    }

    .char {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(37, 37, 37);
        box-shadow: inset 2px 3px 3px black;
        border: 1px solid black;
        user-select: none;
        will-change: transform;
    }

    .top {
        position: relative;
        clip-path: polygon(0 0, 0 50%, 1.7vw 50%, 1.7vw 0);
        z-index: 2;
    }

    .bottom {
        position: absolute;
        top: 0%;
        clip-path: polygon(0 50%, 0 100%, 1.7vw 100%, 1.7vw 50%);
        transform: scale(1);
        z-index: 2;
    }

    .bottom.animate {
        transition: transform var(--speed) ease-in;
    }

    .bottom.flip {
        transform: scale(1, 0);
    }

    .new-top {
        position: absolute;
        top: 0%;
        clip-path: polygon(0 0, 0 50%, 1.7vw 50%, 1.7vw 0);
        transform: scale(1, 0);
        z-index: 3;
    }

    .new-top.animate {
        transition: transform var(--speed) ease-out;
    }

    .new-top.flip {
        transform: scale(1, 1);
    }

    .new-bottom {
        position: absolute;
        top: 0%;
        clip-path: polygon(0 50%, 0 100%, 1.7vw 100%, 1.7vw 50%);
        z-index: 1;
    }

    .char-container::after {
        content: "";
        position: absolute;
        top: 50%;
        width: 1.7vw;
        height: 0.2vh;
        background-color: rgb(15, 15, 15);
    }
</style>