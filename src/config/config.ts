import Mail from 'nodemailer/lib/mailer'

import SMTPTransport from 'nodemailer/lib/smtp-transport'

export const stmp_config: SMTPTransport.Options = {
  host: process.env.MAIl_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  ignoreTLS: true,
}
