<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-card-title
        @click="$router.push('/')"
        style="cursor: pointer"
      >Blog</v-card-title>
      <v-spacer></v-spacer>
      <div v-show="!currentUser.id">
        <v-btn to="/login" color="primary">
          <span class="mr-2">Log in</span>
        </v-btn>
        <v-btn to="/signup" color="primary">
          <span class="mr-2">Sign up</span>
        </v-btn>
      </div>
      <div v-show="currentUser.id" style="display: flex">
        <v-card-title
          @click="$router.push('/my-posts')"
          style="cursor: pointer"
        >{{ currentUser.name }}</v-card-title>
        <v-btn
          @click="logout"
          style="margin: auto"
          color="primary"
        >
          <span class="mr-2">Log out</span>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  mounted () {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('loadUser')
    }
    this.$store.dispatch('loadCategories')
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
