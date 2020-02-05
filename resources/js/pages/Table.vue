<template >
    <div>
        <template>
            <div>
                <v-card
                        class="d-flex justify-space-between"
                >
                    <div

                    >
                        <template>
                            <v-chip
                                    class="ma-2"
                                    :color="autosave.color"
                                    small
                                    text-color="white"
                            >
                                <i class="material-icons">autorenew</i>
                                {{autosave.message}}
                            </v-chip>
                        </template>
                    </div>
                    <div>
                        <v-list-item
                                class="adjust-brand"
                        >
                            <v-list-item-action>
                                <i class="material-icons">import_contacts</i>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{$t('m.table.brand')}}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                </v-card>
            </div>
        </template>
        <v-divider></v-divider>
        <template>
            <v-card class="text-left pa-2">
                <v-menu open-on-hover bottom offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                                text
                                small
                                v-on="on"
                        >
                            {{$t('m.table.file.title')}}
                        </v-btn>
                    </template>

                    <v-list>

                        <v-list-item
                                @click="dialog_update=true"
                        >
                            <v-list-item-action>
                                <i class="material-icons">save</i>
                            </v-list-item-action>

                            <v-list-item-content>
                                <v-list-item-title>
                                    {{$t('m.table.file.save')}}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item
                                @click="exportTable"
                        >
                            <v-list-item-action>
                                <i class="material-icons">file_download</i>
                            </v-list-item-action>
                            <v-list-item-title> {{$t('m.table.file.export')}}</v-list-item-title>
                        </v-list-item>

                        <v-list-item
                                @click="clearTable"
                        >
                            <v-list-item-action>
                                <i class="material-icons">close</i>
                            </v-list-item-action>
                            <v-list-item-title> {{$t('m.table.file.clear')}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu open-on-hover bottom offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                                text
                                small
                                v-on="on"
                        >
                            {{$t('m.table.insert.title')}}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                                @click="prepareSetComment"
                        >
                            <v-list-item-action>
                                <i class="material-icons">comment</i>
                            </v-list-item-action>
                            <v-list-item-title> {{$t('m.table.insert.comment')}}</v-list-item-title>
                        </v-list-item>


                        <v-list-item
                                @click="insertColumnRight"
                        >
                            <v-list-item-action>
                                <i class="material-icons">view_column</i>
                            </v-list-item-action>
                            <v-list-item-title>{{$t('m.table.insert.column')}}</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                @click="insertRowBottom"
                        >
                            <v-list-item-action>
                                <i class="material-icons">view_headline</i>
                            </v-list-item-action>
                            <v-list-item-title>{{$t('m.table.insert.row')}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu open-on-hover bottom offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                                text
                                small
                                v-on="on"
                        >
                            {{$t('m.table.format.title')}}
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                                v-for="(item, index) in formatItems"
                                :key="index"
                                @click="changeCellType(index)"
                        >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu open-on-hover bottom offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                                text
                                small
                                v-on="on"
                        >
                            {{$t('m.table.language.title')}}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                                @click="changeLangToZhCN"
                        >
                            <v-list-item-action>
                                <i class="material-icons">language</i>
                            </v-list-item-action>
                            <v-list-item-title>{{$t('m.table.language.center')}}</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                @click="changeLangToEnUS"
                        >
                            <v-list-item-action>
                                <i class="material-icons">language</i>
                            </v-list-item-action>
                            <v-list-item-title>{{$t('m.table.language.service')}}</v-list-item-title>
                        </v-list-item>

                    </v-list>
                </v-menu>
            </v-card>
        </template>

        <v-divider></v-divider>
        <template>
            <v-card class="pa-2">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed small v-on="on" @click="insertColumnRight"><i class="material-icons">view_column</i></v-btn>
                    </template>
                    <span>{{$t('m.table.insert.column')}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed small v-on="on" @click="insertRowBottom"><i class="material-icons">view_headline</i></v-btn>
                    </template>
                    <span>{{$t('m.table.insert.row')}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn  depressed small v-on="on" @click="changeCellType(0)"><i class="material-icons">format_color_text</i></v-btn>
                    </template>
                    <span>{{$t('m.table.format.text')}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed small v-on="on" @click="changeCellType(1)"><i class="material-icons">view_list</i></v-btn>
                    </template>
                    <span>{{$t('m.table.format.numeric')}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed small v-on="on" @click="changeCellType(2)"><i class="material-icons">view_list</i></v-btn>
                    </template>
                    <span>{{$t('m.table.format.numeric_dot')}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed small v-on="on" @click="changeCellType(3)"><i class="material-icons">money_off</i></v-btn>
                    </template>
                    <span>{{$t('m.table.format.price')}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed small v-on="on" @click="changeCellType(4)"><i class="material-icons">attach_money</i></v-btn>
                    </template>
                    <span>{{$t('m.table.format.price_dot')}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed small v-on="on" @click="changeCellType(5)"><i class="material-icons">date_range</i></v-btn>
                    </template>
                    <span>{{$t('m.table.format.date')}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed small v-on="on" @click="changeCellType(6)"><i class="material-icons">access_time</i></v-btn>
                    </template>
                    <span>{{$t('m.table.format.time')}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed small v-on="on" @click="changeCellType(7)"><i class="material-icons">check_circle</i></v-btn>
                    </template>
                    <span>{{$t('m.table.format.checkbox')}}</span>
                </v-tooltip>
                <v-menu open-on-hover bottom offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed small v-on="on" @click="supcell"><i class="material-icons">functions</i></v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                                @click="formula('sum')"
                        >
                            <v-list-item-title>SUM</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                @click="formula('average')"
                        >
                            <v-list-item-title>AVERAGE</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                @click="formula('max')"
                        >
                            <v-list-item-title>MAX</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                @click="formula('min')"
                        >
                            <v-list-item-title>MIN</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                @click="formula('and')"
                        >
                            <v-list-item-title>AND</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                @click="formula('count')"
                        >
                            <v-list-item-title>COUNT</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                @click="formula('accrint')"
                        >
                            <v-list-item-title>ACCRINT</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                @click="formula('BAHTTEXT')"
                        >
                            <v-list-item-title>BAHTTEXT</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                @click="formula('Date')"
                        >
                            <v-list-item-title>DATE</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                @click="formula('ADDRESS')"
                        >
                            <v-list-item-title>ADDRESS</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                @click="formula('ABS')"
                        >
                            <v-list-item-title>ABS</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed small v-on="on" @click="prepareSetComment"><i class="material-icons">comment</i></v-btn>
                    </template>
                    <span>{{$t('m.table.insert.comment')}}</span>
                </v-tooltip>
            </v-card>
        </template>
        <div id="hotTable" class="hotTable">
            <HotTable :root="root" ref="hypercell" :settings="hotSettings" ></HotTable>
        </div>
        <template>
            <v-dialog v-model="dialog_comment" persistent width="600px">
                <v-card class="justify-space-between">
                    <v-card-title>
                        <span class="headline">{{$t('m.table.comment.title')}}</span>
                    </v-card-title>
                    <v-card-text>
                        <template>
                            <div class="">
                                <v-form
                                        ref="comment_form"
                                        v-model="comment_valid"
                                        lazy-validation
                                >
                                    <v-text-field
                                            v-model="comment"
                                            :counter="60"
                                            :rules="commentRules"
                                            :label="$t('m.table.comment.label')"
                                    ></v-text-field>
                                </v-form>
                            </div>
                        </template>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialog_comment=false">{{$t('m.table.comment.cancel')}}</v-btn>
                        <v-btn color="green darken-1" text @click="setComment">{{$t('m.table.comment.submit')}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
        <template>
            <v-dialog v-model="dialog_update" persistent width="600px">
                <v-card class="justify-space-between">
                    <v-card-title>
                        <span class="headline">{{$t('m.table.update.title')}}</span>
                    </v-card-title>
                    <v-card-text>
                        <template>
                            <div class="">
                                <v-form
                                        ref="form"
                                        v-model="valid"
                                        lazy-validation
                                >
                                    <v-text-field
                                            v-model="name_update"
                                            :counter="10"
                                            :rules="nameRules"
                                            :label="$t('m.table.update.label')"
                                            required
                                    ></v-text-field>
                                </v-form>
                            </div>
                        </template>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialog_update = false">{{$t('m.table.update.cancel')}}</v-btn>
                        <v-btn color="green darken-1" text @click="updateTable">{{$t('m.table.update.update')}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
    </div>
</template>


<script>
    import { HotTable } from '@handsontable/vue'
    import 'handsontable/dist/handsontable.full.css'
    import Handsontable from 'handsontable'
    import "handsontable/languages/zh-CN";
    import { EventBus } from '../event-bus.js';
    import { HYPERCELL_CONFIG } from '../config';
    export default {
        name: 'Table.vue',
        data: function() {
            return {
                root: 'table-hot',
                hotRef:null,
                hotSettings:{
                    //表格数据
                    data: [[]],
                    columns:[],
                    //表格整体宽度
                    width: '100%',
                    //行表头
                    rowHeaders: true,
                    //列表头
                    colHeaders: true,
                    //合并单元格
                    mergeCells: true,
                    //单元格属性
                    cell:[],
                    //右键菜单
                    contextMenu: true,
                    //自动拉伸
                    stretchH: 'all',
                    autoWrapRow: true,
                    //下拉菜单
                    dropdownMenu: true,
                    columnSorting: {
                        indicator: true
                    },
                    autoColumnSize: {
                        samplingRatio: 23
                    },
                    //默认语言
                    language: "zh-CN",
                    //默认对齐方式
                    className: "htCenter htMiddle",
                    //许可证
                    licenseKey: 'ab3e4-1bee8-ed01c-4d94b-08cfe',
                    //导出文件插件
                    exportFile: true,
                    //公式插件
                    formulas:true,
                    //评论插件
                    comments:true,
                    // minSpareRows:40,
                    // minSpareCols:10,
                    // manualRowResize: true,
                    // manualColumnResize: true,
                    // manualColumnMove: true,
                    // manualRowMove: true,
                    afterChange: this.afterChangeMe,
                },
                mergeArrSubmit:[],
                cellSubmit:[],
                selectedCells:'',
                comment:'',
                comment_valid:true,
                commentRules: [
                    v => (v.length <= 60) || 'Name must be less than 60 characters',
                ],
                dialog_comment:false,

                dialog_update:false,
                name_update: null,
                valid:true,
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
                table_id:null,
                autosave:{
                    message:'',
                    color:'',
                },

            };
        },
        components: {
            HotTable,HYPERCELL_CONFIG
        },
        created() {
            if(this.$route.params.table !== undefined){
                this.table_id = this.$route.params.table;
                this.$store.dispatch('getMyTable',{
                    table_id : this.$route.params.table
                });
                this.$watch(this.$store.getters.getGetMyTableStatus, function () {
                    if (this.$store.getters.getGetMyTableStatus() === 2) {
                        this.name_update = this.$store.getters.getMyTable.name;
                        //console.log(this.$store.getters.getMyTable.merge);
                        this.hotSettings.mergeCells = eval("(" + this.$store.getters.getMyTable.merge + ")");
                        this.hotSettings.cell = eval("(" + this.$store.getters.getMyTable.cell + ")");
                        this.hotSettings.columns = eval("(" + this.$store.getters.getMyTable.column + ")");
                        //console.log(this.hotSettings.mergeCells.length);
                        if(this.hotSettings.mergeCells === null ){
                            this.hotSettings.mergeCells = true;
                        }
                        this.hotSettings.data = eval("(" + this.$store.getters.getMyTable.data + ")");
                        this.cellSubmit = this.hotSettings.cell;
                        this.autosave.message = this.$t('m.table.autosave_success');
                        this.autosave.color = "green";
                    }
                    if (this.$store.getters.getGetMyTableStatus() === 3) {

                    }
                });
            }else {
                this.initColumn();
            }
        },

        mounted() {
            this.hotRef = this.$refs.hypercell.hotInstance;
            this.hotRef.alter('insert_row', this.hotRef.countRows(),40);
            if(this.$route.params.table === undefined){
                this.saveTable();
            }
            Handsontable.hooks.add('afterSelection', this.getSelected, this.hotRef);
            Handsontable.hooks.add('afterMergeCells', this.mergeCells, this.hotRef);
            Handsontable.hooks.add('afterUnmergeCells', this.unMergeCells, this.hotRef);
            Handsontable.hooks.add('beforeCellAlignment',this.cellAlignment, this.hotRef);
            this.hotRef.selectCell(0,0);
        },
        methods:{
            mergeCells(){
                if (this.hotRef !==  undefined) {
                    this.mergeArrSubmit = JSON.parse(JSON.stringify(this.hotRef.getPlugin('mergeCells').mergedCellsCollection.mergedCells));
                    this.updateTable();
                }
            },
            unMergeCells(){
                if (this.hotRef !==  undefined) {
                    this.mergeArrSubmit = JSON.parse(JSON.stringify(this.hotRef.getPlugin('mergeCells').mergedCellsCollection.mergedCells));
                    this.updateTable();
                }
            },
            cellAlignment(){
                console.log(arguments);
                let startCol = arguments[1][0]['from']['col'];
                let endCol = arguments[1][0]['to']['col'];
                let startRow = arguments[1][0]['from']['row'];
                let endRow = arguments[1][0]['to']['row'];
                let alignType = arguments[2];
                console.log(alignType);
                let alignClass = arguments[3];
                console.log(alignClass);
                switch (alignType) {
                    case "horizontal":
                        for(let i= startCol;i <= endCol;i++){
                            for (let j = startRow;j <= endRow;j++){
                                //console.log(this.cellSubmit);
                                if(this.cellSubmit.length !== 0 ){
                                    //
                                    if( this.findCellIndex(i,j) !== null){
                                        console.log('changeAligning');
                                        if(this.cellSubmit[this.findCellIndex(i,j)]['className'] !== undefined){
                                            let classArr = this.cellSubmit[this.findCellIndex(i,j)]['className'].split(' ');
                                            this.cellSubmit[this.findCellIndex(i,j)]['className'] = alignClass + ' ' + classArr[1];
                                        }else{
                                            this.cellSubmit[this.findCellIndex(i,j)]['className'] = alignClass+ ' htMiddle'
                                        }
                                        this.hotSettings.cell= this.cellSubmit;
                                    }else{
                                        console.log('pushing');
                                        this.cellSubmit.push({
                                            row:j,
                                            col:i,
                                            className:  alignClass + ' htMiddle'
                                        });
                                        this.hotSettings.cell= this.cellSubmit;
                                    }

                                }else{
                                    console.log('firstPushing');
                                    this.cellSubmit.push({
                                        row:j,
                                        col:i,
                                        className: alignClass + ' htMiddle'
                                    });
                                    this.hotSettings.cell= this.cellSubmit;
                                }
                            }
                        }
                        break;
                    case "vertical":
                        for(let i= startCol;i <= endCol;i++){
                            for (let j = startRow;j <= endRow;j++){
                                //console.log(this.cellSubmit);
                                if(this.cellSubmit.length !== 0 ){

                                    //
                                    if( this.findCellIndex(i,j) !== null){
                                        console.log('changeAligning');
                                        if(this.cellSubmit[this.findCellIndex(i,j)]['className'] !== undefined){
                                            let classArr = this.cellSubmit[this.findCellIndex(i,j)]['className'].split(' ');
                                            console.log(classArr);
                                            this.cellSubmit[this.findCellIndex(i,j)]['className'] = classArr[0]+ ' ' + alignClass;
                                        }else{
                                            this.cellSubmit[this.findCellIndex(i,j)]['className'] = 'htCenter '+ alignClass
                                        }
                                        this.hotSettings.cell= this.cellSubmit;
                                    }else{
                                        console.log('pushing');
                                        this.cellSubmit.push({
                                            row:j,
                                            col:i,
                                            className:  'htCenter ' + alignClass
                                        });
                                        this.hotSettings.cell= this.cellSubmit;
                                    }

                                }else{
                                    console.log('firstPushing');
                                    this.cellSubmit.push({
                                        row:j,
                                        col:i,
                                        className: 'htCenter '+ alignClass
                                    });
                                    this.hotSettings.cell= this.cellSubmit;
                                }
                            }
                        }
                        break;
                    default: break;
                }
                this.hotSettings.mergeCells = this.mergeArrSubmit;
                this.updateTable();
            },
            findCellIndex(coltosearch, rowtosearch) {
                for (var i = 0; i < this.cellSubmit.length; i++) {
                    if (this.cellSubmit[i]['col'] ===  coltosearch && this.cellSubmit[i]['row'] === rowtosearch) {
                        return i;
                    }
                }
                return null;
            },
            changeCellType(index){
                switch(index){
                    case 0:
                        this.hotSettings.columns[this.selectedCells[0][1]]={
                            type:'text'
                        };
                        this.hotRef.updateSettings(this.hotSettings);
                        break;
                    case 1:
                        this.hotSettings.columns[this.selectedCells[0][1]]={
                            type: 'numeric',
                            numericFormat: {
                                pattern: '0,0',
                            },
                        };
                        this.hotRef.updateSettings(this.hotSettings);
                        break;
                    case 2:
                        this.hotSettings.columns[this.selectedCells[0][1]]={
                            type: 'numeric',
                            numericFormat: {
                                pattern: '0,0.00',
                            }
                        };
                        this.hotRef.updateSettings(this.hotSettings);
                        break;
                    case 3:
                        this.hotSettings.columns[this.selectedCells[0][1]]={
                            type: 'numeric',
                            numericFormat: {
                                pattern: '$0,0',
                            }
                        };
                        this.hotRef.updateSettings(this.hotSettings);
                        break;
                    case 4:
                        this.hotSettings.columns[this.selectedCells[0][1]]={
                            type: 'numeric',
                            numericFormat: {
                                pattern: '$0,0.00',
                            }
                        };

                        this.hotRef.updateSettings(this.hotSettings);
                        break;
                    case 5:
                        this.hotSettings.columns[this.selectedCells[0][1]]={
                            type: 'date',
                            dateFormat: 'MM/DD/YYYY',
                            correctFormat: true,
                            defaultDate: '01/01/2000',
                        };
                        this.hotRef.updateSettings(this.hotSettings);
                        break;
                    case 6:
                        this.hotSettings.columns[this.selectedCells[0][1]]={
                            type: 'time',
                            timeFormat: 'h:mm:ss a',
                            correctFormat: true
                        };
                        this.hotRef.updateSettings(this.hotSettings);
                        break;
                    case 7:
                        this.hotSettings.columns[this.selectedCells[0][1]]={
                            type: 'checkbox',
                            checkedTemplate: 'yes',
                            uncheckedTemplate: 'no'
                        };
                        this.hotRef.updateSettings(this.hotSettings);
                        break;
                    default:break;
                }
                this.hotSettings.mergeCells = this.mergeArrSubmit;
                this.updateTable();
            },
            initColumn(){
                let k = 10;
                for(let a=0;a<k;a++){
                    this.hotSettings.columns.push({
                        type:'text'
                    });
                }
            },
            getSelected(){
                this.selectedCells = this.hotRef.getSelected();
            },
            insertColumnRight(){
                this.hotSettings.columns.push({
                    type: 'text',
                });
                this.hotSettings.mergeCells = this.mergeArrSubmit;
                this.hotRef.updateSettings(this.hotSettings);
                this.updateTable();

            },
            insertRowBottom(){
                this.hotRef.alter('insert_row', this.hotRef.countRows(),20);
                this.updateTable();

            },
            setComment(){
                if(this.comment_valid === false){
                    EventBus.$emit('open-message', {
                        text: 'invalid value'
                    });
                    return 0;
                }
                // Access to the Comments plugin instance:
                const commentsPlugin = this.hotRef.getPlugin('comments');
                // Manage comments programmatically:
                let selectedRow = this.selectedCells[0][0];
                let selectedCol = this.selectedCells[0][1];
                commentsPlugin.setCommentAtCell(selectedRow , selectedCol , this.comment);
                let cellIndex = this.findCellIndex(selectedCol,selectedRow);
                //console.log(cellIndex);
                if(  cellIndex === null){
                    this.cellSubmit.push({
                        row: selectedRow,
                        col: selectedCol,
                        comment: {
                            value:this.comment
                        }
                    });
                    this.hotSettings.cell= this.cellSubmit;
                }else{
                    this.cellSubmit[cellIndex]['comment'] = {
                        value:this.comment
                    };
                    this.hotSettings.cell= this.cellSubmit;
                }
                this.hotSettings.mergeCells = this.mergeArrSubmit;
                this.dialog_comment = false;
                this.updateTable();
            },
            prepareSetComment(){
                const commentsPlugin = this.hotRef.getPlugin('comments');
                this.comment = commentsPlugin.getCommentAtCell(this.selectedCells[0][0], this.selectedCells[0][1]);
                this.dialog_comment = true;
            },
            saveTable:function () {
                this.autosave.message = this.$t('m.table.autosaving');
                this.autosave.color = "blue";
                this.$store.dispatch('saveTable',{
                    name:this.$t('m.table.name'),
                    data:this.hotRef.getSourceData(),
                    merge: this.hotRef.getPlugin('mergeCells').mergedCellsCollection.mergedCells,
                    cell:this.cellSubmit,
                    column:this.hotSettings.columns
                });
                this.$watch(this.$store.getters.getSaveTableStatus, function () {
                    if (this.$store.getters.getSaveTableStatus() === 2) {
                        this.autosave.message = this.$t('m.table.autosave_success');
                        this.autosave.color = "green";
                        EventBus.$emit('open-message', {
                            text: this.$t('m.table.save_to_cloud')

                        });
                        this.table_id = this.$store.getters.getSaveTableResult.id;
                        this.name_update = this.$store.getters.getSaveTableResult.name;
                    }
                    if (this.$store.getters.getSaveTableStatus() === 3) {
                        this.autosave.message = this.$t('m.table.autosave_failed');
                        this.autosave.color = "red";
                        EventBus.$emit('open-message', {
                            text: this.$t('m.system.error')
                        });
                    }
                });
            },
            updateTable:function () {
                console.log('ss');
                if(this.valid === false){
                    EventBus.$emit('open-message', {
                        text: 'invalid value'
                    });
                    return 0;
                }
                if(this.table_id === null || this.mergeArrSubmit === null || this.name_update === null || this.hotSettings.columns.length === 0 || this.hotRef === undefined){
                    return 0;
                }
                this.autosave.message = this.$t('m.table.autosaving');
                this.autosave.color = "blue";
                this.$store.dispatch('updateMyTable',{
                    table_id:this.table_id,
                    name:this.name_update,
                    //header:this.Headers,
                    data:this.hotRef.getSourceData(),
                    merge: this.hotRef.getPlugin('mergeCells').mergedCellsCollection.mergedCells,
                    cell:this.cellSubmit,
                    column:this.hotSettings.columns
                });
                this.$watch(this.$store.getters.getUpdateMyTableStatus, function () {
                    if (this.$store.getters.getUpdateMyTableStatus() === 2) {
                        this.dialog_update = false;
                        this.autosave.message = this.$t('m.table.autosave_success');
                        this.autosave.color = "green";
                    }
                    if (this.$store.getters.getUpdateMyTableStatus() === 3) {
                        this.autosave.message = this.$t('m.table.autosave_failed');
                        this.autosave.color = "red";
                    }
                });
            },
            afterChangeMe(){
                this.updateTable();

            },
            supcell(){
                console.log('Yuxuan is invincible');
            },
            formula(type){
                this.hotRef.setDataAtCell(this.selectedCells[0][0],this.selectedCells[0][1],'='+type.toUpperCase()+'(');
            },
            changeLangToZhCN(){
                this.hotSettings.language = "zh-CN";
            },
            changeLangToEnUS(){
                this.hotSettings.language= "en-US";
            },
            exportTable(){
                this.hotRef.getPlugin("exportFile").downloadFile("csv", {filename: "Supcell"});
            },
            clearTable(){
                this.hotRef.clear();

            },
        },
        computed:{
            formatItems(){
                return [
                    { title: this.$t('m.table.format.text') },
                    { title: this.$t('m.table.format.numeric') },
                    { title: this.$t('m.table.format.numeric_dot') },
                    { title: this.$t('m.table.format.price') },
                    { title: this.$t('m.table.format.price_dot') },
                    { title: this.$t('m.table.format.date') },
                    { title: this.$t('m.table.format.time') },
                    { title: this.$t('m.table.format.checkbox') },
                ];
            }
        },


    }
</script>
