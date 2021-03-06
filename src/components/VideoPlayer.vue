<template>
  <div class="video-comment px-5 py-5">
    <div
        class="video-player"
        v-on:mousemove="mouse_move"
        v-on:mouseup="video_player_mouse_up"
    >
      <div class="back-ground-overlay"
           v-on:click="pause_play_click"
           v-on:dblclick="fullscreen_click"
      ></div>
      <video
          v-on:click="pause_play_click"
          v-on:ended="video_end"
          class="video"
          id="video-player"
          v-on:timeupdate="video_time_update"
          v-on:seeked="video_seeked"
          v-on:dblclick="fullscreen_click"
          v-on:loadstart="loading_video"
          v-on:waiting="loading_video"
          v-on:canplay="load_end"
          v-on:loadedmetadata="meta"
          :autoplay="true"
      >
        <source :src="video_src">
      </video>
      <div v-if="!this.full_screen_toggle" class="open-comment" v-on:click="open_comments">
        <v-icon color="white">comment</v-icon>
      </div>
      <div v-if="!this.full_screen_toggle" class="comments in-player">
        <div class="comment-close">
          <v-icon color="white" v-on:click="close_comments">close</v-icon>
        </div>
        <div class="comment" v-for="comment in this.active_comments" :key="comment.pk">
          <div class="comment-name">{{ comment.name }}</div>
          <div class="comment-time">{{ to_time(parseInt(comment.time)) }}</div>
          <v-divider/>
          <div class="comment-text">
            {{ comment.text }}
          </div>
        </div>
        <div v-if="active_comments.length === 0">
          منتظر کامنت‌های بعدی باشید...
        </div>
      </div>
      <div v-if="play_pause_toggle" class="open-write" v-on:click="open_write">
        <v-icon color="white">add_comment</v-icon>
      </div>

      <div class="time">
        <div class="pass">00:00</div>
        <div class="slash">/</div>
        <div class="length">00:00</div>
      </div>
      <div class="progress-bar">
        <div class="mini-comments">
          <div class="mini-comment" v-for="comment in this.comments" :key="comment.pk">
            <div class="mini-comment-icon" v-on:click="go_to_comment_time(comment.time)">
            </div>
            <div class="mini-comment-box">
              <div class="mini-comment-text">
                <b>{{ comment.name }}:</b> {{ comment.text }}
              </div>
            </div>
          </div>
        </div>
        <div class="fullscreen">
          <v-icon color="white" v-if="full_screen_toggle" v-on:click="fullscreen_click">fullscreen</v-icon>
          <v-icon color="white" v-else v-on:click="fullscreen_click">fullscreen_exit</v-icon>
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
      <div class="video-loading">
        <div class="load-item"></div>
        <div class="load-item"></div>
        <div class="load-item"></div>
        <div class="load-item"></div>
        <div class="load-item"></div>
      </div>
      <div v-if="this.play_pause_toggle" class="write-comment">
        <div class="write-close" v-on:click="close_write">
          <v-icon color="white">close</v-icon>
        </div>
        <div class="comment-input">
          <v-textarea
              v-model="new_comment"
              label="نظر شما"
          ></v-textarea>
        </div>
        <div class="write-options">
          <!--          <div>-->
          <!--            <v-checkbox-->
          <!--                v-model="new_comment.all"-->
          <!--                label="برای کل ویدیو ثبت شود؟"-->
          <!--            ></v-checkbox>-->
          <!--          </div>-->
          <div class="send-btn">
            <v-btn
                elevation="2"
                v-on:click="postComment"
            >ثبت
            </v-btn>
          </div>

        </div>
      </div>
    </div>
    <div class="comments">
      <div class="comment my-3" v-for="comment in this.comments" :key="comment.pk">
        <div class="comment-name">{{ comment.name }}</div>
        <div class="comment-time">{{ to_time(parseInt(comment.time)) }}</div>
        <v-divider/>
        <div class="comment-text">
          {{ comment.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios';
import {GET_ANNOUNCEMENTS, GET_COMMENTS_FOR_VIDEO, POST_COMMENT, POST_COMMENT_FOR_VIDEO} from "../network/API";


const VideoPlayerProps = Vue.extend({
  props: {
    video_src: String,
    id: Number,
  }
})

// Define the component in class-style
@Component
export default class VideoPlayer extends VideoPlayerProps {
  play_pause_toggle = false;
  holding_progress_handler = false;
  new_seek_time = -1;
  progress_elems = null;
  progress_bar_timeout = null;
  time = 0;
  duration = 0;
  full_screen_toggle = true;
  new_comment = '';
  active_comments = []
  comments = [];
  comment_measures = {
    open: 0,
    close: 0,
  };
  write_measures = {
    open: 0,
    close: 0,
  }
  low_com = 0;
  mini_com_set = false;
  first_time_play = true;

  mounted() {
    this.getCommentsForVideo();
    let delta = 0.125;
    for (let i = 0; i < this.loading.children.length; i++) {
      this.loading.children[i].style.animationDelay = (-1.125 + delta * i) + 's';
    }
  }

  get player() {
    return document.getElementById('video-player')
  }

  get video_length() {
    return this.player.duration;
  }

  get progress() {
    return this.progress_elems = {
      bar: document.querySelector('.video-player .progress-bar .bar'),
      progress_bar: document.querySelector('.video-player .progress-bar'),
      complete: document.querySelector('.video-player .progress-bar .complete'),
      handler: document.querySelector('.video-player .progress-bar .handler'),
      time_pass: document.querySelector('.video-player .pass'),
      length: document.querySelector('.video-player .length'),
    }
  }

  get in_player_comment() {
    return document.querySelector('.video-player .in-player');
  }

  get in_player_open_comment() {
    return document.querySelector('.video-player .open-comment');
  }

  get loading() {
    return document.querySelector('.video-player .video-loading');
  }

  video_end() {
    this.play_pause_toggle = true;
  }

  pause_play_click() {
    if (this.play_pause_toggle)
      this.player.play();
    else
      this.player.pause();
    this.play_pause_toggle = !this.play_pause_toggle;

    setTimeout(function (player) {
      let mini_comments = document.querySelectorAll('.video-player .mini-comments .mini-comment')
      for (let i = 0; i < mini_comments.length; i++) {
        mini_comments[i].style.display = 'block';
        mini_comments[i].style.left =
            ((parseFloat(player.comments[i].time))
                / player.player.duration * document.querySelector('.video-player .progress-bar .bar').offsetWidth
                + document.querySelector('.video-player .progress-bar .bar').offsetLeft) + 'px';
      }
    }, 100, this)

  }

  video_time_update() {
    this.time = this.player.currentTime;
    let percentage = this.player.currentTime / this.video_length * 100;
    document.querySelector('.video-player .progress-bar .complete').style.width = percentage + '%';
    if (!this.holding_progress_handler)
      document.querySelector('.video-player .progress-bar .handler').style.left = percentage + '%';
    this.progress.time_pass.innerText = this.to_time(parseInt(this.time));
    this.progress.length.innerText = this.to_time(parseInt(this.player.duration))
    this.check_comments(this.player.currentTime);
  }

  handler_mouse_down() {
    this.holding_progress_handler = true;
  }

  getCommentsForVideo() {
    let _self = this
    axios.get(GET_COMMENTS_FOR_VIDEO + this.id).then((response) => {
          _self.comments = response.data.map((j) => {
            return {
              pk: j.id,
              text: j.text,
              name: j.profile.name,
              time: j.time,
            }
          });
          _self.comments.sort(function (a, b) {
            return a.time - b.time;
          });

          setTimeout(function (player) {
            let mini_comments = document.querySelectorAll('.video-player .mini-comments .mini-comment')
            for (let i = 0; i < mini_comments.length; i++) {
              mini_comments[i].style.display = 'block';
              mini_comments[i].style.left =
                  ((parseFloat(player.comments[i].time))
                      / player.player.duration * document.querySelector('.video-player .progress-bar .bar').offsetWidth
                      + document.querySelector('.video-player .progress-bar .bar').offsetLeft) + 'px';
            }
          }, 100, this)

        }
    )
  }

  postComment() {
    axios.post(POST_COMMENT_FOR_VIDEO + this.id, {
      text: this.new_comment,
      time: this.player.currentTime
    }).then(() => {
      this.new_comment = '';
      this.getCommentsForVideo();
    });
  }

  meta() {
  }

  video_player_mouse_up() {
    if (this.holding_progress_handler) {
      this.holding_progress_handler = false;
      this.new_seek_time = this.new_seek_time / document.querySelector('.video-player .progress-bar .handler').parentElement.offsetWidth * this.video_length;
      this.player.currentTime = this.new_seek_time;
    }
  }

  mouse_move(ev) {
    document.querySelector('.video-player .progress-bar').style.opacity = 1;
    if (this.holding_progress_handler) {
      let left_offset = this.find_left_offset(document.querySelector('.video-player .progress-bar .complete'));
      let left = ev.clientX - left_offset;
      if (0 <= left && left <= document.querySelector('.video-player .progress-bar .handler').parentElement.offsetWidth)
        document.querySelector('.video-player .progress-bar .handler').style.left = left + 'px';
      this.new_seek_time = left;
    }
    if (this.progress_bar_timeout)
      clearTimeout(this.progress_bar_timeout);
    this.progress_bar_timeout = setTimeout(function (elem) {
      if (document.querySelector('.video-player .progress-bar'))
        document.querySelector('.video-player .progress-bar').style.opacity = 0;
    }, 1000, this.progress)
  }


  find_left_offset(elem) {
    let offset = elem.offsetLeft
    while (elem) {
      if (elem.classList.contains('v-card') && this.full_screen_toggle)
        break;
      if (elem.classList.contains('video-comment') && !this.full_screen_toggle)
        break;
      elem = elem.parentElement
      offset += elem.offsetLeft;
    }
    return offset;
  }

  click_bar(ev) {
    let left_offset = this.find_left_offset(document.querySelector('.video-player .progress-bar .handler').parentElement);
    let left = ev.clientX - left_offset;
    this.new_seek_time = left / document.querySelector('.video-player .progress-bar .handler').parentElement.offsetWidth * this.video_length;
    this.player.currentTime = parseInt(this.new_seek_time);
  }

  to_time(time) {
    if (isNaN(time))
      return "--:--";
    let hour = parseInt(time / 3600)
    time %= 3600;
    let minute = parseInt(time / 60);
    time %= 60;
    let str_time = '';
    if (hour > 0)
      str_time += hour + ':';
    str_time += (minute > 9 ? '' : '0') + minute + ':'
    str_time += (time > 9 ? '' : '0') + time;
    return str_time
  }

  fullscreen_click() {
    if (this.full_screen_toggle)
      this.player.parentElement.requestFullscreen();
    else {
      document.exitFullscreen();
    }

    this.full_screen_toggle = !this.full_screen_toggle;

    setTimeout(function (player) {
      let mini_comments = document.querySelectorAll('.video-player .mini-comments .mini-comment')
      for (let i = 0; i < mini_comments.length; i++) {
        mini_comments[i].style.display = 'block';
        mini_comments[i].style.left =
            ((parseFloat(player.comments[i].time))
                / player.player.duration * document.querySelector('.video-player .progress-bar .bar').offsetWidth
                + document.querySelector('.video-player .progress-bar .bar').offsetLeft) + 'px';
      }
    }, 100, this)
  }

  close_comments() {
    if (this.comment_measures.close === 0) {
      this.comment_measures.close = this.in_player_comment.offsetWidth + 20
    }
    document.querySelector('.video-player .in-player').style.right = '-' + (this.comment_measures.close) + 'px';
    document.querySelector('.video-player .open-comment').style.right = '0px';
  }

  open_comments() {
    if (this.comment_measures.open === 0)
      this.comment_measures.open = this.in_player_open_comment.offsetWidth + 20
    document.querySelector('.video-player .in-player').style.right = '0px';
    document.querySelector('.video-player .open-comment').style.right = '-' + (this.comment_measures.open + 20) + 'px';
  }

  close_write() {
    if (this.write_measures.close === 0) {
      this.write_measures.close = document.querySelector('.video-player .write-comment').offsetWidth + 60
    }
    document.querySelector('.video-player .write-comment').style.top = '-' + (this.write_measures.close) + 'px';
    document.querySelector('.video-player .open-write').style.top = '0px';
  }

  open_write() {
    if (this.write_measures.open === 0)
      this.write_measures.open = document.querySelector('.video-player .open-write').offsetWidth + 20
    document.querySelector('.video-player .write-comment').style.top = '20px';
    document.querySelector('.video-player .open-write').style.top = '-' + (this.write_measures.open + 20) + 'px';
  }

  check_comments(time) {
    for (let i = this.low_com; i < this.comments.length; i++) {
      if (this.active_comments.includes(this.comments[i], 0))
        continue;
      if (Math.abs(this.comments[i].time - time) < 3) {
        this.active_comments.push(this.comments[i]);
        this.low_com += 1;
      }
    }

    for (let j = 0; j < this.active_comments.length; j++) {
      if (Math.abs(this.active_comments[j].time - time) > 3) {
        this.active_comments.splice(j, 1);
      }
    }
  }


  video_seeked() {
    for (let i = 0; i < this.comments.length; i++) {
      if (Math.abs(this.comments[i].time - this.player.currentTime) < 3) {
        this.low_com = i;
        break;
      }
    }
  }

  loading_video() {
    this.loading.style.display = 'block';
  }

  load_end() {
    if (this.player.currentTime < 0.5 && this.first_time_play) {
      this.first_time_play = false;
    }
    console.log('before setting')
    this.loading.style.display = 'none';
    let mini_comments = document.querySelectorAll('.video-player .mini-comments .mini-comment')
    for (let i = 0; i < mini_comments.length; i++) {
      console.log('setttttting')
      if (this.comments[i].time > this.player.duration)
        continue;
      mini_comments[i].style.display = 'block';
      mini_comments[i].style.left =
          ((parseFloat(this.comments[i].time))
              / this.player.duration * document.querySelector('.video-player .progress-bar .bar').offsetWidth
              + document.querySelector('.video-player .progress-bar .bar').offsetLeft) + 'px';
    }


  }

  go_to_comment_time(time) {
    this.player.currentTime = time - 2;
    this.video_seeked()
  }

}
</script>

<style scoped>
.video-comment {
  width: 100%;
}

.video-player .bar {
  position: relative;
  width: 100%;
  margin: 0 20px;
  height: 10px;
  background-color: #606060;
}

.video-player .complete {
  position: absolute;
  background-color: #309fb7;
  height: 100%;
  width: 0;
  left: 0;
}

.video-player .handler {
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

.video-player .handler-center {
  position: absolute;
  height: 11px;
  width: 11px;
  background-color: #309fb7;
  border-radius: 100%;
  box-shadow: inset 0 0 3px #515151;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.video-player {
  height: 400px;
  max-width: 700px;
  position: relative;
  margin: auto auto;
  background-color: black;
  overflow: hidden;
}

.video-player:focus {
  box-shadow: 0 0 20px black !important;
}

.video-player {
  user-select: none;
}

.video-player #video-player {
  position: absolute;
  height: 100%;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}

.video-player .progress-bar {
  position: absolute;
  top: unset !important;
  bottom: 0px;
  right: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 15px 12px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2) 42%, rgba(0, 0, 0, 0.7));
  color: white;
  transition: 1s;
}

