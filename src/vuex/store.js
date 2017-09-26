import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        mockUsers: [],
        mockWhiteboards: [],
        loggedIn: false
    },
    mutations: {
        loadMockUsers (state, users) {
           state.mockUsers.push(...users)
        },
        loadMockWhiteboards (state, boards) {
            state.mockWhiteboards.push(...boards)
        },
        login (state) {
            state.loggedIn = true
        },
        logout (state) {
            state.loggedIn = false
        }
    },
    actions: {
        loadMockUsers: (context, payload) => {
            context.commit('loadMockUsers', payload.users)
        },
        loadMockWhiteboards: (context, payload) => {
            context.commit('loadMockWhiteboards', payload.boards)
        },
        login: context => {
            context.commit('login')
        },
        logout: context => {
            context.commit('logout')
        }
    },
    getters: {
        showMockUsers: state => state.mockUsers,
        showMockWhiteboards: state => state.mockWhiteboards,
        isLoggedIn: state => state.loggedIn
    }
})

export default store