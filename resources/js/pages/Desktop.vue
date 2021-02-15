<style type="text/css" scoped>
    .message-magin-top{
        margin-top: 10px;
    }
</style>
<template>
    <div
    >
        <v-toolbar
                color="white"
                dark
        >
            <!--<v-app-bar-nav-icon></v-app-bar-nav-icon>-->

            <v-toolbar-title><span style="color:black">{{$t('m.desktop.my_desktop')}}</span></v-toolbar-title>

            <v-spacer></v-spacer>

            <!--<v-btn icon>-->
            <!--<v-icon>mdi-magnify</v-icon>-->
            <!--</v-btn>-->

            <!--<v-btn icon>-->
            <!--<v-icon>mdi-view-module</v-icon>-->
            <!--</v-btn>-->
        </v-toolbar>

        <v-list two-line subheader v-if="tables != ''">
            <!--<v-subheader inset>我的表格</v-subheader>-->

            <v-list-item
                    v-for="(table,index) in tables"
                    :key="index"
                    class="col-md-6 col-lg-6 col-xs-12 col-sm-12"
                    style="float: left"
            >
                <v-list-item-avatar @click="showTable(table.id)">
                    <v-icon
                            class="blue white--text"
                    >assignment</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-text="table.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="table.created_at"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <template>
                        <div class="text-center">
                            <v-menu bottom offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                            icon
                                            v-on="on"
                                    >
                                        <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>

                                <v-list>
                                    <v-list-item
                                            v-for="(item, index) in items"
                                            :key="index"
                                            @click="handle(index,table.id)"
                                    >
                                        <v-list-item-action>
                                            <i class="material-icons">{{ item.icon }}</i>
                                        </v-list-item-action>
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                    </template>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <template v-if="tables == ''">
            <div class="message-magin-top">
                <v-alert
                        v-model="alert"
                        dismissible
                        color="cyan"
                        border="left"
                        elevation="2"
                        colored-border
                        icon="mdi-twitter"
                >
                    {{$t('m.desktop.welcome')}}
                </v-alert>
            </div>
        </template>
        <template>
            <v-row justify="center">
                <v-dialog v-model="dialog_delete" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">{{$t('m.desktop.alert')}}</v-card-title>
                        <v-card-text>{{$t('m.desktop.alert_content')}}</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="dialog_delete = false">{{$t('m.desktop.dialog_cancel_button')}}</v-btn>
                            <v-btn color="red darken-1" text @click="deleteTable">{{$t('m.desktop.dialog_delete_button')}}</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
    </div>
</template>

<script>
    import { EventBus } from '../event-bus.js';
    export default {
        data: () => ({
            dialog_delete : false,
            delete_table_id : 0,
            delete_table_index : 0,
            alert: true,
        }),
        created() {
            this.$store.dispatch('getMyTables');
            this.$watch(this.$store.getters.getGetMyTablesStatus, function () {
                if (this.$store.getters.getGetMyTablesStatus() === 2) {

                }
                if (this.$store.getters.getGetMyTablesStatus() === 3) {
                    EventBus.$emit('open-message', {
                        text:  this.$t('m.desktop.get_my_table_failed')
                    });
                }
            });
        },
        computed:{
            tables(){
                return this.$store.getters.getMyTables;
            },
            items(){
                return [
                    {icon:'edit', title: this.$t('m.desktop.edit_button') },
                    {icon:'delete', title: this.$t('m.desktop.delete_button') },
                ];
            }
        },
        methods:{
            handle(index,id){
                switch (index) {
                    case 0:
                        console.log(id);
                        this.showTable(id);
                        break;
                    case 1:
                        this.dialog_delete = true;
                        this.delete_table_id = id;
                        this.delete_table_index = (index-1);
                        break;
                    default:break;
                }
            },
            showTable(id){
                this.$router.push({ name: 'Table', params: { table:  id}});
            },
            deleteTable(){
                this.$store.dispatch('deleteMyTable',{
                    table_id: this.delete_table_id
                });
                this.$watch(this.$store.getters.getDeleteMyTableStatus, function () {
                    if (this.$store.getters.getDeleteMyTableStatus() === 2) {
                        EventBus.$emit('open-message', {
                            text: this.$t('m.desktop.delete_success')
                        });
                        this.$store.getters.getMyTables.splice(this.delete_table_index,1);
                        this.dialog_delete = false;
                    }
                    if (this.$store.getters.getDeleteMyTableStatus() === 3) {
                        EventBus.$emit('open-message', {
                            text: this.$t('m.desktop.delete_failed')
                        });
                        this.dialog_delete = false;
                    }
                });
            }
        }
    }
</script>

