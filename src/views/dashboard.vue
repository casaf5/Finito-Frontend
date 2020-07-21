<template>
  <section>
    <doughnut-chart clas="chart" v-if="board" class="chart" :labels="taskGroupsTitles" :data="numOfTasksInGroup"/>
    <!-- <bar-chart v-if="board" class="chart" :labels="toysYears" :data="toysAmountByYears"/> -->
  </section>
</template>

<script>
// MAKE:
// tasks per board members
// tasks progers per list
import doughnutChart from '@/components/doughnut-chart.vue'
// import barChart from '@/components/bar-chart.vue'
export default {
  name: "dashboard",
    computed: {
    board() {
      return this.$store.getters.board;
    },
    taskGroupsTitles(){
      return this.board.taskGroups.map(tg => tg.title)
    },
    numOfTasksInGroup() {
        return this.board.taskGroups.map(tGroup => tGroup.tasks.length)
    },

  },
  components:{
      doughnutChart,
    //   barChart
  }

};
</script>


<style scoped>
.chart{
  max-width: 300px;
  /* display: inline-block; */
}
</style>



