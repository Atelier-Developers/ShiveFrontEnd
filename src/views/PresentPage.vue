<template>
    <div>
        <v-container>
            <v-row justify="center">
                <h1>{{currentPresentation.subject.title}}</h1>
            </v-row>
            <v-row justify="center">
                <h3 class="subtitle-1">توسط</h3>
            </v-row>
            <v-row justify="center">
                <h3 class="subtitle-1">{{presenterNames}}</h3>
            </v-row>
        </v-container>

        <v-container>
            <PresentationFileComponent class="mx-5 mx-sm-15" :is-deletable="false" :files="currentPresentation.files"/>
        </v-container>
        <v-container>
            <v-card class="mx-5 mx-sm-15" tile>
                <v-card-title class="pr-10">
                    <v-icon right>description</v-icon>
                    توضیحات
                </v-card-title>
                <v-divider/>
                <v-card-text v-if="currentPresentation.description">
                    {{currentPresentation.description}}
                </v-card-text>
                <v-card-text class="text-center" v-else>
                    توضیحی وارد نشده است...
                </v-card-text>
            </v-card>
        </v-container>

        <v-container>
            <v-card class="mx-5 mx-sm-15" tile>
                <v-card-title class="pr-10">
                    <v-icon right>comment</v-icon>
                    نظرات
                </v-card-title>
                <v-divider/>
                <v-card-text>
                    <v-container>
                        <v-card tile>
                            <v-card-title>
                                <h5>نظر خود را وارد نمایید:</h5>
                            </v-card-title>
                            <v-container>
                                <v-textarea outlined label="کامنت جدید..."
                                            required v-model="comment" rows="4">
                                </v-textarea>
                            </v-container>
                            <v-card-actions class="justify-center">
                                <v-btn
                                        :disabled="comment === ''"
                                        class="mb-2"
                                        color="primary"
                                        rounded
                                        @click="() => postComment(comment)"
                                >
                                    <v-icon dark color="accent">add</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-container>
                </v-card-text>
                <v-card-text>
                    <v-container>
                        <v-card tile v-for="comment in currentPresentation.comments">
                            <v-card-title>
                                <h5>{{comment.profile.name}}</h5>
                            </v-card-title>
                            <v-card-text>
                                {{comment.text}}
                            </v-card-text>
                        </v-card>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import FileTile from "../components/FileTile";
    import VideoPlayer from "../components/VideoPlayer";
    import {mapActions, mapGetters} from "vuex";
    import PresentationFileComponent from "../components/PresentationFileComponent";

    export default {
        name: "PresentPage",
        components: {PresentationFileComponent, VideoPlayer, FileTile},
        props: ['id'],
        data() {
            return {
                comment: '',
                descriptionEditDialog: false,
                fileUploadDialog: false,
            }
        },
        computed: {
            ...mapGetters('presentationModule', ['currentPresentation']),
            presenterNames() {
                let teamMemeberNames = this.currentPresentation.team[0].profiles.map((p) => p.name);
                console.log(teamMemeberNames);
                let memberNames = teamMemeberNames.join(' و ');
                return memberNames;
            }
        },
        methods: {
            ...mapActions('presentationModule', ['getCurrentPresentation', 'postCommentForCurrentPresentation']),
            postComment(comment) {
                this.postCommentForCurrentPresentation({
                    pk: this.currentPresentation.pk,
                    comment: {text: comment}
                }).then(() => {
                    this.comment = '';
                    this.getCurrentPresentation();
                })
            }
        },
        mounted() {
            this.getCurrentPresentation();
        }

    }
</script>

<style scoped>
</style>