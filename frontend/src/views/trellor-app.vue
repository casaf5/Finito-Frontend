<template>
  <div class="trellor-app main-layout">
    <h1>Board</h1>
    <board-details />
  </div>
</template>
 
<script>
import { eventBus, SHOW_MSG } from "../services/event-bus-service.js";
import boardDetails from "./board-details.vue";


export default {
  name: "trellor-app",
  data() {
    return {}
  },
  async created() {
    const boards = await this.$store.dispatch({ type: "loadBoards" });
    console.log('trellor created boards res:', boards)
  },
  components: {
    boardDetails
  }
};
</script>


