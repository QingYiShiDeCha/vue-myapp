const users = [
  { id: 1, name: 'qingcha', password: 123456 },
  { id: 2, name: 'zhang', password: 123456 },
  { id: 3, name: 'wang', password: 123456 },
]

const username = 'qingcha'
// const getUser = (username) => {
//   return users.find((user) => user.name === username)
// }
const user = users.find((user) => user.name === username)
const user1 = users.filter((user) => user.name === username)[0]
console.log(user);
console.log(user1);
