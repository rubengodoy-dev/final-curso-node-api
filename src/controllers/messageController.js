import MessageService from "../services/messagesServices.js";

const messageService = new MessageService();


const getByEmail = async (req, res) => {
    try {
        let email = req.params.email;

        let result = await messageService.getByEmail(email);
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


const getByEmailFromService = async (email) => {
   
     
        let result = await messageService.getByEmail(email);
        return result
};

const save = async (data) => {

    let entityData = data;
    //validaciones...
    let result = await messageService.add(entityData);
    return result
};


export default {

    getByEmail
    , save
    ,getByEmailFromService

};