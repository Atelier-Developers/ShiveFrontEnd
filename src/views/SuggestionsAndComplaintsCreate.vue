<template>
    <div class="mx-3">
        <v-container>
            <h1 align="center">پیشنهادات و انتقادات</h1>
            <v-card :loading="suggCompDialogLoading" class="mt-6">
                <v-card-title class="row justify-center"><h3>پیشنهاد/انتقاد جدید</h3></v-card-title>
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
                        <v-btn color="primary" :disabled="suggComp.title === '' || suggComp.desc === ''" text
                               @click="submitAction">تایید
                        </v-btn>
                    </v-container>
                </v-card-actions>
            </v-card>
            <v-snackbar v-model="reqStatus.error" color="error">
                {{ reqStatus.msg }}
            </v-snackbar>
        </v-container>
    </div>
</template>

<script>
    import EmptyState from "../components/EmptyState";
    import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
    import {mapActions} from "vuex";

    export default {
        name: "SuggestionsAndComplaintsCreate",
        components: {EmptyState, CardLoadingSkeleton},
        data() {
            return {
                suggComp: {
                    title: "",
                    desc: "",
                    files: [],
                },
                reqStatus: {
                    error: false,
                    msg: "",
                },
                suggCompDialogLoading: false
            }
        },
        methods: {
            ...mapActions('suggCompsModule', ['createSuggestionsComplaints']),
            submitAction() {
                this.suggCompDialogLoading = true;
                this.createSuggestionsComplaints(this.suggComp).then(() => {
                    this.suggComp = {
                        title: "",
                        desc: "",
                        files: [],
                    };
                }).catch((e) => {
                    this.reqStatus.msg = e.message;
                    this.reqStatus.error = true;
                }).finally(() => {
                    this.suggCompDialogLoading = false;
                });
            }
        },
    }
</script>

<style scoped>

</style>