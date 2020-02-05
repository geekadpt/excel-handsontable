<template >
    <div >
        <div id="hotTable" class="hotTable">
            <HotTable :root="root" ref="hypercell" :settings="hotSettings" ></HotTable>
        </div>
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
                    data: Handsontable.helper.createSpreadsheetData(20, 20),
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
                },
                mergeArrSubmit:[],
                cellSubmit:[],
            };
        },
        components: {
            HotTable,HYPERCELL_CONFIG
        },
        mounted() {
            this.hotRef = this.$refs.hypercell.hotInstance;
            Handsontable.hooks.add('afterMergeCells', this.mergeCells, this.hotRef);
            Handsontable.hooks.add('afterUnmergeCells', this.unMergeCells, this.hotRef);
            Handsontable.hooks.add('beforeCellAlignment',this.cellAlignment, this.hotRef);
        },
        methods:{
            mergeCells(){
                if (this.hotRef !==  undefined) {
                    this.mergeArrSubmit = JSON.parse(JSON.stringify(this.hotRef.getPlugin('mergeCells').mergedCellsCollection.mergedCells));
                    console.log(this.mergeArrSubmit);
                }
            },
            unMergeCells(){
                if (this.hotRef !==  undefined) {
                    this.mergeArrSubmit = JSON.parse(JSON.stringify(this.hotRef.getPlugin('mergeCells').mergedCellsCollection.mergedCells));
                    console.log(this.mergeArrSubmit);
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
                console.log(this.cellSubmit);
            },
            findCellIndex(coltosearch, rowtosearch) {
                for (var i = 0; i < this.cellSubmit.length; i++) {
                    if (this.cellSubmit[i]['col'] ===  coltosearch && this.cellSubmit[i]['row'] === rowtosearch) {
                        return i;
                    }
                }
                return null;
            },

        }

    }
</script>