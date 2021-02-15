<template>
    <div>

        <v-toolbar
                color="white"
                dark
        >
            <!--<v-app-bar-nav-icon></v-app-bar-nav-icon>-->

            <v-toolbar-title><span style="color:black">{{$t('m.search.title')}}</span></v-toolbar-title>

            <v-spacer></v-spacer>

            <!--<v-btn icon>-->
            <!--<v-icon>mdi-magnify</v-icon>-->
            <!--</v-btn>-->

            <!--<v-btn icon>-->
            <!--<v-icon>mdi-view-module</v-icon>-->
            <!--</v-btn>-->
        </v-toolbar>
        <div v-if="results.length !== 0">
            <v-card
                    class="col-md-5 col-lg-2 col-xs-12 col-sm-12 ma-4"
                    v-for="(result,index) in results"
                    :key="index"
                    style="float: left"
            >
                <v-img
                        class="white--text align-end"
                        height="200px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                    <v-card-title>{{result.name}}</v-card-title>
                </v-img>

                <v-card-subtitle class="pb-0">{{result.created_at}}</v-card-subtitle>

                <!--<v-card-text class="text&#45;&#45;primary">-->
                <!--<div>Whitehaven Beach</div>-->

                <!--<div>Whitsunday Island</div>-->
                <!--</v-card-text>-->

                <v-card-actions>
                    <v-btn
                            color="orange"
                            text
                            @click="showTable(result.id)"
                    >
                        {{$t('m.search.view')}}
                    </v-btn>

                    <!--<v-btn-->
                    <!--color="orange"-->
                    <!--text-->
                    <!--&gt;-->
                    <!--Explore-->
                    <!--</v-btn>-->
                </v-card-actions>
            </v-card>
        </div>
        <div v-if="results.length === 0">
            <v-alert type="warning">
                {{$t('m.search.no_result')}}
            </v-alert>
        </div>
    </div>
</template>

<script>
    import { EventBus } from '../event-bus.js';
    export default {
        name: "Search.vue",
        data: () => ({
        }),
        created() {
            if(this.$route.params.search !== undefined)
            {
                this.$store.dispatch('searchTable',{
                    search:decodeURI(this.$route.params.search),
                });
                this.$watch(this.$store.getters.getSearchTableStatus, function () {
                    if(this.$store.getters.getSearchTableStatus() === 2) {

                    }
                    if(this.$store.getters.getSearchTableStatus() === 3) {
                        EventBus.$emit('open-message', {
                            text: this.$t('m.search.failed')
                        });
                    }
                });
                return 0;
            }else{
                EventBus.$emit('open-message', {
                    text: this.$t('m.search.no_result')
                });
            }
        },
        methods:{
            showTable(id){
                this.$router.push({ name: 'Table', params: { table:  id}});
            },
        },
        computed:{
            results(){
                return this.$store.getters.getSearchTable;
            }
        },
        destroyed() {
            this.$store.dispatch('clearSearchTable');
        }
    }
</script>

<style scoped>

</style>