import tasks from '../../api/tasks'
import _remove from 'lodash/remove'

const state = {
  columns: [],
  items: []
}

const getters = {}

const actions = {
  getAllTasks ({ commit }) {
    tasks.getTasks(tasks => {
      commit('setTasks', tasks)
    })
  },
  addTask ({ commit, state }, item) {
    tasks.addTask(item, tasks => {
      commit('setTasks', tasks)
    })
  },
  updateTasks () {
    // TODO
  },
  updateColumnTitle () {
    // TODO
  }
}

const mutations = {
  refreshTasks (state) {
    // TODO: Remove this hack if possible
    state.items = state.items
  },
  setTasks (state, tasks) {
    state.items = tasks.items
    state.columns = tasks.columns
  },
  setColumnName (state, data) {
    state.columns[data.id] = data.newTitle
  },
  removeTask (state, taskID) {
    _remove(state.items, (item) => item.id === taskID)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
