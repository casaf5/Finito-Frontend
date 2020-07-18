<template>
    <section class="checklist-preview">
      <div class="checklist-preview-container flex col">
        <div class="checklist-preview-header flex row space-between">
          <!-- change to checkbox -->
            <h4><i class="el-icon-circle-check"></i>{{checklist.title}}</h4>
            <button>Delete</button>
        </div>
        <div class="checklist-progress-bar">
           <el-progress :percentage="50"></el-progress>
        </div>
        <div>
          <ul v-if="checklist">
            <li v-for="(item,idx) in checklist.items" :key="idx" class="flex row space-between">
                <h3>{{item.content}}</h3>
                <button>x</button>
            </li>
          </ul>
        </div>
        <button class="checklist-preview-additem-btn">Add an item</button>
      </div>
    </section>   
</template>

<script>
export default {
      name: "checklist-preview",
      props: ["checklist"],
      methods: {
        // ///update progress bar
      format(percentage) {
        return percentage === 100 ? 'Full' : `${percentage}%`;
      }
    },
      created (){
        console.log('clist inside comp', this.checklist)
      }
}
</script>

