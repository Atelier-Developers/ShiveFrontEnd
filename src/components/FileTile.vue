<template>
    <v-card tile>
        <div class="primary">
            <v-card-title class="primary white--text justify-center header-6">
                {{ file.name }}
            </v-card-title>
        </div>
        <v-divider/>

        <v-card-text>
             توسط: {{ file.profile.name }}
        </v-card-text>
        <v-card-text>
             سایز: {{fileSize}}
        </v-card-text>
        <v-card-text>
            تاریخ آپلود: {{fileDate}}
        </v-card-text>
        <v-card-text>
            <v-row justify="space-around" class="mx-2">
                <v-dialog v-if="isVideo" v-model="videoDialog" max-width="90vw" width="900px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mb-2"
                               v-on="on"
                               v-bind="attrs"
                               color="primary" fab small @click="videoDialog = true">
                            <v-icon color="white">play_arrow</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="justify-center">{{ file.name }}</v-card-title>
                        <v-row justify="center" no-gutters>
                            <v-col cols="12">
                                <VideoPlayer v-if="videoDialog" :video_src="file.link" :id="file.pk"/>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-dialog>
                <v-btn class="mb-2" color="primary" fab small tag="a" target="_blank" :href="file.file">
                    <v-icon class="rotated" color="white">publish</v-icon>
                </v-btn>
                <v-dialog v-model="dialog" max-width="290" persistent>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-if="isDeletable" color="red" v-bind="attrs" class="mb-2"
                               v-on="on" fab small>
                            <v-icon color="white">delete</v-icon>
                        </v-btn>
                    </template>
                    <v-card :loading="loading" :disabled="loading">
                        <v-card-title class="headline">حذف فایل</v-card-title>
                        <v-card-text>آیا از حذف این فایل مطمئن هستید؟
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary darken-1" text @click="dialog = false">انصراف</v-btn>
                            <v-btn color="error darken-1" text @click="deleteFile">حذف</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    import VueVideo from 'vue-video-module';
    import VideoPlayer from "@/components/VideoPlayer";
    import {GET_VIDEO} from "../network/API";
    import moment from "jalali-moment";

    // let Vue = require('vue');
    // let VueVideo = require('vue-video-module');

    export default {
        name: "FileTile",
        components: {VideoPlayer, VueVideo},
        props: ['file', 'isDeletable', 'deleteAction'],
        data() {
            return {
                comments: [],
                loading: false,
                dialog: false,
                videoDialog: false,
            }
        },
        methods: {
            deleteFile() {
                this.loading = true;
                this.deleteAction(this.file.pk).finally(() => {
                    this.loading = false;
                    this.dialog = false;
                })
            },
            // routeToVideoPlayer(videoPk, videoName) {
            //     this.$router.push({
            //         name: 'VideoPlayerPage', params: {
            //             videoSrc: GET_VIDEO + videoPk,
            //             videoName: videoName,
            //         }
            //     });
            // },
        },
        computed: {
            isVideo() {
                return (/\.(mp4)$/i).test(this.file.file)
            },
            videoLink() {
                return GET_VIDEO + this.file.pk;
            },
            fileSize() {
                let sizeInMB = this.file.size / 1000000;
                let sizeInString;
                if (sizeInMB < 1) {
                    sizeInMB = this.file.size / 1000;
                    sizeInString = sizeInMB.toString().slice(0, 5);
                    sizeInString += ' کیلوبایت'
                } else {
                    sizeInString = sizeInMB.toString().slice(0, 5);
                    sizeInString += ' مگابایت'
                }
                return sizeInString;
            },
            fileDate() {
                let str = this.file.date;
                let date = moment(str);
                let dateComponent = date.utc().format('YYYY-MM-DD');
                // let timeComponent = date.utc().format('HH:mm:ss');
                let dateInFarsi = moment(dateComponent, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD');
                return dateInFarsi;
            }

        },
        mounted() {
            // this.getCommentsForVideo();
        }
    }
</script>

<style scoped>

    .rotated {
        transform: rotateZ(180deg);
    }
</style>