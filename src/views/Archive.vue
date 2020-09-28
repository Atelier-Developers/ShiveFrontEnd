<template>
    <div>
        <v-container>
            <h1 align="center">آرشیو</h1>
            <v-row>
                <v-col cols="12" class="col-md-4">
                    <h3>ترم:</h3>
                    <v-select
                            v-model="selected_year"
                            :items="semesters"
                            item-text="year"
                            item-value="id"
                            @input="(semId) => getSemPresentations(semId)"
                            solo
                    />
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <CardLoadingSkeleton v-if="loading" />
            <v-row v-else-if="presentations.length !== 0">
                <v-col cols="12" class="col-md-4" v-for="project in presentations"
                >
                    <v-card>
                        <v-card-title v-if="project.subject !== null">{{ project.subject.title }}</v-card-title>
                        <v-card-subtitle v-if="project.deadline !== null">{{ project.deadline }}</v-card-subtitle>
                        <v-divider/>
                        <TeamPersonTile v-for="person in project.team[0].profiles" :key="person.pk"
                                        :person="person"/>
                        <v-card-actions class="justify-center">
                            <v-btn color="primary"  @click="() => routeToArchivedPresentation(project)" text rounded>
                                مشاهده
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import TeamPersonTile from "../components/TeamPersonTile";
    import {mapActions, mapGetters} from "vuex";
    import CardLoadingSkeleton from "../components/CardLoadingSkeleton";

    export default {
        name: "Archive",
        components: {CardLoadingSkeleton, TeamPersonTile},
        props: [],
        computed: {
            ...mapGetters('archiveModule', ['semesters', 'presentations']),
            semesterYears() {
                let semYears = [];
                this.semesters.forEach((semYear) => {
                    semYears.push(semYear.year);
                });

                return semYears;
            }
        },
        data() {
            return {
                years_item: ['همه', 96, 97, 98],
                selected_year: null,
                archive_projects: [],
                loading: false,
            }
        },

        methods: {
            ...mapActions('archiveModule', ['getSemesters', 'getPresentations', 'resetPresentations']),

            getSemPresentations(semesterId) {
                this.getPresentations(semesterId).then(() => {
                })
            },
            routeToArchivedPresentation(presentation) {
                this.$router.push({name: 'ArchivedPresentationPage', params: {"presentation": presentation}});
            }
        },

        mounted() {
            this.loading = true;
            this.getSemesters().then(() => {
                this.selected_year = this.semesters[0];
                this.getPresentations(this.semesters[0].id).finally(() => {
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