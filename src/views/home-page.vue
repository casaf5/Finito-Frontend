<template>
  <section class="home-page">
    <div class="recent-boards-container">
      <h4 class="catagory-label">
        <i class="fas fa-chalkboard"></i>
        Your Boards
      </h4>
      <div class="recent-boards">
        <board-preview :isLink="true" v-for="board in boards" :board="board" :key="board._id" />
        <div @click="showModal= !showModal" class="board-preview flex create-board">Create New Board</div>
      </div>
    </div>
    <modal @close="showModal= !showModal" v-if="showModal">
      <div class="create-board-container">
        <div class="create-board-input">
          <form-input v-model="newBoard.name" :showLabel="true" labelText="Board Title" />
        </div>
        <div class="create-board-colors">
          <h4>Choose Color</h4>
          <color-small @colorClicked="changeBgColor" size="small" />
        </div>
        <searchImg :topImages="topImages" @imageChoosen="setBoardImg" />
        <board-preview :board="newBoard" />
        <button @click="addNewBoard" class="btn-primary">Create</button>
      </div>
    </modal>
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
    <div class="board-templates-container">
      <h4 class="catagory-label">
        <i class="fas fa-photo-video"></i> Templates
      </h4>
      <div class="board-templates">
        <board-template
          @createTemplate="createTemplate"
          :template="template"
          :key="index"
          v-for="(template,index) in templates"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from "../services/board-service.js";
import boardPreview from "../components/board-preview.cmp.vue";
import boardTemplate from "../components/UI Components/template";
import formInput from "../components/From Elements/form-input.cmp";
import searchImg from "../components/UI Components/search-img";
import modal from "../components/UI Components/modal";
import colorSmall from "../components/UI Components/color-small";
export default {
  name: "home-page",
  components: {
    boardPreview,
    boardTemplate,
    formInput,
    modal,
    colorSmall,
    searchImg
  },
  data() {
    return {
      boards: null,
      users: null,
      showModal: false,
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
        name: "SS",
        members: [],
        style: {
          bgUrl:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80 750w",
          bgColor: ""
        }
      },
      topImages: [
        "https://images.unsplash.com/photo-1563900833607-035c921f001c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0",
        "https://images.unsplash.com/photo-1428534302776-5c6a2dca0380?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0",
        "https://images.unsplash.com/photo-1581095390906-9a7efa3f8b0a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0",
        "https://images.unsplash.com/photo-1590336225155-d7e19a3a954f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0",
        "https://images.unsplash.com/photo-1564679411940-501b3f72ebab?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0",
        "https://images.unsplash.com/photo-1592252083688-16558af3eed9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0",
        "https://images.unsplash.com/photo-1445888985293-8e1b904061c4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0",
        "https://images.unsplash.com/photo-1476433564761-80392cb7dafb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0",
        "https://images.unsplash.com/photo-1563126303-227e37edb271?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0"
      ]
    };
  },
  async created() {
    this.boards = await this.$store.dispatch({ type: "loadBoards" });
    this.users = await this.$store.dispatch({ type: "loadUsers" });
    console.log(this.users)
  },
  methods: {
    async addNewBoard(isTemplate = false) {
      let createdBoard = boardService.getEmptyBoard();
      createdBoard.name = this.newBoard.name;
      createdBoard.style = this.newBoard.style;
      createdBoard.members = this.newBoard.members.map(member =>
        this.users.find(user => user._id === member)
      );
      createdBoard = await this.$store.dispatch({
        type: "saveBoard",
        board: createdBoard
      });
      this.$router.push(`/board/${createdBoard._id}`);
    },
    changeBgColor({ color }, _) {
      this.newBoard.style.bgUrl = "";
      this.newBoard.style.bgColor = color;
    },
    setBoardImg(url) {
      this.newBoard.style.bgUrl = url;
    },
    createTemplate(template) {
      this.newBoard.name = template.name;
      this.addNewBoard();
    }
  }
};
</script>

<style lang="scss">
</style>
