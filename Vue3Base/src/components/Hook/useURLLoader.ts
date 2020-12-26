import {/*ref,*/ reactive, toRefs} from 'vue'
import axios from 'axios'

const useURLLoader = <T>(url: string) => {
    const data = reactive<{
        result: T | null;
        loading: boolean;
        loaded: boolean;
        error: T | null;}>({
        // 不结合ts无法确定result类型可能就会data.result.message得不到
        result: null,
        loading: true,
        loaded: false,
        error: null
    })
    // 上面的还不知道怎么写ts类型
    // const result = ref<T | null>(null)
    axios.get(url)
    .then((rawData)=> {
        data.loading = false
        data.loaded = true
        data.result = rawData.data
    })
    .catch( e => {
        data.error = e
    })
    const resultData = toRefs(data)
    return {
        ...resultData
    }
}
export default useURLLoader