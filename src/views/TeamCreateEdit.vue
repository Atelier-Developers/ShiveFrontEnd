<template>
    <div class="mt-5">
        <SubjectDateChooser :item="item" :subjects="selectableSubjects"></SubjectDateChooser>
        <v-container>
            <v-row>
                <v-col cols="12" class="col-md-6">
                    <PersonList title="بدون تیم" :persons="pending" :actions="addToTeamAction"/>
                </v-col>
                <v-col cols="12" class="col-md-6">
                    <PersonList title="تیم" :persons="teamMembers" :actions="removeFromTeamAction"/>
                </v-col>
            </v-row>
        </v-container>

        <div id="floating-button" class="mb-10 mr-7">
            <v-btn
                    fab
                    dark
                    large
                    color="primary"
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

    export default {
        name: "TeamCreateEdit",
        data() {
            return {
                item: {
                    date: '',
                    subject: ''
                }
            }
        },
        components: {
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
            }
        },
        methods: {
            ...mapActions('teamCreateEditModule', ['addPersonToTeam', 'removePersonFromTeam'])
        }
    }
</script>

<style scoped>
    #floating-button {
        position: absolute;
        bottom: 0;
    }
</style>