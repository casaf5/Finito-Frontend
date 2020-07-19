<template>
  <div>
    <task-action-container @back="back" @close="close" :showIcon="showIcon" :title="title">
      <component
        @duplicateList="duplicateList"
        @createCard="createCard"
        @compToRender="toggleCompoent"
        :is="componentToRender"
      />
    </task-action-container>
  </div>
</template>

<script>
import TaskActionContainer from "./task-action-container.cmp";
import ListOfActions from "./task actions/list-of-actions";
import MoveList from "./task actions/move-list.cmp";
import SortBy from "./task actions/sort-by.cmp";
export default {
  data() {
    return {
      componentToRender: "list-of-actions",
      title: "List of Actions",
      showIcon: false
    };
  },
  components: {
    TaskActionContainer,
    ListOfActions,
    MoveList,
    SortBy
  },
  methods: {
    resetComponent() {
      this.componentToRender = "list-of-actions";
      this.showIcon = false;
      this.title = "List of Actions";
    },

    close() {
      this.$emit("close");
      this.resetComponent();
    },
    toggleCompoent(componentToRender) {
      this.componentToRender = componentToRender.name;
      this.title = componentToRender.title;
      this.showIcon = componentToRender.showIcon;
    },
    back() {
      this.resetComponent();
    },
    createCard() {
      this.$emit("createCard");
      this.$emit("close");
    },
    duplicateList() {
      this.$emit("duplicateList");
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>