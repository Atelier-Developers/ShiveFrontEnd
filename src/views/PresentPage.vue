<template>
  <div>
    <h1 align="center" >ارائه جاری</h1>
    <div v-if="!loading && currentPresentation">
      <v-container>
        <v-row justify="center">
          <h1>{{ currentPresentation.subject.title }}</h1>
        </v-row>
        <v-row justify="center">
          <h3 class="subtitle-1">توسط</h3>
        </v-row>
        <v-row justify="center">
          <h3 class="subtitle-1">{{ presenterNames }}</h3>
        </v-row>
      </v-container>

      <v-container>
        <PresentationFileComponent class="mx-5 mx-sm-15" :is-deletable="false" :loading="loading"
                                   :files="currentPresentation.files"/>
      </v-container>
      <v-container>
        <v-card class="mx-5 mx-sm-15" tile :loading="loading">
          <v-card-title class="pr-10">
            <v-icon right>description</v-icon>
            توضیحات
          </v-card-title>
          <v-divider/>
          <v-card-text v-if="currentPresentation.description">
                   <span style="white-space: pre-wrap">
                      {{ currentPresentation.description }}
                   </span>
          </v-card-text>
          <v-card-text class="text-center" v-else>
            توضیحی وارد نشده است...
          </v-card-text>
        </v-card>
      </v-container>

      <v-container>
        <PresentationComment :comments="currentPresentation.comments" class="mx-5 mx-sm-15" :loading="loading">
          <v-container>
            <v-card flat>
              <v-card-title>
                <h5>نظر خود را وارد نمایید:</h5>
              </v-card-title>
              <v-container>
                <v-textarea outlined label="کامنت جدید..."
                            required v-model="comment" rows="4">
                </v-textarea>
              </v-container>
              <v-card-actions class="justify-center">
                <v-btn
                        :disabled="comment === ''"
                        class="mb-2"
                        color="primary"
                        rounded
                        :loading="commentLoading"
                        @click="() => postComment(comment)"
                >
                  <v-icon dark>add</v-icon>
                </v-btn>
              </v-card-actions>
              <v-divider/>
            </v-card>
          </v-container>
        </PresentationComment>

      </v-container>
    </div>
    <Spinner v-else-if="loading" />
    <EmptyState class="fill-height" v-else />
  </div>
</template>

<script>
import FileTile from "../components/FileTile";
import VideoPlayer from "../components/VideoPlayer";
import {mapActions, mapGetters} from "vuex";
import PresentationFileComponent from "../components/PresentationFileComponent";
import PresentationComment from "@/components/PresentationComment";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";

export default {
  name: "PresentPage",
  components: {EmptyState, Spinner, PresentationComment, PresentationFileComponent, VideoPlayer, FileTile},
  props: ['id'],
  data() {
    return {
      comment: '',
      descriptionEditDialog: false,
      fileUploadDialog: false,
      loading: true,
      commentLoading: false,
    }
  },
  computed: {
    ...mapGetters('presentationModule', ['currentPresentation']),
    presenterNames() {
      let teamMemeberNames = this.currentPresentation.team[0].profiles.map((p) => p.name);
      let memberNames = teamMemeberNames.join(' و ');
      return memberNames;
    }
  },
  methods: {
    ...mapActions('presentationModule', ['getCurrentPresentation', 'postCommentForCurrentPresentation']),
    postComment(comment) {
      this.commentLoading = true;
      this.postCommentForCurrentPresentation({
        pk: this.currentPresentation.pk,
        comment: {text: comment}
      }).then(() => {
        this.comment = '';
        return this.getCurrentPresentation();
      }).then(() => {
        this.commentLoading = false;
      })
    }
  },
  mounted() {
    this.loading = true;
    this.getCurrentPresentation().finally(() => {
      this.loading = false;
    });
  }

}
</script>

<style scoped>
</style>