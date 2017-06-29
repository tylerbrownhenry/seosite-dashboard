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
               "captures": data.captures,
               "links": data.links,
               "security": data.security,
               "type": data.type,
          }
     };
}
module.exports = Option;
