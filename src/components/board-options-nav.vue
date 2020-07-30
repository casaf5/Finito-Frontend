<template>
  <section class="board-options flex space-between">
    <section class="left-side flex space-between">
      <input
        type="text"
        ref="boardName"
        placeholder="Board Name"
        v-model="board.name"
        @blur="updateName"
      />
      <section class="board-members flex">
        <i class="fas fa-users" @click="toggleAddMember"></i>
        <board-members-edit
          v-if="boardMembersOpen"
          @update="membersUpdate"
          @close="toggleAddMember"
        />
      </section>
    </section>

    <section class="right-side">
      <router-link class="nav-btn" tag="button" to="/board/dash/charts">
        <i class="el-icon-pie-chart"></i>
      </router-link>
      <button @click="toggleMenu">
        <i class="fas fa-clipboard-list"></i>
      </button>
      <button @click="toggleBgSelect">
        <i class="far fa-image"></i>
      </button>
      <button @click.self="isDemoLogin=!isDemoLogin">
        <i class="far fa-bell"></i>
      </button>
      <Avatar
        v-if="loggedUser"
        class="logged-user-status"
        :src="loggedUser.img"
        :username="loggedUser.username"
        :size="30"
      />
    
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
      menuIsOpen: false,
      bgSelectOpen: false,
      boardMembersOpen: false,
      style: { bgColor: "", bgUrl: "" },
      content: "",
    };
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    loggedUser(){
      return this.$store.getters.loggedUser
    }
   
  },
  mounted() {
    this.content = this.board.name;
  },
  methods: {
    updateName() {
      let board = this.board;
      board.name = this.$refs.boardName.value;
      this.$store.dispatch({ type: "saveBoard", board });
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
    setBoardBg(imageUrls) {
      let board = this.board;
      this.style.bgUrls = [imageUrls];
      this.style.previewUrl=imageUrls.small
      this.board.style = this.style;
      this.$store.dispatch({ type: "saveBoard", board });
      this.$store.commit({ type: "setStyle", style: this.style });
    },
    membersUpdate(members) {
      let board = this.board;
      board.members = members;
      this.$store.dispatch({ type: "saveBoard", board });
    },
  },
  components: {
    Avatar,
    boardActivity,
    boardBgSelect,
    boardMembersEdit,
  },
};
</script>
