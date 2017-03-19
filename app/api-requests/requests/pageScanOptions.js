/**
 * Options Constructor
 * @param {Object} data object, requires properties: uid,url,page,type,temp_id,token
 */
function Option(data) {
     return {
          "uid": data.uid,
          "url": data.url,
          "page": data.page,
          "type": data.type,
          "temp_id": data.temp_id,
          "token": data.token,
          "options": {
               "save": {
                    "captures": false,
                    "scan": true,
                    "resources": true,
                    "metaData": true,
                    "links": true
                    // "captures": data.saveCaptures,
                    // "scan": data.saveScan,
               },
               "check": {
                    // "links":data.checkLinks,
                    // "resources":data.checkResources,
                    // "security":data.checkSecurity,
                    // "meta":data.checkMeta
                    "links": true,
                    "resources": true,
                    "security": true,
                    "meta": true
               },
               "type": 'page',
               "filterLimit": 10,
               "digDepthLimit": 1,
               "excludeExternalLinks": false,
               "honorRobotExclusions": true,
               "excludedSchemes": false,
               "saveSelectors": false,
               "linkInformation": {
                    "selector": false,
                    "element": false,
                    "location": false,
                    "redirects": false,
                    "status": false,
                    "url": false,
                    "href": false,
                    "parent": false
               },
               "acceptedSchemes": ['http']
          }
     };
}
module.exports = Option;
