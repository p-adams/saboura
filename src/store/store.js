import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        mockUsers: [],
        mockWhiteboards: []
    },
    mutations: {
        loadMockUsers (state, users) {
           state.mockUsers.push(...users)
        },
        loadMockWhiteboards (state, boards) {
            state.mockWhiteboards.push(...boards)
        }
    },
    actions: {
        loadMockUsers: (context, payload) => {
            context.commit('loadMockUsers', payload.users)
        },
        loadMockWhiteboards: (context, payload) => {
            context.commit('loadMockWhiteboards', payload.boards)
        }
    },
    getters: {
        showMockUsers: state => state.mockUsers,
        showMockWhiteboards: state => state.mockWhiteboards
    }
})

export default store