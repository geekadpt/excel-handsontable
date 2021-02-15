<template class="supcell-table">
    <div>
        <div class="padding-bottom-nav" v-if="access === 2">
            <template>
                <div>
                    <v-alert
                            v-model="alert"
                            dismissible
                            color="cyan"
                            border="left"
                            elevation="2"
                            colored-border
                            icon="mdi-info"
                    >
                        {{$t('m.share.tip')}}
                    </v-alert>
                </div>
            </template>

            <v-card
                    color="#1F7087"
                    dark
                    style="margin: 8px 0"
            >
                <v-card-title class="headline">{{share.name}}</v-card-title>

                <v-card-subtitle>{{share.updated_at}}</v-card-subtitle>

                <!--<v-card-actions>-->
                <!--<v-btn text>Listen Now</v-btn>-->
                <!--</v-card-actions>-->
            </v-card>

            <div id="hotTable" class="hotTable">
                <HotTable :root="root" ref="supcell" :settings="hotSettings" ></HotTable>
            </div>
        </div>
        <div v-if="access === 3">
            <v-alert type="warning">
                {{$t('m.share.unauthorization')}}
            </v-alert>
        </div>
    </div>
</template>
<script>
    import { HotTable } from '@handsontable/vue'
    import 'handsontable/dist/handsontable.full.css'
    import Handsontable from 'handsontable'
    import "handsontable/languages/zh-CN";
    import { EventBus } from '../event-bus.js';
    export default {
        name: 'Share',
        data: function() {

            return {
                root: 'share-hot',
                hotRef:null,
                hotSettings:{
                    data: [
                        []
                    ],
                    columns: [],
                    stretchH: 'all',
                    width: '100%',
                    autoWrapRow: true,
                    // minSpareRows:20,
                    // minSpareCols:10,
                    manualRowResize: true,
                    manualColumnResize: true,
                    manualColumnMove: true,
                    manualRowMove: true,
                    rowHeaders: true,
                    colHeaders: true,
                    mergeCells: true,
                    dropdownMenu: true,
                    columnSorting: {
                        indicator: true
                    },
                    autoColumnSize: {
                        samplingRatio: 23
                    },
                    className: "htCenter htMiddle",
                    licenseKey: 'ab3e4-1bee8-ed01c-4d94b-08cfe',
                    formulas:true,
                    comments:true,
                    cell:[],
                },
                alert:true,
            };
        },
        created(){
            this.$store.dispatch('getShareTable',{
                table_id : this.$route.params.share
            });
            this.$watch(this.$store.getters.getShareTableStatus, function () {
                if (this.$store.getters.getShareTableStatus() === 2) {
                    this.hotSettings.mergeCells = eval("(" + this.$store.getters.getShareTable.merge + ")");
                    this.hotSettings.cell = eval("(" + this.$store.getters.getShareTable.cell + ")");
                    this.hotSettings.columns = eval("(" + this.$store.getters.getShareTable.column + ")");
                    let data = eval("(" + this.$store.getters.getShareTable.data + ")");
                    this.hotSettings.data = data;
                }
                if (this.$store.getters.getShareTableStatus() === 3) {
                    EventBus.$emit('open-message', {
                        text: this.$t('m.system.error')
                    });
                }
            });
        },
        components: {
            HotTable
        },
        computed:{
            share(){
                return this.$store.getters.getShareTable;
            },
            access(){
                return this.$store.getters.getShareTableStatus();

            }
        },
    }
</script>