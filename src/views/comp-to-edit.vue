<template>
  <div style="position:relative">
    <!-- <TaskLabel />
    <Select /> -->
    <!-- <CheckList /> -->
    <!-- <Calender /> -->
    <!-- <Members /> -->
    <task-attach/>
  </div>
</template>

<script>
import TaskLabel from "../components/task label/taks-label.cmp";
import CheckList from "../components/task-checklist.cmp.vue";
import Calender from "../components/task-calander.cmp";
import Members from "../components/task-members.cmp";
import Select from "../components/From Elements/form-select.cmp";
import taskAttach from "../components/task-attachment.cmp"

export default {
  components: {
    TaskLabel,
    CheckList,
    Calender,
    Members,
    taskAttach,
  },
};
</script>

<style></style>
