import UsersService from '../services/usersService.js';
import UsersDTO from '../dtos/usersDTO.js';
const usersService = new UsersService();

const getUsers = async (req, res) => {
  try {
    let result = await usersService.getUsers();

    if (result.success) {
      let { body } = result
      let resultsDTO = body.map((user) => new UsersDTO(user));
      res.status(200).json(resultsDTO);
    } else {
      let { error } = result
      res.status(500).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveUser = async (req, res) => {
  try {
    let user = req.body;
    //validaciones...
    let result = await usersService.addUser(user);

    if (result.success) {
      let { body } = result
      let resultsDTO =  new UsersDTO(body)      
      res.status(201).json(resultsDTO);
    } else {
      let { error } = result
      res.status(500).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const updateUser = async (req, res) => {
  try {
    const { id, content } = req.body;
    //validaciones...
 
    let result = await usersService.updateUser(content, id);
    console.log(result)
    if (result.success) {
      let { body } = result
      let resultsDTO =  new UsersDTO(body)
      
      res.status(200).json(resultsDTO);
    } else {
      let { error } = result
      res.status(500).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await usersService.deleteUser(id);
    if (result.success) {
      res.status(200).json(result.body);
    } else {
      let { error } = result
      res.status(500).json(error);
    }


  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  getUsers,
  saveUser,
  updateUser,
  deleteUser
};
