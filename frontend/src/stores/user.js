import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        user: {
            isLoggedIn: false,
            id: null,
            email: null,
            name: null,
            access: null,
            // refresh: null,
            // avatar: null
        }
    }),

    actions: {
        initStore() {
            // console.log('initStore', localStorage.getItem('user.access'))

            if (localStorage.getItem('user.access')) {
                // console.log('User has access!')

                this.user.isLoggedIn = true
                this.user.access = localStorage.getItem('user.access')
                // this.user.refresh = localStorage.getItem('user.refresh')
                this.user.id = localStorage.getItem('user.id')
                this.user.name = localStorage.getItem('user.name')
                this.user.email = localStorage.getItem('user.email')
                // this.user.avatar = localStorage.getItem('user.avatar')

                // this.refreshToken()

                // console.log('Initialized user:', this.user)
            }
        },

        setToken(data) {
            // console.log('setToken', data)

            const access_token = data.access_token

            this.user.isLoggedIn = true
            this.user.access = access_token
            // this.user.refresh = data.refresh

            localStorage.setItem('user.access', access_token)
            // localStorage.setItem('user.refresh', data.refresh)

            // console.log('user.access: ', localStorage.getItem('user.access'))
        },

        getToken() {
            console.log('getToken')

            return localStorage.getItem('user.access')
            // this.user.isLoggedIn = true
        },

        removeToken() {
            console.log('removeToken')

            // this.user.refresh = null
            // this.user.avatar = null
            this.user.isLoggedIn = false
            this.user.access = null
            this.user.id = null
            this.user.name = null
            this.user.email = null

            // localStorage.setItem('user.refresh', '')
            // localStorage.setItem('user.avatar', '')
            localStorage.setItem('user.access', '')
            localStorage.setItem('user.id', '')
            localStorage.setItem('user.name', '')
            localStorage.setItem('user.email', '')
        },

        setUserInfo(user) {
            // console.log('setUserInfo', user)
            console.log('set User Info')

            this.user.id = user.id
            this.user.name = user.email.split('@')[0]
            this.user.email = user.email
            // this.user.avatar = user.avatar

            localStorage.setItem('user.id', this.user.id)
            localStorage.setItem('user.name', this.user.name)
            localStorage.setItem('user.email', this.user.email)
            // localStorage.setItem('user.avatar', this.user.avatar)

            // console.log('User', this.user)
        },

        // refreshToken() {
        //     axios.post('/api/refresh/', {
        //         refresh: this.user.refresh
        //     })
        //         .then((response) => {
        //             this.user.access = response.data.access

        //             localStorage.setItem('user.access', response.data.access)

        //             axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
        //         })
        //         .catch((error)=>{
        //             console.log(error)

        //             this.removeToken()
        //         })
        // },
    }
})