
var __cov_WTyMaA9KdPrq1XQE6bMqJw = (Function('return this'))();
if (!__cov_WTyMaA9KdPrq1XQE6bMqJw.__coverage__) { __cov_WTyMaA9KdPrq1XQE6bMqJw.__coverage__ = {}; }
__cov_WTyMaA9KdPrq1XQE6bMqJw = __cov_WTyMaA9KdPrq1XQE6bMqJw.__coverage__;
if (!(__cov_WTyMaA9KdPrq1XQE6bMqJw['app/config/secrets.js'])) {
   __cov_WTyMaA9KdPrq1XQE6bMqJw['app/config/secrets.js'] = {"path":"app/config/secrets.js","s":{"1":0,"2":0},"b":{"1":[0,0,0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0],"8":[0,0]},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":27}},"2":{"start":{"line":2,"column":0},"end":{"line":51,"column":2}}},"branchMap":{"1":{"line":4,"type":"binary-expr","locations":[{"start":{"line":4,"column":9},"end":{"line":4,"column":42}},{"start":{"line":4,"column":46},"end":{"line":4,"column":70}},{"start":{"line":4,"column":74},"end":{"line":4,"column":97}},{"start":{"line":4,"column":101},"end":{"line":4,"column":166}}]},"2":{"line":5,"type":"binary-expr","locations":[{"start":{"line":5,"column":15},"end":{"line":5,"column":41}},{"start":{"line":5,"column":45},"end":{"line":5,"column":47}}]},"3":{"line":6,"type":"binary-expr","locations":[{"start":{"line":6,"column":20},"end":{"line":6,"column":46}},{"start":{"line":6,"column":50},"end":{"line":6,"column":52}}]},"4":{"line":9,"type":"binary-expr","locations":[{"start":{"line":9,"column":18},"end":{"line":9,"column":45}},{"start":{"line":9,"column":49},"end":{"line":9,"column":51}}]},"5":{"line":10,"type":"binary-expr","locations":[{"start":{"line":10,"column":18},"end":{"line":10,"column":44}},{"start":{"line":10,"column":48},"end":{"line":10,"column":50}}]},"6":{"line":14,"type":"binary-expr","locations":[{"start":{"line":14,"column":18},"end":{"line":14,"column":40}},{"start":{"line":14,"column":44},"end":{"line":14,"column":46}}]},"7":{"line":15,"type":"binary-expr","locations":[{"start":{"line":15,"column":24},"end":{"line":15,"column":50}},{"start":{"line":15,"column":54},"end":{"line":15,"column":56}}]},"8":{"line":50,"type":"binary-expr","locations":[{"start":{"line":50,"column":22},"end":{"line":50,"column":50}},{"start":{"line":50,"column":54},"end":{"line":50,"column":56}}]}}};
}
__cov_WTyMaA9KdPrq1XQE6bMqJw = __cov_WTyMaA9KdPrq1XQE6bMqJw['app/config/secrets.js'];
__cov_WTyMaA9KdPrq1XQE6bMqJw.s['1']++;require('dotenv').config();__cov_WTyMaA9KdPrq1XQE6bMqJw.s['2']++;module.exports={db:(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['1'][0]++,process.env.AWS_DYNAMODB_ENDPOINT)||(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['1'][1]++,process.env.MONGOLAB_URI)||(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['1'][2]++,process.env.MONGOHQ_URL)||(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['1'][3]++,'mongodb://'+process.env.MONGO_URL+'/'+process.env.MONGO_DB),apiToken:(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['2'][0]++,process.env.SESSION_SECRET)||(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['2'][1]++,''),sessionSecret:(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['3'][0]++,process.env.SESSION_SECRET)||(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['3'][1]++,''),mailgun:{apiKey:(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['4'][0]++,process.env.MAILGUN_API_KEY)||(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['4'][1]++,''),domain:(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['5'][0]++,process.env.MAILGUN_DOMAIN)||(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['5'][1]++,'')},stripeOptions:{apiKey:(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['6'][0]++,process.env.STRIPE_KEY)||(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['6'][1]++,''),stripePubKey:(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['7'][0]++,process.env.STRIPE_PUB_KEY)||(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['7'][1]++,''),defaultPlan:'free',plans:['free','monthlypersonal','annualpersonal','monthlysmallbusiness','annualsmallbusiness','monthlycorporate','annualcorporate'],planData:{'free':{name:'Free',price:0},'monthlypersonal':{name:'Monthly Personal',price:9},'monthlysmallbusiness':{name:'Monthly Small Business',price:9},'monthlycorporate':{name:'Monthly Coporate',price:9},'annualpersonal':{name:'Annual Personal',price:19},'annualsmallbusiness':{name:'Annual Small Business',price:29},'annualcorporate':{name:'Annual Corporate',price:29}}},googleAnalytics:(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['8'][0]++,process.env.GOOGLE_ANALYTICS)||(__cov_WTyMaA9KdPrq1XQE6bMqJw.b['8'][1]++,'')};
