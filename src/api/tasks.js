/**
 * Mocking client-server processing
 */
const _tasks = {
  columns: ['List 1', 'List 2', 'List 3', 'List 4'],
  items: [
    [
      {
        id: 0,
        description: 'Buy some milk'
      },
      {
        id: 1,
        description: 'Switch out draggable experiment with a sortable option'
      }
    ],
    [
      {
        id: 2,
        description: 'Buy eggs'
      }
    ],
    [
      {
        id: 3,
        description: 'Buy spices'
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
  addTask (data, callback) {
    setTimeout(() => {
      _tasks.items[data.columnIndex].push({id: autoIncrementID, description: data.text})
      autoIncrementID++

      callback(_tasks)
    }, 100)
  }
}
