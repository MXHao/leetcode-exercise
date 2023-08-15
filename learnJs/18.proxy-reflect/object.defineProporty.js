let obj = {
    name: 'a',
    value: '123'
}
Object.keys(obj).forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
        get: function() {
            console.log(`${key}值被访问了`)
            return value
        },
        set: function(newValue) {
            console.log(`${key}值被设置了`)
            value = newValue 
        }
    })
});

obj.name = 'b',
console.log(obj.name, obj.value)