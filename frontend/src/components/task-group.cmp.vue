<template>
  <div class="task-group">
    <div class="task-group-title-container">
      <textarea class="task-group-title" v-model="taskGroup.title"></textarea>
      <i @click="show = !show" class="el-icon-more task-icon"></i>
      <task-group-actions
        @createCard="toggleAddTask = !toggleAddTask"
        @duplicateList="duplicateList"
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
          <task-preview :task="task" />
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
      required: true
    }
  },
  created() {},
  data() {
    return {
      dropPlaceholderOptions: {
        className: "task-drop-preview",
        animationDuration: "150",
        showOnTop: true
      },
      show: false,
      toggleAddTask: false,
      toggleMoveList: false
    };
  },
  methods: {
    onTaskDrop(taskGroupId, dropResult) {
      this.$emit("taskDrop", taskGroupId, dropResult);
    },
    getTaskPayLoad(taskGroupId) {
      return index => {
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

      duplicatedList.tasks.forEach(task => {
        task.parentListId = newListId;
        task.id = utilService.getRandomId();
      });

      const taksGroupIndex = this.board.taskGroups.findIndex(
        taskGroup => taskGroup.id === this.taskGroup.id
      );

      board.taskGroups.splice(taksGroupIndex + 1, 0, duplicatedList);
      this.$store.dispatch({ type: "saveBoard", board });
    },
    moveList() {
      const board = utilService.deepCopy(this.board);
    }
  },
  computed: {
    board() {
      return this.$store.getters.board;
    }
  },
  components: {
    Container,
    Draggable,
    TaskPreview,
    taskGroupActions,
    TaskActionContainer,
    AddTask
  }
};
</script>
