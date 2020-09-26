<template>
    <div class="mt-5">
        <SubjectDateChooser :item="presentation" :subjects="allSubjects"/>
        <v-container>
            <v-row>
                <v-col cols="12" class="col-md-6">
                    <PersonList :loading="pageLoading" title="بدون تیم" :persons="pending" :actions="addToTeamAction"/>
                </v-col>
                <v-col cols="12" class="col-md-6">
                    <PersonList :loading="pageLoading" title="تیم" :persons="teamMembers" :actions="removeFromTeamAction"/>
                </v-col>
            </v-row>
        </v-container>

        <div id="floating-button" class="mb-10 mr-7">
            <v-btn
                    fab
                    dark
                    large
                    color="primary"
                    @click="() => actionFunction({
                    deadline: presentation.deadline,
                    subject: presentation.subject,
                    pk: pk,
                    profiles: teamMembers.map((m) => m.pk)
                    })"
            >
                <v-icon>done</v-icon>
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
                }
                else {
                    return this.selectableSubjects
                }
            }
        },
        methods: {
            ...mapActions('teamCreateEditModule', ['addPersonToTeam', 'removePersonFromTeam', 'getSelectableSubjects', 'getPending', 'assignTeamMembers'])
        },
        mounted() {
            this.pageLoading = true;
            this.getSelectableSubjects().then(() => {
                return this.getPending();
            }).then(() => {
                return this.assignTeamMembers(this.members);
            }).finally(() => {
                this.pageLoading = false;
            });
        }
    }
</script>

<style scoped>
    #floating-button {
        position: absolute;
        bottom: 0;
    }
</style>