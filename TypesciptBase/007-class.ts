class Animal {
    // 不写这句ts,会报错::没有这个属性
    readonly name = ''
    constructor(name) {
        this.name = name
    }
    // private 只有自己能访问 protected 除自己子类可以访问
    // 实例都不能访问，除了是默认的pubilic
    public run() {
        return `${this.name} is running`
    }
}
const snake = new Animal('liy')
console.log(snake.run())
// snake.name = 123

// 继承
class Dog extends Animal {
    bark() {
        return `${this.name} is barking`
    }
}

const xiaoba = new Dog('xiaoba')
console.log(xiaoba.run())
console.log(xiaoba.bark())

// 多态
class Cat extends Animal {
    static categories = ['mammal']
    constructor(name) {
        super(name)
        console.log(this.name)
    }
    run() {
        return 'miao ' + super.run()
    }
}
const mao = new Cat('maomao')
console.log(mao.run())
console.log(Cat.categories)