<template>
    <div class="login-form">
        <h3>Login page</h3>
        <!-- <v-card-text> -->
        <form @submit.prevent="login">
            <div class="form-group">
                <input class="form-control" v-model="username" name="login" label="Login" type="text" placeholder="Username"
                    required>
            </div>
            <!-- <br /> -->
            <div class="form-group">
                <input class="form-control" v-model="password" name="password" label="Password" id="password"
                    type="password" placeholder="Password" required>
            </div>
            <!-- <br /> -->
            <!-- <v-text-field v-model="email" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" id="password"
                    type="password"></v-text-field> -->
            <button type="submit">Log in</button>
        </form>
        <!-- <div v-if="loginError">
                <v-alert :value="loginError" transition="fade-transition" type="error">
                    Incorrect email or password
                </v-alert>
            </div> -->
        <!-- </v-card-text> -->
    </div>
</template>

<script lang="ts">
// import { Component, Vue } from 'vue-property-decorator';
// import { api } from '@/api';
// import { appName } from '@/env';
// import { readLoginError } from '@/store/main/getters';
// import { dispatchLogIn } from '@/store/main/actions';

// import { ref } from 'vue'

import axios from "axios";
import axiosApiInstance from "../api";
import { useUserStore } from '../stores/user';

export default {
    name: 'Login',

    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },

    data() {
        return {
            username: '',
            password: '',
            // isLoggedIn: false,
        }
    },
    methods: {
        async login() {
            // perform login action, e.g. call API endpoint
            const loginTokenUrl = 'http://localhost:8000/login';
            // console.log('username:', this.username, 'password:', this.password)

            // let headersList = {
            // "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Accept": "*/*"
            // }

            let bodyContent = new FormData();
            bodyContent.append("username", this.username);
            bodyContent.append("password", this.password);

            // let bodyContent = {'username': this.username, 'password': this.password}
            // console.log(bodyContent);

            const requestOptions = {
                method: 'POST',
                // headers: headersList
                body: bodyContent,
            }

            try {
                // let response = await fetch(loginTokenUrl, requestOptions);
                // let response = await axios.post('/login/', bodyContent);
                let response = await axiosApiInstance.post('/login', bodyContent);
                // console.log(response);

                let data = await response.data;

                // if (response.ok) {
                // if (response.statusText == 'OK') {
                // console.log("Great success!");

                this.userStore.setToken(data)

                // axios.defaults.headers.common["Authorization"] = "Bearer " + data.access_token;

                // placeholder of interceptor code

                // localStorage.setItem('token', data.access_token);
                // this.isLoggedIn = true;
                // this.$router.push('/feed'); // Replace '/dashboard' with your desired route

                // } else {
                //     // console.log(response);
                //     console.log("auth failed");
                // }

            } catch (error) {
                console.error(error);
            }

            await axiosApiInstance
                .get('/users/me/')
                .then(response => {
                    this.userStore.setUserInfo(response.data)

                    this.$router.push('/feed')
                })
                .catch(error => {
                    console.log('error', error)
                })

            // fetch(loginTokenUrl, requestOptions)
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error(`auth failed, ${response.text()}`);
            //         }
            //         return response.json();

            //     })
            //     // .then(response => response.json())
            //     .then(data => {
            //         // console.log(data)
            //         console.log("Great success!", data);
            //         localStorage.setItem('token', data.access_token);
            //     })
            //     .catch(error => console.error(error)
            //     );
        },
    },
};

</script>

<style>
.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.form-group {
    margin-bottom: 10px;
}

/* .form-control {
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    // background-color: rgb(255, 255, 255); 
} 
*/
</style>