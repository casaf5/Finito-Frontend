<template>
  <task-action-container title="Change Due Date">
    <calendar></calendar>
    <select>
      <option value>1 Day before</option>
      <option value>2 Day before</option>
      <option value>In an hour</option>
      <option value>In a week</option>
      <option value>In a month</option>
    </select>
    <button>Save</button>
    <button>Remove</button>
  </task-action-container>
</template>

<script>
import TaskActionContainer from "./task-action-container.cmp";
import { Calendar } from "element-ui";

export default {
  components: {
    TaskActionContainer,
    Calendar
  }
};
</script>

<style lang="scss" >
</style>