<template>
  <div class="trellor-app main-layout">
    <h1>Board</h1>
    <!-- only here for testing -->
    <!-- <task-details :task="task" :taskGroup="taskGroup"/> -->
    <!--  -->
    <board-details />
  </div>
</template>
 
<script>
import { eventBus, SHOW_MSG } from "../services/event-bus-service.js";
import boardDetails from "./board-details.vue";

// //////// only here for testing
import taskDetails from "@/components/task-details.cmp.vue";
// ////////////////

export default {
  name: "trellor-app",
  // //////// only here for testing
  data() {
    return {
<<<<<<< HEAD
      task:{
        id:'et404',
        name:'finish trello',
        activities: [{txt:'Ayal joined the room'}],
        checkLists: [{
                "title":"Ayal",
                "items":[
                  {id:"111", name:"finish logics"},{id:"222", name:"finish css"},{id:"333", name:"get better"}
                  ]
              }]
      },
      taskGroup:{
        tasks:[""],
        name:'test-list'
=======
      task: {
        id: "a101",
        name: "finish trello",
        activities: [{ txt: "Ayal joined the room" }]
      },
      taskGroup: {
        name: "test-list"
>>>>>>> 0afbf7a7bf9e7ef10bf1f3b127198442bccbaead
      }
    };
  },
  async created() {
    const boards = await this.$store.dispatch({ type: "loadBoards" });
    console.log('trellor created boards res:', boards)
  },
  components: {
    taskDetails,
    boardDetails
  }
};
</script>


