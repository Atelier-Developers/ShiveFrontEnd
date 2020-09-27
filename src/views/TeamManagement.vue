<template>
    <div class="mx-3">
        <v-container>
            <CardLoadingSkeleton v-if="pageLoading" />
            <v-row v-else-if="teams.length !== 0" class="fill-height">
                <v-col cols="12" class="col-md-4" v-for="team in teams">
                    <TeamList :team="team"/>
                </v-col>
            </v-row>

            <EmptyState v-else class="fill-height" />
        </v-container>
        <div id="floating-button" class="mb-10">
            <v-btn
                    fab
                    @click="routeToCreateTeam"
                    color="primary"
            >
                <v-icon color="accent">add</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import TeamList from "@/components/TeamList";
    import Spinner from "../components/Spinner";
    import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
    import EmptyState from "../components/EmptyState";

    export default {
        name: "TeamManagement",
        components: {EmptyState, CardLoadingSkeleton, Spinner, TeamList},
        computed: {
            ...mapGetters('teamModule', ['teams']),
        },

        data() {
            return {
                item: {
                    description: '',

                },
                loading: false,
                pageLoading: false
            }
        },

        mounted() {
            this.pageLoading = true;
            this.$store.dispatch('teamModule/setTeam').finally(() => {
                this.pageLoading = false;
            })
        },
        methods: {
            routeToCreateTeam() {
                this.$router.push({name: 'TeamCreate'});
            }
        }
    }
</script>

<style scoped>

</style>