require('dotenv').config();
var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var utils = require('./app/utils');

utils.findUser({email:'2pdasc@email.com'},function(err,user){
  console.log('err',err,'user',user[0].oid);
  utils.checkActivity(user[0].oid,function(err,activity){
      console.log('activity',activity);
      var pageDayCount =  activity['page-day-count'];
      var pageMonthCount =  activity['page-month-count'];
      utils.updateActivity(user[0].oid,'page',function(err){
        console.log('err',err);
        utils.checkActivity(user[0].oid,function(err,_activity){
          console.log('err',err);
          console.log('post day count',_activity['page-day-count'],'prev',pageDayCount);
          console.log('post month count',_activity['page-month-count'],'prev',pageMonthCount);
          utils.checkAvailActivity(user[0].oid,user[0].plan,'page',function(err,decision){
              console.log('decision',decision,'err',err);
          });
        });
      });
  });
});
