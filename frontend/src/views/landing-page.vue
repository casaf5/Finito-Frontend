<template>
  <div class="landing-page">
    <add-task />
    <task-label />
    <task-calendar />
  </div>
</template>

<script>
import AddTask from "../components/add-task.cmp";
import TaskLabel from "../components/taks-label.cmp";
import TaskCalendar from "../components/task-calander.cmp";

export default {
  name: "Landing-page",
  components: {
    AddTask,
    TaskLabel,
    TaskCalendar
  }
};
</script>

<style>
</style>