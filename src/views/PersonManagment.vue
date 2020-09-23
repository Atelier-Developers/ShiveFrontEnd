<template>
  <div class="mx-3">
    <v-row dense>
      <v-col cols="12" class="row justify-center">
      </v-col>
      <v-col cols="12">
        <v-row >
          <v-col cols="12" class="col-md-4">
            <PersonList :persons="pending" title="در حال انتظار" :actions="pendingActions"/>
          </v-col>
          <v-col cols="12" class="col-md-4">
            <PersonList :persons="accepted" title="پذیرفته شده" :actions="acceptedActions"/>
          </v-col>
          <v-col cols="12" class="col-md-4">
            <PersonList :persons="rejected" title="رد شده" :actions="rejectActions"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div id="floating-button" class="mb-10 mr-7">
      <v-btn
              fab
              dark
              large
              color="primary"
      >
        <v-icon>done</v-icon>
      </v-btn>
    </div>

  </div>

</template>

<script>
import PersonList from "@/components/PersonList";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "PersonManagement",
  components: {PersonList},
  data() {
    return {}
  },
  computed: {
    ...mapGetters('personModule', ['pending', 'accepted', 'rejected']),
    acceptedActions() {
      return [
        {
          color: 'red',
          icon: 'remove',
          onClick: this.removeAccepted
        }
      ];
    },
    pendingActions() {
      return [
        {
          color: 'green',
          icon: 'check',
          onClick: this.acceptPerson
        },
        {
          color: 'red',
          icon: 'close',
          onClick: this.rejectPerson
        }
      ];
    },
    rejectActions() {
      return [
        {
          color: 'red',
          icon: 'remove',
          onClick: this.removeRejected
        }
      ];
    },
  },
  methods: {
    ...
        mapActions('personModule', ['acceptPerson', 'rejectPerson', 'removeAccepted', 'removeRejected'])
  }
}
</script>

<style scoped>
  #floating-button {
    position: absolute;
    bottom: 0;
  }
</style>