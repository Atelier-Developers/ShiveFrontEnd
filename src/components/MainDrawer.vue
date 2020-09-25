<template>
  <v-navigation-drawer
      class="primary"
      app
      dark
      right
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
      <div class="pa-2" @click="logoutUser">
        <v-btn block>خروج</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "MainDrawer",
  data() {
    return {
      items: [
        {
          icon: "group",
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
      ]
    }
  },
  methods: {
    ...mapActions('authModule', ['logout']),
    logoutUser(){
      this.logout();
      this.$router.replace({name: "Login"})
    }
  }
}
</script>

<style scoped>

</style>