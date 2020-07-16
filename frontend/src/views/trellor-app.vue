<template>
  <div class="trellor-app main-layout" >
  <h1>Board</h1>
  <!-- only here for testing -->
  <task-details :task="task" :taskGroup="taskGroup"/>
  <!--  -->
  </div>
</template>

<script>

import {eventBus,SHOW_MSG} from '../services/event-bus-service.js'
import appHeader from '../components/app-header.cmp.vue'
// //////// only here for testing
import taskDetails from '@/components/task-details.cmp.vue'
// ////////////////
export default {
  name: "trellor-app",
  // //////// only here for testing
  data () {
    return {
      task:{
        id:'a101',
        name:'finish trello',
        activities: [{txt:'Ayal joined the room'}]
      },
      taskGroup:{
        name:'test-list'
      }
    }
  },
    components :{
    taskDetails
  }
  // ////////////////
};
</script>


