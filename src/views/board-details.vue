<template>
  <div>
    <div class="board-details" v-if="board">
      <task-details v-if="taskToEdit" :taskToEdit="taskToEdit" @closeModal="closeTaskModal" />
      <Container
        @drop="onDrop"
        drag-handle-selector=".task-group-title"
        :drop-placeholder="upperDropPlaceholderOptions"
        orientation="horizontal"
      >
        <Draggable v-for="taskGroup in board.taskGroups" :key="taskGroup.id">
          <task-group :taskGroup="taskGroup" @taskDrop="onTaskDrop" @taskClicked="openTaskModal" />
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "../utils/utils.js";
import taskDetails from "@/components/task-details.cmp.vue";
import taskGroup from "../components/task-group.cmp.vue";
import socketService from "../services/socket-service";

export default {
  name: "board-details",
  components: {
    Container,
    Draggable,
    taskGroup,
    taskDetails
  },
  data() {
    return {
      taskToEdit: null,
      upperDropPlaceholderOptions: {
        className: "taskGroup-drop-preview",
        animationDuration: "150",
        showOnTop: true
      }
    };
  },
  async created() {
    let id = this.$route.params.id;
    await this.$store.dispatch({ type: "getBoardById", id });
    console.log(this.board)
    socketService.setup();
    socketService.emit("joinedBoard", this.board._id);
  },
  computed: {
    board() {
      return this.$store.getters.board;
    }
  },
  methods: {
    onDrop(dropResult) {
      this.board.taskGroups = applyDrag(this.board.taskGroups, dropResult);
      this.getAndSetBoard(this.board);
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

        newTaskGroup.tasks.forEach(task => {
          task.parentListId = newTaskGroup.id;
        });
        board.taskGroups.splice(taskGroupIndex, 1, newTaskGroup);
        this.getAndSetBoard(board);
      }
    },
    openTaskModal(task) {
      this.taskToEdit = task;
    },
    closeTaskModal() {
      this.taskToEdit = null;
    },
    getAndSetBoard(board) {
      socketService.emit("boardUpdate", board);
      socketService.on("boardUpdate", board => {
        this.$store.commit({ type: "setBoard", board });
      });
    },
    destroyed() {
      SocketService.terminate();
    }
  }
};
</script>

<style scoped></style>
