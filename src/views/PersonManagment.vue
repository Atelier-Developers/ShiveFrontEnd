<template>
  <div class="mx-3">
    <VideoPlayer></VideoPlayer>
    <v-container>
      <h1 align="center">مدیریت کاربران</h1>
      <v-row dense>
        <v-col cols="12" class="row justify-center">
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" class="col-md-4">
              <PersonList :persons="pending" :loading="pageLoading" title="در حال انتظار" :actions="pendingActions"/>
            </v-col>
            <v-col cols="12" class="col-md-4">
              <PersonList :persons="accepted" :loading="pageLoading" title="پذیرفته شده" :actions="acceptedActions"/>
            </v-col>
            <v-col cols="12" class="col-md-4">
              <PersonList :persons="rejected" :loading="pageLoading" title="رد شده" :actions="rejectActions"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-container>
    <div id="floating-button" class="mb-10">
      <v-btn
              fab
              @click="sendNewStateToServer"
              :loading="loading"
              color="primary"
      >
        <v-icon color="accent">done</v-icon>
      </v-btn>
    </div>
  </div>

</template>

<script>
import PersonList from "@/components/PersonList";
import {mapActions, mapGetters} from "vuex";
import Spinner from "../components/Spinner";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
import VideoPlayer from "../components/VideoPlayer";

export default {
  name: "PersonManagement",
  components: {VideoPlayer, CardLoadingSkeleton, Spinner, PersonList},
  data() {
    return {
      loading: false,
      pageLoading: false,
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
    this.pageLoading = true;
    this.getPendingPersons().finally(() => {
          this.pageLoading = false;
        }
    )
  }
}
</script>

<style scoped>

</style>