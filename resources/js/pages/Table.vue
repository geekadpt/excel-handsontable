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
            };
        },
        components: {
            HotTable,HYPERCELL_CONFIG
        },
        mounted() {
            this.hotRef = this.$refs.hypercell.hotInstance;
        }
    }
</script>