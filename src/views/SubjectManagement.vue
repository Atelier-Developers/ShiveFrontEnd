<template>
    <div class="home">
        <v-row justify="center">
            <v-col cols="12" sm="6" class="d-flex justify-center">
                <v-container>
                    <SubjectList title="موضوعات" :subjects="subjects" :actions="editSubjectActions"/>
                </v-container>
            </v-col>
        </v-row>
        <div id="floating-button" class="mb-10 mr-7">
            <InputFieldDialogButton  title="موضوع جدید" input-place-holder="تیتر" :button-attrs="addSubjectButtonAttributes" :action="addToSubjects" >
                    <v-icon slot="icon">add</v-icon>
            </InputFieldDialogButton>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import SubjectList from "../components/SubjectList";
    import InputFieldDialogButton from "../components/InputFieldDialogButton";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: 'Home',
        components: {SubjectList, InputFieldDialogButton},
        computed: {
            ...mapGetters('subjectModule', ['subjects']),
            editSubjectActions() {
                return [
                    {
                        icon: 'edit',
                        onClick: this.changeOneSubject,
                        color: 'primary'
                    },
                    {
                        icon: 'delete',
                        onClick: this.removeFromSubjects,
                        color: 'red'
                    },

                ]
            },
            addSubjectButtonAttributes() {
                return {
                    fab: true,
                    dark: true,
                    large: true,
                    color: "primary"
                }
            }
        },
        methods: {
            ...mapActions('subjectModule', ['addToSubjects', 'removeFromSubjects', 'changeOneSubject'])
        }
    }
</script>

<style scoped>
    #floating-button {
        position: absolute;
        bottom: 0;
    }
</style>