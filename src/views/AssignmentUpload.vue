<template>
    <div class="mx-3">
        <v-container>
            <h1 align="center">تکالیف</h1>
            <v-card :loading="assignmentDialogLoading" class="mt-6">
                <v-card-title class="row justify-center"><h3>تکلیف جدید</h3></v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card
                                        style="border-color: white"
                                        class="mx-auto mb-5"
                                        max-width="600"
                                        height="70"
                                        outlined
                                        :loading="assignmentDialogLoading"
                                        :disabled="assignmentDialogLoading"
                                >
                                    <div>
                                        <v-col cols="12">
                                            <v-select
                                                    :items="subjects"
                                                    v-model="assignment.subjectId"
                                                    label="موضوع"
                                                    item-text="name"
                                                    item-value="id"
                                                    dense
                                                    outlined
                                            />
                                        </v-col>
                                    </div>
                                </v-card>
                                <v-text-field label="نام فایل" v-model="assignment.name" outlined/>
                                <v-file-input
                                        v-model="assignment.file"
                                        color="primary"
                                        placeholder="فایل خود را انتخاب کنید"
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
                        <v-btn color="primary" :disabled="assignment.name === ''" text
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
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "AssignmentUpload",
        components: {EmptyState, CardLoadingSkeleton},
        data() {
            return {
                assignment: {
                    name: '',
                    file: null,
                    subjectId: null,
                },
                reqStatus: {
                    error: false,
                    msg: "",
                },
                assignmentDialogLoading: false
            }
        },
        methods: {
            ...mapActions('assignmentModule', ['createAssignment', 'getSubjects']),
            submitAction() {
                this.assignmentDialogLoading = true;
                this.createAssignment(this.assignment).then(() => {
                    this.assignment = {
                        name: "",
                        file: null,
                        subjectId: null,
                    };
                }).catch((e) => {
                    this.reqStatus.msg = e.message;
                    this.reqStatus.error = true;
                }).finally(() => {
                    this.assignmentDialogLoading = false;
                });
            }
        },
        computed: {
            ...mapGetters('assignmentModule', ['subjects']),
        },
        mounted() {
            this.loading = true;
            this.getSubjects().then(() => {
                this.loading = false;
            });
        }
    }
</script>

<style scoped>

</style>