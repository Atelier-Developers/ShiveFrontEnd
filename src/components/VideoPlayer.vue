<template>
  <div class="video-comment">
    <div
        class="video-player"
        v-on:mousemove="mouse_move"
        v-on:mouseup="video_player_mouse_up"
        v-on:keydown="video_player_key_press"
        v-on:click="video_player_click"
        autofocus
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
          v-on:dblclick="fullscreen_click"
      >
        <source :src="video_src" type="video/mp4">
      </video>
      <div v-if="!this.full_screen_toggle" class="open-comment" v-on:click="open_comments">
        <v-icon color="white">comment</v-icon>
      </div>
      <div v-if="!this.full_screen_toggle" class="comments in-player">
        <div class="comment-close">
          <v-icon color="white" v-on:click="close_comments">close</v-icon>
        </div>
        <div class="comment" v-for="comment in this.active_comments">
          <div class="comment-name">{{ comment.name }}</div>
          <div class="comment-time">{{ to_time(parseInt(comment.time)) }}</div>
          <v-divider/>
          <div class="comment-text">
            {{ comment.text }}
          </div>
        </div>
        <div v-if="active_comments.length == 0">
          منتظر کامنت‌های بعدی باشید...
        </div>
      </div>
      <div class="progress-bar">
        <div class="fullscreen">
          <v-icon color="white" v-if="full_screen_toggle" v-on:click="fullscreen_click">fullscreen</v-icon>
          <v-icon color="white" v-else v-on:click="fullscreen_click">fullscreen_exit</v-icon>
        </div>
        <div class="bar" v-on:click="click_bar">
          <div class="time">
            <div class="pass">00:00</div>
            <div class="slash">/</div>
            <div class="length">00:00</div>
          </div>
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
    <div class="comments" v-if="this.full_screen_toggle">
      <div class="comment" v-for="comment in this.active_comments">
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

// Define the component in class-style
@Component
export default class VideoPlayer extends Vue {
  video_src = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4';
  video_elem = null;

  play_pause_toggle = false;
  holding_progress_handler = false;
  new_seek_time = -1;
  progress_elems = null;
  progress_bar_timeout = null;
  time = 0;
  duration = 0;
  full_screen_toggle = true;
  active_comments = []
  comment_measures = {
    open: 0,
    close: 0,
  }
  comments = [
    {
      pk: 1,
      name: 'کیر خان',
      time: 10,
      text: 'امروز ایرنا خبر داده است: سازمان هواپیمایی عراق امروز (پنجشنبه) با انتشار بیانیه ای اعلام کرد که از فردا جمعه (بیست و پنجم سپتامبر-چهارم مهرماه) تا (هشتم اکتبر-هفدهم مهرماه) همه پروازها از عراق به ایران و برعکس لغو خواهد شد.'
    },
    {
      pk: 2,
      name: 'کص خان',
      time: 11,
      text: 'امروز ایرنا خبر داده است: سازمان هواپیمایی عراق امروز (پم کرد که از فردا جمعه (بیست و پنجم سپتامبر-چهارم د شد.'
    },
    {
      pk: 3,
      name: 'کون خان',
      time: 12,
      text: 'امروز ایرنا خبر داده است: سازمان هواپیمایی عراق امروز (پنجشنبه) با انتشار بیانیه ای اعلام کرد که از فردا جمعه (بیست و پنجم سپتامبر-چهارم مهرماه) تا (هشتم اکتبر-هفدهم مهرماه) همه پروازها از عراق به ایران و برعکس لغو خواهد شد. امروز ایرنا خبر داده است: سازمان هواپیمایی عراق امروز (پنجشنبه) با انتشار بیانیه ای اعلام کرد که از فردا جمعه (بیست و پنجم سپتامبر-چهارم مهرماه) تا (هشتم اکتبر-هفدهم مهرماه) همه پروازها از عراق به ایران و برعکس لغو خواهد شد.'
    },
    {
      pk: 4,
      name: 'کص خان',
      time: 11,
      text: 'امروز ایرنا خبر داده است: سازمان هواپیمایی عراق امروز (پم کرد که از فردا جمعه (بیست و پنجم سپتامبر-چهارم د شد.'
    },
    {
      pk: 5,
      name: 'کص خان',
      time: 11,
      text: 'امروز ایرنا خبر داده است: سازمان هواپیمایی عراق امروز (پم کرد که از فردا جمعه (بیست و پنجم سپتامبر-چهارم د شد.'
    },
  ]

