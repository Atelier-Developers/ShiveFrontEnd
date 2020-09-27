<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="col-md-4">
          سال:
          <v-select
              v-model="selected_year"
              :items="semesterYears"
              solo
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12" class="col-md-4" v-for="project in archive_projects"
               v-if="selected_year === 'همه' || project.year === selected_year">
          <v-card>
            <v-card-title>{{ project.title }}</v-card-title>
            <v-card-subtitle>سال {{ project.year }}</v-card-subtitle>
            <v-divider/>
            <v-card-text>
              <template v-if="project.members.length > 0">
                <TeamPersonTile v-for="person in project.members" :person="person"/>
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
      selected_year: 'همه',
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
    ...mapActions('archiveModule', ['getSemesters'])
  },

  mounted() {
    this.getSemesters().then(() => {

    })
  }
}
</script>

<style scoped>

</style>