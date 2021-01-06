import { createStore, Commit } from 'vuex'
import axios from 'axios'

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
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
export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}
export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const getAndCommit = async (url: string, mutationsName: string, commit: Commit) => {
  // comit('setLoading', true)
  const { data } = await axios.get(url)
  commit(mutationsName, data)
  // comit('setLoading', false)
  return data
}
const postAndCommit = async (url: string, mutationsName: string, commit: Commit, playload: any) => {
  const { data } = await axios.post(url, playload)
  commit(mutationsName, data)
  return data
}
const store: any = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false }
  },
  mutations: { // 同步
    // login (state) {
    //   state.user = { ...state.user, isLogin: true, name: 'Uli' }
    // },
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
    },
    login (state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    fetchCurrentUser (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
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
    },
    login ({ commit }, playload) {
      return postAndCommit('/user/login', 'login', commit, playload)
    },
    fetchCurrentUser ({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
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
