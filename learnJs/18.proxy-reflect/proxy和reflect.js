const obj = {
    name: 'a',
    value: 10
}
const proxyObj = new Proxy(obj, {
    get: function(target, key, receiver) {
        console.log(`${key}值被访问了`)
        // return target[key]
        return Reflect.get(target, key)
    },
    set: function(target, key, newValue, receiver) {
        console.log(`${key}值被设置了`)
        // target[key] = newValue
        Reflect.set(target, key, newValue)//reflect会返回一个布尔值，判断是否成功set
    },
})
console.log(proxyObj.name)
proxyObj.name = 'bbb'