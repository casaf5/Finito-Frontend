<template>
    <section>
     <div class="task-details">
        <h2 class="task-name">{{ task.name }} </h2>
<<<<<<< HEAD
        <h3 class="group-name">{{group.name }} </h3>
        <div class="members-labels-wraper">
           <div class="members-container"></div> 
           <div class="labels-container"></div> 
        </div>
        <!-- <activity-list :activitiesToShow="activitiesToShow"></activity-list> -->
    </div>
=======
        <h3 class="task-group-name">{{ taskGroup.name }} </h3>
        <div class="task-members-labels-wraper">
           <div class="task-members-container">members</div> 
           <div class="task-labels-container">labels</div> 
        </div>
        <div class="task-desc">
          <!-- <task-desc/> -->
        </div>
        <!-- <div class="task-checklists">
          <ul>
            <li v-for="checklist in board.checklists" :key="checklist.id">
              <checklist-preview :checklist="checklist"/>
            </li>
          </ul>
        </div> -->
      <ul class="task-activities">
        <li v-for="activity in activitiesToShow" :key="activity.id">
          {{activity.txt}}
        </li>
      </ul> 
        <!-- make it ul list after -->
        <!-- <div class="task-activities">
            <p>{{activitiesToShow}}</p>
        </div> -->
      </div>
>>>>>>> task-details
    </section>
</template>

<script>
export default {
  name: "task-details",
<<<<<<< HEAD
  props: ['task', 'group'],
  data() {
    return {
        activityToAdd = {
            'byUser':{
                name:loggedInUser.name,
                img:loggedInUser.url
            },
            'toTask':{
                id:task.id,
                name:task.name
            },
        }
    };
  },
  computed: {
    activitiesToShow() {
      let activities = this.$store.getters.activities;
      return activities.filter(activity => activity.toTask.id === task.id)
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
    methods: {
      loadActivities() {
      this.$store.dispatch({ type: "loadActivities"})
    },
    async remove(id) {
      this.$store.dispatch({ type: "removeTask", id });
      addActivity('TASK_REMOVED')
    //   await eventBus.$emit(SHOW_MSG, {
    //       txt: "Task removed successfully!",
    //       type: "danger"
    //     });
      },

    // adding activity to store
    async addActivity(action, changedTo='') {
      this.activityToAdd.action = action
      const txt = getTxtToRndr (action, changedTo)
      this.activityToAdd.txt = txt
      const activity = await this.$store.dispatch({ type: "addActivity", activity: this.activityToAdd});
      const type = (activity) ? 'success' : 'error'
      const txt = (activity) ? `${this.activityToAdd.action} successfully!` : `${this.activityToAdd.action} faild...`
      eventBus.$emit(SHOW_MSG, {txt, type});
      this.activityToAdd = {
         'byUser':{name:this.loggedInUser.name, img:this.loggedInUser.url},
         'toTask': {id:this.task.id, name:this.task.name},
        };
      this.loadActivities();
=======
  props: ['taskGroup','task'],
  data() {
    return {
        user : null,
        activityToAdd : {
            'edditedTask':{
                id:this.task.id,
                name:this.task.name
            },
        },
        boardToEdit : null
        // for testing only
        // boardToEdit: {activities:[]}
    };
  },
  computed: {
    board () {
      return this.$store.getters.board
    },
    activitiesToShow() {
      let activities = this.$store.getters.activities;
      return activities.filter(activity => activity.edditedTask.id === task.id)
    },
  },
    methods: {

      removeTask(id) {
      this.boardToEdit.findIndex((t) => t.id === id);
      this.boardToEdit.splice(idx, 1);
      addActivity('TASK_REMOVED')
      },

    // adding activity to store
    // async  
    addActivity(action, changedTo='') {
      this.activityToAdd.action = action
      this.activityToAdd.byUser = this.user
      const txt = getTxtToRndr (action, changedTo)
      this.activityToAdd.txt = txt
      this.boardToEdit.activities.unshift(this.activityToAdd)
      // const updatedboard = await this.$store.dispatch({ type:"saveBoard", board: this.boardToEdit});
      // const type = (updatedboard) ? 'success' : 'error'
      // const msg = (updatedboard) ? `${this.activityToAdd.action} successfully!` : `${this.activityToAdd.action} faild...`
      // eventBus.$emit(SHOW_MSG, {msg, type});
>>>>>>> task-details
    },

    // getting an action and what has been changed (name/date etc..) => using switch case to get the write txt
    getTxtToRndr (action, changedTo) {
        // switch case
<<<<<<< HEAD
    }
  },
  created() {
    this.loadActivities();
    }
}
=======
        return `${action} happend`
    }
  },
  created (){
    this.$store.dispatch({ type:"loadBoards"});
    this.$store.commit({type: 'setBoard', id:"b101"});
    this.user = (this.$store.getters.loggedUser)? this.$store.getters.loggedUser : {name:'Guest', url:'guestimg'}
    this.boardToEdit = JSON.parse(JSON.stringify(board))
  }
}
  // {
  //   "id": "a102",
  //   "byUser":"miniUser"
  //   "action":"CARD_DELETE"
  //   "card":"miniCard"
  //   "at":1122
    
  // },
>>>>>>> task-details
</script>
