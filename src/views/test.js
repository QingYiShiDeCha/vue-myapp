let userInfo = [
  { id: 1, name: 'John', age: 20, cash: 44 },
  { id: 2, name: 'Jane', age: 21, cash: 85 },
  { id: 5, name: 'Joe', age: 22, cash: 63 },
  { id: 4, name: 'Jim', age: 23, cash: 47 },
  { id: 5, name: 'Joe', age: 24, cash: 25 },
  { id: 6, name: 'aim', age: 25, cash: 12 },
]

let total = 0

function sortByName(arr) {
  return arr.sort((a, b) => a.name.localeCompare(b.name));
}
function sortById(arr) {
  return arr.sort((a, b) => b.id - a.id);
}

function sortByTotal(arr) {
  return arr.sort((a, b) => b.cash + a.cash);
}


console.log(sortByName(userInfo));
// console.log(sortById(userInfo));
// console.log(sortByTotal(userInfo));
/**
 * 
 * @param {Array} arr 
 */
function test(arr) {
  const map = {}
  arr.forEach((item) => {
    if (!map[item.name]) {
      
    }
  })
}