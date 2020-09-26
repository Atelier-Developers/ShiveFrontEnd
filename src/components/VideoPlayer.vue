<template>
  <div
      class="video-player"
      v-on:mousemove="mouse_move"
      v-on:mouseup="video_player_mouse_up"
      v-on:keydown="video_player_key_press"
      v-on:click="video_player_click"
      autofocus
  >
    <video
        v-on:click="pause_play_click"
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
        <div class="bar" v-on:click="click_bar">
          <div class="complete"></div>
          <div class="handler" v-on:mousedown="handler_mouse_down">
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
  holding_progress_handler = false;
  new_seek_time = -1;
  progress_elems = null;
  time = 0;


  get player() {
    if (this.video_elem)
      return this.video_elem;
    else {
      this.video_elem = document.getElementById('video-player');
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

  handler_mouse_down() {
    this.holding_progress_handler = true;
  }

  video_player_mouse_up() {
    if (this.holding_progress_handler) {
      this.holding_progress_handler = false;
      this.new_seek_time = this.new_seek_time / this.progress.handler.parentElement.offsetWidth * this.video_length;
      this.player.currentTime = this.new_seek_time;
    }
  }

  mouse_move(ev) {
    if (this.holding_progress_handler) {
      let left_offset = this.find_left_offset(this.progress.complete);
      let left = ev.clientX - left_offset;
      if (0 <= left && left <= this.progress.handler.parentElement.offsetWidth)
        this.progress.handler.style.left = left + 'px';
      this.new_seek_time = left;
    }
  }

  video_player_key_press(ev) {
    console.log(ev);
  }

  video_player_click(ev) {
    setTimeout(() => {
      document.getElementsByClassName('video-player')[0].focus();
    },10);
  }

  find_left_offset(elem) {
    let offset = 0
    while (elem) {
      offset += elem.offsetLeft;
      elem = elem.parentElement;
    }
    return offset;
  }

  click_bar(ev) {
    let left_offset = this.find_left_offset(this.progress.handler.parentElement);
    let left = ev.clientX - left_offset;
    this.new_seek_time = left / this.progress.handler.parentElement.offsetWidth * this.video_length;
    this.player.currentTime = this.new_seek_time;
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

.video-player {
  height: 400px;
  position: relative;
  width: fit-content;
  background-color: black;
}

.video-player:focus {
  box-shadow: 0 0 20px black !important;
}

.video-player {
  user-select: none;
}

.video-player #video-player {
  position: relative;
  height: 100%;
}

.video-player .progress-bar {
  position: absolute;
  bottom: 0px;
  right: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 15px 12px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2) 42%, rgba(0, 0, 0, 0.7));
  color: white;
}

.video-player .progress-bar .time {
  display: flex;
  flex-direction: row-reverse;
}
</style>