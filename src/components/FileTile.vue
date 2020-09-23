<template>
  <v-card tile>
    <v-card-title>
      {{ name }}
    </v-card-title>
    <v-card-text>
      <v-row justify="end" class="mx-2">
        <v-col cols="6">
          <v-btn v-if="type!='pptx'">
            <v-icon>play_arrow</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn>
            <v-icon class="rotated">publish</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "FileTile",
  props: ['name', 'type']
}
</script>

<style scoped>
.rotated {
  transform: rotateZ(180deg);
}
</style>