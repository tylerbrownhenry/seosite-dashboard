'use strict';
var _ = require('underscore'),
     q = require('q'),
     permissions = {
          free: require('../../../api-requests/permissions/free'),
          paid: require('../../../api-requests/permissions/paid')
     },
     plans = require('../../../config/secrets').stripeOptions.planData,
     fs = require('fs'),
     utils = require('../../../utils'),
     path = require('path'),
     Link = require("../../../models/link"),
     Scan = require('../../../models/scan'),
     Activity = require('../../../models/activity'),
     Request = require("../../../models/request"),
     Issue = require("../../../models/issues"),
     Resource = require("../../../models/resource"),
     Security = require("../../../models/security"),
     MetaData = require("../../../models/metaData"),
     Captures = require("../../../models/capture");

function makeCall(model, name, key, val) {
     var promise = q.defer();
    //  console.log('key', key, name, val);
     model.query(key).eq(val).exec(function (err, resp) {
          // console.log('TEST', err, resp);
          if (err) {
               promise.reject(err);
          } else {
               promise.resolve({items:resp,name:name});
          }
     });
     return promise.promise;
}

function getManyBy(models, key, val) {
     var promise = q.defer();
     var queue = [];

     _.each(models, function (model) {
          queue.push(makeCall(model.obj, model.name, key, val));
     });

     q.all(queue).then(function (response) {
          promise.resolve(response);
     }).catch(function (err) {
          promise.reject(err);
     });

     return promise.promise;
}

function convertArrayToObject(arr){
  var obj = {};
  _.each(arr,function(group){
    obj[group.name] = group.items
  });
  return obj;
}

function reduceObj(obj,keys,issues,tests){
  var newObj = {};
  _.each(keys,function(key){
    newObj[key] = obj[key];
  });
  // console.log('test..');
  _.each(tests,function(test){
    // console.log('test..');
    if(test(issues,obj)){
      newObj._hasIssue = true;
    }
  });
  // console.log('test..',newObj);
  return newObj;
}

function formatResource(obj,issues,tests){
  // console.log('test..');
  var keys = ['url','start','duration','cached','gzip','minified','type','_id','status'/*,'timings','requestId'*/];
  return reduceObj(obj,keys,issues,tests);
}

function processResources(arr){
  // console.log('HERE');
    var issues = {
      gzip: 0,
      minified: 0,
      cached: 0,
      status: 0,
      total:0
    }
    var tests = [function(issues,obj){
      if(obj.gzip === false){
        issues.gzip++
        issues.total++
        return true;
      }
    },
    function(issues,obj){
      if(obj.cached === false){
        issues.cached++
        issues.total++
        return true;
      }
    },
    function(issues,obj){
      if(obj.minified === false){
        issues.minified++
        issues.total++
        return true;
      }
    },
    function(issues,obj){
      if(obj.status !== 200){
        issues.status++
        issues.total++
        return true;
      }
    }];
    // console.log('arr',arr);
    var withIssues = [];
    var withoutIssues = [];
    _.each(arr,function(resource){
      resource = formatResource(resource,issues,tests);
      if(resource._hasIssue === true){
        withIssues.push(resource);
      } else {
        withoutIssues.push(resource);
      }
    });
    // console.log('issues',issues);
    return {items:{error:withIssues,success:withoutIssues},issues:issues,total:arr.length};
}


function formatLink(obj,issues,tests,resultsKeys,resultsTests){
  // console.log('test..');
  var resultsTests = [function(issues,obj){
    if(obj.broken === true){
      issues.broken++
      issues.total++
      return true;
    }
  }]

  var resultsKeys = ['selector','tag','tagName','internal','samePage',/*"linkId","uid","requestId"*/"broken","brokenReason","excluded","content-type","content-length","filename","statusCode","statusMessage"];
  obj.results = reduceObj(obj.results,resultsKeys,issues,resultsTests)
  var keys = ['url',/*"site",*/'found','_id',/*"linkId","uid","requestId",*/"status","results"];
  return reduceObj(obj,keys,issues,tests);
}

