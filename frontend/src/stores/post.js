import { defineStore } from 'pinia';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
  }),

  getters: {
    getPostById: (state) => (postId) => {
      return state.posts.find(post => post.id === postId);
    },
  },

  actions: {
    async fetchPosts() {
      const response = await fetch('https://api.example.com/posts');
      const posts = await response.json();
      this.posts = posts;
    },
    setPosts(posts) {
        this.posts = posts;
    },
  },
});
