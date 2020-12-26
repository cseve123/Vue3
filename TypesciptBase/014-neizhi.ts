const a: Array<number> = [1,2,3]
const date = new Date()
date.getTime()
const reg = /abc/
reg.test('abc')

Math.pow(2,2)

let body = document.body
let allLis = document.querySelectorAll('li')
allLis.keys()

document.addEventListener('click', e => {
    console.log(e)
})

interface IPerson {
    name: string
    age: number
}

let vi: IPerson = {name: '', age: 1}
type IPartial = Partial<IPerson>
let vi2: IPartial = {name: 'vi'}
type IOmit = Omit<IPerson, 'name'>
let vi3: IOmit = {age: 1}