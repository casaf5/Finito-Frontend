<template>
  <div class="home-page">
    <section class="recent-boards flex wrap">
      <h4><i class="far fa-clock"></i> Your Recent Boards</h4>
      <board-preview v-for="board in boards" :board="board" :key="board._id" />
    </section>
    <section class="board-temp">
      <h4><i class="fas fa-photo-video"></i> Templates</h4>
      <el-carousel :interval="2500" type="card" height="280px">
        <el-carousel-item v-for="item in templates" :key="item.name">
          <!-- <h3 class="medium">{{ item.name }}</h3> -->
          <img style="height:100%;" :src="item.img"/>
        </el-carousel-item>
      </el-carousel>
    </section>
    <section class="new-board">
      <h4><i class="fas fa-plus-circle"></i> Create New Board</h4>
      <section class="new-board-details">
         <h3> Name:</h3>
          <input
            id="board-name"
            type="text"
            placeholder="Board Name"
            v-model="newBoard.name"
          />
          <h3>Members:</h3>
          <el-select
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
            >
            </el-option>
          </el-select>
      </section>
      <button @click="addNewBoard" class="create-btn">Create</button>
    </section>
  </div>
</template>

<script>
import { boardService } from "../services/board-service.js";
import boardPreview from "../components/board-preview.cmp.vue";
export default {
  name: "home-page",
  components: {
    boardPreview,
  },
  data() {
    return {
      boards: null,
      users: null,
      templates: [
        {name:"Project Managment",img:"http://www.financetodayusa.com/wp-content/uploads/2020/03/istock-844535646.jpg"},
        {name:"Marketing",img:"https://www.selected.co.il/wp-content/uploads/2019/06/inner1.jpg"},
        {name:"Engineering",img:"https://www.nbn.org.il/wp-content/uploads/2014/01/engineering_mechanical_3042380_cropped.jpg"},
        {name:"Education",img:"https://tcmagazine.info/wp-content/uploads/2019/03/Online-Education.jpg"},
        {name:"Design",img:"https://blog.intercomassets.com/blog/wp-content/uploads/2018/05/Design-leadership-as-a-subversive-activity-.png"},
        {name:"Businnes",img:"https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Falejandrocremades%2Ffiles%2F2018%2F07%2Fdesk-3139127_1920-1200x773.jpg"}
      ],
      newBoard: {
        name: "",
        members: [],
      },
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
      createdBoard.members = this.newBoard.members.map((member) =>
        this.users.find((user) => user._id === member)
      );
      createdBoard = await this.$store.dispatch({
        type: "saveBoard",
        board: createdBoard,
      });
      this.$router.push(`/board/${createdBoard._id}`);
    },
  },
};
</script>

<style lang="scss">

</style>
