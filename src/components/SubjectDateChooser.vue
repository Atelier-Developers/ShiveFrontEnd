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
                    label="موضوع"
                    dense
                    outlined
                ></v-select>
            </v-col>
        </div>

        <div class="row justify-center">
            <date-picker v-model="date" :clearable="true" label="تاریخ"/>
        </div>
    </v-card>
</template>

<script>
    import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

    export default {
        name: "SubjectDateChooser",
        components: {
            datePicker: VuePersianDatetimePicker
        }
    }
</script>

<style scoped>

</style>