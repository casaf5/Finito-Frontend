<template>
  <div class="colors-container">
    <div
      class="color"
      :class="colorSettings"
      :style="{ 'background-color': color.color }"
      :key="index"
      v-for="(color, index) in colors"
      @click="colorClicked(color,index)"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "medium"
    }
  },
  data() {
    return {
      colors: [
        {
          color: "#61BD4F"
        },
        {
          color: "#f2d600"
        },
        {
          color: "#ff9f1a"
        },
        {
          color: "#eb5a46"
        },
        {
          color: "#0079BF"
        },
        {
          color: "#C377E0"
        },
        {
          color: "#1abc9c"
        },
        {
          color: "#e74c3c"
        },
        {
          color: "#8e44ad"
        },
        {
          color: "#778beb"
        },
        {
          color: "#f78fb3"
        },
        {
          color: "#c44569"
        }
      ]
    };
  },
  methods: {
    colorClicked(color, index) {
      this.$emit("colorClicked", color, index);
      console.log(color);
    }
  },
  computed: {
    colorSettings() {
      if (this.size === "small") {
        return "color-small";
      } else {
        return "color-medium";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.colors-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  .color {
    margin: 5px 5px;
  }
  .color-small {
    width: 50px;
    height: 20px;
  }
  .color-medium {
    width: 78px;
    height: 35px;
  }
}
</style>