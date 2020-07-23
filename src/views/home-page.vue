<template>
  <section class="home-page">
    <div class="recent-boards-container">
      <h4 class="catagory-label">
        <i class="fas fa-chalkboard"></i>
        Your Boards
      </h4>
      <div class="recent-boards">
        <board-preview v-for="board in boards" :board="board" :key="board._id" />
        <div @click="showModal= !showModal" class="board-preview flex create-board">Create New Board</div>
      </div>
    </div>
    <modal @close="showModal= !showModal" v-if="showModal">
      <div class="create-board-container">
        <form-input :showLabel="true" labelText="Create Board" />
        <button class="btn-primary">Create</button>
      </div>
    </modal>
    <!-- <div class="new-board-container">
      <h4 class="catagory-label">
        <i class="fas fa-plus-circle"></i> Create New Board
      </h4>
      <div class="new-board-details">
    <form-input v-model="newBoard.name" :showLabel="true" labelText="Board Name"></form-input>-->
    <!-- <h3>Members:</h3> -->
    <!-- <el-select
          v-model="newBoard.members"
          filterable
          multiple
          size="large"
          style="margin-left: 20px;"
          placeholder="Select"
        >
          <el-option
            v-for="member in users"
            :key="member._id"
            :label="member.userName"
            :value="member._id"
          ></el-option>
    </el-select>-->
    <!-- </div>
      <button class="btn-primary" @click="addNewBoard">Create</button>
    </div>-->
    <div class="board-templates-container">
      <h4 class="catagory-label">
        <i class="fas fa-photo-video"></i> Templates
      </h4>
      <div class="board-templates">
        <board-template :template="template" :key="index" v-for="(template,index) in templates" />
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from "../services/board-service.js";
import boardPreview from "../components/board-preview.cmp.vue";
import boardTemplate from "../components/UI Components/template";
import formInput from "../components/From Elements/form-input.cmp";
import modal from "../components/UI Components/modal";
export default {
  name: "home-page",
  components: {
    boardPreview,
    boardTemplate,
    formInput,
    modal
  },
  data() {
    return {
      boards: null,
      users: null,
      showModal: true,
      templates: [
        {
          name: "Project Managment",
          img:
            "http://www.financetodayusa.com/wp-content/uploads/2020/03/istock-844535646.jpg",
          desc:
            "All of the Lists you need to work on your project right in one place right for you"
        },
        {
          name: "Marketing",
          img:
            "https://www.selected.co.il/wp-content/uploads/2019/06/inner1.jpg",
          desc:
            "From Digital marketing to traditonial marketing,everything list is ready for you to use and start increasing your revenues"
        },
        {
          name: "Engineering",
          img:
            "https://www.nbn.org.il/wp-content/uploads/2014/01/engineering_mechanical_3042380_cropped.jpg",
          desc:
            "List are premade to save you the effort on making them. Go and start coding!"
        },

        ,
        {
          name: "Education",
          img:
            "https://tcmagazine.info/wp-content/uploads/2019/03/Online-Education.jpg",
          desc: "All you need for your eductation task magagment is right here "
        },
        {
          name: "Design",
          img:
            "https://blog.intercomassets.com/blog/wp-content/uploads/2018/05/Design-leadership-as-a-subversive-activity-.png",
          desc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, tenetur"
        },
        {
          name: "Buisness",
          img:
            "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Falejandrocremades%2Ffiles%2F2018%2F07%2Fdesk-3139127_1920-1200x773.jpg",
          desc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, tenetur"
        },
        {
          name: "Design",
          img:
            "https://blog.intercomassets.com/blog/wp-content/uploads/2018/05/Design-leadership-as-a-subversive-activity-.png",
          desc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, tenetur"
        },
        {
          name: "Buisness",
          img:
            "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Falejandrocremades%2Ffiles%2F2018%2F07%2Fdesk-3139127_1920-1200x773.jpg",
          desc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, tenetur"
        }
      ],
      newBoard: {
        name: "",
        members: []
      }
    };
  },
  async created() {
    this.boards = await this.$store.dispatch({ type: "loadBoards" });
    this.users = await this.$store.dispatch({ type: "loadUsers" });
  },
  methods: {
    async addNewBoard() {
      let createdBoard = boardService.getEmptyBoard();
      createdBoard.name = this.newBoard.name;
      createdBoard.members = this.newBoard.members.map(member =>
        this.users.find(user => user._id === member)
      );
      createdBoard = await this.$store.dispatch({
        type: "saveBoard",
        board: createdBoard
      });
      this.$router.push(`/board/${createdBoard._id}`);
    }
  }
};
</script>

<style lang="scss">
</style>
