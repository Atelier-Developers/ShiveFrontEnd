<template>
  <v-row class="mx-3">
    <v-col cols="12" class="col-md-4">
      <PersonList :persons="persons" title="پذیرفته شده"/>
    </v-col>
    <v-col cols="12" class="col-md-4">
      <PersonList :persons="persons"  title="رد شده"/>
    </v-col>
    <v-col cols="12" class="col-md-4">
      <PersonList :persons="persons"  title="در حال انتظار"/>
    </v-col>
  </v-row>
</template>

<script>
import PersonList from "@/components/PersonList";

export default {
  name: "PersonManagment",
  components: {PersonList},
  data() {
    return {
      persons: [
        {
          pk: 1,
          name: 'محمد',
          student_no: "923847"
        },
        {
          pk: 2,
          name: 'امیر',
          student_no: "213123"
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>