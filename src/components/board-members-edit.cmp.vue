<template>
  <section class="board-members-edit">
    <task-action-container title="Add Members" @close="closeMembers">
      <form-input
        type="text"
        placeholder="Search Members"
        :debounceInput="true"
        @input="searchUsers"
      />
      <section class="members-container">
        <section
          v-for="user in filteredUsers"
          :key="user.userName"
          class="member"
        >
          <Avatar :username="user.userName" :size="25" />
          <h4 @click="toggleUser(user)">{{ user.userName }}</h4>
          <i v-if="isInBoard(user)" class="el-icon-check v-member"></i>
        </section>
      </section>
    </task-action-container>
  </section>
</template>

<script>
import taskActionContainer from "./task-action-container.cmp";
import formInput from "../components/From Elements/form-input.cmp";
import Avatar from "vue-avatar";
export default {
  name: "board-members-edit",
  components: {
    taskActionContainer,
    formInput,
    Avatar,
  },
  data() {
    return {
      filteredUsers: null,
      users: null,
    };
  },
  computed: {
    currMembers() {
      let board = this.$store.getters.board;
      return board.members;
    },
  },
  async created() {
    this.users = await this.$store.dispatch({ type: "loadUsers" });
  },
  methods: {
    setSearchValue(text) {
      this.searchText = text;
    },
    searchUsers(text) {
      console.log(text);
      this.filteredUsers = this.users.filter((user) => {
        if (user.userName.toLowerCase().includes(text.toLowerCase())) {
          return user;
        }
      });
    },
    isInBoard(user) {
      return this.currMembers.find((m) => m._id === user._id);
    },
    toggleUser(user) {
      let currMembers = JSON.parse(JSON.stringify(this.currMembers));
      if (this.isInBoard(user)) {
        const idx = currMembers.findIndex((u) => u._id === user._id);
        currMembers.splice(idx, 1);
      } else {
        currMembers.push(user);
      }
      this.$emit("update", currMembers);
    },
    closeMembers() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
