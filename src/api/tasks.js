/**
 * Mocking client-server processing
 */
const _tasks = [
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
  [

  ]
]

export default {
  getTasks (callback) {
    setTimeout(() => callback(_tasks), 100)
  }
}
