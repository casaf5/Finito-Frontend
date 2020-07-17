<template>
  <div>
    <div class="simple-page">
        <Container @drop="onDrop" drag-handle-selector=".task-group-title" orientation="horizontal">            
          <Draggable v-for="taskGroup in taskGroups" :key="taskGroup.id">
           <task-group :taskGroup="taskGroup" @taskDrop="onTaskDrop" @taskPayLoad="getTaskPayLoad"/>
          </Draggable>
        </Container>
    </div>
  </div>
</template>
 
<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "../utils/helpers.js";
import taskGroup from '../components/task-group.cmp.vue';
import taskPreview from '../components/task-preview.cmp.vue'

export default {
  name: "Simple",
  components: { Container, Draggable,taskGroup,taskPreview },
  methods:{
      
  },
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
        }
      ]
    };
  },
  methods: {  
    onDrop(dropResult) {
      this.taskGroups = applyDrag(this.taskGroups, dropResult);
      console.log('taskGroups now',this.taskGroups)
    },
    onTaskDrop (taskGroupId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const taskGroup = Object.assign({}, this.scene)
        const column = scene.children.filter(p => p.id === columnId)[0]
        const columnIndex = scene.children.indexOf(column)
        const newColumn = Object.assign({}, column)
        newColumn.children = applyDrag(newColumn.children, dropResult)
        scene.children.splice(columnIndex, 1, newColumn)
        this.scene = scene
      }
    },
    getTaskPayload (taskGroupId) {
      return index => {
        return this.scene.children.filter(p => p.id === taskGroupId)[0].children[index]
      }
    }
  }
};
</script>


<style lang="scss">

</style>