import tasks from '../../api/tasks'

const state = {
  all: []
}

const getters = {
  allTasks: state => state.tasks
}

const actions = {
  getAllTasks ({ commit }) {
    tasks.getTasks(products => {
      commit('getTasks', products)
    })
  }
}

const mutations = {
  getTasks (state, tasks) {
    state.tasks = tasks
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
