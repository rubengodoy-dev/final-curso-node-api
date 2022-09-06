import * as yup from 'yup'

let userSchema = yup.object().shape(
    {
        email: yup.string().email().min(4).required(),//minimo 4 caracteres
        password: yup.string().min(6).required()
    }
)
export default userSchema