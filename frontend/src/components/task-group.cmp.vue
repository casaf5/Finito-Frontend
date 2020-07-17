<template>
  <div class="task-group-container">
    <div class="task-group-title-container">
      <textarea class="task-group-title" v-model="taskGroup.title"></textarea>
      <i @click="show = !show" class="el-icon-more task-icon"></i>
      <task-group-actions @close="show = !show" v-show="show" />
    </div>
    <div class="task-container flex col">
      <Container
        group-name="taskGroup"
        @drop="(e) => onTaskDrop(taskGroup.id, e)"
        :get-child-payload="getTaskPayLoad(taskGroup.id)"
        drag-class="card-ghost"
        drop-class="card-ghost-drop"
        :drop-placeholder="dropPlaceholderOptions"
      >
        <Draggable v-for="task in taskGroup.tasks" :key="task.id">
          <task-preview :task="task" />
        </Draggable>
      </Container>
    </div>
    <add-task :inGroup="true" />
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";

import TaskPreview from "./task-preview.cmp";
import taskGroupActions from "./task-group-actions.cmp";
import AddTask from "./add-task.cmp";

export default {
  props: {
    taskGroup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true
      },
      show: false
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
    }
  },
  components: {
    Container,
    Draggable,
    TaskPreview,
    taskGroupActions,
    AddTask
  }
};
</script>

<style lang="scss">
.task-group-container {
  margin: 10px;
}
.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg);
}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}
</style>