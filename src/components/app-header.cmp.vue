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
          <input type="text" placeholder="Search.." />
          <i class="fas fa-search search-icon"></i>
        </li>
      </div>
      <nav>
        <ul class="navbar clean-list">
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
          <i
            class="far fa-bell header-item notification-icon notification-bell"
          ></i>
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
            buttonColors: "background-color:#2383c4;color:#fff",
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
  },
  methods: {
    searchRefs() {
      let tasksRefs = this.$store.getters.tasksRefs;
      tasksRefs.forEach(ref=>ref.el.classList.remove('yellow'))
      if(!this.textSearch)return 
      this.searchResults = [];
      tasksRefs.map((ref) => {
        if (ref.name.includes(this.textSearch)) {
          ref.el.classList.add('yellow');
        }
      });
      console.log(this.searchResults);
    },
  },
  mounted() {},
};
</script>
