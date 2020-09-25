<template>

  <v-navigation-drawer
      class="primary"
      app
      dark
      right
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
      <div class="pa-2" @click="logout">
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
          icon: "",
          title: "مدیریت تیم ها",
          to: {
            name: "TeamManagement"
          }
        },
        {
          icon: "",
          title: "مدیریت کاربران",
          to: {
            name: "UserManagement"
          }
        },
        {
          icon: "",
          title: "مدیریت موضوعات ارائه",
          to: {
            name: "SubjectManagement"
          }
        },
        {
          icon: "",
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
  }
}
</script>

<style scoped>

</style>