<template>
    <v-card  tile :loading="loading">
        <v-card-title class="pr-10">
            <v-icon right>file_copy</v-icon>
            فایل‌های ارائه
        </v-card-title>
        <v-divider/>
        <v-card-text class="text-center">
            <v-container v-if="files.length !== 0">
                <v-row>
                    <v-col sm="6" md="4" lg="3" v-for="file in files" :key="file.id">
                        <FileTile :is-deletable="isDeletable" :file="file" :delete-action="deleteFile"/>
                    </v-col>
                </v-row>
            </v-container>
            <template v-else>
                فایلی آپلود نشده است...
            </template>
        </v-card-text>
    </v-card>

</template>

<script>
    import FileTile from "./FileTile";

    export default {
        name: "PresentationFileComponent",
        components: {FileTile},
        props: ['files', 'isDeletable', 'deleteFile', 'loading']
    }
</script>

<style scoped>

</style>