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
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
            v-model="user.student_no"
            label="شماره دانشجویی"
            type="number"
            :counter="7"
            outlined
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
            v-model="user.phone"
            label="تلفن همراه"
            type="number"
            prefix="+98"
            :counter="7"
            outlined
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
            v-model="user.password"
            outlined
            label="رمزعبور"
            required
            type="password"
        ></v-text-field>
      </v-col>
      <v-btn
          :disabled="!valid"
          color="primary"
          class="px-10"
          large
      >
        ثبت نام
      </v-btn>
    </v-row>


  </v-form>

</template>

<script>
export default {
  name: "SignupForm",
  data() {
    return {
      valid: false,
      user: {
        name: "",
        student_no: "",
        phone: "",
        password: ""
      }
    }
  }
}
</script>

<style scoped>

</style>