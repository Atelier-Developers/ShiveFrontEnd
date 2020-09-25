<template>
    <v-card tile elevation="5">
        <v-card-title class="justify-center">
            {{ team.presentation.subject.title !== undefined ? team.presentation.subject.title : '(بدون موضوع)' }}
        </v-card-title>
        <v-divider/>
        <template v-if="team.profiles.length > 0">
            <TeamPersonTile v-for="person in team.profiles" :person="person" :key="person.pk"/>
        </template>
        <v-card-text class="text-center" v-else>
            لیست خالی است...
        </v-card-text>
        <v-card-actions>
            <v-btn
                    @click="routeToEdit"
                    icon
                    color="accent"
            >
                <v-icon>create</v-icon>
            </v-btn>
            <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                            color="error"
                            icon
                            v-bind="attrs"
                            v-on="on"
                    >
                        <v-icon>delete</v-icon>
                    </v-btn>
                </template>
                <v-card :loading="loading" :disabled="loading">
                    <v-card-title class="headline">حذف تیم</v-card-title>
                    <v-card-text>آیا از حذف این تیم مطمئن هستید؟
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary darken-1" text @click="dialog = false">انصراف</v-btn>
                        <v-btn color="error darken-1" text @click="deleteTeam">حذف</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card-actions>
    </v-card>
</template>

<script>
    import TeamPersonTile from "@/components/TeamPersonTile";
    import {mapActions} from "vuex";

    export default {
        name: "TeamList",
        components: {TeamPersonTile},
        props: ['team'],
        data() {
            return {
                dialog: false,
                loading: false,
            }
        },
        methods: {
            ...mapActions('teamModule', ['deleteSingleTeam']),

            deleteTeam() {
                this.loading = true;
                this.deleteSingleTeam(this.team.pk).finally(() => {
                    this.loading = false;
                })
            },
            routeToEdit() {
                this.$router.push({
                    name: 'TeamEdit', params: {id: this.team.pk}
                });
            }
        }
    }
</script>

<style scoped>

</style>