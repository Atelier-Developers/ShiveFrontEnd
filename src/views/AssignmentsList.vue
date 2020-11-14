<template>
    <div>
        <v-container>
            <h1 align="center">تکالیف</h1>
            <v-row>
                <v-col cols="12" class="col-md-4">
                    <h3>موضوع:</h3>
                    <v-select
                            :loading="loading"
                            v-model="selected_subject"
                            :disabled="loading"
                            :items="subjects"
                            item-text="name"
                            item-value="id"
                            @input="(subjectId) => getSubjectAssignments(subjectId)"
                            solo
                    />
                </v-col>
            </v-row>
        </v-container>
        <v-container>
<!--            <CardLoadingSkeleton v-if="loading"/>-->
            <v-container>
                <v-card  tile :loading="loading">
                    <v-card-text class="text-center">
                        <v-container v-if="assignments.length !== 0">
                            <v-row>
                                <v-col class="col-12 col-sm-6 col-md-4" v-for="assignment in assignmentFiles" :key="assignment.id">
                                    <FileTile :is-deletable="false" :file="assignment" :delete-action="null"/>
                                </v-col>
                            </v-row>
                        </v-container>
<!--                        <template v-else>-->
<!--                            <v-container>-->
<!--                                فایلی آپلود نشده است...-->
<!--                            </v-container>-->
<!--                        </template>-->
                    </v-card-text>
                </v-card>

            </v-container>
        </v-container>
    </div>
</template>

<script>
    import EmptyState from "../components/EmptyState";
    import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
    import FileTile from "../components/FileTile";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "AssignmentsList",
        components: {EmptyState, CardLoadingSkeleton, FileTile},
        props: [],
        computed: {
            ...mapGetters('assignmentModule', ['subjects', 'assignments']),
            assignmentFiles() {
                let assignmentFile = [];
                this.assignments.forEach((a) => {
                    console.log(a);
                    assignmentFile.push({...a.files[0], name: a.name, pk: a.files[0].id, profile: a.profile})
                });
                console.log(assignmentFile);
                return assignmentFile;
            }
        },
        data() {
            return {
                subject_item: ['همه'],
                selected_subject: null,
                // assignments: [],
                loading: false,
            }
        },

        methods: {
            ...mapActions('assignmentModule', ['getSubjects', 'getAssignments', 'resetPresentations']),

            getSubjectAssignments(subjectId) {
                this.getAssignments(subjectId).then(() => {
                })
            }
        },

        mounted() {
            this.loading = true;
            this.getSubjects().then(() => {
                this.selected_subject = this.subjects[0];
                this.getAssignments(this.subjects[0].id).finally(() => {
                    this.loading = false;
                })
            }).catch(() => {
                this.loading = false;
            })
        }
    }
</script>

<style scoped>

</style>