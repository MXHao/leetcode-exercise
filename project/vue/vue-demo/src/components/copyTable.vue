<!-- 组件说明 -->
<template>
    <div class=''>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="copy(scope.row, scope.$index)">复制</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
//import x from ''
export default {
    components: {

    },
    data() {
        return {
            tableData: [{
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        };
    },
    computed: {

    },
    methods: {
        copy(data, index) {
            console.log(data, index)
            this.tableData.splice(index, 0, data)
        }
    },
}
</script>

<style lang='scss' scoped></style>