import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        mockUsers: [],
        mockWhiteboards: [],
        loggedIn: false,
        currentUser: ''
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
        }, 
        setCurrentUser (state, user) {
            state.currentUser = user
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
        },
        setCurrentUser: (context, payload) => {
            context.commit('setCurrentUser', payload.user)
        }
    },
    getters: {
        showMockUsers: state => state.mockUsers,
        showMockWhiteboards: state => state.mockWhiteboards,
        isLoggedIn: state => state.loggedIn,
        showCurrentUser: state => state.currentUser
    }
})

export default store