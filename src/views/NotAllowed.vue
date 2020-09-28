<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="12" align="center">
                <p>
                    <img
                            src="../assets/padlock.png"
                            style="width:30vw;max-width:150px;"
                    >
                </p>

                <p class="text-faded">
                    شما اجازه ی دسترسی به این صفحه را ندارید!
                </p>

                <v-btn
                        color="primary"
                        style="width:200px;"
                        to="/"
                >بازگشت</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "NotAllowed"
    }
</script>

<style scoped>

</style>