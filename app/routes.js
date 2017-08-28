'use strict';

// middleware
var StripeWebhook = require('stripe-webhook-middleware'),
     isAuthenticated = require('./middleware/auth').isAuthenticated,
     isUnauthenticated = require('./middleware/auth').isUnauthenticated,
     apiIsUnauthenticated = require('./middleware/auth').apiIsUnauthenticated,
     setRender = require('middleware-responder').setRender,
     setRedirect = require('middleware-responder').setRedirect,
     stripeEvents = require('./config/stripe-events'),
     secrets = require('./config/secrets');
// controllers
var users = require('./controllers/pages/user/users-controller'),
     main = require('./controllers/pages/main-controller'),
     /*
      Scan Controllers
      */
      //  queue = require('./controllers/scan/deleting--notsure--queue-controller'),
     scan = require('./controllers/pages/scan/scan-controller'),
     apiCallback = require('./controllers/pages/scan/api-callback-controller.js'),
     summary = require('./controllers/pages/scan/summary-controller'),
     issues = require('./controllers/pages/scan/issues-controller'),
     customize = require('./controllers/customize/customize-controller'),

     dashboard = require('./controllers/pages/dashboard-controller'),
     passwords = require('./controllers/pages/user/passwords-controller'),
     registrations = require('./controllers/pages/user/registrations-controller'),
     sessions = require('./controllers/pages/user/sessions-controller'),

     createHash = require('./controllers/embed/embed-controller').createHash,
     embedScan = require('./controllers/embed/embed-controller').embedScan;

var stripeWebhook = new StripeWebhook({
     stripeApiKey: secrets.stripeOptions.apiKey,
     respond: true
});

module.exports = function (app,passport,AWS) {
     // homepage and dashboard
     app.get('/:oid/',
          setRedirect({
               auth: '/dashboard'
          }),
          isUnauthenticated,
          setRender('index'),
          main.getHome);

     // sessions
     app.post('/login',
          setRedirect({
               auth: '/dashboard',
               success: '/dashboard',
               failure: '/'
          }),
          isUnauthenticated,
          sessions.postLogin);

     app.get('/:oid/logout',
          setRedirect({
               auth: '/',
               success: '/'
          }),
          isAuthenticated,
          sessions.logout);

     // registrations
     app.get('/:oid/signup',
          setRedirect({
               auth: '/dashboard'
          }),
          isUnauthenticated,
          setRender('pages/signup'),
          registrations.getSignup);

     app.post('/signup',
          setRedirect({
               auth: '/dashboard',
               success: '/dashboard',
               failure: '/signup'
          }),
          isUnauthenticated,
          registrations.postSignup);

     // forgot password
     app.get('/:oid/forgot',
          setRedirect({
               auth: '/dashboard'
          }),
          isUnauthenticated,
          setRender('pages/forgot-password'),
          passwords.getForgotPassword);

     app.post('/:oid/forgot',
          setRedirect({
               auth: '/dashboard',
               success: 'pages/forgot-password',
               failure: 'pages/forgot-password'
          }),
          isUnauthenticated,
          passwords.postForgotPassword);

     // reset tokens
     app.get('/:oid/reset/:token/:uid',
          setRedirect({
               auth: '/dashboard',
              //  success: '/dashboard',
               failure: 'pages/forgot-password'
          }),
          isUnauthenticated,
          setRender('pages/reset-password'),
          passwords.getToken);

     app.post('/:oid/reset/:token/:uid',
          setRedirect({
               auth: '/dashboard',
               success: '/dashboard',
               failure: 'back'
          }),
          isUnauthenticated,
          passwords.postToken);

     app.get('/:oid/dashboard',
          setRender('pages/dashboard'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          dashboard.getDefault);

     app.get('/:oid/scan',
          setRender('pages/scan/index'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          scan.getDefault);


    app.get('/:oid/scan/:requestId/report',
         setRender('pages/scan/report'),
         setRedirect({
              auth: '/'
         }),
         isAuthenticated,
         scan.generateReport);

     app.get('/:oid/summary',
          setRender('pages/summary'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          summary.getDefault);

      app.get('/:oid/issues',
           setRender('pages/issues'),
           setRedirect({
                auth: '/'
           }),
           isAuthenticated,
           issues.getDefault);

     app.get('/:oid/billing',
          setRender('pages/billing'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          dashboard.getBilling);

     app.get('/:oid/activity',
          setRender('pages/activity'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          dashboard.getActivity);

     app.get('/:oid/profile',
          setRender('pages/profile'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          dashboard.getProfile);

     app.get('/:oid/users',
          setRender('pages/admin/users'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          function(req,res,next){
            next();
            console.log('check that are admin req',req.user);
          },
          dashboard.getUsers);

    app.get('/:oid/tests',
         setRender('pages/admin/admin-test'),
         setRedirect({
              auth: '/'
         }),
         isAuthenticated,
         function(req,res,next){
           next();
           console.log('check that are admin req',req.user);
         },
         dashboard.getUsers);

     app.post('/user',
          setRedirect({
               auth: '/',
               success: '/profile',
               failure: '/profile'
          }),
          isAuthenticated,
          users.postProfile);

     app.post('/user/billing',
          setRedirect({
               auth: '/',
               success: '/billing',
               failure: '/billing'
          }),
          isAuthenticated,
          users.postBilling);

     app.post('/user/plan',
          setRedirect({
               auth: '/',
               success: '/billing',
               failure: '/billing'
          }),
          isAuthenticated,
          users.postPlan);

     app.post('/user/password',
          setRedirect({
               auth: '/',
               success: '/profile',
               failure: '/profile'
          }),
          isAuthenticated,
          passwords.postNewPassword);

     app.post('/user/delete',
          setRedirect({
               auth: '/',
               success: '/'
          }),
          isAuthenticated,
          users.deleteAccount);

     // use this url to receive stripe webhook events
     app.post('/stripe/events',
          stripeWebhook.middleware,
          stripeEvents
     );

     app.post('/callback',
          apiIsUnauthenticated,
          apiCallback
     );

     app.post('/embed/',
       createHash
     );

     var multer = require('multer'),
      multerS3 = require('multer-s3');



  // var upload = multer({
  //     storage: s3({
  //         dirname: '/',
  //         bucket: 'bucket-name',
  //         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //         region: process.env.AWS_REGION,
  //         filename: function (req, file, cb) {
  //             cb(null, file.originalname); //use Date.now() for unique file keys
  //         }
  //     })
  // });

  var s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  // var s3 = new aws.S3({ /* ... */ })

  var upload = multer({
    storage: multerS3({
      s3: s3,
      acl: "public-read",
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })

  app.post('/upload', upload.array('image',1),function(req,res){
    return customize.uploadLogo(req,res);
  })

   app.post('/embed/scan',
     embedScan
   );
};
