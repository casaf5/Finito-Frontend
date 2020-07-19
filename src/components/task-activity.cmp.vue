<template>
  <section>
    <div class="task-activities">
      <div class="task-activties-header flex row space-between">
          <h4>
            <i class="fas fa-hdd"></i> Activity
          </h4>
          <button @click="toggleBtn">{{btnTxt}}</button>
      </div>
      <div v-if="showList" class="task-activities-list">
        <ul>
          <li v-for="(activity,idx) in activities" :key="idx">
            <div class="flex align-center details-activity-avatar-text-wraper">
              <avatar class="activity-avatar" v-if="activity.byUser.url" :src="activity.byUser.url"></avatar>
              <avatar class="activity-avatar" v-else :username="activity.byUser.name"></avatar>
              <div class="details-activity-text">{{activity.txt}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
export default {
  name: "task-activity",
  props: ["activities"],
  data() {
    return {
      btnTxt: "Hide Details",
      showList: true
    };
  },
  created() {

  },
  methods: {
    toggleBtn() {
      if (this.btnTxt === "Hide Details") {
        this.btnTxt = "Show Details";
        this.showList = false;
      } else {this.btnTxt = "Hide Details";
      this.showList = true;
    }
    }
  },
  components: {
    Avatar
  }
};
</script>

