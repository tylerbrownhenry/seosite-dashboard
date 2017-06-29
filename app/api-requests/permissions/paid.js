var Permission = require('../../models/index').permission;

var permission = {
     label: 'paid',
     limits: {
          monthly: {
               request: 1000,
          },
          daily: {
               request: 1000,
          }
     },
     restrictions: {
          type: {
               page: true,
          },
          captures: true,
          links: true,
          security: true
     }
};
module.exports = new Permission(permission);
