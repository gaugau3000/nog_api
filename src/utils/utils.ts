import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { MailMessage } from "../types/mail";
import { promises as fs } from 'fs';
import vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import mjml from 'mjml';
import path from 'path';
import mailHeaders from '../mail_templates/mailHeaders';


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



const mailTemplateFolderPath = '../mail_templates'
const mailTemplateExt = 'mjml'

export async function genMail(templateName:keyof typeof mailHeaders,data:any):Promise<MailMessage>{

    const mailTemplateFolder = `${mailTemplateFolderPath}/${templateName}.${mailTemplateExt}`
    
    const mailHeader:any = mailHeaders[templateName]
    const compiledMailBodyTemplate:any = await fileToString(mailTemplateFolder) 

    const compiledMailBodyTemplateRender= await createRenderer().renderToString(getVueApp(compiledMailBodyTemplate,data))
    const mailBody = mjml(compiledMailBodyTemplateRender).html
      
    return {
      from: mailHeader.from,
      to: mailHeader.to ? mailHeader.to : data.email ,
      subject: mailHeader.subject,
      text:mailBody
    }

}

export async function fileToString(relativePath:string): Promise<string>{

const file = await fs.readFile(path.join(__dirname, relativePath))

return file.toString()

}


export function getVueApp(template:any,data:object){
  return new vue({
    data() {
      return data
    },
    template: template
  });
}
