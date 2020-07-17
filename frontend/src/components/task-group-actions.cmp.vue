<template>
  <task-action-container @close="$emit('close')" :title="'List Actions'">
    <li>Add Card...</li>
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
  }
};
</script>

<style lang="scss" scoped>
</style>