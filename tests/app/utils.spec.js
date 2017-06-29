var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var utils = require('../../app/utils');

// require('dotenv').config();
// var dynamoose = require('dynamoose');
// dynamoose.AWS.config.update({
//      region: "us-west-2",
//      endpoint: process.env.AWS_DYNAMODB_ENDPOINT
// });


describe('app/utils', function () {

  console.log('_.keys(dynamoose)', _.keys(dynamoose.models.User));
  // dynamoose.defaults.waitForActive = false;
  stub = sinon.stub(dynamoose.models.User, 'get');
  stub.yields(null, {
       uid: 'yes',
       toke: 'test'
  });

      var testUserUid = 'testUserUId';
      utils.deleteUser(testUserUid,function(){
        done();
      });

      it('findOneUser should return nothing', function (done) {
        utils.findOneUser({
             uid: testUserUid
        }, function (err, _user) {
          console.log('err',err,'_user',_user);
          done();
        })
      });
});
