<div class="end-bar-line-container" style:right="0%"> <!-- change according to menu spacing -->
    <div class="end-bar-line">
        <div class="single-bar-line"></div>
        <div class="single-bar-line thick"></div>
    </div>
</div>

<style lang="postcss">
    .end-bar-line-container {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        width: 1.5%
    }

    .end-bar-line {
        display: flex;
        justify-content: right;
        height: 2.65vh; /* must be same as 5 ".stave-line"s */
        width: 100%;
    }
    
    .single-bar-line {
        height: 100%;
        width: 5%;
        margin: 0 3%;
        background-color: black;
    }

    .single-bar-line.thick {
        width: 12%;
    }
</style>