require('dotenv').config();
var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var amqpConnection = require('./app/amqp/amqp');


var utils = require('./app/utils');
var stripeEvents = require('./app/config/stripe-events.js');

var command = {
     stripeEvent: {
          type: 'invoice.payment_succeeded',
          data: {
               object: {
                    subscription: 'sub_00000',
                    customer: 'sub_00000',
                    period_start: 1000,
                    period_end: 1001,
               }

          }
     }
}
var request = {
  status: function(){
    return {
      end: function(){
        console.log('DONESO!');
      }
    }
  }
};
 amqpConnection(function(){
   console.log('amqpConnection');
    // publisher = require('./app/amqp/publisher');
    // publisher.start();
    setTimeout(function(){
      console.log('setTimeout');
      stripeEvents(command,request);

    },3000);
 });
