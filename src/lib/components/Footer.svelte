<div class="rel-container">
    <div class="container">
        <div class="credits">
            <div class="credits-title">Credits and acknowledgements</div>
            <div><a href="https://www.freepik.com/free-photo/paperboard-simple-fiber-dusty-texture_1040136.htm#query=cork%20texture&position=2&from_view=keyword">Corkboard texture by tirachard</a> on Freepik</div>
            <div>Concrete texture from <a href="https://architextures.org/create">architextures.org</a></div>
            <div>Title mugshots provided by Jessica Macfarlane</div>
            <div>Pinhead image from <a href="https://www.nicepng.com/ourpic/u2e6y3u2q8w7w7i1_pin-metal-set-on-pinterest-nail-head-clipart/" target="_blank" rel="noreferrer">nicepng.com</a></div>
            <a href=https://www.pngmart.com/image/320030 target="_blank" rel="noreferrer">Whiteboard Vector PNG Photos</a>
            <div>LCD Display from <a href="https://uk.rs-online.com/web/p/lcd-monochrome-displays/5326408">rs-online.com</a></div>
        </div>
        <div class="footer-text">
            <div>Website made with ❤️, a little bit of 💦, not much 💤, and a whole lot of 🎵 by Bowen Zhu, GG.</div>
            <a href="https://github.com/invisi-splat/pink-note">GitHub repo</a>
        </div>
    </div>
</div>

<style lang="postcss">
    a {
        display: inline;
        text-decoration: underline;
    }

    .rel-container {
        position: relative; /* so that I can apply position absolute to the inside */
    }

    .container {
        width: 100vw;
        height: 25vh;
        padding-top: 2vh;
        background-image : linear-gradient(to top, 
                    rgba(0, 0, 0, 0.485) 95%, 
                    rgba(0, 0, 0, 0));
        position: absolute;
        bottom: 25vh;
        z-index: 999999;
        display: flex;
        justify-content: space-around;
        color: white;
        font-weight: 300;
        margin-bottom: -25vh;
    }
    a {
        color: white;
    }

    .credits {
        flex-basis: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .footer-text {
        flex-basis: 30%;
        font-style: italic;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: right;
    }

    .credits-title {
        font-weight: 600;
    }
</style>