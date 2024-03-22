<template>
    <div>
        <div class="box">

            <div>
                <el-table border style="width: 390px" height="500" data-id="a1" id="table1" :data="table1" ref='leftTable' @row-click='rowClick'>
                    <el-table-column type="index" width="50">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="age" label="年龄" width="180">
                    </el-table-column>
                </el-table>
            </div>
            <div>
                <el-table border style="width: 390px" height="500" data-id="a2" id="table2" ref='rightTable' :data="table2">
                    <el-table-column type="index" width="50">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="age" label="年龄" width="180">
                    </el-table-column>
                </el-table>
            </div>

        </div>
    </div>
</template>
<script>
import Sortable from 'sortablejs'
export default {
    components: {
        Sortable
    },
    data() {
        return {
            table1: [],
            table2: [],
            storeDrag_html: {}
        }
    },
    mounted() {
        this.getData()
        const leftTable = this.$refs.leftTable
        const rightTable = this.$refs.rightTable
        const leftTabletbody = leftTable.$el.querySelector('tbody')
        const rightTabletbody = rightTable.$el.querySelector('tbody')
        this.rowDrop1(leftTabletbody)
        this.rowDrop2(rightTabletbody)
    },
    methods: {
        getData() {
            this.table1 = [
                { name: '张三', age: 18, id: 1 },
                { name: '李四', age: 19, id: 2 },
                { name: '王五', age: 20, id: 3 },
                { name: '赵六', age: 21, id: 4 }
            ],
            this.table2 = [
                { name: '郑七', age: 21, id: 42 },
                { name: '王五2', age: 20, id: 43 },
                { name: '赵六2', age: 21, id: 44 }
            ]
        },
        getData2() {
            this.table1 = []
            this.table2 = []
        },
        rowClick(row) {
            row.isSelect = true
        },
        getKey(row) {
            return row.id
        },
        rowDrop1(dom, target) {
            const _this = this
            return Sortable.create(dom, {
                animation: false,
                sort: true,
                group: { name: 'tableGroup', pull: 'clone', put: false },
                onMove: (evt, originalEvent) => {
                console.log('move', evt);
                // if(Object.keys(_this.storeDrag_html).length == 0){
                //     _this.storeDrag_html = JSON.parse(JSON.stringify(evt.dragged.__vue__.row));
                //     // console.log('_this.storeDrag_html: ', _this.storeDrag_html);

                // }
                // evt.dragged.innerHTML = '';
            },
                onEnd(obj) {
                    console.log('onEnd: ', obj);
                    const { from, to, newIndex, oldIndex } = obj
                    if(_this.storeDrag_html && to.parentNode.parentNode.parentNode.id == 'table1'){//如果落点还在table1
                        // _this.storeDrag_html = from.rows[oldIndex].__vue__.row
                        // console.log('_this.storeDrag_html: ', _this.storeDrag_html);
                        _this.table1.push(_this.storeDrag_html)
                    }
                    _this.storeDrag_html = {};
                    if (from === to) {
                        console.log('左边自己内部拖动', newIndex, oldIndex)
                        // const currRow = _this.table1.splice(oldIndex, 1)[0]
                        // _this.table1.splice(newIndex, 0, currRow)
                    } else if (from !== to) {
                        console.log('从左边拖到右边', newIndex, oldIndex)
                        // const currRow = _this.table1.splice(oldIndex, 1)[0]
                        // _this.table2.splice(newIndex, 0, currRow)
                    }

                    // _this.getData()
                    console.log(_this.table1, _this.table2)
                },

            })
            
        },
        rowDrop2(dom, target) {
            const _this = this
            return Sortable.create(dom, {
                animation: false,
                sort: true,
                group: { name: 'tableGroup', pull: true, put: true },
                // 元素从一个列表拖拽到另一个列表
                onEnd(obj) {
                    const { from, to, newIndex, oldIndex } = obj
                    console.log('from, to, newIndex, oldIndex: ', from, to, newIndex, oldIndex);
                    if (from === to) {
                        console.log('右边自己内部拖动', newIndex, oldIndex)
                        // const currRow = _this.table2.splice(oldIndex, 1)[0]
                        // _this.table2.splice(newIndex, 0, currRow)
                    } else if (from !== to) {
                        console.log('从右边拖到左边', newIndex, oldIndex)
                        // const currRow = _this.table2.splice(oldIndex, 1)[0]
                        // _this.table1.splice(newIndex, 0, currRow)
                        // _this.table1[0] = { name: '222', age: 66, id: 66 }
                    }
                    
                    
                    // _this.getData()
                    console.log(_this.table1, _this.table2)
                },
                onAdd(event) {
                    console.log('add: ', event);

                },

            })
        }
    }
}
</script>
<style scoped>
.headBox {
    margin-top: 30px;
    font-size: 40px;
    color: red;
}

.box {
    margin: 100px;
    display: flex;
    justify-content: space-around;
}
</style>