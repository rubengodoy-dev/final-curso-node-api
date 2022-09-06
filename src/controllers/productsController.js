import ProductsService from '../services/productsService.js';
//import UsersDTO from '../dtos/usersDTO.js';
const productService = new ProductsService();

const getAll = async (req, res) => {
  try {
    let result = await productService.getAll();

    if (result.success) {
      let { body } = result

      res.status(200).json(body);
    } else {
      let { error } = result
      res.status(500).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const getById = async (req, res) => {
  try {
    let id = req.params.id;

    let result = await productService.getById(id);
    if (result.success) {
      res.status(200).json(result.body);
      // if (result.body) {
      //   res.status(200).json(result.body);
      // } else {
      //   res.status(200).json({message:"Not found"});
      // }

    } else {
      let { error } = result
      res.status(500).json(error);
    }


  } catch (err) {
    res.status(500).json(err);
  }
};

const getByCategory = async (req, res) => {
  try {
    let param= req.params.category
    let result = await productService.getByCategory(param);

    if (result.success) {
      let { body } = result

      res.status(200).json(body);
    } else {
      let { error } = result
      res.status(500).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const save = async (req, res) => {
  try {
    let entityData = req.body;
    //validaciones...
    let result = await productService.add(entityData);

    if (result.success) {
      let { body } = result

      res.status(201).json(body);
    } else {
      let { error } = result
      res.status(500).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const update = async (req, res) => {
  try {
    const { id, content } = req.body;
    //validaciones...

    let result = await productService.update(content, id);
    console.log(result)
    if (result.success) {
      let { body } = result

      res.status(200).json(body);
    } else {
      let { error } = result
      res.status(500).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const erase = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await productService.delete(id);
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
  getAll,
  save,
  update,
  erase,
  getById,
  getByCategory
};
