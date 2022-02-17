const nodemailer = require('nodemailer')

class mailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(email, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Todo App: Account activation',
            html: `
            <div>
                <h1>Follow the link to activate your account</h1>
                <a href=${link}>${link}</a>
            </div>
            `
        })
    }
}

module.exports = new mailService()
