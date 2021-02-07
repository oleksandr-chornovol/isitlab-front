<template>
  <v-layout wrap class="justify-center">
    <v-flex xs12 sm8 md4>
      <v-form @submit.prevent="onSignup()">
        <v-card class="elevation-4 mt-5">
          <v-toolbar>
            <v-toolbar-title>Sign Up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
                v-model="name"
                label="Name"
                class="mx-3 mt-4"
            ></v-text-field>
            <v-text-field
                v-model="email"
                email
                label="E-mail"
                class="mx-3"
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Password"
                class="mx-3"
                type="password"
            ></v-text-field>
            <v-text-field
                v-model="password_confirmation"
                label="Confirm Password"
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
              Sign Up
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
    name: '',
    password: '',
    password_confirmation: ''
  }),

  mounted () {
    this.$nextTick(this.$refs.name.focus)
  },

  methods: {
    onSignup () {
      if (this.password !== this.password_confirmation) return

      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      })
        .then(() => this.$router.push('/my-posts'))
        .catch((error) => console.log(error))
    }
  }
}
</script>