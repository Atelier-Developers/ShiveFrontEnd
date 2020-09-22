<template>
  <v-card tile>
    <v-card-title  class="justify-center">
      {{title}}
    </v-card-title>
    <v-divider/>
    <PersonTile v-for="person in persons" :person="person" :key="person.pk"/>
  </v-card>
</template>

<script>
import PersonTile from "@/components/PersonTile";

export default {
  name: "PersonList",
  components: {PersonTile},
  props: ['persons', 'title']
}
</script>

<style scoped>

</style>