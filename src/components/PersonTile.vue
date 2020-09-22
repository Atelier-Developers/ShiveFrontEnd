<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ person.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ person.student_no }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action v-for="action in actions">
      <v-btn icon @click="() => action.onClick(person)">
        <v-icon
            :color="action.color"
        >
          {{ action.icon }}
        </v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "PersonTile",
  props: ['person', 'actions']
}
</script>

<style scoped>

</style>