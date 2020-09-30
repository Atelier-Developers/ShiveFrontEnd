<template>
  <div>
    <v-container>
      <v-row justify="center">
        <h1>{{ presentation.subject.title }}</h1>
      </v-row>
      <v-row justify="center">
        <h3 class="subtitle-1">توسط</h3>
      </v-row>
      <v-row justify="center">
        <h3 class="subtitle-1">{{ presenterNames }}</h3>
      </v-row>
    </v-container>

    <v-container>
      <PresentationFileComponent class="mx-5 mx-sm-15" :is-deletable="false" :files="presentation.files"/>
    </v-container>
    <v-container>
      <v-card class="mx-5 mx-sm-15" tile>
        <v-card-title class="pr-10">
          <v-icon right>description</v-icon>
          توضیحات
        </v-card-title>
        <v-divider/>
        <v-card-text v-if="presentation.description">
                   <span style="white-space: pre-wrap">
                    {{ presentation.description }}
                   </span>
        </v-card-text>
        <v-card-text class="text-center" v-else>
          توضیحی وارد نشده است...
        </v-card-text>
      </v-card>
    </v-container>
    <v-container>
      <PresentationComment :comments="presentation.comments" class="mx-5 mx-sm-15"/>
    </v-container>
  </div>
</template>

<script>
import FileTile from "../components/FileTile";
import VideoPlayer from "../components/VideoPlayer";
import PresentationFileComponent from "../components/PresentationFileComponent";
import PresentationComment from "@/components/PresentationComment";

export default {
  name: "ArchivedPresentationPage",
  components: {PresentationComment, PresentationFileComponent, VideoPlayer, FileTile},
  data() {
    return {
      descriptionEditDialog: false,
      fileUploadDialog: false,
    }
  },
  computed: {
    presenterNames() {
      let teamMemberNames = this.presentation.team[0].profiles.map((p) => p.name);
      return teamMemberNames.join(' و ');
    },
    presentation() {
      return this.$route.params.presentation;
    }
  },
  methods: {},
  mounted() {
    if (this.presentation === undefined){
      this.$router.replace({name: "Archive"})
    }
  }

}
</script>

<style scoped>
</style>