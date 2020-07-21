<template>
  <div class="task-group">
    <div class="task-group-title-container">
      <input
        type="text"
        class="task-group-title"
        v-model="taskGroup.title"
        ref="titleInputArea"
        @click="selectTitle"
        @blur="updateTitle"
      />
      <transition name="fade">
        <i v-if="taskGroup.isWatched" class="fas fa-eye task-icon"></i>
      </transition>
      <i @click="show = !show" class="el-icon-more task-icon"></i>
      <task-group-actions
        @watchList="watchList"
        @moveToDifferentBoard="moveToDifferentBoard"
        @createCard="toggleAddTask = !toggleAddTask"
        @duplicateList="duplicateList"
        @sortBy="sortBy"
        @close="show = !show"
        v-show="show"
      />
    </div>
    <div class="task-container flex col">
      <Container
        group-name="taskGroup"
        @drop="(e) => onTaskDrop(taskGroup.id, e)"
        :get-child-payload="getTaskPayLoad(taskGroup.id)"
        drag-class="task-ghost"
        drop-class="task-ghost-drop"
        :drop-placeholder="dropPlaceholderOptions"
      >
        <Draggable v-for="task in taskGroup.tasks" :key="task.id">
          <task-preview :task="task" @taskClicked="taskClicked" />
        </Draggable>
      </Container>
    </div>
    <add-task
      :show="toggleAddTask"
      @toggleEdit="toggleAddTask = $event"
      @addTask="addTask"
      :inGroup="true"
    />
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { utilService } from "../utils/utils.js";
import TaskPreview from "./task-preview.cmp";
import taskGroupActions from "./task-group-actions.cmp";
import TaskActionContainer from "./task-action-container.cmp";
import AddTask from "./add-task.cmp";

export default {
  props: {
    taskGroup: {
      type: Object,
      required: true,
    },
  },
  created() {},
  data() {
    return {
      show: false,
      toggleAddTask: false,
      toggleMoveList: false,
      dropPlaceholderOptions: {
        className: "task-drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
    };
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    boards() {
      return this.$store.getters.boards;
    },
  },
  methods: {
    selectTitle() {
      const titleInputArea = this.$refs.titleInputArea;
      titleInputArea.select();
      titleInputArea.classList.add("edit");
    },
    updateTitle() {
      const board = utilService.deepCopy(this.board);
      const duplicatedList = utilService.deepCopy(this.taskGroup);
      const taksGroupIndex = this.board.taskGroups.findIndex(
        (taskGroup) => taskGroup.id === this.taskGroup.id
      );
      board.taskGroups.splice(taksGroupIndex, 1, duplicatedList);
      this.$store.dispatch({ type: "saveBoard", board });
      this.$refs.titleInputArea.classList.remove("edit");
    },
    taskClicked(task) {
      this.$emit("taskClicked", task);
    },
    onTaskDrop(taskGroupId, dropResult) {
      this.$emit("taskDrop", taskGroupId, dropResult);
    },
    getTaskPayLoad(taskGroupId) {
      return (index) => {
        return this.taskGroup.tasks[index];
      };
    },
    addTask(taskContent) {
      const task = utilService.getEmptyTask(this.taskGroup.id);
      task.title = taskContent;

      const board = utilService.deepCopy(this.board);

      const taskGroupIndex = this.$store.getters.getTaskGroupByIndex(
        this.taskGroup.id
      );

      board.taskGroups[taskGroupIndex].tasks.push(task);
      this.$store.dispatch({ type: "saveBoard", board });
    },
    duplicateList() {
      const board = utilService.deepCopy(this.board);
      const duplicatedList = utilService.deepCopy(this.taskGroup);
      const newListId = utilService.getRandomId();

      duplicatedList.id = newListId;

      duplicatedList.tasks.forEach((task) => {
        task.parentListId = newListId;
        task.id = utilService.getRandomId();
      });

      const taksGroupIndex = this.board.taskGroups.findIndex(
        (taskGroup) => taskGroup.id === this.taskGroup.id
      );

      board.taskGroups.splice(taksGroupIndex + 1, 0, duplicatedList);
      this.$store.dispatch({ type: "saveBoard", board });
    },
    moveToDifferentBoard(index) {
      const taksGroupIndex = this.board.taskGroups.findIndex(
        (taskGroup) => taskGroup.id === this.taskGroup.id
      );
      const board = utilService.deepCopy(this.board);
      const taskGroupToMove = utilService.deepCopy(this.taskGroup);
      board.taskGroups.splice(taksGroupIndex, 1);
      this.boards[index].taskGroups.push(taskGroupToMove);
    },
    watchList() {
      this.taskGroup.isWatched = !this.taskGroup.isWatched;
    },
    sortBy(order) {
      let sortedTasks = [];
      if (order !== "alphabet") {
        sortedTasks = this.taskGroup.tasks.sort((taskA, taskB) => {
          return order === "newest"
            ? taskA.createdAt - taskB.createdAt
            : taskB.createdAt - taskA.createdAt;
        });
      } else {
        sortedTasks = this.taskGroup.tasks.sort((taskA, taskB) => {
          var titleA = taskA.title.toUpperCase(); // ignore upper and lowercase
          var titleB = taskB.title.toUpperCase(); // ignore upper and lowercase
          if (titleA < titleB) return -1
          if (titleA > titleB) return 1;
          return 0;
        });
      }
      this.taskGroup.tasks = sortedTasks;
      const board = utilService.deepCopy(this.board);
      const taskGroupIndex = this.$store.getters.getTaskGroupByIndex(
        this.taskGroup.id
      );
      board.taskGroups[taskGroupIndex] = this.taskGroup;
      this.$store.dispatch({ type: "saveBoard", board });
    },
  },
  components: {
    Container,
    Draggable,
    TaskPreview,
    taskGroupActions,
    TaskActionContainer,
    AddTask,
  },
};
</script>
