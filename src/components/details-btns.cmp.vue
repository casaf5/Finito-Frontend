<template>
    <section>
        <button @click="toggleMemebersComp">
            <i class="el-icon-user"></i> Members
          </button>
          <task-members @addMember="addMember" @removeMember="removeMember" @closeMembersComp="toggleMemebersComp" 
          v-if="memebersOpen" :boardMembers="board.members" :taskMembers="task.members"/>
          <button>
            <i class="el-icon-price-tag"></i> Labels
          </button>
          <button>
            <i class="el-icon-date"></i> Due date
          </button>
          <button @click="addCheckList">
            <i class="el-icon-document-checked"></i> Checklist
          </button>
          <button>
            <i class="el-icon-paperclip"></i> Attachment
          </button>
          <button>
            <i class="el-icon-picture-outline"></i> Cover
          </button>
          <button @click="copyTask">
            <i class="el-icon-document-copy"></i> Copy
          </button>
          <button @click="removeTask">
            <i class="el-icon-delete"></i> Remove
          </button>
          <button>
            <i class="el-icon-right"></i> Move
          </button>
          <button>
            <i class="el-icon-view"></i> Watch
          </button>
        </section>
</template>

<script>
import taskMembers from "../components/task-members.cmp.vue";
import {utilService} from '../utils/utils.js';
export default {
  props: ["board","task"],
  data (){
      return {
         memebersOpen: false,
         taskToEdit: null,
         taskGroup: null
      }
  },
  created (){
      this.taskGroup= this.board.taskGroups.find(tg => tg.id === this.task.parentListId)
      this.taskToEdit=this.taskGroup.tasks.find(t=> t.id === this.task.id)
  },
  methods:{
    // TASKS
    removeTask() {
      this.taskGroup.tasks.splice(this.taskIdx, 1);
      this.$emit ('emitBoardChange', "REMOVED_TASK") 
      this.$emit ('emitCloseModal')
    },
    // change id after copy --- make an option of copying to other lists
    copyTask() {
      this.taskGroup.tasks.unshift(JSON.parse(JSON.stringify(this.task)));
      this.$emit ('emitBoardChange', "COPPIED_TASK") 
    },
    // gets the new taskgroup id from the relevant comp
    moveTask(newTaskgroupId) {
      this.taskToEdit.parentListId = newTaskgroupId;
      const newGroupIdx = this.boardToEdit.taskGroups.findIndex(
        g => g.id === newTaskgroupId
      );
      this.taskGroup.tasks.splice(this.taskIdx, 1);
      this.boardToEdit.taskGroups[newGroupIdx].push(this.taskToEdit);
      this.addActivity("MOVED_TASK");
    },
    // LABELS
    addLabel(label) {
      this.taskToEdit.labels.push(label);
      this.$emit ('emitBoardChange', "ADDED_LABEL") 
    },
    removeLabel(idx) {
      this.taskToEdit.labels.splice(idx, 1);
      this.$emit ('emitBoardChange', "REMOVED_LABEL") 
    },
    // MEMBERS
    toggleMemebersComp(){
      this.memebersOpen = !this.memebersOpen
    },
    addMember(member) {
      this.taskToEdit.members.push(member)
      this.$emit ('emitBoardChange', 'JOINED_MEMBER')  
    },
    removeMember(member){
      const idx = this.task.members.findIndex(m => m.id === member.id)
       this.taskToEdit.members.splice(idx, 1);
       this.$emit ('emitBoardChange', 'MEMBER_LEFT')  
    },
    // CHECKLIST => inside will be also items crudl
    addCheckList(){
      this.taskToEdit.checkLists.push(utilService.getEmptyCheckList())
      this.$emit ('emitBoardChange', 'ADDED_CHECKLIST')  
    },
    // OTHERS
    updateCover(cover) {},
    attachFile(file) {},
    watchTask() {}
  },
  components: {
    taskMembers
  }
}
</script>

<style>

</style>