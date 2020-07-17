<template>
  <div>
    <div>
      <Container orientation="horizontal" class="task-groups-container" @drop="onDrop">
        <Draggable v-for="taskGroup in taskGroups" :key="taskGroup.id">
          <task-group :taskGroup="taskGroup" />
        </Draggable>
      </Container>
    </div>
  </div>
</template>
 
<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "../utils/helpers.js";
import taskGroup from "../components/task-group.cmp.vue";
export default {
  name: "Simple",
  components: { Container, Draggable, taskGroup },
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
        },
        {
          id: "tg103",
          title: "Almost done",
          position: 1,
          tasks: []
        }
      ]
    };
  },
  methods: {
    onDrop(dropResult) {
      this.taskGroups = applyDrag(this.taskGroups, dropResult);
    }
  }
};
</script>