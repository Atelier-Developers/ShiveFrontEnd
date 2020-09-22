<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ person.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ person.student_no }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
     <v-btn icon>
       <v-icon
           color="green"
       >
         check
       </v-icon>
     </v-btn>
    </v-list-item-action>
    <v-list-item-action>
      <v-btn icon>
        <v-icon
            color="red"
        >
          close
        </v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "PersonTile",
  props: ['person']
}
</script>

<style scoped>

</style>