import AuthService from "../services/authService.js";
const authService = new AuthService()


const register = async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        const savedUserResult = await authService.register(user);


        if (savedUserResult.success) {
            res.status(201).json(savedUserResult.body);
        } else {
            res.status(400).json(savedUserResult.error);
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

const login = async (req, res) => {
    try {

        const email = req.body.email
        const password = req.body.password

        const result = await authService.login(email, password);

        if (result.success) {
            res.status(200).json(result.body);
        } else {
            res.status(400).json(result.error);
        }

    } catch (err) {
        res.status(500).json(err);
    }
}
export default { register, login }