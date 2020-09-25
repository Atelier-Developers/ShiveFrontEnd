<template>
    <TeamCreateEdit :members="singleTeam.profiles" :presentation="presentation" :action-function="editTeamMembers" :pk="singleTeam.pk" :is-edit="true"/>
</template>

<script>
    import TeamCreateEdit from "./TeamCreateEdit";
    import {mapActions, mapGetters} from "vuex";
    export default {
        name: "TeamEdit",
        data() {
            return {
                team: {

                }
            }
        },
        components: {TeamCreateEdit},
        computed: {
            ...mapGetters('teamCreateEditModule', ['singleTeam']),
            presentation() {
              return {
                  deadline: this.singleTeam.presentation.deadline,
                  subject: this.singleTeam.presentation.subject
              }
            },
        },
        methods: {
            ...mapActions('teamCreateEditModule', ['editTeamMembers', 'setSingleTeam'])
        },
        mounted() {
            this.setSingleTeam(this.$route.params.id);
        }
    }
</script>

<style scoped>

</style>