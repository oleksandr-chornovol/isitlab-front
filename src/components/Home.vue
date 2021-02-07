<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
    >
      <v-tab v-for="category in categories" :key="category.id">
        {{ category.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="category in categories" :key="category.id">
        <v-card v-for="post in category.posts" :key="post.id"
                class="mx-auto my-5"
                max-width="777"
                style="border: solid black 1px; border-radius: 25px"
                :to="`/post/${post.id}`"
                flat
        >
          <v-card-title class="headline justify-center">
            <h5>{{ post.title }}</h5>
          </v-card-title>
          <v-card-text>
            <div class="mx-5">{{ post.short_description }}</div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import axios from "axios";

export default {
  name: 'Home',

  data: () => ({
    categories: [],
    tab: null,
  }),

  mounted() {
    this.loadCategoriesWithPosts()
  },

  methods: {
    loadCategoriesWithPosts () {
      axios.get('/categories?with_posts=1')
        .then(response => this.categories = response.data.data)
    }
  }
}
</script>