<template>
    <VideoPlayer :video_src="videoSrc" :video_name="videoName"/>
</template>

<script>

    import VideoPlayer from "../components/VideoPlayer";

    export default {
        name: "VideoPlayerPage",
        components: {VideoPlayer},
        computed:{
            videoSrc() {
                return this.$route.params.videoSrc;
            },
            videoName() {
                return this.$route.params.videoName;
            }
        }
    }
</script>

<style scoped>

</style>