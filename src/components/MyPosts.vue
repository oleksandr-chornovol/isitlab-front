<template>
  <div>
    <div style="display: flex">
      <v-btn
        @click="openCreateForm"
        class="mx-3 my-3"
      >New post</v-btn>
      <v-card-title style="margin: auto; width: 250px; text-align: center;">My Posts</v-card-title>
    </div>
    <div v-show="!posts.length" style="text-align: center;">You have no posts!</div>
    <v-card v-for="post in posts" :key="post.id"
            class="mx-auto my-5"
            max-width="777"
    >
      <v-card-title class="headline justify-center">
        <h5>{{ post.title }}</h5>
      </v-card-title>
      <v-card-text>
        <div class="mx-5">{{ post.short_description }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          text
          color="blue accent-4"
          @click="openEditForm(post)"
        >Edit</v-btn>
        <v-btn
          text
          color="red accent-4"
          @click="removePost(post.id)"
        >Remove</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="editPostForm" max-width="600px">
      <edit-post
        :post="editablePost"
        @closeEditForm="closeEditForm"
      />
    </v-dialog>
    <v-dialog v-model="createPostForm" max-width="600px">
      <create-post
        @closeCreateForm="closeCreateForm"
      />
    </v-dialog>
  </div>
</template>
<script>
import EditPost from '@/components/EditPost.vue'
import CreatePost from '@/components/CreatePost.vue'

export default {
  components: {
    EditPost,
    CreatePost
  },

  data: () => ({
    createPostForm: false,
    editablePost: {},
    editPostForm: false,
    posts: []
  }),

  mounted () {
    this.loadPosts()
  },

  methods: {
    closeCreateForm (post) {
      this.posts.push(post)
      this.createPostForm = false
    },

    closeEditForm () {
      this.editPostForm = false
    },

    loadPosts () {
      this.$http.get('/posts')
        .then(response => this.posts = response.data.data)
    },

    openCreateForm () {
      this.createPostForm = true
    },

    openEditForm (post) {
      this.editablePost = post
      this.editPostForm = true
    },

    removePost (postId) {
      this.$http.delete(`/posts/${postId}`, )
        .then(() => this.posts = this.posts.filter(p => (p.id !== postId)))
    }
  }
}
</script>