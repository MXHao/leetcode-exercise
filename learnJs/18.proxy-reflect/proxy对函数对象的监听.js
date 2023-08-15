function foo() {

}
let fooProxy = new Proxy(foo, {
    apply: function(target, thisArg, argArray) {
        console.log('对foo的apply调用')
        return target.apply(thisArg, argArray)
    },
    construct: function(target, argArray, newTarget) {
        console.log('对foo的new调用')
        return new target(...argArray)
    }
})
fooProxy.apply({}, ["a", "b"])
new fooProxy