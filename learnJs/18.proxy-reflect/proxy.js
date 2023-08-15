const obj = {
    name: 'a',
    value: 10
}
const proxyObj = new Proxy(obj, {
    get: function(target, key) {
        console.log(`${key}值被访问了`)
        return target[key]
    },
    set: function(target, key, newValue) {
        console.log(`${key}值被设置了`)
        target[key] = newValue
    },
    has: function(target, key) {
        console.log(`${key}值in操作`)
        return key in target
    },
    deleteProperty: function(target, key) {
        console.log(`${key}值delete操作`)
        delete target[key]
    }
})
console.log(proxyObj.name)
proxyObj.name = 'bbb'
console.log(obj)
console.log('name' in proxyObj)
delete proxyObj.name
console.log(obj)