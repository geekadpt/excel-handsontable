<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
        >
            <v-list dense>
                <template v-for="(item,index) in items">
                    <v-list-item
                            :key="item.text"
                            link
                            @click="navigationFunctions(index)"
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="blue darken-3"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title
                    style="width: 300px"
                    class="ml-0 pl-4"
            >
                <span class="hidden-sm-and-down">HyperCell</span>
            </v-toolbar-title>
            <v-text-field
                    @keyup.enter.native="searchTable"
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    :label="$t('m.layout.appbar.search')"
                    class="hidden-sm-and-down"
                    v-model="search_content"
            />
            <v-spacer />
            <v-btn icon

            >
                <v-icon>mdi-apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <router-link :to="{ name:'Login' }"  tag="span" v-if="user === ''">
                <v-btn
                        icon
                        large
                >
                    <v-avatar v-if="!user.avatar"
                            size="32px"
                            item
                    >
                        <v-img
                                src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                                alt="Vuetify"
                        /></v-avatar>
                </v-btn>
            </router-link>
            <v-menu bottom v-if="user !== ''">
                <template v-slot:activator="{ on }">
                    <v-btn
                            icon
                            large
                    >
                        <v-avatar
                                color="blue"
                                v-if="user.avatar === null"
                                size="32px"
                                item
                                v-on="on"
                        >
                            <span class="white--text headline">{{user.name.substr(0,1)}}</span>
                        </v-avatar>
                        <v-avatar
                                size="32px"
                                item
                                v-if="user.avatar !== null"
                                v-on="on"
                        >
                            <v-img
                                    :src="user.avatar"
                                    alt="avatar"
                            /></v-avatar>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                            v-for="(item, i) in menuItems"
                            :key="i"
                            @click="appbarMenuFunction(i)"
                    >
                        <v-list-item-action>
                            <i class="material-icons">{{ item.icon }}</i>
                        </v-list-item-action>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-content>
            <router-view></router-view>
        </v-content>
        <v-dialog
                v-model="dialog"
                width="800px"
        >
            <v-card>
                <v-card-title class="grey darken-2">
                    Create contact
                </v-card-title>
                <v-container>
                    <v-row class="mx-2">
                        <v-col
                                class="align-center justify-space-between"
                                cols="12"
                        >
                            <v-row
                                    align="center"
                                    class="mr-0"
                            >
                                <v-avatar
                                        size="40px"
                                        class="mx-3"
                                >
                                    <img
                                            src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                                            alt=""
                                    >
                                </v-avatar>
                                <v-text-field
                                        placeholder="Name"
                                />
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                    prepend-icon="business"
                                    placeholder="Company"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                    placeholder="Job title"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                    prepend-icon="mail"
                                    placeholder="Email"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                    type="tel"
                                    prepend-icon="phone"
                                    placeholder="(000) 000 - 0000"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                    prepend-icon="notes"
                                    placeholder="Notes"
                            />
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-btn
                            text
                            color="primary"
                    >More</v-btn>
                    <v-spacer />
                    <v-btn
                            text
                            color="primary"
                            @click="dialog = false"
                    >Cancel</v-btn>
                    <v-btn
                            text
                            @click="dialog = false"
                    >Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <template>
            <div class="d-flex justify-space-between nav-drawer-append">
                <v-bottom-sheet v-model="sheet">
                    <v-list>
                        <v-subheader>
                            {{$t('m.layout.navigation_drawer.change_language')}}
                        </v-subheader>
                        <v-list-item
                                v-for="(tile,index) in tiles"
                                :key="tile.title"
                                @click="changeLang(index)"
                        >
                            <v-list-item-avatar
                            >
                                <v-avatar size="32px" tile
                                >
                                    <img
                                            :src="tile.img"
                                            :alt="tile.title"
                                    >
                                </v-avatar>
                            </v-list-item-avatar>
                            <v-list-item-title>{{ tile.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-bottom-sheet>
            </div>
        </template>
        <notification></notification>
        <template>
            <v-speed-dial
                    v-model="fab"
                    :top="top"
                    :bottom="bottom"
                    :right="right"
                    :left="left"
                    :direction="direction"
                    :open-on-hover="hover"
                    :transition="transition"
            >
                <template v-slot:activator>
                    <v-btn
                            v-model="fab"
                            color="blue darken-2"
                            dark
                            fab
                    >
                        <v-icon v-if="fab">mdi-close</v-icon>
                        <v-icon v-else>mdi-account-circle</v-icon>
                    </v-btn>
                </template>
                <router-link :to="{ name:'Profile' }"  tag="span">
                    <v-btn
                            fab
                            dark
                            small
                            color="green"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </router-link>
                <router-link :to="{ name:'Table' }"  tag="span">
                    <v-btn
                            fab
                            dark
                            small
                            color="indigo"

                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </router-link>
                <v-btn
                        fab
                        dark
                        small
                        color="red"
                >
                    <v-icon>mdi-help</v-icon>
                </v-btn>
            </v-speed-dial>
        </template>
        <!--feedback-->
        <template>
            <v-dialog v-model="dialog_feedback" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{$t('m.layout.feedback.title')}}</span>
                    </v-card-title>
                    <template>
                        <v-card flat>
                            <v-snackbar

                                    absolute
                                    top
                                    right
                                    color="success"
                            >
                                <span>Registration successful!</span>
                                <v-icon dark>mdi-checkbox-marked-circle</v-icon>
                            </v-snackbar>
                            <v-form ref="form" @submit.prevent="submit">
                                <v-container fluid>
                                    <v-row>
                                        <v-col cols="12" sm="6">
                                            <v-text-field
                                                    color="purple darken-2"
                                                    :label="$t('m.layout.feedback.name')"
                                                    required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                        >
                                            <v-text-field
                                                    :label="$t('m.layout.feedback.email')"
                                                    required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea
                                                    color="teal"
                                            >
                                                <template v-slot:label>
                                                    <div>
                                                        {{$t('m.layout.feedback.question')}} <small>{{$t('m.layout.feedback.optional')}} </small>
                                                    </div>
                                                </template>
                                            </v-textarea>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-slider
                                                    color="orange"
                                                    :label="$t('m.layout.feedback.age')"
                                                    :hint="$t('m.layout.feedback.honest')"
                                                    min="1"
                                                    max="100"
                                                    thumb-label
                                            ></v-slider>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card>
                    </template>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog_feedback = false">{{$t('m.layout.feedback.close_button')}}</v-btn>
                        <v-btn color="blue darken-1" text @click="feedback">{{$t('m.layout.feedback.submit_button')}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
    </v-app>
</template>

<script>
    // 导入 urls 模块
    import _urls from '../plugins/urls';
    import { EventBus } from '../event-bus.js';
    import Notification from "../components/Notification";
    export default {
        components: {Notification},
        props: {
            source: String,
        },
        data: () => ({
            dialog: false,
            drawer: null,
            sheet: false,

            direction: 'top',
            fab: false,
            fling: false,
            hover: true,
            tabs: null,
            top: false,
            right: true,
            bottom: true,
            left: false,
            transition: 'slide-y-reverse-transition',
            search_content:'',
            dialog_feedback:false,

        }),
        created(){
            this.$store.dispatch('getMyInfo');
            //第三方登陆
            if(_urls.getUrlParams('code') != null){
                this.$store.dispatch('oauth', {
                    social : _urls.getUrlParams('social_type'),
                    code : _urls.getUrlParams('code'),
                });
                this.$watch(this.$store.getters.getOauthStatus, function () {
                    if (this.$store.getters.getOauthStatus() === 2) {
                        this.$store.dispatch('getMyInfo');
                        EventBus.$emit('open-message', {
                            text: this.$t('m.layout.oauth.success')
                        });
                        this.$router.push({name:'Desktop'});
                    }
                    if (this.$store.getters.getOauthStatus() === 3) {
                        EventBus.$emit('open-message', {
                            text: this.$store.getters.getOauthErrors
                        });
                    }
                });
            }
        },
        methods:{
            appbarMenuFunction(index){
                switch (index) {
                    case 0 :
                        this.$router.push({name:'Desktop'});
                        break;

                    case 1 :
                        this.$router.push({name:'Profile'});
                        break;
                    case 2 :
                        this.$store.dispatch('logout');
                        this.$router.push({name:'Login'});
                        break;
                    default: break;
                }
            },
            changeLang(index){
                //console.log(this.tiles[index].des);
                this.$i18n.locale = this.tiles[index].des;
                this.current_language = this.tiles[index];
                this.sheet=false;
            },
            navigationFunctions(index){
                switch (index) {
                    case 0:
                        this.$router.push({name:'Desktop'});
                        break;
                    case 1:
                        this.$router.push({name:'Table'});
                        break;
                    case 2:
                        this.$router.push({name:'Trash'});
                        break;
                    case 3:
                        this.dialog_feedback = true;
                        break;
                    case 4:
                        break;
                    case 5:
                        this.sheet = true;
                        break;
                    default:break;
                }
            },
            searchTable(){
                if(this.search_content) {
                    let content = this.search_content;
                    this.search_content = '';
                    this.$router.push({name: 'Search', params: {search: content}});
                }
            },
            feedback(){
                this.dialog_feedback = false;
                EventBus.$emit('open-message', {
                    text: this.$t('m.layout.feedback.feedback_success')
                });
            }
        },

        computed:{
            user(){
                return this.$store.getters.getMyInfo;
            },
            menuItems(){
                return [
                    { icon: 'grid_on',title: this.$t('m.layout.appbar.my_charts') },
                    { icon: 'account_box',title: this.$t('m.layout.appbar.edit_profile') },
                    { icon: 'play_arrow',title: this.$t('m.layout.appbar.logout') },
                ];
            },
            items(){
                return [
                    { icon: 'mdi-laptop', text: this.$t('m.layout.navigation_drawer.desktop') },
                    { icon: 'mdi-plus', text: this.$t('m.layout.navigation_drawer.sheets.new') },
                    { icon: 'mdi-history', text: this.$t('m.layout.navigation_drawer.sheets.deleted') },
                    { icon: 'mdi-message', text: this.$t('m.layout.navigation_drawer.feedback') },
                    { icon: 'mdi-help-circle', text: this.$t('m.layout.navigation_drawer.help') },
                    { icon: 'mdi-settings', text: this.$t('m.layout.navigation_drawer.settings') },
                ];
            },
            tiles (){
                return [
                    { img: 'https://cdn.vuetifyjs.com/images/flags/cn.png', title: '简体中文' ,des:'zh-CN'},
                    { img: 'https://cdn.vuetifyjs.com/images/flags/us.png', title: 'English' ,des:'en'},
                ];
            }
        }
    }
</script>
<style type="text/css" scoped>
    .v-speed-dial {
        position: fixed!important;
        z-index: 210;
    }
</style>