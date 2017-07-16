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

module.exports = function (app) {

     // homepage and dashboard
     app.get('/',
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

     app.get('/logout',
          setRedirect({
               auth: '/',
               success: '/'
          }),
          isAuthenticated,
          sessions.logout);

     // registrations
     app.get('/signup',
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
     app.get('/forgot',
          setRedirect({
               auth: '/dashboard'
          }),
          isUnauthenticated,
          setRender('pages/forgot-password'),
          passwords.getForgotPassword);

     app.post('/forgot',
          setRedirect({
               auth: '/dashboard',
               success: 'pages/forgot-password',
               failure: 'pages/forgot-password'
          }),
          isUnauthenticated,
          passwords.postForgotPassword);

     // reset tokens
     app.get('/reset/:token/:uid',
          setRedirect({
               auth: '/dashboard',
              //  success: '/dashboard',
               failure: 'pages/forgot-password'
          }),
          isUnauthenticated,
          setRender('pages/reset-password'),
          passwords.getToken);

     app.post('/reset/:token/:uid',
          setRedirect({
               auth: '/dashboard',
               success: '/dashboard',
               failure: 'back'
          }),
          isUnauthenticated,
          passwords.postToken);

     app.get('/dashboard',
          setRender('pages/dashboard'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          dashboard.getDefault);

     app.get('/scan',
          setRender('pages/scan/index'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          scan.getDefault);

     app.get('/summary',
          setRender('pages/summary'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          summary.getDefault);

      app.get('/issues',
           setRender('pages/issues'),
           setRedirect({
                auth: '/'
           }),
           isAuthenticated,
           issues.getDefault);

     app.get('/billing',
          setRender('pages/billing'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          dashboard.getBilling);

     app.get('/activity',
          setRender('pages/activity'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          dashboard.getActivity);

     app.get('/profile',
          setRender('pages/profile'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          dashboard.getProfile);

     app.get('/users',
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

    app.get('/tests',
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

     app.post('/embed/scan',
       embedScan
     );
};
