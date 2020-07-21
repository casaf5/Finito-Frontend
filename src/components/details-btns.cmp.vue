<template>
  <section class="task-actions">
    <label>Add To Task</label>
    <button @click="toggleMemebersComp">
      <i class="el-icon-user"></i> Members
    </button>
    <task-members
      @addMember="addMember"
      @removeMember="removeMember"
      @closeMembersComp="toggleMemebersComp"
      v-if="memebersOpen"
      :boardMembers="board.members"
      :taskMembers="task.members"
    />
    <button>
      <i class="el-icon-price-tag"></i> Labels
    </button>
    <button @click="toggleDateComp">
      <i class="el-icon-date"></i> Due date
    </button>
    <task-duedate
      v-if="duedateOpen"
      @dateChoosed="saveDuedate"
      @dateRemoved="removeDuedate"
      @closeDateComp="toggleDateComp"
    />
    <button style="position:relative" @click.self="addCheckListOpen = !addCheckListOpen">
      <i class="el-icon-document-checked"></i>
      Checklist
      <task-checkList v-if="addCheckListOpen" @createCheckList="addCheckList" />
    </button>
    <button @click="toggleAttach">
      <i class="el-icon-paperclip"></i> Attachment
    </button>
    <task-attachment
      v-if="attachmentsOpen"
      @closeAttach="toggleAttach"
      @uploded="addAttachment"
      @remove="removeAttach"
    />
    <button>
      <i class="el-icon-picture-outline"></i> Cover
    </button>
    <label>Actions</label>
    <button @click="copyTask">
      <i class="el-icon-document-copy"></i> Copy
    </button>
    <button @click="removeTask">
      <i class="el-icon-delete"></i> Remove
    </button>
    <button @click="toggleMoveComp">
      <i class="el-icon-right"></i> Move
    </button>
    <task-move
      v-if="moveCompOpen"
      :taskGropus="this.board.taskGroups"
      @closeMoveComp="toggleMoveComp"
      @taskMoved="moveTask"
    />
    <button @click="toggleWatch" class="flex space-between align-center">  
      <div>
        <i class="el-icon-view"></i> Watch
      </div>
      <i v-show="watchIsOn" class="el-icon-check v-watch"></i>
    </button>
  </section>
</template>

<script>
import taskMembers from "../components/task-members.cmp.vue";
import taskDuedate from "../components/task-duedate.cmp.vue";
import taskAttachment from "../components/task-attachment.cmp.vue";
import taskCheckList from "../components/task-checklist.cmp";
import taskMove from "../components/task-move.cmp.vue";
import { utilService } from "../utils/utils.js";
export default {
  props: ["board", "task", "taskIdx", "user"],
  data() {
    return {
      memebersOpen: false,
      duedateOpen: false,
      moveCompOpen: false,
      attachmentsOpen: false,
      addCheckListOpen: false,
      taskToEdit: null,
      taskGroup: null,
    };
  },
  created() {
    this.taskGroup = this.board.taskGroups.find(
      tg => tg.id === this.task.parentListId
    );
    this.taskToEdit = this.taskGroup.tasks.find(t => t.id === this.task.id); //maybe just deepCopy?
    console.log(this.taskToEdit.watchMembers)
  },
  computed :{
     watchIsOn (){
       const isOn = (this.taskToEdit.watchMembers.find(member=> member.id === this.user.id))? true : false
       return isOn
     } 
  },
  methods: {
    // TASKS
    removeTask() {
      this.taskGroup.tasks.splice(this.taskIdx, 1);
      this.$emit("emitBoardChange", "REMOVED_TASK");
      this.$emit("emitCloseModal");
    },
    // change id after copy --- make an option of copying to other lists
    copyTask() {
      this.taskGroup.tasks.unshift(JSON.parse(JSON.stringify(this.task)));
      this.$emit("emitBoardChange", "COPPIED_TASK");
    },
    // gets the new taskgroup id from the relevant comp
    moveTask(newTaskgroupId) {
      this.taskToEdit.parentListId = newTaskgroupId;
      const newGroupIdx = this.board.taskGroups.findIndex(
        tg => tg.id === newTaskgroupId
      );
      this.taskGroup.tasks.splice(this.taskIdx, 1);
      console.log("idx", newGroupIdx);
      console.log(this.board);
      this.board.taskGroups[newGroupIdx].tasks.push(this.taskToEdit);
      this.$emit("emitBoardChange", "MOVED_TASK", this.taskGroup.title);
      this.$emit("emitCloseModal");
    },
    // LABELS
    addLabel(label) {
      this.taskToEdit.labels.push(label);
      this.$emit("emitBoardChange", "ADDED_LABEL");
    },
    removeLabel(idx) {
      this.taskToEdit.labels.splice(idx, 1);
      this.$emit("emitBoardChange", "REMOVED_LABEL");
    },
    // MEMBERS
    toggleMemebersComp() {
      this.memebersOpen = !this.memebersOpen;
    },
    toggleDateComp() {
      this.duedateOpen = !this.duedateOpen;
      //  console.log(this.duedateOpen)
    },
    toggleMoveComp() {
      this.moveCompOpen = !this.moveCompOpen;
    },
    toggleAttach() {
      this.attachmentsOpen = !this.attachmentsOpen;
    },
    addMember(member) {
      this.taskToEdit.members.push(member);
      this.$emit("emitBoardChange", "JOINED_MEMBER");
    },
    removeMember(member) {
      const idx = this.task.members.findIndex(m => m.id === member.id);
      this.taskToEdit.members.splice(idx, 1);
      this.$emit("emitBoardChange", "MEMBER_LEFT");
    },
    // CHECKLIST => inside will be also items crudl
    addCheckList(title) {
      this.taskToEdit.checkLists.push(utilService.getEmptyCheckList(title));
      this.$emit("emitBoardChange", "ADDED_CHECKLIST");
    },
    //Attachments
    addAttachment(fileObj) {
      this.taskToEdit.attachments.push(fileObj);
      this.$emit("emitBoardChange", "ADDED_ATTACHMENT");
    },
    // OTHERS
    saveDuedate(date) {
      this.taskToEdit.dueDate = date;
      this.$emit("emitBoardChange", "CHANGED_DATE", date);
    },
    removeDuedate() {
      if (this.taskToEdit.dueDate) {
        this.taskToEdit.dueDate = "";
      } else {
        console.log("there is no duedate to remove...");
      }
      this.$emit("emitBoardChange", "REMOVED_DATE");
    },
    updateCover(cover) {},
    attachFile(file) {},
    toggleWatch() {
      const idx = this.taskToEdit.watchMembers.findIndex(member => member.id === this.user.id)
      if (idx!==-1) {this.taskToEdit.watchMembers.splice(idx, 1)
        this.$emit("emitBoardChange", "UNWATCHED_TASK");
      } else {
        this.taskToEdit.watchMembers.push(this.user)
        this.$emit("emitBoardChange", "WATCHED_TASK");
      }
    
    }
  },
  components: {
    taskMembers,
    taskDuedate,
    taskMove,
    taskAttachment,
    taskCheckList
  }
};
</script>
