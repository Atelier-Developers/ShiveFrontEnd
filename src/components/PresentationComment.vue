<template>
  <v-card tile>
    <v-card-title class="pr-10">
      <v-icon right>comment</v-icon>
      نظرات
    </v-card-title>
    <v-divider/>
    <v-card-text>
      <slot></slot>
    </v-card-text>
    <v-card-text>
      <v-container>
        <v-card tile v-for="comment in comments" class="my-4" :key="comment.pk" :loading="loading">
          <v-card-title>
            <h5>{{ comment.profile.name }}</h5>
          </v-card-title>
          <v-card-text>
            <span style="white-space: pre">
            {{ comment.text }}
            </span>
          </v-card-text>
        </v-card>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "PresentationComment",
  props: ['comments', 'loading'],
}
</script>

<style scoped>

</style>