<template>
  <v-layout wrap class="justify-center">
    <v-flex xs12 sm8 md4>
      <v-form @submit.prevent="onLogin()">
        <v-card class="elevation-4 mt-5 mx-2">
          <v-toolbar>
            <v-toolbar-title>Sign In</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-model="email"
              label="E-mail"
              class="mx-3 mt-4"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              class="mx-3"
              type="password"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="mb-4 mt-1 mx-4 white--text"
              type="submit"
              depressed
            >
              Sign In
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: ''
  }),

  mounted () {
    this.$nextTick(this.$refs.email.focus)
  },

  methods: {
    onLogin () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then(() => this.$router.push('/my-posts'))
        .catch((error) => console.log(error))
    }
  }
}
</script>

