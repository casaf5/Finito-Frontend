<template>
  <header
    :style="navbarBgStyle.navBar.navbarBgColor"
    v-if="$route.path != '/'"
    class="app-header"
  >
    <section class="navbar-container">
      <div class="navbar-left-side">
        <router-link tag="span" to="/">Finito</router-link>
        <router-link tag="div" to="/home">
          <i class="fas fa-home header-item home-icon"></i>
        </router-link>
      </div>
      <nav>
        <ul class="navbar clean-list">
          <li class="searchbar-container">
            <input type="text" placeholder="Search.." />
            <i class="fas fa-search search-icon"></i>
          </li>
          <router-link
            :style="navbarBgStyle.navBar.buttonColors"
            class="nav-btn"
            tag="li"
            to="/board/dash/charts"
            >Dashboard</router-link
          >
          <!-- <router-link
            :style="navbarBgStyle.navBar.buttonColors"
            class="nav-btn"
            tag="li"
            to="/logout"
          >Logout</router-link> -->
          <router-link
            :style="navbarBgStyle.navBar.buttonColors"
            class="nav-btn"
            tag="li"
            to="/Login"
            >Login</router-link
          >
          <router-link
            :style="navbarBgStyle.navBar.buttonColors"
            class="nav-btn"
            tag="li"
            to="/signup"
            >Sign Up</router-link
          >
          <!-- <button class="logout-btn" @click="logout" v-show="loggedUser" >Log Out</button> -->
          <i class="far fa-bell header-item notification-icon"></i>
          <Avatar username="Guest" :size="35" />
        </ul>
      </nav>
    </section>
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

  computed: {
    navbarBgStyle() {
      if (!this.$route.fullPath.includes("/board")) {
        return {
          navBar: {
            navbarBgColor: "background-color:#3498db",
            buttonColors: "background-color:#fff;color:#333",
          },
        };
      }
      if (this.$route.fullPath.includes("/board")) {
        return {
          navBar: {
            navbarBgColor: "background-color:#0006",
            buttonColors: "background-color:#2383c4;color:#fff",
          },
        };
      }
    },
    buttonColor() {},
  },
};
</script>
