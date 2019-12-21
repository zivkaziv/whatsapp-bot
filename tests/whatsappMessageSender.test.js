const WhatsAppMessageSedner = require('../whatsappMessageSender');

describe('WhatsApp Message Sedner Tests',()=>{
    it('should create new class of WhatsAppMessageSedner', ()=>{
        const whatsappMessageSender = new WhatsAppMessageSedner('AC111', '222');
        expect(whatsappMessageSender).not.toBeUndefined();
    });

    it('should throw an exception', ()=>{
        expect(()=>{
            const whatsappMessageSender = new WhatsAppMessageSedner();
        }).toThrow();
    });

    it('should send message', ()=>{
        const whatsappMessageSender = new WhatsAppMessageSedner('AC111', '222');
        const resMock = {
            writeHead : jest.fn(),
            end : jest.fn()
        }
        const message = '111';
        whatsappMessageSender.send(resMock, message);
        expect(resMock.writeHead).toHaveBeenCalledTimes(1);
        expect(resMock.end).toHaveBeenCalledTimes(1);
    });
});