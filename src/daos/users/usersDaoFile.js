import __dirname from '../../utils.js';
import fs from 'fs';

export default class UsersDaoFile {
  constructor() {
    this.path = __dirname + '/files/users.json';
    this.init();
  }
  init = async () => {
    if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]));
  };
  readFile = async () => {
    let data = await fs.promises.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  };
  getAll = async () => {
    return await this.readFile();
  };
  save = async (user) => {
    let users = await this.readFile();
    let id = 0
    if (users.length > 0) {
      //obtener el ultimo Id          
      id = Math.max(...users.map(p => p.id))
    }
    id++
    user.id = id

    users.push(user);
    await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'));
    return user;
  };

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
