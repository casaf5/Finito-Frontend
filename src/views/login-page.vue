<template>
  <section class="login-cmp">
    <div class="login-header-container">
      <h1>Ready to continue owning your tasks?</h1>
    </div>
    <form @submit.prevent="login" class="login-form">
      <h3>Welcome back to Finito</h3>
      <div class="inputs-container">
        <form-input
          v-if="!isLogin"
          labelText="email"
          v-model="email"
          :showLabel="true"
        />
        <form-input labelText="username" v-model="username" :showLabel="true" />
        <form-input labelText="password" v-model="password" :showLabel="true" />
        <form-input
          v-if="!isLogin"
          labelText="Confrim Password"
          v-model="password"
          :showLabel="true"
        />
      </div>
      <!-- <img src="../assets/images/login.png" alt /> -->
      <button class="login-btn">Login</button>
      <p @click="isLogin = !isLogin">Already Have an account?</p>
    </form>
  </section>
</template>

<script>
import formInput from "../components/From Elements/form-input.cmp";
import {
  required,
  minValue,
  minLength,
  sameAs,
  email,
} from "vuelidate/lib/validators";
export default {
  name: "login-page",

  data() {
    return {
      isLogin: false,
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    };
  },
  methods: {
    async authUser() {
      const credentials = {
        username: this.username,
        password: this.password,
      };
      if (this.isLogin) {
        await this.$store.dispatch({
          type: "login",
          credentials: { ...credentials },
        });
      } else {
        //Register user
        credentials.email = this.email;
        credentials.confirmPassword = this.confirmPassword;
      }
    },
  },
  created() {
    if (this.$store.getters.loggedUser) {
      console.log(this.$store.getters.loggedUser);
      this.$router.push("/home");
    }
  },
  components: {
    formInput,
  },
};
</script>
