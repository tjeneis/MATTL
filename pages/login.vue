<template>
  <v-card
    class="pa-8 mx-auto"
    style="max-width: 500px"
  >
    <v-form @submit.prevent=" userLogin">
      <img
        class="mb-8"
        src="~assets/logo.svg"
        width="220"
      >
      <v-text-field
        id="password"
        v-model="login.username"
        :label="$t('username')"
        outlined
        rounded
        type="text"
      />
      <v-text-field
        id="password"
        v-model="login.password"
        :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
        :label="$t('password')"
        outlined
        rounded
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      />
      <div class="d-flex justify-end">
        <v-btn
          color="primary"
          depressed
          rounded
          type="submit"
          x-large
        >
          {{ $t('login') }}
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'Login',
  layout: 'login',
  data () {
    return {
      login: {
        username: undefined,
        password: undefined
      },
      showPassword: false
    }
  },
  methods: {
    userLogin () {
      this.$router.push('/')
      // try {
      //   const response = await this.$auth.loginWith('local', { data: this.login })
      //   console.log(response)
      // } catch (err) {
      //   console.log(err)
      // }
    }
  }
}
</script>
