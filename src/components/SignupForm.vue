<template>
    <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="signupPerson"
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
                />
            </v-col>
            <v-col cols="12">
                <v-text-field
                        v-model="user.student_no"
                        label="شماره دانشجویی"
                        type="number"
                        :rules="[v => !!v || 'الزامی', v => this.studentValidation(v) || 'شماره دانشجویی نامعتبر']"
                        outlined
                        required
                />
            </v-col>
            <v-col cols="12">
                <v-text-field
                        v-model="user.phone"
                        label="تلفن همراه"
                        type="number"
                        suffix="+98"
                        :rules="[v => !!v || 'الزامی', v => this.phoneValidation(v) || 'شماره تلفن نامعتبر']"
                        outlined
                        required
                />
            </v-col>
            <v-col cols="12">
                <v-text-field
                        v-model="user.password"
                        outlined
                        label="رمزعبور"
                        :rules="[v => !!v || 'الزامی']"
                        required
                        :append-icon="value ? 'visibility' : 'visibility_off'"
                        @click:append="() => (value = !value)"
                        :type="value ? 'password' : 'text'"
                />
            </v-col>
            <v-btn
                    :disabled="!valid"
                    color="primary"
                    class="px-10"
                    type="submit"
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
        <v-snackbar v-model="reqStatus.error" color="error">
            {{reqStatus.msg}}
        </v-snackbar>
    </v-form>

</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "SignupForm",
        data() {
            return {
                value: true,
                valid: false,
                reqStatus: {
                    error: false,
                    msg: "",
                },
                loading: false,
                user: {
                    name: "",
                    student_no: "",
                    phone: "",
                    password: ""
                }
            }
        },
        computed: {
            isPhoneValid(){
                return RegExp('^9\\d{9}$');
            },
        },
        methods: {
            ...mapActions('authModule', ['signUp']),
            sendToLogin() {
                this.$router.replace({name: 'Login'})
            },
            signupPerson() {
                if (!this.$refs.form.validate())
                    return;
                this.loading = true;
                this.signUp(this.user).then(() => {
                  this.$router.replace({name: 'Login'})
                }).catch((e) => {
                    this.reqStatus.msg = e.message;
                    this.reqStatus.error = true;
                }).finally(() => {
                    this.loading = false;
                })
            },
            phoneValidation(v) {
                return this.isPhoneValid.test(v);
            },
            studentValidation(v) {
                return v.length === 7;
            },
        }
    }
</script>

<style scoped>


</style>