/**
 * Options Constructor
 * @param {Object} data object, requires properties: uid,url,page,type,temp_id,token
 */
function Option(data) {
     return {
          "uid": data.uid,
          "oid": data.oid,
          "url": data.url,
          "source": data.source,
          "requestType": data.requestType,
          "scanGroup": data.scanGroup,
          "type": data.type,
          "temp_id": data.temp_id,
          "token": data.token,
          "options": {
               "captures": data.captures,
               "links": data.links,
               "security": data.security,
               "type": data.type,
               "save": {
                 "resources":true,
                 "links":true,
                 "security":true,
                 "metaData":true,
                 "captures":true
               }
          }
     };
}
module.exports = Option;
