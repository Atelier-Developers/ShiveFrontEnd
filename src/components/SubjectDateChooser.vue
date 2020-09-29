<template>
    <v-card
            class="mx-auto"
            max-width="600"
            height="150"
            outlined
            :loading="loading"
            :disabled="loading"
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
            <date-picker v-model="item.deadline" :clearable="true" label="تاریخ" color="#009fb7" />
        </div>
    </v-card>
</template>

<script>
    import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

    export default {
        name: "SubjectDateChooser",
        props: ['subjects', 'item', 'loading'],
        components: {
            datePicker: VuePersianDatetimePicker
        },
        mounted() {
            if (typeof this.item.subject === 'object') {
                this.item.subject = this.item.subject.pk;
            }
        }
    }
</script>

<style scoped>

</style>