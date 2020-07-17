<template>
    <section class="checklist-preview">
      <div class="checklist-preview-container flex col">
        <div class="checklist-preview-header flex row space-between">
          <!-- change to checkbox -->
            <button>YES</button>
            <button>Delete</button>
        </div>
        <div class="checklist-progress-bar">
            80%
        </div>
        <div>
          <ul v-if="checklist">
            <li v-for="item in checklist.items" :key="item.id" class="flex row space-between">
                <h3>{{item.name}}</h3>
                <button>x</button>
            </li>
          </ul>
        </div>
        <button>Add an item</button>
      </div>
    </section>   
</template>

<script>
export default {
      name: "checklist-preview",
      props: ["checklist"],
}
</script>

