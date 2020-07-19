<template>
  <div class="home-page">
    <section class="recent-boards flex wrap">
      <h4><i class="far fa-clock"></i> Your Recent Boards</h4>
      <board-preview
        v-for="board in boards"
        :board="board"
        :key="board._id"
      />
    </section>
    <section class="board-temp">
      <h4><i class="fas fa-photo-video"></i> Templates</h4>
    </section>
    <section class="new-board">
      <h4><i class="fas fa-plus-circle"></i> Create New Board</h4>
    </section>
  </div>
</template>

<script>
import boardPreview from "../components/board-preview.cmp.vue";
export default {
  name: "home-page",
  components: {
    boardPreview
  },
  data() {
    return {
      boards: null
    };
  },
  async created() {
    const boards = await this.$store.dispatch({ type: "loadBoards" });
    this.boards = boards;
  }
};
</script>
