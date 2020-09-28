<template>
    <v-container style="height: 80vh">
        <v-row justify="center" align="center">
            <v-col cols="12" align="center">
                <p>
                    <img
                            src="../assets/empty-folder.png"
                            style="width:30vw;max-width:150px;"
                    >
                </p>

                <p class="text-faded">
                    موردی یافت نشد!
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "EmptyState"
    }
</script>

<style scoped>

</style>