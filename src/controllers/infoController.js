import getInfoAboutProcess from "../services/infoService.js";


const getInfo = async (req, res) => {
    
    try {
        let result = await getInfoAboutProcess()
        res.status(500).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
   


}

export default {
    getInfo
};