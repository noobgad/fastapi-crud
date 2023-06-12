<template>
    <div id="post" v-if="!isEditing">
        <div class="post-card">
            <div class="post-header">
                <span class="profile-name">
                    <h4>
                        {{ post.Post.owner.email.split('@')[0] }}
                    </h4>
                </span>
                <div class="timestamp">{{ formatDate(post.Post.created_at) }}</div>
                <!-- <p>{{ formatDate(post.Post.created_at) }}</p> -->
            </div>
            <div class="post-content">
                <h4>{{ post.Post.title }}</h4>
                <p>{{ post.Post.content }}</p>
            </div>
            <div class="post-footer">
                <!-- <button class="like-button">Like</button> -->
                <div class="comment-count">{{ post.no_of_votes }} Votes</div>
                <div v-if="isPostOwner">
                    <!-- <button @click="updatePost(post.Post.id)">Update</button> -->
                    <button @click="toggleToItemEditForm">Edit</button>
                    <button @click="deletePost(post.Post.id)">Delete</button>
                </div>
                <!-- <div class="timestamp">{{ formatDate(post.Post.created_at) }}</div> -->
            </div>
        </div>
    </div>
    <post-item-edit-form 
        v-else 
        :postToEdit="post.Post"
        @item-edited="itemEdited"
        @edit-cancelled="editCancelled">
    </post-item-edit-form>
</template>

<script lang="ts">

import PostItemEditForm from "./PostItemEditForm.vue";

export default {
    components: {
        PostItemEditForm
    },
    // props: ['post' ,'isPostOwner'],
    props: {
        post: {
            type: Object,
            required: true,
        },
        isPostOwner: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            // isDone: this.done,
            isEditing: false
        };
    },

    created() {
        this.$emit('is-post-owner');
    },

    methods: {
        formatDate(date: string | number | Date) {
            // Format the date using JavaScript's built-in toLocaleString() method
            // return new Date(date).toLocaleString();
            return new Date(date).toLocaleDateString("en-GB")
        },

        itemEdited(updatedPost) {
            this.$emit('item-edited', updatedPost);
            this.isEditing = false;
        },

        editCancelled() {
            this.isEditing = false;
        },

        async updatePost() {
            return false;
        },
        async toggleToItemEditForm() {
            this.isEditing = true;
            // return false;
        },

        async deletePost() {
            // this.$emit('item-deleted');
            return false;
        },
    },
};
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
