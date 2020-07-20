<template>
  <div>
    <div class="board-details" v-if="board">
      <task-details
        v-if="taskToEdit"
        :taskToEdit="taskToEdit"
        @closeModal="closeTaskModal"
      />
      <Container
        @drop="onDrop"
        drag-handle-selector=".task-group-title"
        :drop-placeholder="upperDropPlaceholderOptions"
        orientation="horizontal"
      >
        <Draggable v-for="taskGroup in board.taskGroups" :key="taskGroup.id">
          <task-group
            :taskGroup="taskGroup"
            @taskDrop="onTaskDrop"
            @taskClicked="openTaskModal"
          />
        </Draggable>
        <add-task :inGroup="false"/>
      </Container>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "../utils/utils.js";
import taskDetails from "@/components/task-details.cmp.vue";
import taskGroup from "../components/task-group.cmp.vue";
import addTask from "../components/add-task.cmp.vue";

export default {
  name: "board-details",
  components: {
    addTask,
    Container,
    Draggable,
    taskGroup,
    taskDetails,
  },
  data() {
    return {
      taskToEdit: null,
      upperDropPlaceholderOptions: {
        className: "taskGroup-drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
    };
  },
  async created() {
    let id = this.$route.params.id;
    await this.$store.dispatch({ type: "getBoardById", id });
  },
  methods: {
    onDrop(dropResult) {
      this.board.taskGroups = applyDrag(this.board.taskGroups, dropResult);
      this.$store.dispatch({ type: "saveBoard", board: this.board });
    },
    async onTaskDrop(taskGroupId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const board = Object.assign({}, this.board);
        const taskGroup = board.taskGroups.filter(
          (taskG) => taskG.id === taskGroupId
        )[0];
        const taskGroupIndex = board.taskGroups.indexOf(taskGroup);
        const newTaskGroup = Object.assign({}, taskGroup);
        newTaskGroup.tasks = applyDrag(newTaskGroup.tasks, dropResult);

        newTaskGroup.tasks.forEach((task) => {
          task.parentListId = newTaskGroup.id;
        });
        board.taskGroups.splice(taskGroupIndex, 1, newTaskGroup);
        await this.$store.dispatch({ type: "saveBoard", board });
      }
    },
    openTaskModal(task) {
      this.taskToEdit = task;
    },
    closeTaskModal() {
      this.taskToEdit = null;
    },
  },

  components: {
    Container,
    Draggable,
    taskGroup,
    taskDetails,
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
};
</script>

<style scoped></style>
