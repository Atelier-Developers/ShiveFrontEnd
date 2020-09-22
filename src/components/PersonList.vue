<template>
  <v-card tile>
    <v-card-title class="justify-center">
      {{ title }}
    </v-card-title>
    <v-divider/>
    <PersonTile v-for="person in persons" :person="person" :key="person.pk" :actions="actions"/>
  </v-card>
</template>

<script>
import PersonTile from "@/components/PersonTile";

export default {
  name: "PersonList",
  components: {PersonTile},
  props: ['persons', 'title', 'actions']
}
</script>

<style scoped>

</style>