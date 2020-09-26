<template>
    <v-list-item
            :key="subject.id"
            :inactive="true"
    >
        <v-list-item-content>
            <v-list-item-content>{{subject.title}}</v-list-item-content>
        </v-list-item-content>
        <template v-for="action in actions">
            <v-list-item-action v-if="action.permission">
                <v-dialog v-if="!action.isEdit" v-model="dialog" max-width="290">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs"
                               v-on="on"
                               v-if="!action.isEdit" icon>
                            <v-icon :color="action.color">{{action.icon}}</v-icon>
                        </v-btn>
                    </template>
                    <v-card :loading="loading" :disabled="loading">
                        <v-card-title class="headline">حذف تیم</v-card-title>
                        <v-card-text>آیا از حذف این تیم مطمئن هستید؟
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary darken-1" text @click="dialog = false">انصراف</v-btn>
                            <v-btn color="error darken-1" text @click="() => runAction(action)">حذف</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <InputFieldDialogButton v-else input-place-holder="تیتر" :title=action.dialog.title
                                        :action="action.onClick" :button-attrs="action.dialog.buttonAttrs"
                                        :icon="action.icon" :subject="{...subject}"/>
            </v-list-item-action>
        </template>
    </v-list-item>
</template>

<script>
    import InputFieldDialogButton from "./InputFieldDialogButton";

    export default {
        name: "SubjectTile",
        props: ['subject', 'actions'],
        components: {
            InputFieldDialogButton,
        },
        data() {
            return {
                dialog: false,
                loading: false,
            }
        },
        methods: {
            runAction(action) {
                this.loading = true;
                action.onClick(this.subject).finally(() => {
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>