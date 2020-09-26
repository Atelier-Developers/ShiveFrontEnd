<template>
    <v-card :loading="loading" :disabled="loading">
        <v-card-title class="row justify-center"><h3>{{title}}</h3></v-card-title>
        <v-divider></v-divider>
        <v-list>
            <SubjectTile v-for="subject in subjects" :subject="subject" :actions="actions" :key="subject.pk"/>
        </v-list>
    </v-card>
</template>

<script>
    import SubjectTile from "./SubjectTile";
    export default {
        name: "SubjectList",
        components: {SubjectTile},
        props: ['subjects', 'title', 'actions', 'loading']
    }
</script>

<style scoped>

</style>