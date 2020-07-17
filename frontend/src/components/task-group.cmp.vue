<template>
  <div class="task-group">
    <div class="task-group-title-container">
      <textarea class="task-group-title" v-model="taskGroup.title"></textarea>
      <i @click="show = !show" class="el-icon-more task-icon"></i>
      <task-group-actions @close="show = !show" v-show="show" />
    </div>
    <div class="task-container flex col">
<<<<<<< HEAD
          <Container
            group-name="taskGroup"
            @drop="(e) => onTaskDrop(taskGroup.id,e)"
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
    <div class="add-task-container">
      <div class="add-task-left-content">
        <i class="el-icon-plus task-icon"></i>
        <span type="text">Add another card</span>
      </div>
      <i class="el-icon-full-screen task-icon"></i>
=======
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
>>>>>>> 47f096a9d158e5aad6f136c1e7c50ff7727ebb63
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
  created(){
    console.log("this.taskGroup",this.taskGroup)
  },
  data() {
    return {
       dropPlaceholderOptions: {
        className: 'task-drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      show: false
    };
  },
  methods:{
     onTaskDrop (taskGroupId,dropResult) {
       this.$emit('taskDrop',taskGroupId, dropResult)
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

<<<<<<< HEAD
=======
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
>>>>>>> 47f096a9d158e5aad6f136c1e7c50ff7727ebb63
