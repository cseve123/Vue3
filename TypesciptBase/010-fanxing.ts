function echo<T>(arg: T): T {
    return arg
}

const result = echo('str')

function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}
const result2 = swap(['string', 123])

// 普通约束
function echoWithArr<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
}
const arrs = echoWithArr([1,3,4])

// 动态约束
interface IWithLength {
    length: number
}

function echoWithLength<T extends IWithLength>(arg: T): T {
    console.log(arg.length)
    return arg
}
const str = echoWithLength('str')
const arr2 = echoWithLength([1,2])
const obj = echoWithLength({length: 10, width: 10})


class Queue<T> {
    private data = []
    push(item: T) {
        return this.data.push(item)
    }
    pop() {
        return this.data.shift()
    }
}
const queue = new Queue<number>()
queue.push(1)
// queue.push('str')
console.log(queue.pop().toFixed())
console.log(queue.pop().toFixed()) // err

interface KeyPair<T, U> {
    key: T
    value: U
}
let kp1: KeyPair<number, string> = {key: 1, value: 'tr'}
let arr3: Array<number> = [1,2]