import utils from '@/utils'

let testArray = [
  [[
    // testArray[0][0][0]
    {
      id: 67,
      text: 'some text'
    }
  ]],
  [[],
    [[], [], [], [], [], [[], [
      // testArray[1][1][5][1][0]
      {
        id: 1,
        text: 'hello'
      }
    ]]]
  ],
  [[[]]],
  [[], [], [
    [],
    [
      // testArray[3][2][1][0]
      {
        id: 31,
        text: 'hello world'
      }
    ]]],
  []
]

describe('utils/deepFind', () => {
  it('should return a found object and index', () => {
    let result = utils.deepFind(testArray, {id: 67})

    expect(result.index).to.deep.equal([0, 0, 0])
    expect(result.object.id).to.equal(67)
    expect(result.object.text).to.equal('some text')
  })

  it('should return a found object and index #2', () => {
    let result = utils.deepFind(testArray, {id: 31})

    expect(result.index).to.deep.equal([3, 2, 1, 0])
    expect(result.object.id).to.equal(31)
    expect(result.object.text).to.equal('hello world')
  })

  it('should return a found object and index #3', () => {
    let result = utils.deepFind(testArray, {id: 1})

    expect(result.index).to.deep.equal([1, 1, 5, 1, 0])
    expect(result.object.id).to.equal(1)
    expect(result.object.text).to.equal('hello')
  })

  it('should return -1 if it can\'t find an object', () => {
    let result = utils.deepFind(testArray, {id: 235})

    expect(result).to.equal(-1)
  })
})
