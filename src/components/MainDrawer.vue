<template>
  <v-navigation-drawer
      v-if="isAuthenticated"
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
  props: ['responsive'],
  computed: {
    ...mapGetters('authModule', ['isAuthenticated']),
  },
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: "people",
          title: "تیم من",
          to: {
            name: "TeamPresentPage"
          }
        },
        {
          icon: "how_to_reg",
          title: "مدیریت تیم ها",
          to: {
            name: "TeamManagement"
          }
        },
        {
          icon: "face",
          title: "مدیریت کاربران",
          to: {
            name: "UserManagement"
          }
        },
        {
          icon: "subject",
          title: "مدیریت موضوعات ارائه",
          to: {
            name: "SubjectManagement"
          }
        },
        {
          icon: "slideshow",
          title: "ارائه",
          to: {
            name: "PresentPage"
          }
        },
        {
          icon: "archive",
          title: "آرشیو",
          to: {
            name: "Archive"
          }
        },
      ]
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