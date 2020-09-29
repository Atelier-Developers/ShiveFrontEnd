<template>
    <v-row class="fill-height">
        <v-col cols="12" class="col-md-4" v-for="i in 3" :key="i">
            <v-skeleton-loader
                    type="card"
                    :loading="true" />
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "CardLoadingSkeleton"
    }
</script>

<style scoped>

</style>