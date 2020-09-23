<template>
  <v-card tile>
    <v-card-title class="justify-center">
      {{ title !== undefined ? title : '(بدون موضوع)' }}
    </v-card-title>
    <v-divider/>
    <template v-if="persons.length > 0">
      <TeamPersonTile v-for="person in persons" :person="person" :key="person.pk"/>
    </template>
    <v-card-text class="text-center" v-else>
      لیست خالی است...
    </v-card-text>
  </v-card>
</template>

<script>
import TeamPersonTile from "@/components/TeamPersonTile";

export default {
  name: "TeamList",
  components: {TeamPersonTile},
  props: ['persons', 'title'],
}
</script>

<style scoped>

</style>