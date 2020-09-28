<template>
  <v-form
      ref="form"
      @submit.prevent="loginPerson"
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
          type="submit"
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
    <v-snackbar v-model="reqStatus.error" color="error">
      {{ reqStatus.msg }}
    </v-snackbar>
  </v-form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ErrorBoundary from "vue-error-boundary";
import defineRulesFor from "@/services/ability";

export default {
  name: "LoginForm",
  components: {ErrorBoundary},
  data() {
    return {
      value: true,
      valid: false,
      loading: false,
      reqStatus: {
        error: false,
        msg: "",
      },
      user: {
        username: "",
        password: ""
      }
    }
  },
  computed: {
    ...mapGetters('roleModule', ['role']),
  },
  methods: {
    sendToSignup() {
      this.$router.replace({name: 'Signup'})
    },
    ...mapActions('authModule', ['login']),
    ...mapActions('roleModule', ['getRole']),
    loginPerson() {
      if (!this.$refs.form.validate())
        return;
      this.loading = true;
      this.login(this.user).then(() => {
        return this.getRole().then(() => {
          return this.$ability.update(defineRulesFor(this.role).rules);
        })
      }).then(() => {
        this.$router.replace({name: "Announcement"})
      }).catch((e) => {
        this.reqStatus.msg = e.message;
        this.reqStatus.error = true;
      }).finally(() => {
        this.loading = false;
      })
    },
  }
}
</script>

<style scoped>

</style>