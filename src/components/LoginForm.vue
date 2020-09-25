<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="py-5 px-5"
  >
    <v-row justify="center" no-gutters>
      <v-col cols="12" class="pb-7">
        <h2 class="text-center display-1">
          وارد شوید...
        </h2>
      </v-col>
      <v-col cols="12">
        <v-text-field
            v-model="user.username"
            label="شماره دانشجویی"
            type="number"
            :rules="[v => !!v || 'الزامی']"
            outlined
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
            v-model="user.password"
            outlined
            label="رمزعبور"
            :rules="[v => !!v || 'الزامی']"
            required
            type="password"
        ></v-text-field>
      </v-col>
      <v-btn
          :disabled="!valid"
          color="primary"
          class="px-10"
          :loading="loading"
          @click="loginPerson"
          large
      >
        ورود
      </v-btn>

    </v-row>
    <v-row class="mt-3" justify="center">
      <v-btn text color="primary" @click="sendToSignup">
        اکانت ندارید؟ ثبت نام کنید
      </v-btn>
    </v-row>


  </v-form>
</template>

<script>
import {mapActions} from "vuex";
import ErrorBoundary from "vue-error-boundary";

export default {
  name: "LoginForm",
  components: {ErrorBoundary},
  data() {
    return {
      valid: false,
      loading: false,
      user: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    sendToSignup() {
      this.$router.push({name: 'Signup'})
    },
    ...mapActions('authModule', ['login']),
    loginPerson() {
      if (!this.$refs.form.validate())
        return;
      this.loading = true;
      this.login(this.user).finally(() => {
        this.loading = false;
      })
    },
    findError(err) {
      console.log(err);
      console.log("error")
    }

  }
}
</script>

<style scoped>

</style>