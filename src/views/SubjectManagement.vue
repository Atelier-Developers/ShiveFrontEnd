<template>
  <div class="mx-3">
    <v-container>
      <v-row justify="center">
        <v-skeleton-loader
                style="max-width: 700px; width: 90vw"
                v-if="pageLoading"
                type="card"
                :loading="true" />
        <SubjectList v-else style="max-width: 700px; width: 90vw" title="موضوعات" :subjects="subjects"
                     :actions="editSubjectActions"/>
      </v-row>
    </v-container>
    <div id="floating-button" class="mb-10">
      <InputFieldDialogButton title="موضوع جدید" input-place-holder="تیتر" :button-attrs="addSubjectButtonAttributes"
                              :action="addToSubjects" :subject="{...subject}" icon="add">
      </InputFieldDialogButton>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SubjectList from "../components/SubjectList";
import InputFieldDialogButton from "../components/InputFieldDialogButton";
import {mapActions, mapGetters} from "vuex";
import Spinner from "../components/Spinner";

export default {
  name: 'Home',
  components: {Spinner, SubjectList, InputFieldDialogButton},
  data() {
    return {
      subject: {
        title: '',
      },
      loading: false,
      pageLoading: false,
    }
  },
  computed: {
    ...mapGetters('subjectModule', ['subjects']),
    editSubjectActions() {
      return [
        {
          icon: 'edit',
          isEdit: true,
          onClick: this.changeOneSubject,
          dialog: {
            buttonAttrs: {
              icon: true,
              color: 'primary'
            },
            title: 'ویرایش موضوع'
          }

        },
        {
          icon: 'delete',
          onClick: this.removeFromSubjects,
          isEdit: false,
          color: 'red'
        },

      ]
    },
    addSubjectButtonAttributes() {
      return {
        fab: true,
        dark: true,
        large: true,
        color: "primary"
      }
    }
  },
  methods: {
    ...mapActions('subjectModule', ['addToSubjects', 'removeFromSubjects', 'changeOneSubject', 'getSubjects'])
  },
  mounted() {
    this.pageLoading = true;
    this.getSubjects().finally(() => {this.pageLoading = false;});
  }
}
</script>

<style scoped>
</style>