<template>
  <div>
        <h1>{{count}}</h1>
        <h1>{{double}}</h1>
        <button @click="add"> + 1 </button>
        <ul>
            <li v-for="item in numbers" :key="item">{{item}}</li>
        </ul>
        <h2>{{person.name}}</h2>
        <h2>点击的坐标{{x}} {{y}}</h2>
        <h1 v-if="loading">loading...</h1>
        <!-- <img v-if="loaded" :src="result.message" alt="dog" /> -->
        <img v-if="loaded" :src="result[0].url" alt="cat" />
        <button @click="updateGreeting">更改title</button>
  </div>
</template>

<script lang='ts'>
// FIXME: vue3都是用模块的方式来做
import { 
    ref,
    computed, 
    reactive, 
    toRefs,
    onMounted,
    onUpdated,
    onRenderTriggered,
    watch,
    defineComponent
} from 'vue'
import useMouseEvent from '../Hook/useMouseEvent'
import useURLLoader from '../Hook/useURLLoader'
interface DataPros {
    count: number;
    double: number;
    add: () => void;
    numbers: number[];
    person: any;
}
interface DogResult {
    message: string;
    success: string;
}
interface CatResult {
    id: string;
    url: string;
    width: number;
    height: number;
}
export default defineComponent({
    setup() {
        // const count = ref(0)
        // const double = computed(() => {
        //     return count.value * 2
        // })
        // const add = () => {
        //     count.value++    
        // }
        // return {
        //     count,
        //     double,
        //     add
        // }
        const data: DataPros = reactive({
            count: 0,
            double: computed(() => {
                return data.count * 2
            }),
            add: () => {
                data.count++
            },
            numbers: [1,2,3],
            person: {}
        })
        // FIXME: 展示vue3响应式改写proxy,不用$set了
        data.numbers[0] = 5
        data.person.name = 'dd'
        // FIXME: toRefs让data重新变成响应
        const refData = toRefs(data)

        /**
         * ref 和reactive的区别
         * 相当于于一个在作用域下声明， 一个在对象里声明
         * reactive直接使用不行相当于 const { x } = obj; obj.x = 3，这时声明里的x还是老的
         */

        // 生命周期变化
        onMounted(() => {
            console.log('mounted')
        })
        onUpdated(() => {
            console.log('update')
        })
        // 新增的调式生命周期
        onRenderTriggered( (event) => {
            console.log(event)
        })


        //  watch
        const greetings = ref('')
        const updateGreeting = () => {
            greetings.value += 'hello!'
        }
        watch([greetings, ()=> data.count], (newV, oldV) => {
            console.log('old', oldV)
            console.log('new', newV)
            document.title = 'updated' + greetings.value + data.count
        })

        // hook相当于react的hook
        const { x, y } = useMouseEvent()

        // hook改的urlloading
        // const { result, loading, loaded } = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random')
        const {result, loading, loaded} = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
        watch(result, () => {
            // 因为有写ts有了类型指定
            // console.log(result.value.message)
            if (result.value) {
                console.log(result.value[0])
            }
        })

        return {
            // FIXME: 直接data，会让里面属性变成普通对象不可响应
            // ...data
            ...refData,
            greetings,
            updateGreeting,
            x,
            y,
            result,
            loading,
            loaded
        }
    }
})
</script>

<style lang="scss" scoped>
    button {
        font-size: 45px;
    }
</style>