function processLinks(arr){
  var issues = {
    broken:0,
    total:0
  }
  var tests = [];

  var withIssues = [];
  var withoutIssues = [];
  _.each(arr,function(link){
    console.log('LINK',link);
    link = formatLink(link,issues,tests);
    if(link._hasIssue === true){
      withIssues.push(link);
    } else {
      withoutIssues.push(link);
    }
  });
  return {items:{error:withIssues,success:withoutIssues},issues:issues,total:arr.length};
}


function formatMetaData(obj,issues,tests){
    var keys = ['type','found','message'/*,'_id''requestId'*/];
    return reduceObj(obj,keys,issues,tests);
}

function processMetaData(arr){
  var issues = {
    notFound:0,
    total:0
  }

  var tests = [function(issues,obj){
    if(obj.found !== true){
      issues.notFound++
      issues.total++
      return true;
    }
  }]

  var withIssues = [];
  var withoutIssues = [];
  console.log('here...');
  _.each(arr,function(metaData){
    console.log('here...');
    metaData = formatMetaData(metaData,issues,tests);
    console.log('here...');
    if(metaData._hasIssue === true){
      withIssues.push(metaData);
    } else {
      withoutIssues.push(metaData);
    }
  });
  console.log('issues',issues);
  return {items:{error:withIssues,success:withoutIssues},issues:issues,total:arr.length};
}

function processScan(obj){
  console.log('here');
    return {
      resources: processResources(obj.Resource),
      links: processLinks(obj.Link),
      // captures: processCaptures(obj.Capture),
      // security: processResources(obj.Security),
      metaData: processMetaData(obj.MetaData),
      // issues: processResources(obj.Issue)

    }
}

exports.generateReport = function (id, type, status) {
     if (status === 'error') {
          /* Send an email about error */

     } else {
          getManyBy([{
                    name: 'Resource',
                    obj: Resource
               },
               {
                    name: 'Issue',
                    obj: Issue
               },
               {
                    name: 'Security',
                    obj: Security
               },
               {
                    name: 'MetaData',
                    obj: MetaData
               },
               {
                    name: 'Captures',
                    obj: Captures
               },
               {
                    name: 'Link',
                    obj: Link
               }
          ], 'requestId', id).then(function (resp) {
               console.log('GET MANY BY');
              var obj = convertArrayToObject(resp);
              processScan(obj);
                //  var fs = require('fs');
                //  console.log('obj',obj);
  // var stream = fs.createWriteStream("my_file2.txt");
  // stream.once('open', function(fd) {
  //   stream.write(JSON.stringify(obj));
  //   stream.end();
  // });

            }).catch(function (err) {

            });
     }
}

exports.getDefault = function (req, res) {
     console.log('dashboard-controller Permission', req);
     var user = req.user.identity;

     var form = {},
          error = null,
          formFlash = req.flash('form'),
          errorFlash = req.flash('error');

     if (formFlash.length) {
          form.email = formFlash[0].email;
     }
     if (errorFlash.length) {
          error = errorFlash[0];
     }

     res.render(req.render, {
          // permissions: permissions[user.plan],
          // activity: activity[0],
          apiToken: req.user.apiToken,
          user: user,
          form: form,
          error: error,
          // scans: scans,
          // plans: plans
     });
     return;

     utils.getScans(Request, Scan, user, function (err, scans) {
          console.log('scans', scans.list.length);
          if (err !== null) {
               res.render('errors', {
                    msg: 'We had problems locating your plan type, please try again later.'
               });
          }
          utils.findSomeBy(Activity, {
               oid: user.oid
          }, function (err, activity) {
               console.log('ACTIVITY', activity);
               if (activity) {
                    res.render(req.render, {
                         permissions: permissions[user.plan],
                         activity: activity[0],
                         user: user,
                         form: form,
                         error: error,
                         scans: scans,
                         plans: plans
                    });
               } else {
                    res.render('errors', {
                         msg: 'We had problems locating your history please try again later.'
                    });
               }
          });
     });

};

exports.convertArrayToObject = convertArrayToObject;
