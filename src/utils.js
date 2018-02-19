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
  }
}
