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
                <v-card-text>
                    سخنگوی وزارت امور خارجه کشورمان در پیامی طعنه‌آمیز اعلام کرد رئیس‌جمهور آمریکا روز گذشته به‌گونه‌ای
                    در مجمع
                    عمومی سازمان ملل متحد سخنرانی کرده که گویی در یک تجمع انتخاباتی در کشورش مشغول سخنرانی بوده است!
                    به گزارش گروه بین‌الملل خبرگزاری تسنیم، سعید خطیب‌زاده سخنگوی وزارت امور خارجه جمهوری اسلامی ایران
                    شامگاه
                    چهارشنبه در پیامی توئیتری اعلام کرد که دونالد ترامپ رئیس‌جمهور آمریکا در سخنرانی دیروز خود در هفتاد
                    و پنجمین
                    مجمع عمومی سازمان ملل متحد، بار دیگر سازمان «ملل متحد» را با «ایالات متحده» اشتباه گرفته و همچون
                    تجمعات
                    انتخاباتی به تعریف و تمجید از سیاست‌های شکست‌خورده دولت خود پرداخته است.

                </v-card-text>
                <!--                <v-card-actions class="justify-end">-->
                <!--                    <v-btn-->
                <!--                            class="ml-5 mb-2"-->
                <!--                            color="primary"-->
                <!--                            rounded-->
                <!--                            @click.stop="descriptionEditDialog = true"-->
                <!--                    >-->
                <!--                        <v-icon color="accent">create</v-icon>-->
                <!--                    </v-btn>-->

                <!--                    <v-dialog-->
                <!--                            v-model="descriptionEditDialog"-->
                <!--                            max-width="570"-->
                <!--                    >-->
                <!--                        <v-card>-->
                <!--                            <v-card-title>-->
                <!--                                <span class="headline">توضیحات جدید</span>-->
                <!--                            </v-card-title>-->
                <!--                            <v-card-text>-->
                <!--                                <v-row>-->
                <!--                                    <v-col>-->
                <!--                                        <v-textarea auto-grow rows="3" label="توضیحات خود را وارد کنید..."/>-->
                <!--                                    </v-col>-->
                <!--                                </v-row>-->
                <!--                            </v-card-text>-->
                <!--                            <v-card-actions>-->
                <!--                                <v-spacer></v-spacer>-->
                <!--                                <v-btn color="blue darken-1" text @click="descriptionEditDialog = false">انصراف</v-btn>-->
                <!--                                <v-btn color="blue darken-1" text @click="descriptionEditDialog = false">تایید</v-btn>-->
                <!--                            </v-card-actions>-->
                <!--                        </v-card>-->
                <!--                    </v-dialog>-->
                <!--                </v-card-actions>-->
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
                            <!--                            <v-subheader class="text&#45;&#45;black font-weight-bold">-->
                            <!--                                USERNAME_HERE-->
                            <!--                            </v-subheader>-->
                            <v-container>
                                <v-textarea outlined label="کامنت جدید..." :rules="[v => !!v || 'الزامی']"
                                            required v-model="comment" rows="4">
                                </v-textarea>
                            </v-container>
                            <v-card-actions class="justify-center">
                                <v-btn
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
        <!--        <div id="floating-button" class="mb-10 mr-3">-->
        <!--            <v-btn-->
        <!--                    fab-->
        <!--                    @click="fileUploadDialog = true"-->
        <!--                    color="primary"-->
        <!--            >-->
        <!--                <v-icon color="accent">add</v-icon>-->
        <!--            </v-btn>-->
        <!--            <v-dialog-->
        <!--                    v-model="fileUploadDialog"-->
        <!--                    max-width="570"-->
        <!--            >-->
        <!--                <v-card>-->
        <!--                    <v-card-title>-->
        <!--                        <span class="headline">آپلود فایل جدید</span>-->
        <!--                    </v-card-title>-->
        <!--                    <v-card-text>-->
        <!--                        <v-row>-->
        <!--                            <v-col>-->
        <!--                                <v-file-input label="فایل جدید خود را انتخاب کنید" outlined dense/>-->
        <!--                            </v-col>-->
        <!--                        </v-row>-->
        <!--                    </v-card-text>-->
        <!--                    <v-card-actions>-->
        <!--                        <v-spacer></v-spacer>-->
        <!--                        <v-btn color="blue darken-1" text @click="descriptionEditDialog = false">انصراف</v-btn>-->
        <!--                        <v-btn color="blue darken-1" text @click="descriptionEditDialog = false">تایید</v-btn>-->
        <!--                    </v-card-actions>-->
        <!--                </v-card>-->
        <!--            </v-dialog>-->
        <!--        </div>-->
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