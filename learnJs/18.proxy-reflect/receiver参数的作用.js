const obj = {
    _name: 'aaa',
    get name() {
        return this._name
    },
    set name(newName) {
        this._name = newName
    }
}

const proxyObj = new Proxy(obj, {
    get: function(target, key, receiver) {
        // receiver是创建出来的代理对象, 改变this指向
        console.log('get被访问')//使用receiver后这里会访问两次，因为this指向被改变
        return Reflect.get(target, key, receiver)
    },
    set: function(target, key, newValue, receiver) {
        console.log('set被访问', key)
        Reflect.set(target, key, newValue, receiver)
    }
})
proxyObj.name = 'bbb'
console.log(proxyObj.name)