interface Person {
    readonly id: number,
    name: string,
    age?: number
}

let j: Person = {
    id: 1,
    name: 'j',
    age: 12
}

// j.id = 123