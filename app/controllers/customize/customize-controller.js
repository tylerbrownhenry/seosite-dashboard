'use strict';
require('dotenv').config();
var Customization = require('../../models/customization'),
updateBy = require('../../utils').updateBy;

exports.uploadLogo = function (req, res) {
  var s3Region = process.env.AWS_REGION ? 's3-' + process.env.AWS_REGION : 's3-us-west-2'
  var s3Url = 'https://' + s3Region + ".amazonaws.com/" + process.env.AWS_BUCKET_NAME + '/' + req.files[0].key;
console.log('req------>>>>>');
console.log('req------>>>',req.user.identity.oid);
console.log('req------+++');
  updateBy(Customization, {
       oid: req.user.identity.oid
  }, {logo:s3Url}, function (err) {
       if (err) {
         res.json({error:'error:uploading:image'});
       }
       res.json({message:s3Url});
  });
};
