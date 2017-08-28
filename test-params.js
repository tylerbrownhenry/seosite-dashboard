var _ = require('underscore');
// const { URL } = require('url');
// let params;

const querystring = require('querystring');
// const { URL } = require('url');
// let params;
// console.log('URL',URL.parse('https://example.org/?abc=123'));
// console.log('URLSearchParams',URLSearchParams);
// new URLSearchParams({
	// key: "value"
// });




//
// const myURL = new URL('https://example.org/?abc=123');
// console.log(new URLSearchParams({key:myURL}));


// return;

var links = [
'/adwords/answer/2616012?hl=en&ref_topic=24937',
'/home',
'/home&test',
'/home',
'/home?test',
'http://www.werars.com/home?test=test&trerst=fgdfg',
'http://www.werars.com/home'

]

_.each(links,function(link){

  console.log(_.keys(querystring.parse(link.split('?')[1],null,null)).length > 0);

  // console.log();
  // console.log(link,URL);
})
