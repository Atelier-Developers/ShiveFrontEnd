<template>
  <v-card tile>
    <v-card-title class="body-1">
      {{ name }}
    </v-card-title>
    <v-card-text>
      <v-row justify="space-around" class="mx-2">
          <v-btn color="accent" fab small>
            <v-icon>play_arrow</v-icon>
          </v-btn>
          <v-btn color="accent" fab small>
            <v-icon class="rotated">publish</v-icon>
          </v-btn>
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