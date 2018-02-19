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
        columnIndex: Math.floor(Math.random() * 4),
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
    tasks.updateTask({id: newTask.id, description: 'Task has a new description'}, updatedTask => {
      tasks.findTask(newTask.id, foundTask => {
        expect(foundTask.description).to.equal('Task has a new description')
        done()
      })
    })
  })

  it('should be able to find tasks by id', done => {
    tasks.findTask(newTask.id, foundTask => {
      expect(foundTask).to.be.a('object')
      expect(newTask.description).to.equal(foundTask.description)
      done()
    })
  })

  it('should be able to find tasks by column/row indexes', done => {
    tasks.addTask({description: 'Hello world', columnIndex: 2}, newTask2 => {
      expect(newTask2).to.be.a('object')

      tasks.findTaskIndex(newTask2.id, foundIndex => {
        expect(foundIndex).to.be.a('array')
        let rawItem = tasks.datastore.items[foundIndex[0]][foundIndex[1]]

        expect(newTask2.description).to.equal(rawItem.description)
        done()
      })
    })
  })

  it('should be able to delete tasks', done => {
    tasks.removeTask(newTask.id, () => {
      tasks.findTask(newTask.id, foundTask => {
        expect(foundTask).to.equal(false)
        done()
      })
    })
  })
})
