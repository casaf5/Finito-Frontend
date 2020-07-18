<template>
  <div class="task-groups-container">
    <task-group :taskGroup="taskGroup" :key="taskGroup.id" v-for="taskGroup in taskGroups" />
  </div>
</template>

<script>
import taskGroup from "./task-group.cmp";
export default {
  data() {
    return {
      taskGroups: [
        {
          id: "tg101",
          title: "In Progress",
          position: 0,
          tasks: [
            {
              id: "t101",
              title: "Finish working on UI",
              desc: "UI needs to get finished by Sunday",
              dueDate: new Date(),
              watchMembers: []
            },
            {
              id: "t102",
              title: "CHECK",
              desc: "UI needs to get finished by Sunday",
              dueDate: new Date(),
              watchMembers: []
            },
            {
              id: "t103",
              title: "check2",
              desc: "UI needs to get finished by Sunday",
              dueDate: new Date(),
              watchMembers: []
            }
          ]
        },
        {
          id: "tg102",
          title: "Almost done",
          position: 1,
          tasks: [
            {
              id: "t102",
              title: "Finish working on UX",
              desc: "UX needs to get finished by Sunday",
              dueDate: new Date(),
              watchMembers: []
            }
          ]
        }
      ]
    };
  },
  components: {
    taskGroup
  }
};
</script>

<style>
</style>