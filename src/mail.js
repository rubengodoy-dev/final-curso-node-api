import { createTransport } from 'nodemailer'
import Handlebars from 'handlebars'
import path from 'path'
import { promises as fs } from 'fs'
import __dirname from './utils.js'
import config from './config/config.js'


const transporter = createTransport({
    host: config.mail.host,
    port: 587,
    auth: {
        user: config.mail.user,
        pass: config.mail.password
    }
});

const enviarMail = async (to, subject, html) => {
    try {
        const mailOptions = {
            to,
            subject,
            html
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error.message)
    }
}

const enviarMailAdministrador = async (type, subject, data) => {


    try {
        let receiver = ""
        let templateFile, templateContent;

        if (type === 'newUser') {
            templateFile = "./views/userNew.hbs";
            templateContent = { data };
            receiver=config.mail.admin
        }

        if (type === 'newOrder') {
            templateFile = "./views/orderNew.hbs";
            const { email } = data.user;
            const totalCart = data.products.map(item => (item.price * item.quantity)).reduce((prev, next) => prev + next);
            templateContent = { user: { email }, products: data.products, totalCart };
            receiver=email
        }
        let rutaAltemplate = path.join(__dirname, templateFile)
        console.log("Ruta al template: " + rutaAltemplate)
        const emailTemplateSource = await fs.readFile(rutaAltemplate, "utf8")
        const template = Handlebars.compile(emailTemplateSource);
        const htmlMessage = template(templateContent);

        await enviarMail(receiver, subject, htmlMessage);
    } catch (error) {
        console.log(error.message)
    }
}



export default enviarMailAdministrador 
