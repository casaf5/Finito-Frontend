<template>
  <task-action-container @close="close" :title="'List Actions'">
    <li @click="createdCard">Add Card...</li>
    <li>Copy List...</li>
    <li>Move List...</li>
    <li>Watch</li>
    <hr />
    <li>Move All Cards in this List...</li>
    <li>Archive All Cards in this List...</li>
    <hr />
    <li>Archive This List</li>
  </task-action-container>
</template>

<script>
import TaskActionContainer from "./task-action-container.cmp";
export default {
  components: {
    TaskActionContainer
  },
  methods: {
    close() {
      this.$emit("close");
    },
    createdCard() {
      this.$emit("createCard");
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>