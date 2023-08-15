// 1.八种内置类型
let age:number =  12
let str:string = '12'
let flag:boolean = true
let age2:number = 2
let obj:object = {x: '111'}
let big:bigint = 100n
let sym:symbol = Symbol('1')
console.log(str);

// 2.null 和 undefined
// null 和 undefined 赋值给 number
let num2: number = 1;
// num2 = null
// num2 = undefined
 
// null 和 undefined 赋值给 boolean
let bool2:boolean = false;
// bool2 = undefined
// bool2 = null

let any2:any = '222'
any2 = null
let unknown:unknown = '222'
unknown = null
// 如果在tsconfig.json里配置了"strictNullChecks": true，null就只能赋值给any、unknown和它本身的类型（null），undefined就只能赋值给any、unknown、void和它本身的类型（undefined）。


// null 和 undefined 赋值给 object
let obj2: object = {};

// 3.number 和 bigint
let num3:number = 111
let big3:bigint = 100n
// num3 = big3
// 虽然number和bigint都表示数字，但是这两个类型并不兼容：

// 4.Array
let arr4:string[] = ['111']
let arr4_2:number[] = [222]
let arr4_3:(string|number)[] = ['111', 222]
arr4.push('aaa')
arr4_2.push(2322)
arr4_3.push('333')

// 5.元组
// 元组类型的解构赋值
let arr5:[string, number] = ['111', 222]
let [a, b] = arr5
console.log(a, b);
// 元组类型的可选元素
let arr6:[string, number?]
arr6 = ['123']
arr6 = ['2130', 123]
// 元组类型的剩余元素
let arr7:[string, ...number[]]
arr7 = ['123', 1, 2, 3, 4]
// 只读的元组类型
let arr8:readonly[string, number] = ['123', 123]
// arr8[0] = ['321']

// 6.函数