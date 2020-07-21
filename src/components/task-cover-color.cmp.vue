<template>
  <div>
    <task-action-container title="cover">
      <div class="colors-container">
        <div
          class="color"
          :style="{ 'background-color': color.color }"
          :key="index"
          v-for="(color, index) in colors"
          @click="colorClicked(color,index)"
        ></div>
      </div>
      <h4>Images taken from Unsplash</h4>
      <div class="imgs-container">
        <img @click="setImage(url)" :src="url" :key="index" v-for="(url, index) in topImages" alt />
      </div>
      <button
        @click="$emit('changeComponent','task-cover-img')"
        class="btn-primary"
      >Search for other photos</button>
    </task-action-container>
  </div>
</template>

<script>
import taskActionContainer from "./task-action-container.cmp";
import FormInput from "./From Elements/form-input.cmp";
export default {
  props: {
    topImages: {
      type: Array
    }
  },
  created() {
    this.imagesUrl = this.topImages;
  },
  data() {
    return {
      imagesUrl: [],
      query: "",
      searchPhotos: false,
      colors: [
        {
          color: "#61BD4F",
          wasClicked: false
        },
        {
          color: "#f2d600",
          wasClicked: false
        },
        {
          color: "#ff9f1a",
          wasClicked: false
        },
        {
          color: "#eb5a46",
          wasClicked: false
        },
        {
          color: "#0079BF",
          wasClicked: false
        },
        {
          color: "#C377E0",
          wasClicked: false
        },
        {
          color: "#1abc9c",
          wasClicked: false
        },
        {
          color: "#e74c3c",
          wasClicked: false
        },
        {
          color: "#8e44ad",
          wasClicked: false
        },
        {
          color: "#778beb",
          wasClicked: false
        },
        {
          color: "#f78fb3",
          wasClicked: false
        },
        {
          color: "#c44569",
          wasClicked: false
        }
      ]
    };
  },
  methods: {
    colorClicked(color, index) {
      this.$emit("colorClicked", color, index);
    },
    setImage(url) {
      this.$emit("setImage", url);
    }
  },
  computed: {},
  components: {
    taskActionContainer,
    FormInput
  }
};
</script>

<style scoped lang="scss">
.imgs-container {
  display: flex;
  flex-wrap: wrap;
  img {
    margin: 5px 5px;
    border-radius: 5px;
    width: 85px;
    height: 45px;
    object-fit: cover;
  }
}
.colors-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  .color {
    margin: 5px 10px;
    width: 55px;
    height: 35px;
  }
}
</style>
