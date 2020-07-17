<template>
  <div>
<<<<<<< HEAD
    <div class="board-details" v-if="board">
      <Container
        @drop="onDrop"
        drag-handle-selector=".task-group-title"
        :drop-placeholder="upperDropPlaceholderOptions"
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
=======
    <div style="padding:10px;display:flex" class="simple-page">
      <Container @drop="onDrop" drag-handle-selector=".task-group-title" orientation="horizontal">
        <Draggable v-for="taskGroup in board.taskGroups" :key="taskGroup.id">
          <task-group :taskGroup="taskGroup" @taskDrop="onTaskDrop" />
>>>>>>> 47f096a9d158e5aad6f136c1e7c50ff7727ebb63
        </Draggable>
      </Container>
      <add-task />
      <task-label />
      <!-- <task-calendar /> -->
    </div>
  </div>
</template>
 
<script>

import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "../utils/helpers.js";
import taskGroup from "../components/task-group.cmp.vue";
import taskPreview from "../components/task-preview.cmp.vue";
import AddTask from "../components/add-task.cmp";
import TaskLabel from "../components/taks-label.cmp";
import TaskCalendar from "../components/task-calander.cmp";

export default {
  name: "Simple",
  components: {
    Container,
    Draggable,
    taskGroup,
    taskPreview,
    AddTask,
    TaskLabel,
    TaskCalendar
  },

  data() {
    return {
      board: null,
      upperDropPlaceholderOptions: {
        className: "taskGroup-drop-preview",
        animationDuration: "150",
        showOnTop: true
      }
    };
  },
 async created(){
    let id="1E3E-1735BF480CA-26A5" // IN REAL APP WILL COME FROM PARAMS
    this.board=await this.$store.dispatch({type:"getBoardById",id})
  },
  methods: {
    onDrop(dropResult) {
      this.board.taskGroups = applyDrag(this.board.taskGroups, dropResult);
      this.$store.dispatch({type:"saveBoard",board:this.board})

    },
    onTaskDrop(taskGroupId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        console.log('this.board status:',this.board)
        const board =Object.assign({}, this.board)
        const taskGroup = board.taskGroups.filter(taskG => taskG.id === taskGroupId)[0];
        const taskGroupIndex = board.taskGroups.indexOf(taskGroup);
        const newTaskGroup =Object.assign({}, taskGroup)
        newTaskGroup.tasks = applyDrag(newTaskGroup.tasks, dropResult);
        board.taskGroups.splice(taskGroupIndex, 1, newTaskGroup);
        this.$store.dispatch({type:"saveBoard",board})
        this.board=board
      }
    },
    async getBoard(){
    let board= await this.$store.getters.board
    this.board=board
    }
  },
  components: { 
    Container, 
    Draggable, 
    taskGroup },
};
</script>

