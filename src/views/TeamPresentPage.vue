<template>
    <div>
        <v-container>
            <v-row justify="center">
                <h1>{{teamPresentation.subject.title}}</h1>
            </v-row>
<!--            <v-row justify="center">-->
<!--                <h3 class="subtitle-1">توسط</h3>-->
<!--            </v-row>-->
<!--            <v-row justify="center">-->
<!--                <h3 class="subtitle-1">امیر مسعود باغی و امیر محمد توکلی</h3>-->
<!--            </v-row>-->
        </v-container>

        <v-container>
            <v-card class="mx-5 mx-sm-15" tile>
                <v-card-title class="pr-10">
                    <v-icon right>file_copy</v-icon>
                    فایل‌های ارائه
                </v-card-title>
                <v-divider/>
                <v-card-text class="text-center">
                    <v-container v-if="teamPresentation.files.length !== 0">
                        <v-row>
                            <v-col sm="6" md="4" lg="3" v-for="file in teamPresentation.files" :key="file.id">
                                <FileTile :is-deletable="true" :file="file" :delete-action="deleteFile"/>
                            </v-col>
                        </v-row>
                    </v-container>
                    <template v-else>
                        فایلی آپلود نشده است...
                    </template>
                </v-card-text>
            </v-card>
        </v-container>
        <v-container>
            <v-card class="mx-5 mx-sm-15" tile>
                <v-card-title class="pr-10">
                    <v-icon right>description</v-icon>
                    توضیحات
                </v-card-title>
                <v-divider/>
                <v-card-text v-if="teamPresentation.description">
                    {{teamPresentation.description}}
                </v-card-text>
                <v-card-text class="text-center" v-else>
                   توضیحی وارد نشده است...
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn
                            class="ml-5 mb-2"
                            color="primary"
                            rounded
                            @click.stop="descriptionEditDialog = true"
                    >
                        <v-icon color="accent">create</v-icon>
                    </v-btn>

                    <v-dialog
                            v-model="descriptionEditDialog"
                            max-width="570"
                    >
                        <v-card>
                            <v-card-title>
                                <span class="headline">توضیحات جدید</span>
                            </v-card-title>
                            <v-card-text>
                                        <v-textarea outlined auto-grow rows="3" label="توضیحات خود را وارد کنید..."
                                                    v-model="item.description"/>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="descriptionEditDialog = false">انصراف</v-btn>
                                <v-btn color="blue darken-1" text @click="() => editDescription(item.description)">
                                    تایید
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card-actions>
            </v-card>
        </v-container>

        <v-container>
            <v-card class="mx-5 mx-sm-15" tile>
                <v-card-title class="pr-10">
                    <v-icon right>comment</v-icon>
                    نظرات
                </v-card-title>
                <v-divider/>
                <!--                <v-card-text>-->
                <!--                    <v-container>-->
                <!--                        <v-card tile>-->
                <!--                            <v-card-title>-->
                <!--                                <h5>نظر خود را وارد نمایید:</h5>-->
                <!--                            </v-card-title>-->
                <!--                            <v-subheader class="text&#45;&#45;black font-weight-bold">-->
                <!--                                امیر مسعود باغی-->
                <!--                            </v-subheader>-->
                <!--                            <v-container>-->
                <!--                                <v-textarea outlined label="کامنت جدید..." v-model="comment" rows="4">-->
                <!--                                </v-textarea>-->
                <!--                            </v-container>-->
                <!--                            <v-card-actions class="justify-center">-->
                <!--                                <v-btn-->
                <!--                                        class="mb-2"-->
                <!--                                        color="primary"-->
                <!--                                        rounded-->
                <!--                                >-->
                <!--                                    <v-icon dark color="accent">add</v-icon>-->
                <!--                                </v-btn>-->
                <!--                            </v-card-actions>-->
                <!--                        </v-card>-->
                <!--                    </v-container>-->
                <!--                </v-card-text>-->
                <v-card-text>
                    <v-container>
                        <v-card flat>
                            <v-card-title>
                                <h5>گورخر رنگین‌کمانی</h5>
                            </v-card-title>
                            <v-card-text>
                                خیلی ارائه کصشری بود خدایی خجالت نمیکشید این رو گذاشتید جلو استاد و سه ساعت کصوشر
                                میبافید راجب بهش، خو یه گوسفند میذاشتید تو فیلم میرید واسمون بیشتر یاد میگرفتیم تا با
                                این ارائه شما خو. کیرم تو سر و تهتون. اههه خدافظ.
                            </v-card-text>
                            <v-divider></v-divider>
                        </v-card>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-container>
        <div id="floating-button" class="mb-10 mr-3">
            <v-btn
                    fab
                    @click="fileUploadDialog = true"
                    color="primary"
            >
                <v-icon color="accent">add</v-icon>
            </v-btn>
            <v-dialog
                    v-model="fileUploadDialog"
                    max-width="570"
            >
                <v-card>
                    <v-card-title>
                        <span class="headline">آپلود فایل جدید</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <v-file-input label="فایل جدید خود را انتخاب کنید" v-model="item.file" outlined dense/>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="fileUploadDialog = false">انصراف</v-btn>
                        <v-btn color="blue darken-1" text @click="() => uploadFile(item.file)">تایید</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>

</template>

<script>
    import FileTile from "../components/FileTile";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "TeamPresentPage",
        components: {FileTile},
        data() {
            return {
                item: {
                    description: '',
                    file: '',
                },
                descriptionEditDialog: false,
                fileUploadDialog: false,
            }
        },
        computed: {
            ...mapGetters('presentationModule', ['teamPresentation']),
        },
        methods: {
            ...mapActions('presentationModule', ['getTeamPresentation', 'uploadFileForTeamPresentation', 'setDescriptionForTeamPresentation', 'deleteFileFromTeamPresentation']),
            uploadFile(file) {
                this.fileUploadDialog = false;
                this.uploadFileForTeamPresentation(file).then(() => {
                    this.item.file = '';
                });
            },
            editDescription(description) {
                this.descriptionEditDialog = false;
                this.setDescriptionForTeamPresentation(description).then(() => {
                    this.item.description = '';
                });
            },
            deleteFile(file) {
                this.deleteFileFromTeamPresentation(file);
            }
        },
        mounted() {
            this.getTeamPresentation();
        }
    }
</script>

<style scoped>

</style>