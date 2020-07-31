<template>
  <header
    :style="navbarBgStyle.navBar.navbarBgColor"
    v-if="$route.path != '/' && $route.path != '/login'"
    class="app-header"
  >
    <section class="navbar-container">
      <div class="navbar-left-side">
        <router-link tag="span" to="/">Finito</router-link>
        <router-link tag="div" to="/home">
          <i class="fas fa-home header-item home-icon"></i>
        </router-link>
        <li class="searchbar-container">
          <input type="text" placeholder="Search..." />
          <i class="fas fa-search search-icon"></i>
        </li>
      </div>
      <nav>
        <ul class="navbar clean-list">
          <button
            v-if="$route.path === '/board/dash/charts'"
            class="nav-btn dash-back-btn"
            tag="li"
            to="/board"
            @click="backToBoard"
          >Board</button>
          <router-link class="nav-btn" tag="li" to="/login" v-if="isGuest">Login</router-link>
          <router-link class="nav-btn" tag="li" to="/signup" v-if="isGuest">Sign Up</router-link>
          <button class="nav-btn dash-back-btn" @click="logout" v-if="!isGuest">Log Out</button>
        </ul>
      </nav>
    </section>
  </header>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  name: "app-header",
  data() {
    return {
      textSearch: "",
      searchResults: [],
    };
  },
  components: {
    Avatar,
  },

  computed: {
    navbarBgStyle() {
      if (this.$route.name === "Finito-app") {
        return {
          navBar: {
            navbarBgColor: "background-color:#0006",
            buttonColors: "background-color:transparent;color:#fff",
          },
        };
      } else if (this.$route.name === "dash") {
        return {
          navBar: {
            navbarBgColor: "background-color:#f8cb62",
            buttonColors: "background-color:transparent;color:#fff",
          },
        };
      } else
        return {
          navBar: {
            navbarBgColor: "background-color:#3498db",
            buttonColors: "background-color:#fff;color:#333",
          },
        };
    },
    loggedUser() {
      return this.$store.getters.loggedUser;
    },
    isGuest() {
      return this.loggedUser.username === "Guest";
    },
  },
  methods: {
    searchRefs() {
      let tasksRefs = this.$store.getters.tasksRefs;
      tasksRefs.forEach((ref) => ref.el.classList.remove("yellow"));
      if (!this.textSearch) return;
      this.searchResults = [];
      tasksRefs.map((ref) => {
        if (ref.name.includes(this.textSearch)) {
          ref.el.classList.add("yellow");
        }
      });
    },
    backToBoard() {
      this.$router.go(-1);
    },
    logout() {
      this.$store.dispatch({ type: "logout" });
    },
  },
};
</script>
