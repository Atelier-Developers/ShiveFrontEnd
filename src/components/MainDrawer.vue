<template>
  <v-navigation-drawer
      v-if="isShowing"
      class="primary"
      app
      :mobile-breakpoint="960"
      dark
      right
      v-model="drawer"
      :temporary="responsive"
      :mini-variant="!responsive"
      :expand-on-hover="!responsive"
      clipped
  >
    <v-list>
      <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          v-if="item.permission"
          link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list-item link @click="logoutUser">
        <v-list-item-icon>
          <v-icon>logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>خروج</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "MainDrawer",
  props: ['responsive', 'isShowing'],
  computed: {
    ...mapGetters('authModule', ['isAuthenticated']),
    items() {
      return [
        {
          icon: "announcement",
          title: "اطلاعیه ها",
          to: {
            name: "Announcement"
          },
          permission: this.$can('read', 'all')
        },
        {
          icon: "people",
          title: "تیم من",
          to: {
            name: "TeamPresentPage"
          },
          permission: this.$can('read', 'teampresentation')
        },
        {
          icon: "backup",
          title: "بارگذاری تکالیف",
          to: {
            name: "AssignmentUpload"
          },
          permission: this.$can('read', 'teampresentation')
        },
        {
          icon: "how_to_reg",
          title: "مدیریت تیم ها",
          to: {
            name: "TeamManagement"
          },
          permission: this.$can('read', 'team')
        },
        {
          icon: "face",
          title: "مدیریت کاربران",
          to: {
            name: "UserManagement"
          },
          permission: this.$can('read', 'user')
        },
        {
          icon: "subject",
          title: "مدیریت موضوعات ارائه",
          to: {
            name: "SubjectManagement"
          },
          permission: this.$can('read', 'subject')

        },
        {
          icon: "assignment",
          title: "تکالیف",
          to: {
            name: "AssignmentList"
          },
          permission: this.$can('read', 'subject')
        },
        {
          icon: "slideshow",
          title: "ارائه‌ی جاری",
          to: {
            name: "PresentPage"
          },
          permission: this.$can('read', 'all')
        },
        {
          icon: "archive",
          title: "آرشیو",
          to: {
            name: "Archive"
          },
          permission: this.$can('read', 'all')
        },
        {
          icon: "drafts",
          title: "پیشنهاد یا انتقاد",
          to: {
            name: "SuggestionsAndComplaintsCreate"
          },
          permission: this.$can('read', 'teampresentation')
        },
        {
          icon: "drafts",
          title: "پیشنهادات و انتقادات",
          to: {
            name: "SuggestionsAndComplaintsList"
          },
          permission: this.$can('read', 'subject')
        },
      ]
    }

  },
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    ...mapActions('authModule', ['logout']),
    logoutUser() {
      this.logout();
      this.$router.replace({name: "Login"})
    },
  },
}
</script>

<style scoped>

</style>