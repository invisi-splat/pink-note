<script lang="ts">
    export let browserName: string;
</script>

<div class="container">
    <div class="message">
        Just a quick warning: it seems that you're using {browserName} to view Pink Note. The site has been developed using Chrome, so if there are any weird graphical bugs, it's likely due to cross-browser incompatibilities and the like. If you find any weird stuff, please let me (Bowen) know.
    </div>
</div>

<style lang="postcss">
    .container {
        width: 100%;
        position: relative;
        min-height: 10vh;
        padding: 5vh 10%;
        text-align: center;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.3);
    }
</style>