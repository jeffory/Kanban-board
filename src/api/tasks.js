import _ from 'lodash'

/**
 * Mocking client-server processing
 */
let datastore = {
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
    setTimeout(() => callback(datastore), 100)
  },
  addTask (task, callback) {
    setTimeout(() => {
      let newItem = {
        id: autoIncrementID,
        description: task.description,
        status: 0,
        details: '',
        created: new Date(),
        updated: new Date()
      }

      datastore.items[task.columnIndex].push(newItem)
      autoIncrementID++

      callback(newItem)
    }, 100)
  },
  findTask (taskID, callback) {
    callback(_.find(_.flatten(datastore.items), ['id', taskID]))
  },
  updateTask (task, callback) {
    setTimeout(() => {
      // TODO

      callback(datastore)
    }, 100)
  },
  removeTask (taskID, callback) {
    setTimeout(() => {
      _.remove(datastore.items, (task) => task.id === taskID)

      callback()
    }, 100)
  }
}
