<template>
  <div class="actions-container">
    <ul class="actions-list">
      <li class="actions-header">
        <span>List Actions</span>
        <i @click="$emit('close')" class="el-icon-close"></i>
      </li>
      <hr />
      <li>Add Card...</li>
      <li>Copy List...</li>
      <li>Move List...</li>
      <li>Watch</li>
      <hr />
      <li>Move All Cards in this List...</li>
      <li>Archive All Cards in this List...</li>
      <hr />
      <li>Archive This List</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.actions-container {
  top: 20%;
  left: 50%;
  z-index: 2;
  // width: 120%;
  width: 300px;
  background-color: #fff;
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 2px 7px 25px 0px rgba(26, 26, 26, 0.2);

  .actions-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .actions-header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    span {
      text-align: center;
    }
    i {
      position: absolute;
      right: 10px;
    }
  }
}

.actions-container > * {
  margin: 5px 0;
}
</style>