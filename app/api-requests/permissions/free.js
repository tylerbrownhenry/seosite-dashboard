var Permission = require('../../models/index').permission;

var permission = {
     label: 'free',
     limits: {
          monthly: {
               request: 100,
          },
          daily: {
               request: 5,
          }
     },
     restrictions: {
          type: {
               page: true,
          },
          captures: false,
          links: false,
          security: false
     }
};
module.exports = new Permission(permission);
