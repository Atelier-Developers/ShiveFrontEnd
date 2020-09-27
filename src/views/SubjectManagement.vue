<template>
    <div class="mx-3">
        <v-container>
            <v-row justify="center">
                <SubjectList :loading="pageLoading" style="max-width: 700px; width: 90vw" title="موضوعات"
                             :subjects="subjects"
                             :actions="editSubjectActions"/>
            </v-row>
        </v-container>
        <div id="floating-button" class="mb-10">
            <InputFieldDialogButton v-if="$can('create', 'subject')" title="موضوع جدید" input-place-holder="تیتر"
                                    :button-attrs="addSubjectButtonAttributes"
                                    :action="addToSubjects" :subject="{...subject}" icon="add">
            </InputFieldDialogButton>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import SubjectList from "../components/SubjectList";
    import InputFieldDialogButton from "../components/InputFieldDialogButton";
    import {mapActions, mapGetters} from "vuex";
    import Spinner from "../components/Spinner";

    export default {
        name: 'Home',
        components: {Spinner, SubjectList, InputFieldDialogButton},
        data() {
            return {
                subject: {
                    title: '',
                },
                loading: false,
                pageLoading: false,
            }
        },
        computed: {
            ...mapGetters('subjectModule', ['subjects']),
            editSubjectActions() {
                return [
                    {
                        icon: 'edit',
                        isEdit: true,
                        onClick: this.changeOneSubject,
                        permission: this.$can('edit', 'subject'),
                        dialog: {
                            buttonAttrs: {
                                icon: true,
                                color: 'primary'
                            },
                            title: 'ویرایش موضوع'
                        }

                    },
                    {
                        icon: 'delete',
                        onClick: this.removeFromSubjects,
                        permission: this.$can('delete', 'subject'),
                        isEdit: false,
                        color: 'red',
                        dialog: {
                            buttonAttrs: {
                                icon: true,
                                color: 'primary'
                            },
                            title: 'ویرایش موضوع'
                        }
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
            ...mapActions('subjectModule', ['addToSubjects', 'removeFromSubjects', 'changeOneSubject', 'getSubjects'])
        },
        mounted() {
            this.pageLoading = true;
            this.getSubjects().finally(() => {
                this.pageLoading = false;
            });
        }
    }
</script>

<style scoped>
</style>