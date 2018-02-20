import taskAPI from '../../api/tasks'
import utils from '@/utils'
import _ from 'lodash'

const state = {
  columns: [],
  items: []
}

const getters = {
  taskColumns: (state) => state.columns,
  taskItems: (state) => state.items
}

const actions = {
  getAllTasks ({ commit }) {
    taskAPI.getTasks(tasks => {
      commit('setTasks', tasks)
    })
  },
  addTask ({ commit }, task) {
    taskAPI.addTask(task, newTask => {
      commit('refreshTasks')
    })
  },
  updateTask ({ commit }, task) {
    taskAPI.updateTask(task, (updatedTask) => {
      commit('updateTask', updatedTask)
    })
  },
  updateColumnTitle () {
    // TODO
  },
  removeTask ({ commit }, id) {
    taskAPI.removeTask(id, () => {
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
    // Clone, otherwise they're referenced
    state.items = _.cloneDeep(tasks.items)
    state.columns = _.cloneDeep(tasks.columns)
  },
  setColumnName (state, {id, newTitle}) {
    state.columns[id] = newTitle
  },
  updateTask (state, updatedTask) {
    let {index} = utils.deepFind(state.items, {id: updatedTask.id})

    if (index != null) {
      state.items[index[0]][index[1]].description = updatedTask.description
      state.items[index[0]][index[1]].details = updatedTask.details
      state.items[index[0]][index[1]].status = updatedTask.status
    }
  },
  removeTask (state, id) {
    let {index} = utils.deepFind(state.items, {id})
    state.items[index[0]].splice(index[1], 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
