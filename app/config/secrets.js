require('dotenv').config();
module.exports = {

     db: process.env.AWS_DYNAMODB_ENDPOINT || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://' + process.env.MONGO_URL + '/' + process.env.MONGO_DB,
     apiToken: process.env.SESSION_SECRET || '',
     sessionSecret: process.env.SESSION_SECRET || '',

     mailgun: {
          apiKey: process.env.MAILGUN_API_KEY || '',
          domain: process.env.MAILGUN_DOMAIN || ''
     },

     stripeOptions: {
          apiKey: process.env.STRIPE_KEY || '',
          stripePubKey: process.env.STRIPE_PUB_KEY || '',
          defaultPlan: 'free',
          plans: ['free', 'monthlypersonal', 'annualpersonal', 'monthlysmallbusiness','annualsmallbusiness','monthlycorporate','annualcorporate'],
          planData: {
               'free': {
                    name: 'Free',
                    price: 0
               },
               'monthlypersonal': {
                    name: 'Monthly Personal',
                    price: 9
               },
               'monthlysmallbusiness': {
                    name: 'Monthly Small Business',
                    price: 9
               },
               'monthlycorporate': {
                    name: 'Monthly Coporate',
                    price: 9
               },
               'annualpersonal': {
                    name: 'Annual Personal',
                    price: 19
               },
               'annualsmallbusiness': {
                    name: 'Annual Small Business',
                    price: 29
               },
               'annualcorporate': {
                    name: 'Annual Corporate',
                    price: 29
               }
          }
     },

     googleAnalytics: process.env.GOOGLE_ANALYTICS || ''
};
