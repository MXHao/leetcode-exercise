<!-- 组件说明 -->
<template>
    <div class=''>
        <el-table highlight-current-row :data="localTableData" id="local" style="width: 40%;float: left;user-select: none;">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </el-table>
        <div style="width: 20px;float: left;height: 100px;background-color: #ffffff;"></div>

        <el-table highlight-current-row :data="remoteTableData" id="remote" style="width: 50%;user-select: none;">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
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
            visible: false,
            localTableData: [{
                date: '2016-05-02',
                name: '张大头',
                address: '南京市天湖区金沙江路 1518 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }],
            remoteTableData: [{
                date: '2016-05-01',
                name: 'lisi',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: 'wangwu',
                address: '上海市普陀区金沙江路 1517 弄'
            }],
            menus: [{
                name: "菜单一",
                operType: 1,
                icon: "el-icon-upload2"
            },
            {
                name: "菜单二",
                operType: 2,
                icon: "el-icon-download"
            },
            ],
            local: '',

        };
    },
    computed: {

    },
    mounted() {
        this.remoteTable();
        this.localTable()

    },
    methods: {
        remoteTable() {
            let row = document.querySelectorAll("#remote .el-table__row");
            for (let i = 0; i < row.length; i++) {
                row[i].onmousedown = (e) => {
                    let c = e.target.parentElement.parentElement.firstChild.firstChild.innerText
                    let rowdata = this.remoteTableData.filter(d => d.date == c);
                    if (rowdata && rowdata.length) {
                        this.local = rowdata[0]
                        var body = document.querySelector("body")
                        body.style.cursor = "move"
                    }

                    // 鼠标松开事件
                    document.onmouseup = (e) => {
                        var body = document.querySelector("body")
                        body.style.cursor = "move"
                        let a = document.getElementById("local");
                        if (e.pageX > a.offsetLeft && e.pageX < a.clientWidth + a.offsetLeft
                            && e.pageY > a.offsetTop && e.pageY < a.offsetTop + a.clientHeight) {
                            this.localTableData.push(this.local)
                            setTimeout(() => {
                                this.localTable()
                            }, 1)
                        }

                        document.onmousemove = null;
                        document.onmouseup = null;
                        row[i].releaseCapture && row[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
                    };
                }
            }
        },
        localTable() {
            let row = document.querySelectorAll("#local .el-table__row");
            for (let i = 0; i < row.length; i++) {
                row[i].onmousedown = (e) => {
                    let c = e.target.parentElement.parentElement.firstChild.firstChild.innerText
                    let rowdata = this.localTableData.filter(d => d.date == c);
                    if (rowdata && rowdata.length) {
                        this.local = rowdata[0]
                        var body = document.querySelector("body")
                        body.style.cursor = "move"
                    }

                    // 鼠标松开事件
                    document.onmouseup = (e) => {
                        var body = document.querySelector("body")
                        body.style.cursor = "move"
                        let a = document.getElementById("remote");
                        if (e.pageX > a.offsetLeft && e.pageX < a.clientWidth + a.offsetLeft
                            && e.pageY > a.offsetTop && e.pageY < a.offsetTop + a.clientHeight) {
                            this.remoteTableData.push(this.local)
                            setTimeout(() => {
                                this.remoteTable()
                            }, 1)
                        }

                        document.onmousemove = null;
                        document.onmouseup = null;
                        row[i].releaseCapture && row[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
                    };
                }
            }
        }
    },
}
</script>

<style lang='scss' scoped>

</style>