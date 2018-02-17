import tasks from '@/api/tasks'

tasks.datastore = {
  columns: ['List 1', 'List 2', 'List 3', 'List 4'],
  items: [
    [], [], [], [], []
  ]
}

describe('api/tasks', () => {
  let newTask = {}

  beforeEach(() => {
    return new Promise((resolve) => {
      // Reset the datastore object before each test
      tasks.autoIncrementID = 0
      tasks.datastore.items = [[], [], [], []]

      tasks.addTask({
        columnIndex: 0,
        description: 'My new task'
      }, addedTask => {
        newTask = addedTask
        resolve()
      })
    })
  })

  it('should return new task on creation', () => {
    expect(newTask.id).to.be.a('number')
    expect(newTask.description).to.equal('My new task')
  })

  it('should add new tasks to datastore', done => {
    tasks.findTask(newTask.id, foundTask => {
      expect(foundTask.description).to.equal('My new task')
      done()
    })
  })

  it('should be able to update tasks', done => {
    tasks.updateTask({id: 0, description: 'Task has a new description'}, updatedTask => {
      tasks.findTask(newTask.id, foundTask => {
        expect(foundTask.description).to.equal('Task has a new description')
        done()
      })
    })
  })
})
