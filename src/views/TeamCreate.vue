<template>
    <TeamCreateEdit :presentation="presentation" :members="members" :action-function="sendTeamMembers"/>
</template>

<script>
    import TeamCreateEdit from "./TeamCreateEdit";
    import {mapActions} from "vuex";

    export default {
        name: "TeamCreate",
        components: {TeamCreateEdit},
        data() {
            return {
                members: [],
                presentation: {
                    deadline: '',
                    subject: '',
                },
            }
        },
        methods: {
            ...mapActions('teamCreateEditModule', ['sendTeamMembers'])

        }
    }
</script>

<style scoped>

</style>