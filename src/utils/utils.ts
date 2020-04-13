import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
let sendMail = async (mail:SMTPTransport.Options,transporter:Mail) => {

  return await transporter.sendMail(mail)

}

const checkIfSmtpConWorking = async (transporter:Mail) => {

  return await transporter.verify()

}

const getSmtpTransport= async (config:SMTPTransport.Options) => {

  let transporter:Mail = nodemailer.createTransport(config)

  if (await checkIfSmtpConWorking(transporter))
    return transporter
  else
    throw new Error('Smtp Con Failed')
    
}

export { sendMail,checkIfSmtpConWorking,getSmtpTransport }