<template>
  <task-action-container title="Search Members">
    <form-input :showLabel="true" labelText="search for members" v-model="search" type="text" />
    <div>
      <div class="members-container" v-if="search.length">
        <div v-if="filterdMembers.length">
          <h3>{{boardMembersText}}</h3>
          <member :member="member" :key="member.id" v-for="member in filterdMembers" />
        </div>
        <div v-else>
          <span>No members found please confirm that the person your'e looking for is a part of this board</span>
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
  components: {
    TaskActionContainer,
    FormInput,
    Member
  },
  data() {
    return {
      search: "",
      members: [
        {
          id: 1,
          name: "Tomer Zuker",
          url:
            "https://scontent.foko1-1.fna.fbcdn.net/v/t1.0-9/84061552_1388471077991414_2755554337399767040_o.jpg?_nc_cat=108&_nc_sid=19026a&_nc_ohc=8KnoLSBmvgMAX9iwnQj&_nc_ht=scontent.foko1-1.fna&oh=a3562e310113e776d2a798232d2068a3&oe=5F380EC2"
        },
        { id: 2, name: "Ayal Magid", url: "img" },
        { id: 3, name: "Asaf Cochen", url: "img" }
      ]
    };
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
  }
};
</script>

<style lang="scss" >
.members-container {
}
</style>