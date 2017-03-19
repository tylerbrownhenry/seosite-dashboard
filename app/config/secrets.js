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
          plans: ['free', 'silver', 'gold', 'platinum'],
          planData: {
               'free': {
                    name: 'Free',
                    price: 0
               },
               'silver': {
                    name: 'Silver',
                    price: 9
               },
               'gold': {
                    name: 'Gold',
                    price: 19
               },
               'platinum': {
                    name: 'Platinum',
                    price: 29
               }
          }
     },

     googleAnalytics: process.env.GOOGLE_ANALYTICS || ''
};
