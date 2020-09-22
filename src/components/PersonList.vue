<template>
  <v-card tile>
    <PersonTile v-for="person in persons" :person="person" :key="person.pk"/>
  </v-card>
</template>

<script>
import PersonTile from "@/components/PersonTile";

export default {
  name: "PersonList",
  components: {PersonTile},
  props: ['persons']
}
</script>

<style scoped>

</style>