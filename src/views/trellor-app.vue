<template>
  <div class="trellor-app">
    <board-details />
  </div>
</template>

<script>
import { eventBus, SHOW_MSG } from "../services/event-bus-service.js";
import boardDetails from "./board-details.vue";

export default {
  name: "trellor-app",
  data() {
    return {};
  },
  async created() {
    const boards = await this.$store.dispatch({ type: "loadBoards" });
    const users = await this.$store.dispatch({ type: "loadUsers" });
  },
  components: {
    boardDetails,
  },
};
</script>
