enum Direction {
    Up = 10,
    Down,
    Left,
    Right
}
console.log(Direction.Up) // 0
// console.log(Direction[0])

// 常量枚举使用的地方直接转成值
const enum Direction2 {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}
const value = 'UP'
if (value === Direction2.Up) {
    console.log('dd')
}
