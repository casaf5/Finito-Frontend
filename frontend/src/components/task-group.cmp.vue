<template>
  <div class="task-group-container">
    <div class="task-group-title-container">
      <h3 class="task-group-title">{{taskGroup.title}}</h3>
      <span>...</span>
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
    <div class="add-task-container">
      <span>+</span>
      <input type="text" />
      <span>icon</span>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";

import TaskPreview from "./task-preview.cmp";
export default {
  props: {
    taskGroup: {
      type: Object,
      required: true
    }
  },
  created(){
console.log('created',this.taskGroup)
  },
  data() {
    return {
       dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
    };
  },
  methods:{
     onTaskDrop (taskGroupId, dropResult) {
       this.$emit('taskDrop',taskGroupId, dropResult)
    
    },
     getTaskPayLoad (taskGroupId) {
      return index => {
        return this.taskGroup.tasks[index]
      }
    }
  },
  components: {
    TaskPreview,
    Container, 
    Draggable
  }
};
</script>

<style lang="scss">
.task-group-container{
  margin:10px;
}
.card-ghost {
    transition: transform 0.18s ease;
    transform: rotateZ(5deg)
}

.card-ghost-drop {
    transition: transform 0.18s ease-in-out;
    transform: rotateZ(0deg)
}
</style>