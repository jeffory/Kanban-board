import _ from 'lodash'

export default {
  // Return an object and it's index as an array
  deepFind (array, predicate, currentIndex) {
    let i = 0
    let len = array.length
    let result = -1
    currentIndex = currentIndex || []

    while (i < len) {
      let foundIndex = _.findIndex(array[i], predicate)

      if (foundIndex >= 0) {
        result = {
          object: array[i][foundIndex],
          index: currentIndex
        }
      } else if (Array.isArray(array[i])) {
        result = this.deepFind(
          array[i],
          predicate,
          currentIndex.concat(i)
        )
      }

      if (result !== -1) {
        currentIndex.push(i)
        break
      }

      i++
    }

    return result
  },
  deepRemove (array, predicate) {
    let {index} = this.deepFind(array, predicate)

    // TODO: Temporary code - find a better way, without eval
    switch (index.length) {
      case 1:
        array.splice(index[0], 1)
        break
      case 2:
        array[index[0]].splice(index[1], 1)
        break
      case 3:
        array[index[0]][index[1]].splice(index[2], 1)
        break
      case 4:
        array[index[0]][index[1]][index[2]].splice(index[3], 1)
        break
      case 5:
        array[index[0]][index[1]][index[2]][index[3]].splice(index[4], 1)
        break
    }

    return array
  }
}
