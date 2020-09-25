<template>
    <v-list-item
            :key="subject.id"
            :inactive="true"
    >
        <v-list-item-content>
            <v-list-item-content>{{subject.title}}</v-list-item-content>
        </v-list-item-content>
        <v-list-item-action v-for="action in actions">
            <v-btn v-if="!action.isEdit" icon @click="() => action.onClick(subject)">
                <v-icon :color="action.color">{{action.icon}}</v-icon>
            </v-btn>
            <InputFieldDialogButton v-else input-place-holder="تیتر" :title=action.dialog.title
                                    :action="action.onClick" :button-attrs="action.dialog.buttonAttrs"
                                    :icon="action.icon" :subject="{...subject}"/>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
    import InputFieldDialogButton from "./InputFieldDialogButton";

    export default {
        name: "SubjectTile",
        props: ['subject', 'actions'],
        components: {InputFieldDialogButton}
    }
</script>

<style scoped>

</style>