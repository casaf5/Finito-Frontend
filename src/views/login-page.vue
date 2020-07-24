<template>
  <section class="login-cmp">
    <div class="login-header-container">
      <h1>Ready to continue owning your tasks?</h1>
    </div>
    <form @submit.prevent="login" class="login-form">
      <h3>Welcome back to Finito</h3>
      <div class="inputs-container">
        <form-input labelText="username" v-model="credentials.username" :showLabel="true" />
        <form-input labelText="password" v-model="credentials.password" :showLabel="true" />
      </div>
      <!-- <img src="../assets/images/login.png" alt /> -->
      <button class="login-btn">Login</button>
      <router-link tag="p" to="/signup">Already Have an account?</router-link>
    </form>
  </section>
</template>

<script>
import formInput from "../components/From Elements/form-input.cmp";
export default {
  name: "login-page",
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      }
    };
  },
  created() {
    if (this.$store.getters.loggedUser) {
      console.log(this.$store.getters.loggedUser);
      this.$router.push("/home");
    }
  },
  methods: {
    login() {
      this.$store.dispatch({
        type: "login",
        credentials: { ...this.credentials }
      });
      this.$router.push("/");
    }
  },
  components: {
    formInput
  }
};
</script>

