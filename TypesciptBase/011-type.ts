let sum: (x:number, y: number) => number
const fn1 = sum(1,2)

// 别名
type PlusType = (x:number, y: number) => number
let sum2: PlusType
const fn2 = sum2(1,2)

type StrOrNumber = string | number
let result3: StrOrNumber = '123'
result3 = 123

// 类型字面量相当于默认值
const str2: 'name' = 'name'
const number: 1 = 1

type Directions = 'Up' | 'Down'
let toWhere: Directions = 'Up'


// 交叉类型
interface Iname {
    name: string
}
type Iperson = Iname & {age: number}
let person: Iperson = {name: 's', age: 12}