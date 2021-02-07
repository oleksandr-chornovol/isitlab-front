<template>
  <v-card class="mx-auto">
    <v-img :src="post.image" height="300px"></v-img>

    <v-card-title class="headline justify-center">
      {{ post.title }}
    </v-card-title>

    <v-card-subtitle class="mx-5 my-5">
      <p v-html="post.description"></p>
    </v-card-subtitle>
  </v-card>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
      post: {}
  }),
  mounted () {
    this.loadPost()
  },
  methods: {
    loadPost () {
      axios.get(`/posts/${this.$route.params.id}`)
        .then(response => this.post = response.data.data)

    }
  }
}
</script>