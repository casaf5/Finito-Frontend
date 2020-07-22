<template>
  <div id="app" class="main-layout app-bg" :style="checkForBacground">
      <app-header />
      <router-view />
  </div>
</template>

<script>
import appHeader from "./components/app-header.cmp.vue";
export default {
  name: "main-app",
  computed:{
    board(){
      return this.$store.getters.board
    },
    checkForBacground(){
      if(this.board.style.bgUrl) return `background-image:url("${this.board.style.bgUrl}");`
      return `background-color:"${this.board.style.bgUrl}";`
    }
  },
  components: {
    appHeader
  },
};
</script>

