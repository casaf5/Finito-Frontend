<template>
    <section class="checklist-preview">
      <div class="checklist-preview-container flex col">
        <div class="checklist-preview-header flex row space-between">
            <checkbox>YES</checkbox>
            <button>Delete</button>
        </div>
        <div class="checklist-progress-bar">
            80%
        </div>
        <template>
          <ul v-if="checklist">
            <li v-for="item in checklist.items" :key="item.id" class="flex row space-between">
                <h3>{{item.txt}}</h3>
                <button>x</button>
            </li>
          </ul>
        <template>
        <button>Add an item</button>
    </section>   
</template>

<script>
export default {
      name: "checklist-preview",
      props: ["checklist"],
}
</script>