  low_com = 0;

  mounted() {
    this.player.play();
    this.comments.sort(function (a, b) {
      return a.time - b.time;
    });
    console.log(this.comments);
  }

  get player() {
    if (this.video_elem)
      return this.video_elem;
    else {
      this.video_elem = document.getElementById('video-player');
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
        progress_bar: document.querySelector('.video-player .progress-bar'),
        complete: document.querySelector('.video-player .progress-bar .complete'),
        handler: document.querySelector('.video-player .progress-bar .handler'),
        time_pass: document.querySelector('.video-player .progress-bar .pass'),
        length: document.querySelector('.video-player .progress-bar .length'),
      }
    return this.progress_elems
  }

  get in_player_comment() {
    return document.querySelector('.video-player .in-player');
  }

  get in_player_open_comment() {
    return document.querySelector('.video-player .open-comment');
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
  }

  video_time_update() {
    this.time = this.player.currentTime;
    let percentage = this.time / this.video_length * 100;
    this.progress.complete.style.width = percentage + '%';
    this.progress.handler.style.left = percentage + '%';
    this.progress.time_pass.innerText = this.to_time(parseInt(this.time));
    this.progress.length.innerText = this.to_time(parseInt(this.video_elem.duration))
    this.check_comments(this.player.currentTime);
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
    this.progress.progress_bar.style.opacity = 1;
    if (this.holding_progress_handler) {
      let left_offset = this.find_left_offset(this.progress.complete);
      let left = ev.clientX - left_offset;
      if (0 <= left && left <= this.progress.handler.parentElement.offsetWidth)
        this.progress.handler.style.left = left + 'px';
      this.new_seek_time = left;
    }
    if (this.progress_bar_timeout)
      clearTimeout(this.progress_bar_timeout);
    this.progress_bar_timeout = setTimeout(function (elem) {
      elem.progress_bar.style.opacity = 0;
    }, 1000, this.progress)
  }

  video_player_key_press(ev) {
    console.log(ev);
  }

  video_player_click(ev) {

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

  to_time(time) {
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
      this.video_elem.parentElement.requestFullscreen();
    else
      document.exitFullscreen();
    this.full_screen_toggle = !this.full_screen_toggle;
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

  check_comments(time) {
    for (let i = this.low_com; i < this.comments.length; i++) {
      if (Math.abs(this.comments[i].time - time) < 1) {
        this.active_comments.push(this.comments[i]);
        this.low_com += 1;
      }
    }

    for (let i = 0; i < this.active_comments.length; i++) {
      if (Math.abs(this.active_comments[i].time - time + 5) < 1) {
        this.active_comments.splice(i, 1);
      }
    }
  }

}
</script>

<style scoped>
.bar {
  position: relative;
  width: 100%;
  margin: 0 20px;
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
  max-width: 700px;
  position: relative;
  background-color: black;
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
  bottom: 0px;
  right: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 15px 12px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2) 42%, rgba(0, 0, 0, 0.7));
  color: white;
  transition: 1s;
}

.video-player .progress-bar .time {
  display: flex;
  position: absolute;
  flex-direction: row-reverse;
  bottom: 15px;
  font-size: 14px;
  left: -5px;
}

.video-player .back-ground-overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.video-comment .comments {
  padding: 5px 10px;
}

.video-comment .comments.in-player {
  background-color: rgba(255, 255, 255, 0.47);
  overflow-y: scroll;
  position: absolute;
  width: 30%;
  height: 100%;
  right: 0;
  transition: 0.5s;
  box-shadow: 0 0 10px rgb(27 18 18);
}

.video-comment .comment {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 5px;
  margin: 10px 5px;
  padding: 5px 10px;
  opacity: 1;
  transition: 1s;
  animation: show 0.5s, delete 0.5s 4.5s;
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
</style>