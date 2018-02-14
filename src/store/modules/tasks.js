import tasks from '../../api/tasks'

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
  setTasks (state, tasks) {
    state.items = tasks.items
    state.columns = tasks.columns
  },
  setColumnName (state, data) {
    state.columns[data.id] = data.newTitle
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
