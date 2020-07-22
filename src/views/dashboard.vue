<template>
  <section class="dashboard" v-if="board">
    <div class="charts-container flex col">
      <div class="linechart-container chart">
    <!--  make it tasks completion over time - how many completed each month-->
       <h2>Board Progress </h2>
       <!--  Tasks Completion Per Month since created by PREC%-->
        <line-chart :labels="monthsToShow" :data="completedTasksPerMonth" :options="options"/>
      </div>
    <div class="doughnut-barchart-wraper flex">
     <div class="doughnut-container chart">
      <h2>TaskGroup Popularity</h2>
        <doughnut-chart  :labels="taskGroupsTitles" :data="numOfTasksInGroup"/>
     </div>
      <div class="barchart-container chart">
    <!--  make it complete and incomlete tasks per member -->
       <h2>Members Progress</h2>
        <bar-chart :labels="boardMembersNames" :data="numOfTasksPerMember" :options="options"/>
      </div>
     </div>
   </div>
    {{completedTasksPerMonth}}
  </section>
</template>

<script>
// MAKE:
// tasks per board members

import doughnutChart from '@/components/doughnut-chart.vue'
import barChart from '@/components/bar-chart.cmp.vue'
import lineChart from '@/components/line-chart.cmp.vue'
export default {
  name: "dashboard",
    data () {
      return {
          options: {
          responsive: true,
          maintainAspectRatio: false,
           scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
          }
        }
      }
    },
    computed: {
    monthsToShow(){
      // make if full year since board started - always 12 months but should start from the right one
      return ['jan', 'feb', 'march', 'april', 'may']
    },  
    board() {
      return this.$store.getters.board;
    },
    // allTasks(){
    //   return this.board.taskGroups.reduce((acc, tg, idx) => {
    //     acc = acc.concat(tg.tasks)
    //     return acc
    //   },[])
    // },
    // goes threw the relevant months in the arr, and replace them with the number of tasks was completed during that month
    completedTasksPerMonth (){
      return this.monthsToShow.map (month => {
        return this.board.activities.reduce((acc,activity) => {
             // make sure the is a field when the activity was created and compare month "January" for example to the date inside
          if ((activity.action === "COMPLETED_TASK") && (month === activity.ceatedAt)) acc++         
          return acc
        }, 0)
      })
    },
    taskGroupsTitles(){
      return this.board.taskGroups.map(tg => tg.title)
    },
    numOfTasksInGroup() {
        return this.board.taskGroups.map(tGroup => tGroup.tasks.length)
    },
    boardMembersNames(){
        // change to userName (with mongo)
        return this.board.members.map(m => m.name)
    },
       // change to userName (with mongo)
    numOfTasksPerMember(){
        return this.boardMembersNames.map(memberName => {
            // num ot tasks in total
            return this.board.taskGroups.reduce((higherAcc, tg) => {
                return higherAcc += tg.tasks.reduce((acc, task) => {
                    task.members.forEach (m => {
                        if (m.name === memberName) {
                            acc ++; 
                        }
                    })
                   return acc
                }, 0) 
                return higherAcc
            },0)
        })
    },

  },
  components:{
      doughnutChart,
      barChart,
      lineChart
  }

};
</script>

