<template>
    <div class="mt-3">
        <SubjectDateChooser :item="item" :subjects="allSubjects" :loading="pageLoading"/>
        <v-container>
            <v-row>
                <v-col cols="12" class="col-md-6">
                    <PersonList :loading="pageLoading" title="بدون تیم" :persons="pending" :actions="addToTeamAction"/>
                </v-col>
                <v-col cols="12" class="col-md-6">
                    <PersonList :loading="pageLoading" title="تیم" :persons="teamMembers"
                                :actions="removeFromTeamAction"/>
                </v-col>
            </v-row>
        </v-container>

        <div id="floating-button" class="mb-10 mr-3">
            <v-btn
                    fab
                    dark
                    large
                    :loading="loading"
                    color="primary"
                    @click="callActionFunction"
            >
                <v-icon color="accent">done</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import SubjectDateChooser from "../components/SubjectDateChooser";
    import PersonList from "../components/PersonList";
    import {mapActions, mapGetters} from "vuex";
    import Spinner from "../components/Spinner";

    export default {
        name: "TeamCreateEdit",
        props: ['presentation', 'members', 'actionFunction', 'isEdit', 'pk'],
        data() {
            return {
                loading: false,
                pageLoading: false,
                item: {
                    subject: "",
                    deadline: ""
                }
            }
        },
        components: {
            Spinner,
            SubjectDateChooser,
            PersonList
        },
        computed: {
            ...mapGetters('teamCreateEditModule', ['pending', 'teamMembers', 'selectableSubjects']),
            addToTeamAction() {
                return [{
                    color: "green",
                    onClick: this.addPersonToTeam,
                    icon: 'add'
                }]
            },
            removeFromTeamAction() {
                return [{
                    color: 'red',
                    onClick: this.removePersonFromTeam,
                    icon: 'remove'
                }]
            },
            allSubjects() {
                if (this.isEdit) {
                    return this.selectableSubjects.concat(this.presentation.subject);
                } else {
                    return this.selectableSubjects
                }
            }
        },
        methods: {
            ...mapActions('teamCreateEditModule', ['addPersonToTeam', 'removePersonFromTeam', 'getSelectableSubjects', 'getPending', 'assignTeamMembers']),
            callActionFunction() {
                this.loading = true;
                this.actionFunction({
                    deadline: this.item.deadline,
                    subject: this.item.subject,
                    pk: this.pk,
                    profiles: this.teamMembers.map((m) => m.pk)
                }).then(() => {
                    this.$router.replace({name: 'TeamManagement'});
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        mounted() {
            this.pageLoading = true;
            this.getSelectableSubjects().then(() => {
                return this.getPending();
            }).then(() => {
                return this.assignTeamMembers(this.members);
            }).then(() => {
                this.item = {...this.presentation, subject: this.presentation.subject.pk}
            }).finally(() => {
                this.pageLoading = false;
            });
        }
    }
</script>

<style scoped>
</style>