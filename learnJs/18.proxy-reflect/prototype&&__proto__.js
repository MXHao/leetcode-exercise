function person(name, value) {
    this.name = name,
    this.value = value
}
let p = new person('b', '10')
let q = new person('c', '20')
console.log(person.prototype, p.__proto__)