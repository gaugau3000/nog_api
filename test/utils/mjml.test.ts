import {fileToString,genMail} from '../../src/utils/utils'
import { MailMessage } from "../../src/types/mail";

describe(`Read file containing the text "dummy"`,() => {
    it('should return the string "dummy"', async () =>{
        const txtString = await fileToString('../../test/data/dummy.txt')
        expect(txtString).toBe('dummy')
    })

})

describe("Giving a template with data", () => {
    it('should give a mail object', async() => {
        const data = {name:'Gautier',email:'test@test.com',message:'hello',tel:'054488877'}
        const mail:MailMessage = await genMail('contact_form_admin',data)
        
    })
})