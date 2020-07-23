<template>
  <div :class="height" :style="background" class="board-preview" @click="moveToBoard">{{board.name}}</div>
</template>

<script>
export default {
  props: {
    board: {
      type: Object
    },
    isLink: {
      type: Boolean
    }
  },
  methods: {
    moveToBoard() {
      if (this.isLink) {
        this.$router.push(`/board/${this.board._id}`);
      }
    }
  },
  computed: {
    background() {
      if (this.board.style.bgUrl) {
        return `background-image:url("${this.board.style.bgUrl}");color:#fff`;
      } else {
        return `background-color:${this.board.style.bgColor};`;
      }
    },
    height() {
      if (this.isLink) {
        return "short";
      } else {
        return "full";
      }
    }
  }
};
</script>

<style>
</style>