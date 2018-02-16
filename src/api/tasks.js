import _remove from 'lodash/remove'

/**
 * Mocking client-server processing
 */
const _tasks = {
  columns: ['List 1', 'List 2', 'List 3', 'List 4'],
  items: [
    [
      {
        id: 0,
        description: 'Buy some milk',
        status: 0,
        details: '',
        created: new Date().setTime(1518730711109),
        updated: new Date().setTime(1518730711109)
      },
      {
        id: 1,
        description: 'Switch out draggable experiment with a sortable option',
        status: 0,
        details: '',
        created: new Date().setTime(1518730721811),
        updated: new Date().setTime(1518730721811)
      }
    ],
    [
      {
        id: 2,
        description: 'Buy eggs',
        status: 0,
        details: '',
        created: new Date().setTime(1518730736484),
        updated: new Date().setTime(1518730736484)
      }
    ],
    [
      {
        id: 3,
        description: 'Buy spices',
        status: 0,
        details: '',
        created: new Date().setTime(1518730747699),
        updated: new Date().setTime(1518731398647)
      }
    ],
    []
  ]
}

let autoIncrementID = 4

export default {
  getTasks (callback) {
    setTimeout(() => callback(_tasks), 100)
  },
  addTask (task, callback) {
    setTimeout(() => {
      _tasks.items[task.columnIndex].push({
        id: autoIncrementID,
        description: task.text,
        status: 0,
        details: '',
        created: new Date(),
        updated: new Date()
      })
      autoIncrementID++

      callback(_tasks)
    }, 100)
  },
  updateTask (task, callback) {
    setTimeout(() => {
      _tasks.items[task.columnIndex].push({
        id: autoIncrementID,
        description: task.text,
        status: 0,
        details: '',
        created: new Date(),
        updated: new Date()
      })
      autoIncrementID++

      callback(_tasks)
    }, 100)
  },
  removeTask (taskID, callback) {
    setTimeout(() => {
      _remove(_tasks.items, (task) => task.id === taskID)

      callback()
    }, 100)
  }
}
