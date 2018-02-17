import tasks from '@/api/tasks'

tasks.datastore = {
  columns: ['List 1', 'List 2', 'List 3', 'List 4'],
  items: [
    [], [], [], [], []
  ]
}

describe('api/tasks', () => {
  it('should return new task on creation', done => {
    tasks.addTask({
      columnIndex: 0,
      description: 'My new task'
    }, newTask => {
      expect(newTask.id).to.be.a('number')
      expect(newTask.description).to.equal('My new task')
      done()
    })
  })
})