.video-player .progress-bar {
  opacity: 1;
}

.video-player .progress-bar:hover {
  opacity: 1 !important;
}

.video-player .time {
  display: flex;
  position: absolute;
  flex-direction: row-reverse;
  bottom: 55px;
  font-size: 14px;
  left: 10px;
  color: white;
}

.video-player .back-ground-overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.video-comment .comments.in-player {
  padding: 5px 10px;
}

.video-comment .comments.in-player {
  overflow-y: auto;
  position: absolute;
  width: 30%;
  height: 100%;
  margin: 10px 5px;
  right: 0;
  transition: 0.5s;
}

.video-comment .comment {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 5px;
  margin: 10px 0px;
  padding: 5px 10px;
  opacity: 1;
  transition: 1s;
  animation: show 0.5s;
  color: black;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes delete {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.video-comment .in-player .comment {
  background-color: rgba(255, 255, 255, 0.67);

}

.video-comment .comments .comment-name {
  font-weight: bold;
}

.video-comment .comments .comment-text {
  font-size: 14px;
}

.video-comment .comments .comment-time {
  font-size: 12px;
}

.video-player .comments .comment-close {
  display: flex;
  justify-content: flex-end;
}

.video-player .open-comment {
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.47);
  transition: 0.5s;
  position: absolute;
  top: 20px;
  right: -50px;
  box-shadow: 0 0 5px rgb(27 18 18);
  cursor: pointer;
}

.video-player .write-comment {
  background-color: rgba(255, 255, 255, 0.67);
  box-shadow: 0 0 10px rgb(27 18 18);
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  transition: 0.5s;
}

.video-player .write-comment .write-options {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}

.video-player .write-comment .write-options .send-btn {
  margin-left: 5px;
}

.video-player .open-write {
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.47);
  transition: 0.5s;
  position: absolute;
  top: -50px;
  left: 20px;
  box-shadow: 0 0 5px rgb(27 18 18);
  cursor: pointer;
}

