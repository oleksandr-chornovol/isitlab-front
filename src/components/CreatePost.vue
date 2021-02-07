<template>
  <v-card>
    <v-card-title class="headline justify-center">New Post</v-card-title>
    <v-card-text>
      <v-text-field
        label="Title"
        outline
        v-model.trim="post.title"
        autocomplete="on"
      />
      <v-textarea
        v-model="post.short_description"
        rows="2"
        label="Short Description"
      ></v-textarea>
      <wysiwyg
        v-model="post.description"
      />
      <v-select
        v-model="post.categories"
        label="Categories"
        :items="categories"
        multiple
        chips
        item-text="name"
        item-value="id"
      ></v-select>
      <v-file-input
        prepend-icon="mdi-camera"
        :value="imgFile"
        @change="saveImage"
        @focus="''"
      ></v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="mr-1 mb-3"
             @click="save"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    defaultPost: {
      title: '',
      short_description: '',
      description: '',
      image: 'http://127.0.0.1/posts/images/default.jpg',
      categories: []
    },
    imgFile: new File([], 'default.jpg'),
    post: {}
  }),

  mounted () {
    this.post = Object.assign({}, this.defaultPost)
  },

  computed: {
    ...mapGetters(['categories'])
  },

  methods: {
    save () {
      this.$http.post('/posts', this.post)
        .then((response) => {
          this.$emit('closeCreateForm', response.data.data)
          Object.assign(this.post, this.defaultPost)
        })
    },

    saveImage (image) {
      this.$store.dispatch('uploadImage', image)
        .then(response => this.post.image = response.data)
    }
  }
}
</script>