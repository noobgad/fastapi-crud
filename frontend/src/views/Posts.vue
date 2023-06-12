<template>
    <div id="nav">
        <button @click="logout()">Logout</button>
        <!-- v-if="isLoggedIn"  -->
    </div>

    <h2> Hi {{ currentUser.name }}, welcome to your posts!</h2>
    <!-- skipidy bop bop, <br />
    yes yes yes -->
    <div id="posts">
        <!-- Create Post Form -->
        <form @submit.prevent="createPost">
            <div class="form-group">
                <input class="form-control" type="text" v-model="newPost.title" placeholder="Title" required />
                <!-- <br /> -->
            </div>
            <div class="form-group p-4">
                <textarea class="form-control p-4 w-full bg-gray-100 rounded-lg" v-model="newPost.content"
                    placeholder="Content" required></textarea>
                <!-- <br /> -->
            </div>
            <button type="submit">Create Post</button>
        </form>

        <!-- class="post-card"  -->
        <!-- :post="post.Post" -->

        <!-- List of Posts -->
        <PostItem 
            v-for="post in posts" 
            :key="post.Post.id" 
            :post="post"
            :is-post-owner="isPostOwner(post.Post.owner)"
        />

        <!-- -------- -->
        <!-- <div v-for="post in posts" :key="post.Post.id" class="post-card">
            <div class="post-header">
                <span class="profile-name">
                    <h4>
                        {{ post.Post.owner.email.split('@')[0] }}
                    </h4>
                </span>
                <div class="timestamp">{{ formatDate(post.Post.created_at) }}</div>
            </div>
            <div class="post-content">
                <h4>{{ post.Post.title }}</h4>
                <p>{{ post.Post.content }}</p>
            </div>
            <div class="post-footer"> -->
                
        <!-- <button class="like-button">Like</button> -->
<!-- 
            <div class="comment-count">{{ post.no_of_votes }} Votes</div>
                <div v-if="isPostOwner(post.Post.owner)">
                    <button @click="updatePost(post.Post.id)">Update</button>
                    <button @click="deletePost(post.Post.id)">Delete</button>
                </div>
            </div>

        </div> -->
    </div>
</template>

<script lang="ts">

import axios from 'axios';

import axiosApiInstance from "../api";
import { useUserStore } from "../stores/user";
import { usePostsStore } from "../stores/post";

import PostItem from "../components/PostItem.vue";

export default {
    name: 'Posts',

    setup() {
        const postsStore = usePostsStore()

        const userStore = useUserStore()
        userStore.initStore()

        const currentUser = userStore.user
        return {
            postsStore, userStore, currentUser
        }
    },

    components: {
        PostItem
    },

    data() {
        return {
            isLoggedIn: false,
            newPost: {
                title: '',
                content: ''
            },
            posts: [],
        }
    },

    // mounted() {
    created() {
        // Fetch posts data from API endpoint after successful login
        // this.userStore.initStore();
        this.getPosts();
    },

    methods: {

        async getPosts() {
            // const getAllPostsUrl = 'http://localhost:8000/posts/';
            // const token = this.getToken();
            // const token = localStorage.getItem('user.access')
            // console.log(token);

            // let headersList = {
            //     // "Authorization": `Bearer ${token}`,
            //     // "Access-Control-Allow-Origin": "*",
            //     // "Content-Type": "application/json",
            // }

            // const requestOptions = {
            //     // url: '/posts/',
            //     // method: 'GET',
            //     // headers: headersList,
            // }

            await axiosApiInstance
                .get('/posts?limit=50')
                .then(response => {
                    this.posts = response.data
                    this.postsStore.setPosts(this.posts)
                })
                .catch(error => console.log('error', error)
                )

        },

        async createPost() {
            // Placeholder API call to create a new post
            // Replace with your actual API endpoint and send
            // the "newPost" data to the backend

            const createPostUrl = 'http://127.0.0.1:8000/posts/';
            // const token = this.getToken();

            let headersList = {
                // "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            }

            let bodyContent = JSON.stringify({
                "title": this.newPost.title,
                "content": this.newPost.content
                // ,
            });

            const requestOptions = {
                // url: '/posts/',
                // method: 'POST',
                headers: headersList,
                // body: bodyContent,      // for fetch api
                // data: bodyContent,   // for axios api
            }

            // console.log('Creating new post:', this.newPost);
            // console.log('Post to be sent in request:', bodyContent);

            await axiosApiInstance
                // .request(requestOptions)
                .post('/posts/', bodyContent, requestOptions)
                // .post('/posts/', bodyContent)
                // .post('/posts/', requestOptions)
                .then(response => {
                    console.log("Post created successfully!")

                })
                .catch(error => console.error('createPost error: ', error)
                )

            // try {
            //     const response = await fetch(createPostUrl, requestOptions);
            //     let data = await response.json();

            //     if (response.ok) {
            //         console.log("Post created successfully!");
            //     } else {
            //         // console.log(response);
            //         console.log("no post created");
            //     }

            // } catch (error) {
            //     console.error(error);
            // }

            // console.log('Creating new post:', this.newPost);
            // After successful creation, fetch the updated posts
            // by calling the "fetchPosts" method
            this.getPosts();
            this.newPost.title = '';
            this.newPost.content = '';
        },

        async updatePost() {
            return false;
        },

        async deletePost() {
            return false;
        },

        async logout() {
            this.userStore.removeToken()
            this.$router.push('/login');
        },

        formatDate(date: string | number | Date) {
            // Format the date using JavaScript's built-in toLocaleString() method
            // return new Date(date).toLocaleString();
            return new Date(date).toLocaleDateString("en-GB")
        },

        isPostOwner(owner: { id: any; }) {
            // Logic to check if the current user is the owner of the post
            return owner.id == this.currentUser.id;
            // return true;
        },

    },
}
</script>

<style scoped>
.post-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10%;
    /* margin-top: 40px; */
    margin-bottom: 10px;
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.post-header .profile-name {
    font-weight: bold;
}

.post-header .timestamp {
    color: #aaa;
}

.post-content {
    margin-bottom: 10px;
}

.post-content p {
    margin: 0;
    line-height: 1.4;
}

.post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    color: #777;
    font-size: 14px;
    border-top: 1px solid #ddd;
    padding-top: 8px;
}

.post-footer .like-button {
    cursor: pointer;
}

.post-footer .comment-count {
    margin-right: 10px;
}

/* .post-footer .timestamp {
    color: #aaa;
} */

.form-group {
    margin-bottom: 10px;
}

.form-control {
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    /* background-color: rgb(255, 255, 255); */
}
</style>
