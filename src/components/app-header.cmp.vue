<template>
  <header class="app-header">
    <nav>
      <section
        class="links flex space-between clean-list"
        v-if="$route.path != '/'">
        <section class="flex left-side">
          <router-link tag="li" to="/home"
            ><i class="fas fa-home header-item home-icon"></i
          ></router-link>
          <input type="text" placeholder="Search.." />
          <i class="fas fa-search search-icon"></i>
        </section>
        <section class="logo">
          <span>Finito</span>
        </section>
        <section class="flex right-side">
          <router-link tag="li" to="/dash" class="header-item"
            >Dashboard</router-link
          >
          <!-- <router-link tag="li" to="/login" class="header-item">Login</router-link> -->
          <router-link tag="li" to="/logout" class="header-item"
            >Logout</router-link
          >
          <i class="far fa-bell header-item notification-icon"></i>
          <Avatar username="Guest" :size="40" />
        </section>
        <!-- <router-link tag="li" to="/signup" v-show="!loggedUser" >Sign Up</router-link> -->
        <!-- <button class="logout-btn" @click="logout" v-show="loggedUser" >Log Out</button> -->
      </section>
    </nav>
  </header>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  name: "app-header",
  computed: {},
  methods: {},
  components: {
    Avatar,
  },
};
</script>
