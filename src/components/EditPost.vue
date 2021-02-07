<template>
  <v-card>
    <v-card-title class="headline justify-center">Edit Post</v-card-title>
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
    imgFile: {},
  }),
  props: {
    post: {
      type: Object
    }
  },

  mounted () {
    this.imgFile = new File([], this.post.image.substring(this.post.image.lastIndexOf('/') + 1))
  },
  computed: {
    ...mapGetters(['categories']),
  },

  methods: {
    save () {
      this.$http.put(`/posts/${this.post.id}`, this.post)
        .then(() => {
          this.$emit('closeEditForm')
        })
    },

    saveImage (image) {
      this.$store.dispatch('uploadImage', image)
        .then(response => this.post.image = response.data)
    }
  }
}
</script>