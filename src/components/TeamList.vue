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
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="error"
              icon
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">حذف تیم</v-card-title>
          <v-card-text>آیا از حذف این تیم مطمئن هستید؟
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="dialog = false">انصراف</v-btn>
            <v-btn color="error darken-1" text @click="dialog = false">حذف</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import TeamPersonTile from "@/components/TeamPersonTile";

export default {
  name: "TeamList",
  components: {TeamPersonTile},
  props: ['persons', 'title'],
  data() {
    return {
      dialog: false,
    }
  }
}
</script>

<style scoped>

</style>