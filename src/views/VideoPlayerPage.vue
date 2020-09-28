<template>
    <VideoPlayer :video_src="videoSrc"/>
</template>

<script>

    import VideoPlayer from "../components/VideoPlayer";

    export default {
        name: "VideoPlayerPage",
        components: {VideoPlayer},
        computed:{
            videoSrc() {
                return this.$route.params.videoSrc;
            }
        }
    }
</script>

<style scoped>

</style>