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
        id:'et404',
        name:'finish trello',
        activities: [{txt:'Ayal joined the room'}],
        checkLists: [{
                "id":"f13",
                "name":"Ayal",
                "items":[
                  {id:"111", name:"finish logics"},{id:"222", name:"finish css"},{id:"333", name:"get better"}
                  ]
              }]
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


