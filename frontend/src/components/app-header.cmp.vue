<template>
  <header class="app-header">
    <user-msg/>
    <nav>
      <section class="links flex clean-list">
        <router-link tag="li" to="/">Boards</router-link>
        <router-link tag="li" to="/about">About</router-link>
        <router-link tag="li" to="/cmps-check">CMPS CHECK</router-link>
        <router-link tag="li" to="/dash">Dashboard</router-link>
        <router-link tag="li" to="/login">Login</router-link>
        <!-- <router-link tag="li" to="/signup" v-show="!loggedUser" >Sign Up</router-link> -->
        <!-- <button class="logout-btn" @click="logout" v-show="loggedUser" >Log Out</button> -->
      </section>
    </nav>
  </header>
</template>

<script>

import {eventBus,SHOW_MSG} from '../services/event-bus-service.js'
import userMsg from './user-msg.cmp.vue'

export default {
  name: "app-header",
  computed: {
   
  },
  methods: {
   
  },
  components: {
    userMsg,
  }
};
</script>

