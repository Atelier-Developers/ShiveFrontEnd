<template>
    <v-list-item
            :key="subject.id"
            :inactive="inactive"
    >
        <v-list-item-content>
            <v-list-item-content>{{subject.title}}</v-list-item-content>
        </v-list-item-content>
        <v-list-item-action v-for="action in actions">
            <v-btn icon @click="() => action.onClick(subject)">
                <v-icon :color="action.color">{{action.icon}}</v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
    export default {
        name: "SubjectTile",
        props: ['subject', 'actions']
    }
</script>

<style scoped>

</style>