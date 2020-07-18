<template>
  <div class="landing-page">
    <task-label />

    <!-- <add-task / >-->
    <!-- <task-calendar />-->
    <!-- <TaskCheckList /> -->
    <!-- <task-members /> -->
  </div>
</template>

<script>
import AddTask from "../components/add-task.cmp";
import TaskLabel from "../components/taks-label.cmp";
import TaskCalendar from "../components/task-calander.cmp";
import TaskCheckList from "../components/task-checklist.cmp";
import TaskMembers from "../components/task-members.cmp";
export default {
  name: "Landing-page",
  components: {
    AddTask,
    TaskLabel,
    TaskCalendar,
    TaskCheckList,
    TaskMembers
  }
};
</script>

<style>
</style>