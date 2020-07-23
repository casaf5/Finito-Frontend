<template>
  <section class="board-menu">
    <section class="menu-title">
      <i @click="$emit('close')" class="el-icon-close"></i>
      <h4>Menu</h4>
    </section>
    <hr />
    <section class="menu-section-container">
      <section class="menu-section activity">
        <h5 class="menu-section-title">
          <i class="fas fa-list"></i>Activity Log
        </h5>
        <section class="activity-container">
            <section class="activity-item " v-for="activity in board.activities" :key="activity.createdAt">
                <Avatar :username="activity.byUser.userName" :size="35"/>
                <h5>{{activity.txt}}</h5>
                <h4>{{activity.createdAt|relativeTime}}</h4>
              </section> 
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
export default {
  name: "board-menu",
  data() {
    return {
      menuClose: false,
    };
  },
  computed: {
    board(){
      return this.$store.getters.board
    }
  },
  methods: {},
  components:{
    Avatar,
  }
};
</script>

<style></style>
