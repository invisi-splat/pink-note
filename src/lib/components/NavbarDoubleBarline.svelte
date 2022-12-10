<script lang="ts">
    export let left: number;
</script>

<div class="double-bar-line-container" style:left="{left}%"> <!-- change according to menu spacing -->
    <div class="double-bar-line">
        <div class="single-bar-line"></div>
        <div class="single-bar-line"></div>
    </div>
</div>

<style lang="postcss">
    .double-bar-line-container {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        width: 1.5%
    }

    .double-bar-line {
        display: flex;
        justify-content: center;
        height: 2.65vh; /* must be same as 5 ".stave-line"s; this is what centres the barline */
        width: 100%;
    }
    
    .single-bar-line {
        height: 100%;
        width: 5%;
        margin: 0 4%;
        background-color: black;
    }
</style>