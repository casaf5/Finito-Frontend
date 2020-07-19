<template>
  <div class="board-preview" @click="moveToBoard">
    {{board.name}}
  </div>
</template>

<script>
export default {
  props: ["board"],
  created() {
    console.log("preview:", this.board);
  },
  methods:{
      moveToBoard(){
          this.$router.push(`/board/${this.board._id}`)
      }

  }
};
</script>

<style>
</style>