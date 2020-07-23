<template>
  <div class="login-cmp ">
    <form @submit.prevent="login" class="login-form flex col">
      <h1>Sign In</h1>
    <input id="username" type="text" placeholder="Username" v-model="credentials.username">
    <input id="password" type="password" placeholder="Password" v-model="credentials.password">
    <button class="login-btn">Login</button>
    </form>
  </div>
</template>

<script>

  export default {
    name:"login-cmp",
    data () {
      return {
        credentials: {
          username:'',
          password:'',
        }
      }
    },
    created(){
    if(this.$store.getters.loggedUser) {
      console.log(this.$store.getters.loggedUser)
    this.$router.push('/home')
    }
    },
  methods:{
    login(){
      this.$store.dispatch({type:"login",credentials:{...this.credentials}})
      this.$router.push('/')
    }
  },
  }
</script>

