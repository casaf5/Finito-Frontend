<template>
  <div>
    <div class="simple-page">
      <Container
        @drop="onDrop"
        drag-handle-selector=".task-group-title"
        orientation="horizontal"
      >
        <Draggable
          v-for="taskGroup in board.taskGroups"
          :key="taskGroup.id"
        >
          <task-group
            :taskGroup="taskGroup"
            @taskDrop="onTaskDrop"
          />
        </Draggable>
      </Container>
    </div>
  </div>
</template>
 
<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "../utils/helpers.js";
import taskGroup from "../components/task-group.cmp.vue";
import taskPreview from "../components/task-preview.cmp.vue";

export default {
  name: "Simple",
  components: { Container, Draggable, taskGroup, taskPreview },
  methods: {},
  data() {
    return {
      board: {
        taskGroups: [
        {
          id: "tg3434",
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
              id: "t5050",
              title: "Finish working on UX",
              desc: "UX needs to get finished by Sunday",
              dueDate: new Date(),
              watchMembers: []
            }
          ]
        }
      ],
      },

      upperDropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true
      }
    };
  },
  methods: {
    onDrop(dropResult) {
      this.board.taskGroups = applyDrag(this.board.taskGroups, dropResult);
      console.log("taskGroups now", this.taskGroups);
    },
    onTaskDrop(taskGroupId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const board = Object.assign({}, this.board);
        const taskGroup = board.taskGroups.filter(
          taskG => taskG.id === taskGroupId
        )[0];
        const taskGroupIndex = board.taskGroups.indexOf(taskGroup);
        const newTaskGroup = Object.assign({}, taskGroup);
        newTaskGroup.tasks = applyDrag(newTaskGroup.tasks, dropResult);
        board.taskGroups.splice(taskGroupIndex, 1, newTaskGroup);
        this.board = board;
      }
    }
  }
};
</script>


<style lang="scss">
</style>
