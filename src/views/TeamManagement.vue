<template>
  <div class="mx-3">
    <v-row dense>
      <v-col cols="12" class="col-md-3" v-for="team in teams">
        <TeamList :persons="team.members" :title="team.subject"/>
      </v-col>
    </v-row>
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

  }
}
</script>

<style scoped>

</style>