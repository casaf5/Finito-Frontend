<template>
  <div style="position:relative">
    <TaskLabel />
    <Select />
    <!-- <CheckList /> -->
    <!-- <Calender /> -->
    <!-- <Members /> -->
  </div>
</template>

<script>
import TaskLabel from "../components/task label/taks-label.cmp";
import CheckList from "../components/task-checklist.cmp.vue";
import Calender from "../components/task-calander.cmp";
import Members from "../components/task-members.cmp";
import Select from "../components/From Elements/form-select.cmp";
export default {
  components: {
    TaskLabel,
    CheckList,
    Calender,
    Members,
  },
};
</script>

<style></style>
