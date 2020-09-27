<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
                        <v-btn
                                v-on="on"
                                v-bind="buttonAttrs"
                                color="primary"
                        >
                            <v-icon color="accent">{{icon}}</v-icon>
                        </v-btn>
        </template>
        <v-card :loading="loading" :disabled="loading">
            <v-card-title>
                <span class="headline">{{title}}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field :label="inputPlaceHolder" v-model="subject.title" outlined/>
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
        props: ['title', 'buttonAttrs', 'subject', 'action',  'inputPlaceHolder', 'icon'],
        data() {
            return {
                loading: false,
                dialog: false,
            }
        },
        methods: {
            submitAction() {
                this.loading = true;
                this.action(this.subject).finally(() => {
                    this.loading = false;
                    this.dialog = false;
                });

            }
        }
    }
</script>
