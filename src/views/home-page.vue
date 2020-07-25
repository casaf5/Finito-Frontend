<template>
  <section class="home-page">
    <div class="recent-boards-container">
      <h4 class="catagory-label">
        <i class="fas fa-chalkboard"></i>
        Your Boards
      </h4>
      <div class="recent-boards">
        <board-preview :isLink="true" v-for="board in boards" :board="board" :key="board._id" />
        <div
          @click="showModal = !showModal"
          class="board-preview flex create-board"
        >Create New Board</div>
      </div>
    </div>
    <modal @close="showModal = !showModal" v-if="showModal">
      <div class="create-board-container">
        <div class="create-board-input">
          <form-input v-model="newBoard.name" :showLabel="true" labelText="Board Title" />
        </div>
        <div class="create-board-colors">
          <h4>Choose Color</h4>
          <color-small @colorClicked="changeBgColor" size="small" />
        </div>
        <searchImg
          :saveSettings="{previewSize:'regular',saveSize:'full'}"
          :getAllSizes="true"
          :topImages="topImages"
          @imageChoosen="setBoardImg"
        />
        <board-preview :previewUrl="boardImgPreivewUrl" :board="newBoard" />
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
          v-for="(template, index) in templates"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from "../services/board-service.js";
import { UnsplashService } from "../services/unsplashImage-service";
import boardPreview from "../components/board-preview.cmp.vue";
import boardTemplate from "../components/UI Components/template";
import formInput from "../components/From Elements/form-input.cmp";
import searchImg from "../components/UI Components/search-img";
import modal from "../components/UI Components/modal";
import colorSmall from "../components/UI Components/color-small";
import boardPreviewCmpVue from "../components/board-preview.cmp.vue";
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
      selectedBgImgs: null,
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
        name: "",
        members: [],
        style: {
          bgUrl: "",
          bgColor: "",
          previewUrl:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0"
        }
      },
      boardImgPreivewUrl:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80 750w",
      boardSaveUrls: [
        {
          full:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0OTc5MX0"
        },
        {
          small:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0"
        },
        {
          regular:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0"
        }
      ],
      topImages: []
    };
  },
  async created() {
    this.boards = await this.$store.dispatch({ type: "loadBoards" });
    this.users = await this.$store.dispatch({ type: "loadUsers" });
    this.topImages = await UnsplashService.getRandomPhotos("9", "landscape");
  },
  methods: {
    async addNewBoard(isTemplate = false) {
      if (!this.newBoard.name) return;

      let createdBoard = boardService.getEmptyBoard();
      createdBoard.name = this.newBoard.name;
      createdBoard.style = this.newBoard.style;
      createdBoard.style.bgUrls = this.boardSaveUrls;
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
      this.boardImgPreivewUrl = "";
      this.newBoard.style.bgColor = color;
    },
    setBoardImg({ small, regular, full, thumbnail }) {
      if (this.boardSaveUrls.length) {
        this.boardSaveUrls = [];
      }
      this.boardSaveUrls.push({ small, regular, full });
      this.newBoard.style.previewUrl = thumbnail;
      this.boardImgPreivewUrl = small;
    },
    createTemplate(template) {
      this.newBoard.name = template.name;
      this.addNewBoard();
    }
  }
};
</script>

<style lang="scss"></style>
