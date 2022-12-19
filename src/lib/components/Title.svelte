<script lang="ts">
    import pinboard from "$lib/assets/paperboard-simple-fiber-dusty-texture.jpg";
    import paper_texture from "$lib/assets/pink-paper-texture.jpeg";

    let y: number; // scrolled pixels
    let startTime: number; // for timer
    let endTime: number;


    // generate post-its
    export let n = 10;
    export let imgURLs: string[];


    let remainingPictures = n;
    let people: {name: string, image_url: string, top: string, left: string, rotation: string}[];
    function generatePostIts() {
        people = [];
        remainingPictures = n;
        const topWidth = 100 / Math.ceil(n / 2);
        const bottomWidth = 100 / Math.floor(n / 2);
        for (let i = 0; i < n; i++) {
            let top: number;
            let left: number;
            let rotation: number;
            if (i < (n / 2)) { // fiddle with these values until they look nice
                top = Math.floor(Math.random() * 15);
                left = Math.floor(Math.random() * (0.6 * topWidth)) + 0.05 * topWidth + topWidth * i;
            } else {
                top = Math.floor(Math.random() * 15) + 55;
                left = Math.floor(Math.random() * (0.6 * bottomWidth)) + 0.05 * bottomWidth + bottomWidth * (i - Math.ceil(n / 2));
            }
            rotation = Math.floor(Math.random() * 30) - 15;
            people.push({
                name: "title image",
                image_url: imgURLs[i],
                top: String(top) + "%",
                left: String(left) + "%",
                rotation: String(rotation) + "deg"
            });
        };
    };

    // post-it fall handler (funny how that works)
    function postItFallHandler(event: Event) {
        let target = event.target as HTMLElement;
        if (target.tagName === "IMG" && target.parentElement != null) { // handle image click
            target = target.parentElement;
        } else if (target.parentElement == null) { // shouldn't happen
            throw "Error: No div parent"
        }
        if (target) {
            target.classList.add("fall-class");
            setTimeout(() => {
                target.style.display = "none";
            }, 1000);
            remainingPictures -= 1
        }
    }

    $: {
        if (remainingPictures === n - 1) { // timer logic
            startTime = Date.now();
        }
        if (remainingPictures === 0) {
            endTime = Date.now();
        }
    }
    generatePostIts();
</script>

<svelte:window bind:scrollY={y} />

<div class="pink-note-title-container" style:top="{0.6 * y}px"> <!-- parallax -->
    <div class="pink-note-title-pinboard" style="--bg-img: url('{pinboard}')">
        <div class="pink-note-title" class:fancy-title="{remainingPictures === 0}">PINK  NOTE</div>
    </div>
    <div class="pink-note-title-images">
        {#each people as { name, image_url, top, left, rotation}}
            <div class="pink-note-title-post-it"
                style:top style:left style:transform="rotate({rotation})" style:background-image="url({paper_texture})"
                on:click={postItFallHandler}
                on:keydown={postItFallHandler} >
                <img src={image_url} alt={name} draggable="false" />
            </div>
        {/each}
    </div>
    <div class="pink-note-title-timer" class:pink-note-title-visible={endTime}>{(endTime - startTime) / 1000}s</div>
</div>

<!-- make this responsive on mobile !!-->

<style lang="postcss">
    .pink-note-title-container {
        height: 50vh; /* i <3 vh */
        position: relative;
        z-index: 1;
    }

    .pink-note-title-pinboard {
        background-image: var(--bg-img);
        background-size: cover;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .pink-note-title {
        font-weight: 600;
        font-size: 11vw;
        color: white;
        letter-spacing: 1vw;
        user-select: none;
        isolation: isolate;
        white-space: pre;
        text-shadow: 0px 0px rgba(0, 0, 0, 0.1);
        transition: color 1s, text-shadow 1s;
    }

    .fancy-title {
        color: #ee6f8e;
        text-shadow: 5px 5px rgba(0, 0, 0, 0.1);
    }


    @keyframes fall {
        0% {transform: rotate(10deg)}
        100% {transform: rotate(360deg); top: 200%}
    }

    :global(.fall-class) {
        animation: fall 1s ease-in !important;
        pointer-events: none !important;
    }
    .pink-note-title-images {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
        top: 0px;
        overflow: hidden;
    }
    .pink-note-title-post-it {
        width: 10%;
        aspect-ratio: 1 / 1;
        padding: 2%;
        position: absolute;
        z-index: 10;
        box-shadow: -2px 5px 4px rgba(0, 0, 0, 0.1);
        background-size: cover;
        cursor: pointer;
        transform: rotate(0deg);
        transition: transform 0.5s;
        display: inline-block;
    }
    .pink-note-title-post-it:hover {
        transform: rotate(10deg) !important;
    }
    .pink-note-title-post-it img {
        object-fit: contain;
        filter: grayscale(40%);
        border: 3px solid white;
        user-select: none;
    }

    .pink-note-title-timer {
        position: absolute;
        bottom: 5%;
        right: 5%;
        opacity: 0;
        font-size: 150%;
        font-weight: 450;
        font-style: italic;
        transition: opacity 2s;
        pointer-events: none;
    }

    .pink-note-title-visible {
        opacity: 0.3;
        pointer-events: all;
    }
</style>