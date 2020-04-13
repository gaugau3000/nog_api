import  Koa from "koa";
import koaLogger from "koa-logger";
import koaJson  from "koa-json";
import koaBodyParser from 'koa-bodyparser'

import mailRouter from './routes/email'

const app = new Koa();
if(process.env.NODE_ENV !== "test")
    app.use(koaLogger());
app.use(koaJson());
app.use(koaBodyParser());
app.use(mailRouter.routes()).use(mailRouter.allowedMethods());


export default app.listen(3000);