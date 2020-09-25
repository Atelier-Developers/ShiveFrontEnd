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
          ثبت نام کنید...
        </h2>
      </v-col>
      <v-col cols="12">
        <v-text-field
            v-model="user.name"
            label="نام و نام خانوادگی"
            outlined
            :rules="[v => !!v || 'الزامی']"
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
            v-model="user.student_no"
            label="شماره دانشجویی"
            type="number"
            :rules="[v => !!v || 'الزامی']"
            outlined
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
            v-model="user.phone"
            label="تلفن همراه"
            type="number"
            suffix="+98"
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
          @click="signupPerson"
          :loading="loading"
          large
      >
        ثبت نام
      </v-btn>
    </v-row>
    <v-row class="mt-3" justify="center">
      <v-btn text color="primary" @click="sendToLogin">
        اکانت دارید؟ وارد شوید
      </v-btn>
    </v-row>

  </v-form>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "SignupForm",
  data() {
    return {
      valid: false,
      loading: false,
      user: {
        name: "",
        student_no: "",
        phone: "",
        password: ""
      }
    }
  },
  methods: {
    ...mapActions('authModule', ['signUp']),
    sendToLogin() {
      this.$router.push({name: 'Login'})
    },
    signupPerson() {
      if (!this.$refs.form.validate())
        return;
      this.loading = true;
      this.signUp(this.user).finally(() => {
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>


</style>