<template>
    <v-card tile>
        <v-div class="primary">
            <v-card-title class="primary accent--text justify-center header-6">
                {{name}}
            </v-card-title>
        </v-div>
        <v-divider/>
        <v-card-text>
            <v-row justify="space-around" class="mx-2">
                <v-btn color="primary" fab small>
                    <v-icon color="accent">play_arrow</v-icon>
                </v-btn>
                <v-btn color="primary" fab small>
                    <v-icon class="rotated" color="accent">publish</v-icon>
                </v-btn>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "FileTile",
        props: ['name', 'type']
    }
</script>

<style scoped>
    .rotated {
        transform: rotateZ(180deg);
    }
</style>