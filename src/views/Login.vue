<template>
  <v-container fluid class="primary">
    <v-row justify="center" align="center">
      <v-card class="mx-2" rounded elevation="10">
        <LoginForm/>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from "@/components/LoginForm";

export default {
  name: "Login",
  components: {LoginForm}
}
</script>

<style scoped>

</style>