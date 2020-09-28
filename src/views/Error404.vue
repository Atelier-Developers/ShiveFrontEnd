<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="12" align="center">
                <p>
                    <img
                            src="../assets/sad.svg"
                            style="width:30vw;max-width:150px;"
                    >
                </p>

                <p class="text-faded">
                    صفحه ی مورد نظر یافت نشد!
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
        name: "Error404"
    }
</script>

<style scoped>

</style>