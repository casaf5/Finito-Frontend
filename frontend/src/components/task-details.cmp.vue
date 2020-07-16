<template>
    <section>
     <div class="task-details">
        <h2 class="task-name">{{ task.name }} </h2>
        <h3 class="group-name">{{ task.name }} </h3>
        <div class="members-labels-wraper">
           <div class="members-container"></div> 
           <div class="labels-container"></div> 
        </div>
        <!-- <activity-list :activitiesToShow="activitiesToShow"></activity-list> -->
    </div>
    </section>
</template>

<script>
export default {
  name: "task-details",
  props: ['task'],
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
    },

    // getting an action and what has been changed (name/date etc..) => using switch case to get the write txt
    getTxtToRndr (action, changedTo) {
        // switch case
    }
  },
  created() {
    this.loadActivities();
    }
}
</script>
