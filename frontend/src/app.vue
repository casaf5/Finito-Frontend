<template>
  <div id="app">
    <app-header />
    <Board />
    <router-view />
  </div>
</template>


<script>
import appHeader from "./components/app-header.cmp.vue";
import Board from "./components/borad-cmp.vue";
export default {
  name: "main-app",
  components: {
    appHeader,
    Board
  }
};
</script>