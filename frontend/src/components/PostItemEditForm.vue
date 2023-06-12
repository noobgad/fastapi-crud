<template>
    <div class="post-card">
        <form @submit.prevent="updatePost">
            <div class="form-group">
                <input class="form-control" type="text" v-model.lazy.trim="updatedPost.title" />
                <!-- placeholder="Title"  -->
                <!-- <br /> -->
            </div>
            <div class="form-group p-4">
                <textarea class="form-control p-4 w-full bg-gray-100 rounded-lg" type="text"
                    v-model.lazy.trim="updatedPost.content" />
                <!-- placeholder="Content"  -->
                <!-- <br /> -->
            </div>
            <button @click="onCancel">Cancel</button>
            <button type="submit">Save</button>
        </form>
    </div>
</template>
  
<script lang="ts">
import { useUserStore } from "../stores/user";

export default {
    name: 'PostItemEditForm',

    setup() {
        const userStore = useUserStore()
        // userStore.initStore()

        const currentUser = userStore.user
        return {
            userStore, currentUser
        }
    },

    props: {
        postToEdit: {
            type: Object,
            required: true,
        },
        //   id: {
        //     type: String,
        //     required: true,
        //   },
    },

    data() {
        return {
            updatedPost: {
                id: this.postToEdit.id,
                title: this.postToEdit.title,
                content: this.postToEdit.content,
            },
        };
    },

    methods: {
        updatePost() {
            if (this.updatedPost && this.updatedPost !== this.postToEdit) {
                this.$emit("item-edited", this.updatedPost);
            }

        },

        onCancel() {
            this.$emit("edit-cancelled");
            // this.$router.back();
        },


    }
};
</script>