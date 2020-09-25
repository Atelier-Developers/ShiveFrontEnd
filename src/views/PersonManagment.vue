<template>
  <div class="mx-3">
    <v-container>
      <v-row dense>
        <v-col cols="12" class="row justify-center">
        </v-col>
        <v-col cols="12">
          <v-row>
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

    </v-container>
    <v-btn
        id="floating-button"
        fab
        dark
        @click="sendNewStateToServer"
        :loading="loading"
        large
        bottom
        right
        absolute
        color="accent"
    >
      <v-icon>done</v-icon>
    </v-btn>

  </div>

</template>

<script>
import PersonList from "@/components/PersonList";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "PersonManagement",
  components: {PersonList},
  data() {
    return {
      loading: false,
    }
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
        mapActions('personModule', ['acceptPerson', 'rejectPerson', 'removeAccepted', 'removeRejected', 'getPendingPersons', 'acceptPersonProfile', 'rejectPersonProfile']),
    async sendNewStateToServer() {
      this.loading = true
      this.acceptPersonProfile().then(async () => {
        return this.rejectPersonProfile();
      }).finally(() => {
        this.loading = false;
      });
    }

  },
  mounted() {
    this.loading = true;
    this.getPendingPersons().finally(() => {
          this.loading = false;
        }
    )
  }
}
</script>

<style scoped>
#floating-button {
  position: absolute;g
  bottom: 0;
}
</style>