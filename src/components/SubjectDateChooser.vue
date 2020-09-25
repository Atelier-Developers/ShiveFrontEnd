<template>
    <v-card
            class="mx-auto"
            max-width="600"
            height="150"
            outlined
    >
        <div>
            <v-col cols="12">
                <v-select
                        :items="subjects"
                        v-model="item.subject"
                        label="موضوع"
                        item-text="title"
                        item-value="pk"
                        dense
                        outlined
                />
            </v-col>
        </div>

        <div class="row justify-center">
            <date-picker v-model="item.deadline" :clearable="true" label="تاریخ" />
        </div>
    </v-card>
</template>

<script>
    import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

    export default {
        name: "SubjectDateChooser",
        props: ['subjects', 'item'],
        components: {
            datePicker: VuePersianDatetimePicker
        }
    }
</script>

<style scoped>

</style>