<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
                        <v-btn
                                v-on="on"
                                v-bind="buttonAttrs"
                        >
                            <slot name="icon"/>
                        </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{title}}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field :label="inputPlaceHolder" v-model="newTitle" outlined/>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-container class="mb-1">
                    <v-btn color="primary" text @click="dialog = false">بستن</v-btn>
                    <v-btn color="primary" text @click="submitAction">تایید</v-btn>
                </v-container>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'Home',
        props: ['title', 'buttonAttrs', 'action', 'newTitle', 'inputPlaceHolder'],
        data() {
            return {
                dialog: false
            }
        },
        methods: {
            submitAction() {
                this.$data.dialog = false;
                this.$props.action({title: this.$props.newTitle});
            }
        }
    }
</script>
