<template>
  <v-card tile :loading="loading" :disabled="loading">
    <v-card-title class="justify-center">
      {{ title }}
    </v-card-title>
    <v-divider/>
    <template v-if="persons.length > 0">
      <PersonTile v-for="person in persons" :person="person" :key="person.pk"
                  :actions="actions"/>
    </template>
    <v-card-text class="text-center" v-else>
      لیست خالی است...
    </v-card-text>
  </v-card>
</template>

<script>
import PersonTile from "@/components/PersonTile";

export default {
  name: "PersonList",
  components: {PersonTile},
  props: ['persons', 'title', 'actions', 'loading']
}
</script>

<style scoped>

</style>