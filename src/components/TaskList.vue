<template>
  <div class="tasks-list">
    <div class="tasks-column" v-for="(title, index) in task_columns" :key="index">
      <div class="tasks-column-title">
        <editable :text="title" :key="index" :id="index" @change="updateTitle" :no-newlines="true"></editable>
      </div>

      <draggable class="tasks-column-content"
        :list="task_items[index]"
        :index="index"
        :options="{group: 'tasks', draggable: '.task-item'}"
        @end="itemMoved"
        >

        <task-item v-for="item in task_items[index]" :item="item" :key="item.id"></task-item>

        <div slot="footer" style="text-align: center;">
          <div class="new-task-item" v-if="index === addingItem">
            <ExpandingTextarea :focus="true" @save="addItem" @cancelled="addingItem = false"></ExpandingTextarea>
          </div>

          <button style="border: 0; background: none; cursor: pointer; height: 1.8rem; padding: 0; width: 1.8rem;" @click="addingItem = index">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" fill="#bdc3cc" />
            </svg>
          </button>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import TaskItem from './TaskItem.vue'
import Editable from './Editable.vue'
import ExpandingTextarea from './ExpandingTextarea.vue'

export default {
  name: 'TaskList',
  components: {Editable, TaskItem, Draggable, ExpandingTextarea},
  created () {
    this.$store.dispatch('getAllTasks')
  },
  computed: {
    task_columns () {
      return this.$store.state.tasks.columns
    },
    task_items () {
      return this.$store.state.tasks.items
    }
  },
  data () {
    return {
      addingItem: false
    }
  },
  methods: {
    addItem (text) {
      this.$store.dispatch('addTask', {columnIndex: this.addingItem, text})
      this.addingItem = false
    },
    itemMoved (event) {
      let moveData = {
        fromColumn: parseInt(event.from.attributes['index'].value, 10),
        fromIndex: event.oldIndex,
        toColumn: parseInt(event.to.attributes['index'].value, 10),
        toIndex: event.newIndex
      }

      // TODO: This sends the whole list back to Vuex, which appears to have already
      // non-reactively updated the tasks. It seems to be an issue with using the computed
      // properties and an index on the task_items array.
      this.updateItems(this.task_items)
    },
    updateItems (newItems) {
      this.$store.commit('updateTasks', {'tasks': newItems})
    },
    updateTitle (newTitle) {
      this.task_columns[newTitle.id] = newTitle.text
      this.$store.commit('updateColumnTitle', {'id': newTitle.id, 'newTitle': newTitle.text})
    }
  }
}
</script>

<style lang="scss" scoped>
$column-background-colors: #C2024F, #04BBBF, #D2D945, #FCB13F, #FF594F;

.tasks-list {
  display: flex;
}

.tasks-column {
  flex-grow: 1;
  height: 100%;
  min-height: 600px;
  width: 400px;

  &:not(:last-of-type) {
    border-left: 1px solid rgb(241, 241, 241);
  }

  &:nth-of-type(odd) {
    background-color: #fff;
  }

  &:nth-of-type(even) {
    background-color: rgba(241, 241, 241, 0.3);
  }

  @for $i from 1 through length($column-background-colors) {
    &:nth-of-type(#{$i}) {
      .tasks-column-title {
        background-color: nth($column-background-colors, $i);
        box-shadow: inset 0 0 10px nth($column-background-colors, $i);
        color: #fff;
      }
    }
  }
}

.tasks-column-title {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.343 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413 7.07-7.07v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413 7.07-7.07 7.07 7.07zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23ddd' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E");
  padding: .75em;
  position: relative;
  text-align: center;

  &:after {
    border-bottom: 2px solid rgba(255,255,255, .3);
    bottom: 2px;
    content: ' ';
    left: 0;
    position: absolute;
    width: 100%;
  }
}

.tasks-column-content {
  height: 100%;
  min-height: 600px;
  padding: 1em 2em !important;
}

.new-task-item {
  background-color: rgb(252, 249, 233);
  border: 1px solid #dbf5ff;
  box-shadow: 0 0 5px 0 rgba(18, 128, 168, .5);
  color: rgb(51, 51, 51);
  cursor: pointer;
  font-family: 'Cantarell', sans-serif;
  margin-bottom: 1em;
  padding: 1em 2em;

  textarea {
    background: inherit;
    border: 0;
    font-size: 1em;
  }
}
</style>
