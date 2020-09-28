<template>
    <v-card tile>
        <div class="primary">
            <v-card-title class="primary accent--text justify-center header-6">
                {{file.name}}
            </v-card-title>
        </div>
        <v-divider/>
        <v-card-text>
            {{file.profile.name}}
        </v-card-text>
        <v-card-text>
            <v-row justify="space-around" class="mx-2">
                <v-btn color="primary" fab small @click="() => routeToVideoPlayer(file.file)">
                    <v-icon color="accent">play_arrow</v-icon>
                </v-btn>
                <v-btn color="primary" fab small tag="a" target="_blank" :href="file.file">
                    <v-icon class="rotated" color="accent">publish</v-icon>
                </v-btn>
                <v-dialog v-model="dialog" max-width="290" persistent>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-if="isDeletable" color="red" v-bind="attrs"
                               v-on="on" fab small>
                            <v-icon color="accent">delete</v-icon>
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
    export default {
        name: "FileTile",
        props: ['file', 'isDeletable', 'deleteAction'],
        data(){
            return {
                loading: false,
                dialog: false,
            }
        },
        methods: {
            deleteFile(){
                this.loading = true;
                this.deleteAction(this.file.pk).finally(() => {
                    this.loading = false;
                    this.dialog = false;
                })
            },
            routeToVideoPlayer(videoSrc) {
                this.$router.push({name: 'VideoPlayerPage', params: {
                    videoSrc: videoSrc,
                    }});
            }
        }
    }
</script>

<style scoped>
    .rotated {
        transform: rotateZ(180deg);
    }
</style>