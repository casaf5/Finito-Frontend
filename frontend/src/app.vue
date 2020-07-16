<template>
  <div id="app">
     <app-header/>
  <router-view/>
  </div>
</template>


<script>
import appHeader from "./components/app-header.cmp.vue";
export default {
  name: "main-app",
  components: {
    appHeader,
  },
};

// <board-details>
//   <task-group v-for="">
//    <task-preview v-for="">
//    <button>+</bitton>


</script>

