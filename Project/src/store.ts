import { createStore } from 'vuex'
import { ColumnProps, PostProps, testData, testPosts } from './testData'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const store: any = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'Uli' }
    }
  },
  getters: {
    biggerColumnLen (state) {
      return state.columns.filter((c: ColumnProps) => c.id > 2).length
    },
    getColumnById: (state) => (id: number) => {
      return state.columns.find((c: ColumnProps) => c.id === id)
    },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter((post: PostProps) => post.columnId === cid)
    }
  }
})
export default store
