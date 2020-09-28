<template>
  <v-container>
    <v-row justify="center" class="mx-sm-15 mx-3">
      <v-card>
        <v-card-title>{{ videoName }}</v-card-title>
        <v-card-text>
          <v-container>
            <v-row justify="center">
              <v-col cols="12">
                <VideoPlayer :video_src="videoSrc"/>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import VideoPlayer from "../components/VideoPlayer";

export default {
  name: "VideoPlayerPage",
  components: {VideoPlayer},
  computed: {
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