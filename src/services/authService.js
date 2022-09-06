import enviarMailAdministrador from '../mail.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import UsersService from '../services/usersService.js';
import userSchema from "../validations/userValidation.js"
const usersService = new UsersService();

export default class AuthService {

    register = async (user) => {

        //validar usuario       
        const valid = await userSchema.isValid(user);
        if (!valid) {
            return { success: false, error: { message: 'Valores invalidos en los datos ingresados' } }
        }

        //verificar que el mail sea unico
        const isEmailExist = await usersService.getByEmail(user.email);

        if (isEmailExist.success && isEmailExist.body) {
            return { success: false, error: { message: 'Email ya registrado' } }
        }

        //generar password encriptado
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(user.password, salt);
        user.password = password

        let result = await usersService.addUser(user);

        if (result.success) {

            const subject = `Nuevo Usuario `
            console.log(subject)
            await enviarMailAdministrador('newUser', subject, result.body);

            return { success: true, body: result.body }
        } else {
            return { success: false, error: result.error }
        }


    }

    login = async (email, password) => {
        // return { success: true, body:`login ${email} ${password}` }


        const isEmailExist = await usersService.getByEmail(email);

        if (isEmailExist.success && !isEmailExist.body) {
            return { success: false, error: { message: 'Usuario no encontrado' } }
        }

        const { password: storedPassword, _id } = isEmailExist.body

        const validPassword = await bcrypt.compare(password, storedPassword);
        if (!validPassword)
            return { success: false, error: { message: 'Contraseña incorrecta' } }


        // create token
        const token = jwt.sign({
            email: email,
            id: _id
        }, process.env.TOKEN_SECRET)

        return { success: true, body: { token: token } }
    }

}