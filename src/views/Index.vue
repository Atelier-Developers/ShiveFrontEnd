<template>
    <v-container>
        <v-row key="animate" justify="center" align="center">
            <v-col transition="slide-x-transition" key="sad" cols="12" align="center">
                <p>
                    <v-img
                            src="../assets/logo.svg"
                            width="30vw"
                            max-width="150px"
                    />
                </p>

                <p class="text-faded">
                    به پنل کاربری درس شیوه ی ارائه ی مطالب فنی خوش آمدید!
                </p>

<!--                <v-btn-->
<!--                        color="primary"-->
<!--                        style="width:200px;"-->
<!--                        to="/"-->
<!--                >ورود به صفحه ی تیم</v-btn>-->
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    require('vue2-animate/dist/vue2-animate.min.css')
    export default {
        name: "Index",
        data() {
            return {
                items: [
                    "sadsa",
                    "sadsa",
                    "sadsa",
                    "sadsa",

                ]
            }
        }
    }
</script>

<style scoped>

</style>