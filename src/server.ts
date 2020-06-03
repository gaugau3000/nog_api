import app from './app'
import { stmp_config } from './config/config'
import { getSmtpTransport } from './utils/utils'

const server_port: number = Number(process.env.PORT) || 3000

getSmtpTransport(stmp_config)
  .then(() => {
    console.info(`Connection with smtp server succeeded `)
    app.listen(server_port, () => {
      console.info(`server up and running on port ${server_port}`)
    })
  })
  .catch((err) => {
    throw new Error(
      `Server exit because connection with smtp server failed : ${err} `
    )
  })
