<template>
    <div class="mx-3">
        <v-container>
            <!--            <CardLoadingSkeleton v-if="pageLoading" />-->
            <v-row v-if="announcement.length !== 0" class="fill-height">
                <v-col cols="12" class="col-md-4 col-12" v-for="announcement in announcements">
                    <v-card tile>
                        <div class="primary">
                            <v-card-title class="primary accent--text justify-center header-6">
                                {{announcement.title}}
                            </v-card-title>
                        </div>
                        <v-divider/>
                        <v-card-text>
                            <v-row class="mx-2">
                                <read-more more-str="ادامه ی مطلب" :text="announcement.desc" link="#"
                                           less-str="بستن مطلب" :max-chars="50"></read-more>
                            </v-row>
                        </v-card-text>

                        <v-list>
                            <v-list-group>
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title>فایل های ضمیمه</v-list-item-title>
                                    </v-list-item-content>
                                </template>

                                <v-list-item
                                        v-for="file in announcement.files"
                                        :key="file.name"
                                >
                                    <v-list-item-content>
                                        <v-row class="px-sm-4 px-2" justify="space-between">
                                            <v-col cols="9">
                                                <v-list-item-title v-text="file.name"></v-list-item-title>
                                            </v-col>

                                            <v-col>
                                                <v-btn color="primary" fab small>
                                                    <v-icon color="accent">get_app</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                        </v-list>

                    </v-card>
                </v-col>
            </v-row>

            <EmptyState v-else class="fill-height"/>
        </v-container>
        <div id="floating-button" class="mb-10">
            <v-btn
                    fab
                    @click="toggleDialog"
                    color="accent"
            >
                <v-icon>add</v-icon>
            </v-btn>
        </div>

        <v-dialog v-model="dialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">اطلاعیه ی جدید</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="موضوع" v-model="announcement.title" outlined/>
                                <v-textarea
                                        label="توضیحات"
                                        v-model="announcement.desc"
                                        auto-grow
                                        outlined
                                        rows="3"
                                ></v-textarea>
                                <v-file-input
                                        v-model="announcement.files"
                                        color="primary"
                                        label="ضمیمه"
                                        multiple
                                        placeholder="فایل(های) خود را انتخاب کنید"
                                        prepend-icon="mdi-paperclip"
                                        outlined
                                        :show-size="1000"
                                >
                                    <template v-slot:selection="{ index, text }">
                                        <v-chip
                                                v-if="index < 2"
                                                color="primary"
                                                dark
                                                label
                                                small
                                        >
                                            {{ text }}
                                        </v-chip>
                                    </template>
                                </v-file-input>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-container class="mb-1">
                        <v-btn color="primary" text @click="toggleDialog">بستن</v-btn>
                        <v-btn color="primary" text @click="submitAction">تایید</v-btn>
                    </v-container>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import InputFieldDialogButton from "../components/InputFieldDialogButton";
    import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
    import EmptyState from "../components/EmptyState";
    import {mapActions} from "vuex";

    export default {
        name: "Announcement",
        components: {EmptyState, CardLoadingSkeleton, InputFieldDialogButton},

        data() {
            return {
                announcement: {
                    title: "",
                    desc: "",
                    files: [],
                },


                dialog: false,

                announcements: [
                    {
                        "title": "آلت",
                        "desc": "سخنگوی وزارت امور خارجه کشورمان در پیامی طعنه‌آمیز اعلام کرد رئیس‌جمهور آمریکا روز گذشته به‌گونه‌ای در مجمع عمومی سازمان ملل متحد سخنرانی کرده که گویی در یک تجمع انتخاباتی در کشورش مشغول سخنرانی بوده است! به گزارش گروه بین‌الملل خبرگزاری تسنیم، سعید خطیب‌زاده سخنگوی وزارت امور خارجه جمهوری اسلامی ایران شامگاه چهارشنبه در پیامی توئیتری اعلام کرد که دونالد ترامپ رئیس‌جمهور آمریکا در سخنرانی دیروز خود در هفتاد و پنجمین مجمع عمومی سازمان ملل متحد، بار دیگر سازمان «ملل متحد» را با «ایالات متحده» اشتباه گرفته و همچون تجمعات انتخاباتی به تعریف و تمجید از سیاست‌های شکست‌خورده دولت خود پرداخته است. ",
                        files: [
                            {
                                name: "فایل آپلود شده"
                            },

                            {
                                name: "فایل آپلود شده"
                            }
                        ]
                    },

                    {
                        "title": "آلت",
                        "desc": "سخنگوی وزارت امور خارجه کشورمان در پیامی طعنه‌آمیز اعلام کرد رئیس‌جمهور آمریکا روز گذشته به‌گونه‌ای در مجمع عمومی سازمان ملل متحد سخنرانی کرده که گویی در یک تجمع انتخاباتی در کشورش مشغول سخنرانی بوده است! به گزارش گروه بین‌الملل خبرگزاری تسنیم، سعید خطیب‌زاده سخنگوی وزارت امور خارجه جمهوری اسلامی ایران شامگاه چهارشنبه در پیامی توئیتری اعلام کرد که دونالد ترامپ رئیس‌جمهور آمریکا در سخنرانی دیروز خود در هفتاد و پنجمین مجمع عمومی سازمان ملل متحد، بار دیگر سازمان «ملل متحد» را با «ایالات متحده» اشتباه گرفته و همچون تجمعات انتخاباتی به تعریف و تمجید از سیاست‌های شکست‌خورده دولت خود پرداخته است. ",
                        files: [
                            {
                                name: "فایل آپلود شده"
                            }
                        ]
                    },

                    {
                        "title": "آلت",
                        "desc": "سخنگوی وزارت امور خارجه کشورمان در پیامی طعنه‌آمیز اعلام کرد رئیس‌جمهور آمریکا روز گذشته به‌گونه‌ای در مجمع عمومی سازمان ملل متحد سخنرانی کرده که گویی در یک تجمع انتخاباتی در کشورش مشغول سخنرانی بوده است! به گزارش گروه بین‌الملل خبرگزاری تسنیم، سعید خطیب‌زاده سخنگوی وزارت امور خارجه جمهوری اسلامی ایران شامگاه چهارشنبه در پیامی توئیتری اعلام کرد که دونالد ترامپ رئیس‌جمهور آمریکا در سخنرانی دیروز خود در هفتاد و پنجمین مجمع عمومی سازمان ملل متحد، بار دیگر سازمان «ملل متحد» را با «ایالات متحده» اشتباه گرفته و همچون تجمعات انتخاباتی به تعریف و تمجید از سیاست‌های شکست‌خورده دولت خود پرداخته است.",
                        files: [
                            {
                                name: "فایل آپلود شده"
                            }
                        ]
                    },
                ]
            }
        },

        methods: {
            ...mapActions('annModule', ['createAnnouncement']),

            toggleDialog() {
                this.dialog = !this.dialog;
            },

            submitAction() {
                console.log(this.announcement.files[0].name)
                this.createAnnouncement(this.announcement).then(() => {

                })
            }
        }
    }
</script>

<style scoped>

</style>