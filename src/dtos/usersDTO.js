export default class UsersDTO {
  constructor(user) {
    this.id = user.id || user._id;
    this.full_name = `${user.first_name} ${user.last_name}`;
    this.enterprise = user.enterprise;
  }
}
