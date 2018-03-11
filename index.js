/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = process.env.APP_ID;

const SKILL_NAME = 'Hello World';
const HELP_MESSAGE = 'This is a help message';
const HELLO_WORLD = 'Hello world!';
const HELLO = 'Hello';
const HELP_REPROMPT = 'This is a reprompt';
const STOP_MESSAGE = 'Goodbye!';

function hello (name) {
    return HELLO + ' ' + name;
}

const handlers = {
    'LaunchRequest': function () {
        this.emit('GeneralGreetingIntent');
    },
    'GeneralGreetingIntent': function () {
        this.response.cardRenderer(SKILL_NAME, HELLO_WORLD);
        this.response.speak(HELLO_WORLD);
        this.emit(':responseReady');
    },
    'NamedGreetingIntent': function () {
      let name = this.event.request.intent.slots.NAME.value;
      this.response.cardRenderer(SKILL_NAME, hello(name));
      this.response.speak(hello(name));
      this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        this.response.speak(HELP_MESSAGE).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};