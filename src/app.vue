<template>
  <div id="app" class="main-layout app-bg">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import appHeader from "./components/app-header.cmp.vue";
export default {
  name: "main-app",
  computed: {
    style() {
      return this.$store.getters.style;
    }
    //:style="checkForBacground"
    // checkForBacground() {
    //   if (this.style.bgUrl)
    //     return `background-image:url("${this.style.bgUrl}");`;
    //   return `background-color:"${this.style.bgColor}";`;
    // },
  },

  components: {
    appHeader
  }
};
</script>
