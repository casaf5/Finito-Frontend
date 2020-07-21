<template>
  <section class="checklist-wrapper">
    <section class="checklist-header">
      <i class="el-icon-circle-check check-icon"></i>
      <h4>{{ checklist.title }}</h4>
      <button class="checklist-remove-btn" @click="removeList">Delete</button>
    </section>
    <div class="checklist-progress-bar">
      <el-progress :percentage="completedItems"></el-progress>
    </div>
    <ul class="checklist-container clean-list">
      <li
        v-for="(item, idx) in checklist.items"
        class="flex space-between"
        :key="idx"
      >
        <label
          :for="idx"
          class="check-item"
          :class="{ isDone: item.completed }"
        >
          <input
            type="checkbox"
            v-model="item.completed"
            :id="idx"
            @click="changeItemStatus(idx)"
          />
          {{ item.content }}
        </label>
        <i
          class="fas fa-trash-alt justify-self-end"
          @click="removeItem(idx)"
        ></i>
      </li>
    </ul>
    <section class="add-item flex space-between" v-if="isAddClicked">
      <input
        v-model="newItemTxt"
        @keyup.enter="addItem"
        type="text"
        placeholder="Enter New Item.."
      />
      <i class="fas fa-plus-circle" @click="addItem"></i>
    </section>
    <label class="new-item-label flex space-between" @click="openCloseAdd">
      Add an item
    </label>
  </section>
</template>

<script>
export default {
  name: "Checklist-CMP",
  props: ["checklist"],
  data() {
    return {
      isAddClicked: false,
      newItemTxt: "",
      status: 0,
    };
  },
  computed: {
    completedItems() {
      const completed = this.checklist.items.reduce((acc, item) => {
        if (item.completed) ++acc;
        return acc;
      }, 0);
      this.status = Math.floor((completed / this.checklist.items.length) * 100);
      return this.status > 0 ? this.status : 0;
    },
  },
  methods: {
    openCloseAdd() {
      this.isAddClicked = !this.isAddClicked;
    },
    addItem() {
      if (this.newItemTxt === "") return;
      let newItem = {
        content: this.newItemTxt,
        completed: false,
      };
      this.checklist.items.push(newItem);
      this.newItemTxt = "";
      this.$emit("update");
    },
    removeItem(idx) {
      this.checklist.items.splice(idx, 1);
      this.$emit("update");
    },
    changeItemStatus(idx) {
      this.checklist.items[idx].completed = !this.checklist.items[idx]
        .completed;
      this.$emit("update");
    },
    removeList() {
      this.$emit("remove");
    },
  },
};
</script>
