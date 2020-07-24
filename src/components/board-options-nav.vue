<template>
  <section class="board-options flex space-between">
    <section class="left-side flex space-between">
      <input type="text" placeholder="Board Name" v-model="board.name" @blur="updateBoard" />
      <section class="board-members flex">
        <Avatar
          v-for="member in board.members"
          :key="member._id"
          :size="30"
          :username="member.userName"
        />
        <i class="fas fa-user-plus" @click="toggleAddMember"></i>
        <board-members-edit
          v-if="boardMembersOpen"
          @update="membersUpdate"
          @close="toggleAddMember"
        />
      </section>
      <router-link class="nav-btn" tag="li" to="/board/dash/charts">Dashboard</router-link>
    </section>

    <section class="right-side">
      <button @click.self="toggleMenu">Activity Log</button>
      <button @click.self="toggleBgSelect">Background</button>
      <board-bg-select
        class="bgSelector"
        v-if="bgSelectOpen"
        @close="toggleBgSelect"
        @imageChoosen="setBoardBg"
      />
    </section>
    <board-activity v-if="menuIsOpen" @close="toggleMenu" />
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import boardActivity from "../components/board-activity-menu.cmp";
import boardMembersEdit from "./board-members-edit.cmp";
import boardBgSelect from "./board-bg-select.cmp";
export default {
  name: "board-options-nav",
  data() {
    return {
      board: null,
      menuIsOpen: false,
      bgSelectOpen: false,
      boardMembersOpen: false,
      style: { bgColor: "", bgUrl: "" }
    };
  },
  created() {
    const board = this.$store.getters.board;
    this.board = JSON.parse(JSON.stringify(board));
  },
  methods: {
    updateBoard() {
      this.$store.dispatch({ type: "saveBoard", board: this.board });
    },
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },
    toggleBgSelect() {
      this.bgSelectOpen = !this.bgSelectOpen;
    },
    toggleAddMember() {
      this.boardMembersOpen = !this.boardMembersOpen;
    },
    setBoardBg(imgaeUrl) {
      this.style.bgUrl = imgaeUrl;
      this.board.style = this.style;
      this.$store.dispatch({ type: "saveBoard", board: this.board });
      this.$store.commit({ type: "setStyle", style: this.style });
    },
    membersUpdate(members) {
      this.board.members = members;
      this.updateBoard();
    }
  },
  components: {
    Avatar,
    boardActivity,
    boardBgSelect,
    boardMembersEdit
  }
};
</script>
