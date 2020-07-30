<template>
  <task-actions-container @close="$emit('close')" :fullSize="true" title="menu">
    <div
      @click="$emit('changeComp', 'sidebar-background-menu')"
      class="sidebar-menu-container"
    >
      <img src="../../assets/images/color-icon.svg" alt />
      <span>Change Background</span>
    </div>
    <div class="sidebar-menu-container">
      <i class="el-icon-pie-chart"></i>
      <router-link to="/board/dash/charts" tag="span"
        >Board Activity</router-link
      >
    </div>
    <div @click="$emit('removeBoard')" class="sidebar-menu-container">
      <i class="el-icon-delete"></i>
      <span>Remove Board</span>
    </div>
    <div class="sidebar-menu-container">
      <i class="fas fa-list"></i>
      <span>Board Statistics</span>
    </div>
    <activity :activities="board.activities" />
  </task-actions-container>
</template>

<script>
import taskActionsContainer from "../task-action-container.cmp";
import activity from "../UIComponents/activity";
export default {
  components: {
    taskActionsContainer,
    activity,
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-menu-container {
  padding: 5px;
  display: flex;
  align-items: center;
  > img,
  i {
    margin-right: 10px;
  }
  img {
    width: 16px;
  }
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: rgba(9, 30, 66, 0.13);
  }
}
</style>
