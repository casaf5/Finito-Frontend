<template>
  <div :style="background" class="board-preview" @click="moveToBoard">{{board.name}}</div>
</template>

<script>
export default {
  props: ["board"],
  methods: {
    moveToBoard() {
      this.$router.push(`/board/${this.board._id}`);
    }
  },
  computed: {
    background() {
      if (this.board.style.bgUrl) {
        return `background-image:url("${this.board.style.bgUrl}");color:#fff`;
      } else {
        return `background-color:${this.board.style.bgColor};`;
      }
    }
  }
};
</script>

<style>
</style>