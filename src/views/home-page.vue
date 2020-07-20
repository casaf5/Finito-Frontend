<template>
  <div class="home-page">
    <section class="recent-boards flex wrap">
      <h4><i class="far fa-clock"></i> Your Recent Boards</h4>
      <board-preview
        v-for="board in boards"
        :board="board"
        :key="board._id"
      />
    </section>
    <section class="board-temp">
      <h4><i class="fas fa-photo-video"></i> Templates</h4>
    </section>
    <section class="new-board">
      <h4><i class="fas fa-plus-circle"></i> Create New Board</h4>
      <section class="new-board-details flex col">
        <label for="board-name">
           Name: <input id="board-name" type="text" placeholder="Board Name" v-model="newBoard.name">
        </label>
        <label for="board-members">
            Members:<input id="board-members" type="text" placeholder="">
        </label>
        <button @click="addNewBoard">Create</button>
      </section>
    </section>
  </div>
</template>

<script>
import {boardService} from '../services/board-service.js'
import boardPreview from "../components/board-preview.cmp.vue";
export default {
  name: "home-page",
  components: {
    boardPreview
  },
  data() {
    return {
      boards: null,
       newBoard:{
        name:'',
        members:{},
      }
    };
  },
  async created() {
    const boards = await this.$store.dispatch({ type: "loadBoards" });
    this.boards = boards;
  },
  methods:{
    async addNewBoard(){
      let createdBoard=boardService.getEmptyBoard() //put in utils?
      createdBoard.name=this.newBoard.name
      createdBoard= await this.$store.dispatch({type:"saveBoard",board:createdBoard})
      this.$router.push(`/board/${createdBoard._id}`)
    }
  }
};
</script>
