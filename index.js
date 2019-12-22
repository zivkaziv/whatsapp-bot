var express = require('express');
var app = express();
var request = require('request');
const axios = require('axios');
const bodyParser = require('body-parser');
const WhatspAppMessageSender = require('./whatsappMessageSender');

const accountSid = process.env.SID || 'AC111';
const authToken = process.env.SID || 'AC'; 
// const client = require('twilio')(accountSid, authToken);
// const MessagingResponse = require('twilio').twiml.MessagingResponse;
 
const messageSender = new WhatspAppMessageSender(accountSid, authToken);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


const isWikiTerm = (term) =>{
  return ['hi', 'hello','help','test'].indexOf(term.toLowerCase().trim()) < 0;
};

app.post('/incoming', async (req, res) => {
  const term = req.body.Body;
  if(isWikiTerm(term || '')){
    const wikiResponse = await axios.get(`https://api.duckduckgo.com/?skip_disambig=1&format=json&pretty=1&q=${term}`);
    if(wikiResponse.data.Abstract){
      const message = `${wikiResponse.data.Abstract}
link : ${wikiResponse.data.AbstractURL}`
      return messageSender.send(res, message);
    }else{
      return messageSender.send(res, `Sorry.. I didn't find anything about it...`);
    }
  }else{
    return messageSender.send(res,`*Hey 👋*

    I am a bot which summarizes WikiPedia pages to help you find quick information, right within WhatsApp.
    
    Try it out - send me anything you want to know about`);
  }
});

app.post('/check', function(req, res) {
  console.log(req.body.Body)
  res.status(200).send();
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

