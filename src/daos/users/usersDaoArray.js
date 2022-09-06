export default class UserDaoArray {
  constructor() {
    this.users = []
  }
  getAll = async () => {
    return this.users;
  };
  save = async (user) => {
    let id = 0

    if (this.users.length > 0) {
      //obtener el ultimo Id          
      id = Math.max(...this.users.map(p => p.id))
    }
    id++
    user.id = id
    this.users.push(user)
    return user
  }

  getByFilter = async (filter) => {
    throw new Error("falta implementar 'getByFilter'")
  }

  update = async (content, id) => {
    throw new Error("falta implementar 'update'")
  }
  delete = async (id) => {
    throw new Error("falta implementar 'delete'")
  }
}
