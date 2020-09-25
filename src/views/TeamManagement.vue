<template>
  <div class="mx-3">
    <v-container>
      <v-row v-if="teams.length !== 0" class="fill-height">
        <v-col cols="12" class="col-md-4" v-for="team in teams">
          <TeamList :team="team"/>
        </v-col>
      </v-row>
    </v-container>
    <div id="floating-button" class="mb-10">
      <v-btn
          fab
          @click="routeToCreateTeam"
          color="accent"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </div>
  </div>
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
  mounted() {
    this.$store.dispatch('teamModule/setTeam')
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