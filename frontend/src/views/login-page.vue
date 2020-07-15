<template>
  <div class="login-cmp main-layout">
    <form
      @submit.prevent="login"
      class="login-form flex col"
    >
      <h1>Sign In</h1>
      <input
        ref="userNameInput"
        id="username"
        type="text"
        placeholder="Username"
        v-model="credentials.username"
        required
      >
      <input
        id="password"
        type="password"
        placeholder="Password"
        v-model="credentials.password"
        required
      >
      <h3 v-if="failedLogin">Invaild Username/Password</h3>
      <button class="login-btn">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "login-cmp",
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      failedLogin: false
    };
  },
  created() {
    if (this.$store.getters.loggedUser) {
      console.log(this.$store.getters.loggedUser);
      this.$router.push("/");
    }
  },
  methods: {
    async login() {
      const user = await this.$store.dispatch({
        type: "login",
        credentials: { ...this.credentials }
      });
      if (user) this.$router.push("/");
      else {
        this.failedLogin = true;
      }
    }
  },
  mounted() {
    this.$refs.userNameInput.focus();
  }
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>