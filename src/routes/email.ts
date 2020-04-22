import Router from 'koa-router'
import  Koa from "koa";
import {sendMail,getSmtpTransport} from '../utils/utils'
import {stmp_config} from '../config/config'

const router = new Router({ prefix: '/email' })

router.post("/", async (ctx:Koa.Context) => {
    const requiredRequestElement = ['from','to','subject','text']
    const isBodyHaveMissingElements = requiredRequestElement
                                      .map(n => ctx.request.body.hasOwnProperty(n))
                                      .some(r => !r)
    if(isBodyHaveMissingElements)
    {
        ctx.status = 406
        ctx.body= `The request need this elements : ${requiredRequestElement.toString()}`
        return
    }
    await sendMail(ctx.request.body,await getSmtpTransport(stmp_config))
    .then((info) => {
      ctx.status = 200
      ctx.body= info
    })
    .catch((err) => {
      ctx.status = 502
      ctx.body= `Failed to send email : ${err}`
    })
   
    
    
       
  });

export default router