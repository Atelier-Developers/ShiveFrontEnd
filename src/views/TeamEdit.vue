<template>
  <TeamCreateEdit v-if="!loading" :members="singleTeam.profiles" :presentation="presentation" :action-function="editTeamMembers"
                  :pk="singleTeam.pk" :is-edit="true"/>
  <Spinner v-else/>
</template>

<script>
import TeamCreateEdit from "./TeamCreateEdit";
import {mapActions, mapGetters} from "vuex";
import Spinner from "@/components/Spinner";

export default {
  name: "TeamEdit",
  data() {
    return {
      loading: false,
      team: {}
    }
  },
  components: {Spinner, TeamCreateEdit},
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
    this.loading = true;
    this.setSingleTeam(this.$route.params.id).finally(() => {
      this.loading = false;
    });
  }
}
</script>

<style scoped>

</style>