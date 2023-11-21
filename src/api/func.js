export default {
  sortById: function (arr) {
    return arr.sort((a, b) => a.name.localeCompare(b.name))
  },
  sortByName: function (arr) { 
    return arr.sort((a, b) => a.name.localeCompare(b.name))
  }
}