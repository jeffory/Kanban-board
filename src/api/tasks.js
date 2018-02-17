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
  autoIncrementID: autoIncrementID,
  datastore: datastore,
  getTasks (callback) {
    setTimeout(() => callback(this.datastore), 100)
  },
  addTask (task, callback) {
    setTimeout(() => {
      let newItem = {
        id: this.autoIncrementID,
        description: task.description,
        status: 0,
        details: '',
        created: new Date(),
        updated: new Date()
      }

      this.datastore.items[task.columnIndex].push(newItem)
      this.autoIncrementID++

      callback(newItem)
    }, 100)
  },
  findTask (taskID, callback) {
    callback(_.find(_.flatten(this.datastore.items), {'id': taskID}))
  },
  findTaskIndex (taskID, callback) {
    let taskIndex = -1
    let ret = false

    for (let columnIndex = 0; columnIndex < this.datastore.items.length; columnIndex++) {
      taskIndex = _.findIndex(this.datastore.items[columnIndex], {'id': taskID})

      if (taskIndex > -1) {
        ret = {columnIndex, taskIndex}
        break
      }
    }

    callback(ret)
  },
  updateTask (task, callback) {
    setTimeout(() => {
      this.findTaskIndex(task.id, index => {
        if (index !== false) {
          this.datastore.items[index.columnIndex][index.taskIndex].description = task.description
        } else {
          throw new Error(`Cannot find index of task with id: ${task.id}`)
        }
      })

      callback(this.datastore)
    }, 100)
  },
  removeTask (taskID, callback) {
    setTimeout(() => {
      _.remove(_.flatten(this.datastore.items), {'id': taskID})

      callback()
    }, 100)
  }
}
