<template>
  <v-container fluid class="primary">
    <v-row justify="center" align="center">
      <v-card rounded elevation="10"  style="max-width: 700px; width: 95vw">
        <SignupForm/>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import SignupForm from "@/components/SignupForm";

export default {
  name: "Signup",
  components: {SignupForm}
}
</script>

<style scoped>

</style>