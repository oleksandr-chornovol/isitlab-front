import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        categories: [],
        currentUser: {}
    },

    actions: {
        register (context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/register', payload)
                    .then((response) => {
                        let accessToken = response.data.access_token
                        localStorage.setItem('token', accessToken)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
                        context.commit('setCurrentUser', response.data)
                        resolve(response)
                    })
                    .catch((error) => {
                        console.log(error)
                        localStorage.removeItem('token')
                        reject(error)
                    })
            })
        },
        login (context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/login', payload)
                    .then((response) => {
                        let accessToken = response.data.access_token
                        localStorage.setItem('token', accessToken)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
                        context.commit('setCurrentUser', response.data)
                        resolve(response)
                    })
                    .catch((error) => {
                        localStorage.removeItem('token')
                        reject(error)
                    })
            })
        },
        logout (context) {
            return new Promise((resolve, reject) => {
                axios.post('/logout')
                    .then(() => {
                        localStorage.removeItem('token')
                        delete axios.defaults.headers.common['Authorization']
                        context.commit('setCurrentUser', {})
                        resolve()
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        loadCategories (context) {
            axios.get('/categories')
                .then(response => {
                    context.commit('setCategories', response.data.data)
                })
        },
        loadUser (context) {
            axios.get('/user')
                .then(response => {
                    context.commit('setCurrentUser', response.data)
                })
        },
        uploadImage (context, payload) {
            return new Promise((resolve) => {
                const form = new FormData()
                form.append('file', payload)
                axios.post('/posts/uploadImage', form)
                    .then(response => resolve(response))
            })
        }
    },

    mutations: {
        setCategories (state, payload) {
            state.categories = payload
        },
        setCurrentUser (state, payload) {
            state.currentUser = payload
        },
    },

    getters: {
        categories: state => state.categories,
        currentUser: state => state.currentUser,
    }
})