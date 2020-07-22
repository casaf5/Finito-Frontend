<template>
  <section class="board-options flex space-between">
    <section class="left-side flex space-between">
      <input
        type="text"
        placeholder="Board Name"
        v-model="board.name"
        @blur="updateBoard"
      />
      <section class="board-members flex">
        <Avatar
          v-for="member in board.members"
          :key="member._id"
          :size="30"
          :username="member.userName"
        />
        <i class="fas fa-user-plus" @click="addMember"></i>
      </section>
    </section>
    <section class="right-side">
      <button @click.self="toggleMenu">Show Menu</button>
    </section>
    <board-menu v-if="menuIsOpen" @close="toggleMenu" />
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import boardMenu from "../components/board-menu.cmp";
export default {
  name: "board-options-nav",
  data() {
    return {
      board: null,
      menuIsOpen: false,
    };
  },
  created() {
    this.board = this.$store.getters.board;
    console.log("board", this.board);
  },
  methods: {
    updateBoard() {
      this.$store.dispatch({ type: "saveBoard", board: this.board });
    },
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },
    addMember(){

    }
  },
  components: {
    Avatar,
    boardMenu,
  },
};
</script>
