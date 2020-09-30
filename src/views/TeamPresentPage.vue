<template>
  <div v-if="!pageLoading">
    <template v-if="teamPresentation !== undefined">
      <v-container>
        <v-row justify="center">
          <h1>{{ teamPresentation.subject.title }}</h1>
        </v-row>
      </v-container>
      <v-container>
        <PresentationFileComponent :loading="pageLoading" class="mx-5 mx-sm-15" :is-deletable="true"
                                   :delete-file="deleteFile"
                                   :files="teamPresentation.files"/>
      </v-container>
      <v-container>
        <v-card class="mx-5 mx-sm-15" tile :loading="pageLoading">
          <v-card-title class="pr-10">
            <v-icon right>description</v-icon>
            توضیحات
          </v-card-title>
          <v-divider/>
          <v-card-text v-if="teamPresentation.description">
                   <span style="white-space: pre-wrap">
                    {{ teamPresentation.description }}
                   </span>
          </v-card-text>
          <v-card-text class="text-center" v-else>
            توضیحی وارد نشده است...
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
                class="ml-5 mb-2"
                color="primary"
                rounded
                @click.stop="openDescriptionEditDialog"
            >
              <v-icon>create</v-icon>
            </v-btn>

            <v-dialog
                v-model="descriptionEditDialog"
                max-width="570"
            >
              <v-card :loading="descriptionLoading" :disabled="descriptionLoading">
                <v-card-title>
                  <span class="headline">توضیحات جدید</span>
                </v-card-title>
                <v-card-text>
                  <v-textarea outlined auto-grow rows="3" label="توضیحات خود را وارد کنید..."
                              v-model="item.description"/>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="descriptionEditDialog = false">انصراف</v-btn>
                  <v-btn color="blue darken-1" text @click="() => editDescription(item.description)">
                    تایید
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-container>

      <v-container>
        <PresentationComment :comments="teamPresentation.comments" class="mx-5 mx-sm-15"/>
      </v-container>
      <div id="floating-button" class="mb-10 mr-3">
        <v-btn
            fab
            @click="fileUploadDialog = true"
            color="primary"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <v-dialog
            v-model="fileUploadDialog"
            max-width="570"
        >
          <v-card :loading="fileUploadLoading" :disabled="fileUploadLoading">
            <v-card-title>
              <span class="headline">آپلود فایل جدید</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field :rules="[v => !!v || 'الزامی']" label="نام فایل" v-model="newItem.name" outlined dense/>
                </v-col>
                <v-col cols="12">
                  <v-file-input :rules="[v => !!v || 'الزامی']" label="فایل جدید خود را انتخاب کنید" v-model="newItem.file" outlined dense/>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="fileUploadDialog = false">انصراف</v-btn>
              <v-btn :disabled="disabled" type="submit" color="blue darken-1" text @click="handleFileUpload">تایید</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <v-row v-else justify="center" align="center" class="fill-height">
      <div>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-icon size="100">group</v-icon>
          </v-col>

          <v-col cols="12" class="text-center display-1">
            هنوز تیم شما تعیین نشده است!
          </v-col>
        </v-row>
      </div>
    </v-row>
  </div>
  <Spinner v-else/>

</template>

<script>
import FileTile from "../components/FileTile";
import {mapActions, mapGetters} from "vuex";
import PresentationFileComponent from "../components/PresentationFileComponent";
import PresentationComment from "@/components/PresentationComment";
import Spinner from "../components/Spinner";

export default {
  name: "TeamPresentPage",
  components: {Spinner, PresentationComment, PresentationFileComponent, FileTile},
  data() {
    return {
      item: {
        description: '',
        file: null,
        name: ''
      },

      newItem: {
        file: null,
        name: ''
      },

      descriptionLoading: false,
      descriptionEditDialog: false,
      fileUploadDialog: false,
      fileUploadLoading: false,
      pageLoading: true,
    }
  },
  computed: {
    ...mapGetters('presentationModule', ['teamPresentation']),

    disabled() {
      return this.newItem.file === null || this.newItem.name === null || this.newItem.name === '';
    }
  },
  methods: {
    ...mapActions('presentationModule', ['getTeamPresentation', 'uploadFileForTeamPresentation', 'setDescriptionForTeamPresentation', 'deleteFileFromTeamPresentation']),
    handleFileUpload() {
      this.fileUploadLoading = true;
      this.uploadFile(this.newItem.file, this.newItem.name).then(() => {
        this.fileUploadLoading = false;
        this.fileUploadDialog = false;
      })
    },
    openDescriptionEditDialog() {
      this.item.description = this.teamPresentation.description
      this.descriptionEditDialog = true
    },
    uploadFile(file, name) {
      return this.uploadFileForTeamPresentation({
        pk: this.teamPresentation.pk,
        file: file,
        name: name
      }).then(() => {
        return this.getTeamPresentation();
      }).then(() => {
        this.newItem.file = null;
        this.newItem.name = '';
      });
    },
    editDescription(description) {
      this.descriptionLoading = true;
      this.setDescriptionForTeamPresentation({
        pk: this.teamPresentation.pk,
        description: {description: description}
      }).then(() => {
        return this.getTeamPresentation();
      }).then(() => {
        this.item.description = '';
        this.descriptionLoading = false;
        this.descriptionEditDialog = false;
      });
    },
    deleteFile(id) {
      return this.deleteFileFromTeamPresentation(id).then(() => {
        return this.getTeamPresentation();
      });
    },


  },
  mounted() {
    this.pageLoading = true;
    this.getTeamPresentation().finally(() => {
      this.pageLoading = false;
    });
  }
}
</script>

<style scoped>

</style>