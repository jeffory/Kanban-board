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

// Why the timeouts everywhere? If it were a real API they would be async requests.

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
    setTimeout(() => {
      let task = _.find(_.flatten(this.datastore.items), {'id': taskID}) || false
      callback(task)
    }, 100)
  },
  findTaskIndex (taskID, callback) {
    setTimeout(() => {
      let rowIndex = -1
      let ret = false

      for (let columnIndex = 0; columnIndex < this.datastore.items.length; columnIndex++) {
        rowIndex = _.findIndex(this.datastore.items[columnIndex], {id: taskID})

        if (rowIndex > -1) {
          ret = {columnIndex, rowIndex}
          break
        }
      }

      callback(ret)
    }, 100)
  },
  updateTask (task, callback) {
    setTimeout(() => {
      this.findTaskIndex(task.id, index => {
        if (index !== false) {
          this.datastore.items[index.columnIndex][index.rowIndex].description = task.description
        } else {
          throw new Error(`Cannot find index of task with id: ${task.id}`)
        }
      })

      callback(this.datastore)
    }, 100)
  },
  removeTask (taskID, callback) {
    setTimeout(() => {
      this.findTaskIndex(taskID, index => {
        delete this.datastore.items[index.columnIndex][index.rowIndex]
      })

      callback()
    }, 100)
  }
}
