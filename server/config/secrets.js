module.exports = {

  db: process.env.MONGODB || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://seodoctor:ep1uTSDD81FMOLCd0zbE@ds159208.mlab.com:59208/stripe-users',

    // db: {
    //   "service": "mongodb",
    //   "host": "seodoctor:ep1uTSDD81FMOLCd0zbE@ds159208.mlab.com:59208",
    //   "database": "stripe-users"
    // },



  sessionSecret: process.env.SESSION_SECRET || 'diNo$aursarelikebyfarthecoolestthing3v3r',

  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY || '',
    domain: process.env.MAILGUN_DOMAIN || ''
  },

  stripeOptions: {
    apiKey: process.env.STRIPE_KEY || 'sk_test_lffMuPNEqBHdXBkrrwkm6tAu',
    stripePubKey: process.env.STRIPE_PUB_KEY || 'pk_test_zLPoI7V9Tbhnh5iw6M4gkuOY',
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
