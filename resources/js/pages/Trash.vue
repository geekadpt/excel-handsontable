<style type="text/css" scoped>
    .message-magin-top{
        margin-top: 10px;
    }
</style>18
<template>
    <div
            class="mx-auto"
    >
        <!--<v-system-bar-->
        <!--color="indigo darken-2"-->
        <!--dark-->
        <!--&gt;-->
        <!--<v-spacer></v-spacer>-->

        <!--<v-icon>mdi-window-minimize</v-icon>-->

        <!--<v-icon>mdi-window-maximize</v-icon>-->

        <!--<v-icon>mdi-close</v-icon>-->
        <!--</v-system-bar>-->

        <v-toolbar
                color="white"
                dark
        >
            <!--<v-app-bar-nav-icon></v-app-bar-nav-icon>-->

            <v-toolbar-title><span style="color:black">{{$t('m.trash.trash_title')}}</span></v-toolbar-title>

            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn
                            icon
                            @click="clearTrash"
                            :disabled="card == '' ? true : false"
                            v-on="on"
                            color="black"

                    >
                        <v-icon>mdi-cancel</v-icon>
                    </v-btn>
                </template>
                <span>{{$t('m.trash.clear')}}</span>
            </v-tooltip>

        </v-toolbar>
        <template v-if="card == ''">
            <div class="message-magin-top">
                <v-alert
                        dismissible
                        color="cyan"
                        border="left"
                        elevation="2"
                        colored-border
                        icon="mdi-twitter"
                >
                    {{$t('m.trash.welcome')}}
                </v-alert>
            </div>
        </template>
        <v-container fluid>
            <v-row dense>
                <v-col
                        v-for="(card,index) in card"
                        :key="index"
                        class="col-md-4 col-lg-2 col-xs-12 col-sm-6"
                >
                    <v-card>
                        <v-img
                                :src="img_src"
                                class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                height="200px"
                        >
                            <v-card-title v-text="card.name"></v-card-title>
                        </v-img>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon @click="restoreTrash(index,card.id)" v-on="on">
                                        <v-icon>mdi-history</v-icon>
                                    </v-btn>
                                </template>
                                <span>{{$t('m.trash.restore')}}</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon @click="deleteTrash(index,card.id)" v-on="on">
                                        <v-icon>mdi-backspace</v-icon>
                                    </v-btn>
                                </template>
                                <span>{{$t('m.trash.destroy')}}</span>
                            </v-tooltip>

                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    import { EventBus } from '../event-bus.js';
    export default {
        data: () => ({
            img_src :'https://assets.smcdn.cn/static/lizard-service-desktop/assets/doc_160_flat@2x.098efd4b.png',
        }),
        created() {
            this.$store.dispatch('getMyTrash');
            this.$watch(this.$store.getters.getGetMyTrashStatus, function () {
                if (this.$store.getters.getGetMyTrashStatus() === 2) {
                }
                if (this.$store.getters.getGetMyTrashStatus() === 3) {
                    EventBus.$emit('open-message', {
                        text: this.$t('m.trash.load_failed')
                    });
                }
            });
        },
        computed :{
            card(){
                return this.$store.getters.getMyTrash;
            }
        },
        methods:{
            deleteTrash(index,id){
                this.$store.dispatch('deleteMyTrash',{
                    sheet_id:id
                });
                this.$watch(this.$store.getters.getDeleteMyTrashStatus, function () {
                    if (this.$store.getters.getDeleteMyTrashStatus() === 2) {
                        EventBus.$emit('open-message', {
                            text: this.$t('m.trash.destroy_success')
                        });
                        // console.log(this.$store.getters.getMySheets);
                        // console.log('索引'+this.delete_sheet_index);
                        this.$store.getters.getMyTrash.splice(index,1);
                    }
                    if (this.$store.getters.getDeleteMyTrashStatus() === 3) {
                        EventBus.$emit('open-message', {
                            text: this.$t('m.trash.destroy_failed')
                        });
                        this.dialog_delete = false;
                    }
                });
            },
            clearTrash(){
                this.$store.dispatch('clearMyTrash');
                this.$store.dispatch(' resetMyTrashState');
                this.$watch(this.$store.getters.getClearMyTrashStatus, function () {
                    if (this.$store.getters.getClearMyTrashStatus() === 2) {
                        EventBus.$emit('open-message', {
                            text: this.$t('m.trash.clear_success')
                        });
                        // console.log(this.$store.getters.getMySheets);
                        // console.log('索引'+this.delete_sheet_index);
                        this.$store.dispatch('resetMyTrashState');
                    }
                    if (this.$store.getters.getClearMyTrashStatus() === 3) {
                        EventBus.$emit('open-message', {
                            text: this.$t('m.trash.clear_failed')
                        });
                        this.dialog_delete = false;
                    }
                });
            },
            restoreTrash(index,id){
                this.$store.dispatch('restoreMyTrash',{
                    sheet_id:id
                });
                this.$watch(this.$store.getters.getRestoreMyTrashStatus, function () {
                    if (this.$store.getters.getRestoreMyTrashStatus() === 2) {
                        EventBus.$emit('open-message', {
                            text: this.$t('m.trash.restore_success')
                        });
                        this.$store.getters.getMyTrash.splice(index,1);
                        // console.log(this.$store.getters.getMySheets);
                        // console.log('索引'+this.delete_sheet_index);
                    }
                    if (this.$store.getters.getRestoreMyTrashStatus() === 3) {
                        EventBus.$emit('open-message', {
                            text: this.$t('m.trash.restore_failed')
                        });
                        this.dialog_delete = false;
                    }
                });
            },
        }
    }
</script>