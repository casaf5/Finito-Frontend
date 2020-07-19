<template>
  <task-action-container @close="closeComp" title="Search Members">
    <form-input :showLabel="true" labelText="search for members" v-model="search" type="text" />
    <div>
      <div class="members-container" v-if="search.length">
        <div v-if="filterdMembers.length">
          <h3>{{boardMembersText}}</h3>
          <member :member="member" :key="idx" v-for="(member,idx) in filterdMembers" />
        </div>
        <div v-else>
          <span>No members found please confirm that the person your'e looking for is a member of this board</span>
        </div>
      </div>
    </div>
    <button class="btn-primary large">Add</button>
  </task-action-container>
</template>

<script>
import TaskActionContainer from "./task-action-container.cmp";
import FormInput from "./From Elements/form-input.cmp";
import Member from "./UI Components/member";

export default {
props: ["members"],
  components: {
    TaskActionContainer,
    FormInput,
    Member
  },
  data() {
    return {
      search: "",
    };
  },
  created(){
  },
  computed: {
    filterdMembers() {
      const searchTerm = this.search.toLowerCase();
      return this.members.filter(member =>
        member.name.toLowerCase().includes(this.search)
      );
    },
    boardMembersText() {
      return this.filterdMembers.length > 1 ? "Board Members" : "Board Member";
    }
  },
  methods: {
    closeComp (){
      this.$emit ('closeMembersComp')
    }
  },
};
</script>

<style lang="scss" >
.members-container {
}
</style>