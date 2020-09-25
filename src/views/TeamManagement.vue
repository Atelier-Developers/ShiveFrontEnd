<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="col-md-4" v-for="team in teams">
        <TeamList :persons="team.members" :title="team.subject"/>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {mapGetters} from "vuex";
import TeamList from "@/components/TeamList";

export default {
  name: "TeamManagement",
  components: {TeamList},
  computed: {
    ...mapGetters('teamModule', ['teams']),
  },
  created () {
    this.$store.dispatch('teamModule/setTeam')
  }
}
</script>

<style scoped>

</style>