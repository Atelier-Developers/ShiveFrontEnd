<template>
    <div class="mx-3">
        <v-container>
            <h1 align="center">پیشنهادات و انتقادات</h1>
            <CardLoadingSkeleton v-if="loading"/>
            <v-row v-else-if="suggsComps.length !== 0" class="fill-height">
                <v-col cols="12" class="col-md-4 col-12" v-for="suggComp in suggsComps" :key="suggComp.id">
                    <v-card tile>
                        <div class="primary">
                            <v-card-title class="primary white--text justify-center header-6"
                                          style="white-space: pre-wrap; word-break: break-word;">
                                <p>{{ suggComp.title }}</p>
                            </v-card-title>
                        </div>
                        <v-divider/>
                        <v-card-text>
                            <v-row class="mx-2">
                                <read-more more-str="ادامه ی مطلب" :text="suggComp.description" link="#"
                                           less-str="بستن مطلب" :max-chars="50"></read-more>
                            </v-row>
                        </v-card-text>

                        <v-list>
                            <v-list-group v-if=" suggComp.files.length !== 0">
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title>فایل های ضمیمه</v-list-item-title>
                                    </v-list-item-content>
                                </template>

                                <v-list-item
                                        v-for="file in suggComp.files"
                                        :key="file.id"
                                >
                                    <v-list-item-content>
                                        <v-row justify="space-between">
                                            <v-col cols="8">
                                                <v-list-item-title style="text-overflow: ellipsis; max-width: 200px;">
                                                    {{file.title}}
                                                </v-list-item-title>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-btn color="primary" fab small tag="a" target="_blank"
                                                       :href="file.file">
                                                    <v-icon>get_app</v-icon>
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
        <div id="floating-button" class="mb-10" v-if="$can('create', 'announcment')">
            <v-btn
                    fab
                    @click="toggleDialog"
                    color="primary"
            >
                <v-icon>add</v-icon>
            </v-btn>
        </div>

        <v-dialog v-model="dialog" max-width="600px">
            <v-card :loading="suggCompDialogLoading">
                <v-card-title>
                    <span class="headline">پیشنهاد/انتقاد جدید</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="موضوع" v-model="suggComp.title" outlined/>
                                <v-textarea
                                        label="توضیحات"
                                        v-model="suggComp.desc"
                                        auto-grow
                                        outlined
                                        rows="3"
                                ></v-textarea>
                                <v-file-input
                                        v-model="suggComp.files"
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
                        <v-btn color="primary" :disabled="suggComp.title === '' || suggComp.desc === ''" text
                               @click="submitAction">تایید
                        </v-btn>
                    </v-container>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
    import EmptyState from "../components/EmptyState";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "SuggestionsAndComplaintsList",
        components: {EmptyState, CardLoadingSkeleton},
        computed: {
            ...mapGetters('suggCompsModule', ['suggsComps'])
        },
        data() {
            return {
                suggComp: {
                    title: "",
                    desc: "",
                    files: [],
                },
                dialog: false,
                loading: false,
                suggCompDialogLoading: false
            }
        },
        methods: {
            ...mapActions('suggCompsModule', ['createSuggestionsComplaints', 'getSuggComps']),
            toggleDialog() {
                this.dialog = !this.dialog;
            },
            submitAction() {
                this.suggCompDialogLoading = true;
                this.createSuggestionsComplaints(this.suggComp).then(() => {
                    this.suggComp = {
                        title: "",
                        desc: "",
                        files: [],
                    };
                    this.getSuggComps();
                }).finally(() => {
                    this.suggCompDialogLoading = false;
                    this.dialog = !this.dialog
                });
            }
        },

        mounted() {
            this.loading = true;
            this.getSuggComps().finally(() => {
                this.loading = false;
            });
        }
    }
</script>

<style scoped>

</style>