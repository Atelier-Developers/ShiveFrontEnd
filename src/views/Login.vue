<template>
  <v-container fluid class="primary">
    <v-row justify="center" align="center">
      <v-card rounded elevation="10" style="max-width: 700px; width: 95vw">
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