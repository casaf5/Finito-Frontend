<template>
  <section class="login-cmp">
    <nav>
      <ul class="clean-list">
        <router-link tag="li" to="/home">
          <a class="login-nav-link">Home</a>
        </router-link>
      </ul>
    </nav>
    <div class="login-header-container">
      <h1>{{ introductionText }}</h1>
    </div>
    <form @submit.prevent="authUser" class="login-form">
      <h3>{{ welcomeMessage }}</h3>
      <div class="inputs-container">
        <form-input v-if="!isLogin" labelText="email" v-model="email" :showLabel="true" />
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
      <button class="login-btn">{{ buttonText }}</button>
      <p @click="isLogin = !isLogin">{{ authMessage }}</p>
    </form>
  </section>
</template>

<script>
import formInput from "../components/FormElements/form-input.cmp";
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
        console.log("logged:", this.$store.getters.loggedUser);
      } else {
        //Register user
        credentials.email = this.email;
        credentials.confirmPassword = this.confirmPassword;
      }
    },
  },
  created() {
    if (this.$store.getters.loggedUser.username !== "Guest") {
      this.$router.push("/home");
    }
    // if (this.$store.getters.loggedUser) {
    //   console.log(this.$store.getters.loggedUser);
    //   this.$router.push("/home");
    // }
    this.isLogin = this.$route.params.isLogin;
  },
  components: {
    formInput,
  },
  computed: {
    introductionText() {
      return this.isLogin
        ? "Ready to continue owning your tasks?"
        : "Make your future more productive";
    },
    welcomeMessage() {
      return this.isLogin
        ? "Welcome back, we've missed you"
        : "Nice to meet you,welcome to Finito";
    },
    authMessage() {
      return this.isLogin ? "Not registered yet?" : "Already Have an account?";
    },
    buttonText() {
      return this.isLogin ? "Log in" : "Create an account";
    },
  },
};
</script>
