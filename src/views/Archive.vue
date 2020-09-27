<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="col-md-4">
          سال:
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
      <v-row>
        <v-col cols="12" class="col-md-4" v-for="project in presentations"
               >
          <v-card>
            <v-card-title v-if="project.subject !== null">{{ project.subject.title }}</v-card-title>
            <v-card-subtitle v-if="project.deadline !== null">سال {{ project.deadline }}</v-card-subtitle>
            <v-divider/>
            <v-card-text>
              <template v-if="project.team.length > 0">
                <TeamPersonTile v-for="person in project.team.profiles" :person="person"/>
              </template>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TeamPersonTile from "../components/TeamPersonTile";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Archive",
  components: {TeamPersonTile},
  props: [],
  computed: {
    ...mapGetters('archiveModule', ['semesters', 'presentations']),
    semesterYears() {
      let semYears = [];
      this.semesters.forEach((semYear) => {
        semYears.push(semYear.year);
      })

      return semYears;
    }
  },
  data() {
    return {
      years_item: ['همه', 96, 97, 98],
      selected_year: null,
      archive_projects: [
        {
          title: "اعداد اول",
          members: [
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
          ],
          year: 96
        },
        {
          title: "اعداد دوم",
          members: [
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
          ],
          year: 96
        },
        {
          title: "اعشار اول",
          members: [
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
          ],
          year: 97
        },
        {
          title: "اعشار دوم",
          members: [
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
          ],
          year: 98
        },

        {
          title: "اعداد اول",
          members: [
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
          ],
          year: 96
        },
        {
          title: "اعداد دوم",
          members: [
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
          ],
          year: 96
        },
        {
          title: "اعشار اول",
          members: [
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
          ],
          year: 97
        },
        {
          title: "اعشار دوم",
          members: [
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
          ],
          year: 98
        },

        {
          title: "اعداد اول",
          members: [
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
          ],
          year: 96
        },
        {
          title: "اعداد دوم",
          members: [
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
          ],
          year: 96
        },
        {
          title: "اعشار اول",
          members: [
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
          ],
          year: 97
        },
        {
          title: "اعشار دوم",
          members: [
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
            {name: 'علی', student_no: "9732507"},
          ],
          year: 98
        },
      ]
    }
  },

  methods: {
    ...mapActions('archiveModule', ['getSemesters', 'getPresentations']),

    getSemPresentations(semesterId) {
      console.log(semesterId);
      this.getPresentations(semesterId).then(() => {
      })
    }
  },

  mounted() {
    this.getSemesters().then(() => {
      this.selected_year = this.semesters[0].year
      this.getPresentations(this.semesters[0].id).then(() => {
      })
    })
  }
}
</script>

<style scoped>

</style>