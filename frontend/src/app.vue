<template>
  <div id="app">
    <app-header />
    <board-details />
    <router-view />
  </div>
</template>


<script>
import appHeader from "./components/app-header.cmp.vue";
import boardDetails from "./views/board-details.vue";
// import boardDetails from './views/board-details-full.vue'
export default {
  name: "main-app",
  components: {
    appHeader,
    boardDetails,
  }
};

// <board-details>
//   <task-group v-for="">
//    <task-preview v-for="">
//    <button>+</bitton>


</script>

