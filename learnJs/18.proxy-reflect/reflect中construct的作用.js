function Student(name, age) {
    this.name = name,
    this.age = age
}
function Teacher() {

}
const student1 = new Student("aaa", '10')
console.log(student1)
console.log(student1.__proto__ == Student.prototype)

// 用reflect改变类型
const student2 = Reflect.construct(Student, ['bbb', '20'], Teacher)
console.log(student2)
console.log(student2.__proto__ == Teacher.prototype)