.video-player .video-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateZ(0deg);
  display: none;
  animation: loading 10s infinite linear;
}

.video-player .video-loading .load-item {
  position: absolute;
  top: -50px;
  transform-origin: 0px 50px;
  left: 0;
  transform: translate(-50%, -50%) rotateZ(0deg);
  background-color: #309fb7;
  animation: loading 3s infinite;
  height: 10px;
  width: 10px;
  border-radius: 100%;
  box-shadow: 0 0 5px rgb(27 18 18);
}

@keyframes loading {
  0% {
    transform: translate(-50%, -50%) rotateZ(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateZ(360deg);
  }
}

.video-player .mini-comments {
  transition: 0.5s;
}

.video-player .mini-comment {
  position: absolute;
  bottom: 10px;
  color: black;
  font-size: 11.5px;
  transition: 0.5s;
}

.video-player .mini-comment .mini-comment-icon {
  background-color: white;
  position: absolute;
  left: 0;
  bottom: 20px;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  box-shadow: 0 0 5px rgba(27, 18, 18, 0.5);
  transition: 0.5s;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transform-origin: -50% -50%;
}

.video-player .mini-comment .mini-comment-box {
  opacity: 0;
  background-color: white;
  transition: 0.5s;
  width: 150px;
  height: 75px;
  margin-bottom: 50px;
  margin-left: -75px;
  overflow: hidden;
  text-align: justify;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(27, 18, 18, 0.5);
}

.video-player .mini-comment .mini-comment-box .mini-comment-text {
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
}


.video-player .mini-comment .mini-comment-icon:hover {
  box-shadow: 0 0 5px rgba(27, 18, 18, 1);
  transform: translate(-50%, -50%) scale(1.1);
}

.video-player .mini-comment .mini-comment-icon:hover + .mini-comment-box {
  opacity: 1;
}


</style>