<template>
  <v-card tile elevation="5">
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
    <v-card-actions>
      <v-btn
          icon
          color="orange"
      >
        <v-icon>create</v-icon>
      </v-btn>
      <v-btn
          color="error"
          icon
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-actions>
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