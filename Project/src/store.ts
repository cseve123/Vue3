import { createStore, Commit } from 'vuex'
import axios from 'axios'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}
interface ImageProps {
  _id?: string;
  url?: string;
  createAt?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id: string;
  excerpt?: string;
  title: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}

export interface GlobalDataProps {
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const getAndCommit = async (url: string, mutationsName: string, comit: Commit) => {
  // comit('setLoading', true)
  const { data } = await axios.get(url)
  comit(mutationsName, data)
  // comit('setLoading', false)
}
const store: any = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: true, name: 'Uli', columnId: 1 }
  },
  mutations: { // 同步
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'Uli' }
    },
    createPost (state, newPost) { // 传参数
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    }
  },
  actions: { // 异步
    async fetchColumns (context) {
      // const { data } = await axios.get('/columns')
      // context.commit('fetchColumns', data)
      getAndCommit('/columns', 'fetchColumns', context.commit)
    },
    fetchColumn ({ commit }, cid: string) {
      axios.get(`/columns/${cid}`, {
        params: {
          id: cid
        }
      }).then(resp => {
        commit('fetchColumn', resp.data)
      })
    },
    fetchPosts ({ commit }, cid: string) {
      axios.get(`/columns/${cid}/posts`, {
        params: {
          id: cid
        }
      }).then(resp => {
        commit('fetchPosts', resp.data)
      })
    }
  },
  getters: { // 提取共用
    getColumnById: (state) => (id: string) => {
      return state.columns.find((c: ColumnProps) => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter((post: PostProps) => post.column === cid)
    }
  }
})
export default store
