<template>
  <div style="position:relative">
    <!-- <TaskLabel /> -->

    <!-- <transition-group name="list-complete" tag="p">
      <span
        class="list-complete-item"
        :key="index"
        v-for="(date,index) in sortedDates"
      >{{date.title}}</span>
    </transition-group>-->
    <!-- <transition-group name="flip-list" tag="ul">
      <li :key="index" v-for="(date, index) in sortedDates">
        {{ date.title }}
      </li>
    </transition-group>

    <transition-group name="list-complete" tag="il">
      <span
        class="list-complete-item"
        :key="index"
        v-for="(date, index) in sortedDates"
        >{{ date.title }}</span
      >
    </transition-group>-->
    <!-- <button @click="sort">Sort</button> -->

    <!-- <CheckList /> -->
    <!-- <Members /> -->
    <task-attach />
    <task-cover />
  </div>
</template>

<script>
import TaskLabel from "../components/task label/taks-label.cmp";
import CheckList from "../components/task-checklist.cmp.vue";
import Members from "../components/task-members.cmp";
import Select from "../components/From Elements/form-select.cmp";
import taskAttach from "../components/task-attachment.cmp";
import TaskCover from "../components/task-cover.cmp";
import formSelect from "../components/From Elements/form-select.cmp";
export default {
  data() {
    return {
      dateObjects: [
        {
          title: "one",
          createdAt: new Date("07-01-2020")
        },
        {
          title: "most receent",
          createdAt: new Date("07-20-2020")
        },
        {
          title: "oldest",
          createdAt: new Date("06-20-2020")
        }
      ]
    };
  },
  methods: {
    sort() {
      this.dateObjects = this.dateObjects.sort(
        (dateA, dateB) => dateB.createdAt - dateA.createdAt
      );
    }
  },
  computed: {
    sortedDates() {
      return this.dateObjects;
    }
  },
  components: {
    TaskLabel,
    CheckList,
    Members,
    taskAttach,
    formSelect,
    TaskCover
  }
};
</script>

<style>
.list-complete-item {
  transition: all 1s;
  margin-right: 10px;
  display: block;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translatex(30px);
}
.list-complete-leave-active {
  position: absolute;
}
.flip-list-move {
  transition: transform 1s;
}
</style>
