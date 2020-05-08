import {checkIfSmtpConWorking,getSmtpTransport,sendMail} from '../../src/utils/utils'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

let transporter:Mail
const working_stmp_config = {
    host: process.env.MAIl_HOST,
    port: Number(process.env.SMTP_PORT),
  }

const not_working_stmp_config ={
        host: process.env.MAIl_HOST,
        port: 21,
}

let valid_email:SMTPTransport.Options =  {
    from: "contact@notonlygeek.com",
    to: 'contact@notonlygeek.com',
    subject: 'Formulaire de contact depuis le site',
    html  : 'hello'
  }

describe("The connection to smtp server with node env params",() => {
    beforeAll(() => {
        transporter = nodemailer.createTransport(working_stmp_config)
    })

    it("sould be accepted", async () => {
       await expect(checkIfSmtpConWorking(transporter)).resolves.toBeTruthy;
    })

} )

describe("The connection to smtp server with a wrong port 21",() => {
    beforeAll(() => {
        transporter = nodemailer.createTransport(not_working_stmp_config)
    })

    it("sould be rejected", async () => {
       await expect(checkIfSmtpConWorking(transporter)).rejects.toThrow()
    })

} )

describe("The connection to smtp server with node env params",() => {

    it("should return an transporter", async () => {
        await expect(getSmtpTransport(working_stmp_config)).resolves.toBeInstanceOf(Mail)
    })

} )


describe("A valid connection and a valid email", () => {

    beforeAll(async () => {
        transporter = await getSmtpTransport(working_stmp_config)
        
    })

    it("should send email successfully", async () => {
        await expect(sendMail(valid_email,transporter)).resolves.toBeTruthy
    })

} )

