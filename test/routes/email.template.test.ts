import request from 'supertest'
import app from '../../src/app';



describe(`make a get request on /email/template/contact_form_admin with a body 
        {name:'Gautier',email:'test@test.com',message:'hello',tel:'054488877'}` , () => {
          it("should return a 200 status and an object of type MailMessage ",async () => {
              const response = await request(app.callback())
                .get('/email/template/contact_form_admin')
                .send({name:'Gautier',email:'test@test.com',message:'hello',tel:'054488877'})
              expect(response.status).toEqual(200)
              expect(response.text).toContain('054488877')
          })
})