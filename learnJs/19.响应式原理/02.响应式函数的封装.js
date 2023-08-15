let reactiveFnList = []//缺点：使用数组只能对应一个属性的改变，不方便管理
function reactiveFun(fn) {
    reactiveFnList.push(fn)
}
const obj = {
    name: 'aaa',
    value: 10
}
reactiveFun(function foo1() {
    console.log('响应函数1')
    console.log(obj.name)
})

reactiveFun(function foo2() {
    console.log('响应函数2')
    console.log(obj.value)
})

function foo3() {
    console.log('非响应函数')
}

obj.name = 'bbb'
reactiveFnList.forEach(fn => {
    fn()
})