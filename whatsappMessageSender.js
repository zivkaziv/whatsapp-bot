const twilo = require('twilio')
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = class Person {
   constructor(accountSid, authToken) {
       this.client = twilo(accountSid, authToken);
   }

   send(res, message) {
        const twiml = new MessagingResponse();
        twiml.message(message);
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
   }
}