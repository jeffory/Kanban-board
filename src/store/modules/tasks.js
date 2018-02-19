import tasks from '../../api/tasks'
import utils from '@/utils'

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
  addTask ({ commit }, task) {
    tasks.addTask(task, newTask => {
      commit('refreshTasks')
    })
  },
  updateTask ({ commit }, task) {
    tasks.updateTask(task, (updatedTask) => {
      commit('updateTask', updatedTask)
    })
  },
  updateColumnTitle () {
    // TODO
  },
  removeTask ({ commit }, id) {
    tasks.removeTask(id, () => {
      commit('removeTask', id)
    })
  }
}

const mutations = {
  refreshTasks (state) {
    // TODO: Remove this forced refresh if possible (Problem with vue-sortable changing data)
    state.items = state.items
  },
  setTasks (state, tasks) {
    state.items = tasks.items
    state.columns = tasks.columns
  },
  setColumnName (state, data) {
    state.columns[data.id] = data.newTitle
  },
  updateTask (state, id) {
    // ...
  },
  removeTask (state, id) {
    let {index} = utils.deepFind(state, {id})
    state.items[index[0]].splice(index[1], 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
