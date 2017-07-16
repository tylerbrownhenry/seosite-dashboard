'use strict';

// middleware
var StripeWebhook = require('stripe-webhook-middleware'),
     isAuthenticated = require('./middleware/auth').isAuthenticated,
     isUnauthenticated = require('./middleware/auth').isUnauthenticated,
     apiIsUnauthenticated = require('./middleware/auth').apiIsUnauthenticated,
     apiCallback = require('./controllers/api-callback-controller.js'),
     setRender = require('middleware-responder').setRender,
     setRedirect = require('middleware-responder').setRedirect,
     stripeEvents = require('./config/stripe-events'),
     secrets = require('./config/secrets');
// controllers
var users = require('./controllers/users-controller'),
     scan = require('./controllers/scan-controller'),
     main = require('./controllers/main-controller'),
     //  queue = require('./controllers/queue-controller'),
     dashboard = require('./controllers/dashboard-controller'),
     summary = require('./controllers/summary-controller'),
     issues = require('./controllers/issues-controller'),
     passwords = require('./controllers/passwords-controller'),
     registrations = require('./controllers/registrations-controller'),
     sessions = require('./controllers/sessions-controller');

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
          setRender('forgot'),
          passwords.getForgotPassword);

     app.post('/forgot',
          setRedirect({
               auth: '/dashboard',
               success: '/forgot',
               failure: '/forgot'
          }),
          isUnauthenticated,
          passwords.postForgotPassword);

     // reset tokens
     app.get('/reset/:token/:uid',
          setRedirect({
               auth: '/dashboard',
              //  success: '/dashboard',
               failure: '/forgot'
          }),
          isUnauthenticated,
          setRender('reset'),
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
          setRender('dashboard/index'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          dashboard.getDefault);

     app.get('/scan',
          setRender('main/index'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          scan.getDefault);

     app.get('/summary',
          setRender('dashboard/summary'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          summary.getDefault);
     //
     //  app.get('/issues',
     //       setRender('dashboard/issues'),
     //       setRedirect({
     //            auth: '/'
     //       }),
     //       isAuthenticated,
     //       issues.getDefault);

     app.get('/billing',
          setRender('dashboard/billing'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          dashboard.getBilling);

     app.get('/activity',
          setRender('dashboard/activity'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          dashboard.getActivity);

     app.get('/profile',
          setRender('dashboard/profile'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
          dashboard.getProfile);

     app.get('/users',
          setRender('dashboard/users'),
          setRedirect({
               auth: '/'
          }),
          isAuthenticated,
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
};
