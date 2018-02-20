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
      commit('SET_TASKS', tasks)
    })
  },
  refreshTasks ({commit}) {
    commit('REFRESH_TASKS')
  },
  addTask ({ commit }, task) {
    taskAPI.addTask(task, newTask => {
      commit('ADD_TASK', newTask)
    })
  },
  updateTask ({ commit }, task) {
    taskAPI.updateTask(task, (updatedTask) => {
      commit('UPDATE_TASK', updatedTask)
    })
  },
  removeTask ({ commit }, id) {
    taskAPI.removeTask(id, () => {
      commit('REMOVE_TASK', id)
    })
  },
  updateColumn ({commit}, column) {
    taskAPI.updateColumn(column, () => {
      commit('UPDATE_COLUMN', column)
    })
  }
}

const mutations = {
  ADD_TASK (state, newTask) {
    state.items[newTask.columnIndex].push(newTask)
  },
  REFRESH_TASKS (state) {
    // After an item is moved, state.items doesn't react
    state.items = state.items
  },
  SET_TASKS (state, tasks) {
    // Clone, otherwise they're referenced
    state.items = _.cloneDeep(tasks.items)
    state.columns = _.cloneDeep(tasks.columns)
  },
  UPDATE_TASK (state, updatedTask) {
    let {index} = utils.deepFind(state.items, {id: updatedTask.id})

    if (index != null) {
      state.items[index[0]][index[1]].description = updatedTask.description
      state.items[index[0]][index[1]].details = updatedTask.details
      state.items[index[0]][index[1]].status = updatedTask.status
    }
  },
  REMOVE_TASK (state, id) {
    let {index} = utils.deepFind(state.items, {id})
    state.items[index[0]].splice(index[1], 1)
  },
  UPDATE_COLUMN (state, {index, title}) {
    state.columns[index] = title
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
