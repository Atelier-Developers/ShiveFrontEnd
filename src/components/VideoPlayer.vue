<template>
  <div class="video-player" v-on:click="pause_play_click">
    <video
        class="video"
        id="video-player"
        v-on:timeupdate="video_time_update"
    >
      <source :src="video_src" type="video/mp4">
    </video>
    <div class="bottom-menu">
      <div class="progress-bar">
        <div class="time">
          <div class="pass">00:00</div>
          <div class="slash">/</div>
          <div class="length">00:00</div>
        </div>
        <div class="bar">
          <div class="complete"></div>
          <div class="handler">
            <div class="handler-center"></div>
          </div>
        </div>
        <div class="play-pause">
          <v-icon color="white" v-if="!play_pause_toggle" v-on:click="pause_play_click">pause</v-icon>
          <v-icon color="white" v-else v-on:click="pause_play_click">play_arrow</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

// Define the component in class-style
@Component
export default class VideoPlayer extends Vue {
  video_src = 'http://techslides.com/demos/sample-videos/small.mp4';
  video_elem = null;

  play_pause_toggle = true;
  progress_elems = null;
  time = 0;

  get player() {
    if (this.video_elem)
      return this.video_elem;
    else {
      this.video_elem = document.getElementById('video-player');
      console.log(this.video_elem);
      console.log(this.video_elem.duration);
      this.progress.length.innerHTML = parseInt(this.video_elem.duration);
    }
    return this.video_elem;
  }

  get video_length() {
    return this.player.duration;
  }

  get progress() {
    if (this.progress_elems)
      return this.progress_elems
    else
      this.progress_elems = {
        complete: document.querySelector('.video-player .progress-bar .complete'),
        handler: document.querySelector('.video-player .progress-bar .handler'),
        time_pass: document.querySelector('.video-player .progress-bar .pass'),
        length: document.querySelector('.video-player .progress-bar .length'),
      }
    return this.progress_elems
  }

  pause_play_click() {
    if (this.play_pause_toggle)
      this.player.play();
    else
      this.player.pause();
    this.play_pause_toggle = !this.play_pause_toggle;
  }

  video_time_update() {
    this.time = this.player.currentTime;
    let percentage = this.time / this.video_length * 100;
    this.progress.complete.style.width = percentage + '%';
    this.progress.handler.style.left = percentage + '%';
    this.progress.time_pass.innerHTML = parseInt(this.time);
  }
}
</script>

<style scoped>
.bar {
  position: relative;
  width: 500px;
  height: 10px;
  background-color: #606060;
}

.complete {
  position: absolute;
  background-color: red;
  height: 100%;
  width: 0;
  left: 0;
}

.handler {
  position: absolute;
  height: 22px;
  width: 22px;
  background-color: white;
  border-radius: 100%;
  box-shadow: 0 0 5px #515151;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
}

.handler-center {
  position: absolute;
  height: 11px;
  width: 11px;
  background-color: red;
  border-radius: 100%;
  box-shadow: inset 0 0 3px #515151;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.video-player{
  height: 400px;
  position: relative;
  width: fit-content;
  background-color: black;
}

.video-player #video-player{
  position: relative;
  height: 100%;
}
.video-player .progress-bar{
  position: absolute;
  bottom: 0px;
  right: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 15px 12px;
  background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.2) 42%, rgba(0,0,0,0.7)) ;
  color: white;
}
.video-player .progress-bar .time{
  display: flex;
  flex-direction: row-reverse;
}
</style>