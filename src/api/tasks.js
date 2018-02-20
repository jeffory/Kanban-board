import utils from '@/utils'

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
        details: 'Only the finest milk',
        created: new Date().setTime(1518730711109),
        updated: new Date().setTime(1518730711109)
      },
      {
        id: 1,
        description: 'Vacuum the house',
        status: 0,
        details: 'Vacuum cleaner is in the garage',
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
  findTask (id, callback) {
    setTimeout(() => {
      let {object} = utils.deepFind(this.datastore.items, {id})
      callback(object || false)
    }, 100)
  },
  findTaskIndex (id, callback) {
    setTimeout(() => {
      let {index} = utils.deepFind(this.datastore.items, {id})
      callback(index)
    }, 100)
  },
  updateTask (task, callback) {
    setTimeout(() => {
      this.findTaskIndex(task.id, index => {
        if (index !== false) {
          this.datastore.items[index[0]][index[1]].description = task.description
          this.datastore.items[index[0]][index[1]].details = task.details
          this.datastore.items[index[0]][index[1]].status = task.status
        } else {
          throw new Error(`Cannot find index of task with id: ${task.id}`)
        }
      })

      callback(task)
    }, 100)
  },
  removeTask (id, callback) {
    setTimeout(() => {
      this.findTaskIndex(id, index => {
        if (index !== false) {
          this.datastore.items[index[0]].splice([index[1]], 1)
        } else {
          throw new Error(`Cannot remove task with id: ${id}`)
        }
      })

      callback()
    }, 100)
  }
}
