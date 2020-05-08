import request from 'supertest'
import app from '../../src/app';
import _ from 'lodash'
import { mocked } from 'ts-jest/utils'
import * as utils from '../../src/utils/utils'

 jest.mock('../../src/utils/utils')
 const mockedUtils = mocked(utils, true)

let email_body = { from: 'contact@notonlygeek.com',
                    to: 'contact@notonlygeek.com',
                    subject: 'Vous avez recu un email depuis le formulaire de contact',
                    html: 'l\'email de contact est test@gmail.com '}

describe("make a post  request on email with valid attributes ", () => {

  it("should return a 200 status", async () => {
    
     mockedUtils.sendMail.mockResolvedValue({accepted: [ 'contact@notonlygeek.com' ]})
    
    const response = await request(app.callback())
      .post('/email')
      .send(email_body)
    expect(response.status).toEqual(200);
    expect(JSON.parse(response.text)).toHaveProperty('accepted',[ 'contact@notonlygeek.com' ])
  });

 
});

describe("make a post  request on /email with test missing attribute ", () => {

  let email_body_missing_text_element = _.cloneDeep(email_body)
  delete email_body_missing_text_element.html

  it("should return a 406 status and give explaination ", async () => {
    const response = await request(app.callback())
      .post('/email')
      .send(email_body_missing_text_element)
    expect(response.status).toEqual(406);
    expect(response.text).toContain('The request need this elements')
  });

  
});

