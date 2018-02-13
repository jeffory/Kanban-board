import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './modules/tasks'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tasks
  },
  mutations: {
    updateColumnTitle (state, data) {
      state.columnNames[data.id] = data.newTitle
    },
    updateTasks (state, data) {
      state.tasks = data.tasks
    }
  }
})

// state: {
//  columnNames: ['List 1', 'List 2', 'List 3', 'List 4'],
// },
