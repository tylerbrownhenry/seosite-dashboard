
var __cov__1S9NrL2FplQGxlh0ODfkg = (Function('return this'))();
if (!__cov__1S9NrL2FplQGxlh0ODfkg.__coverage__) { __cov__1S9NrL2FplQGxlh0ODfkg.__coverage__ = {}; }
__cov__1S9NrL2FplQGxlh0ODfkg = __cov__1S9NrL2FplQGxlh0ODfkg.__coverage__;
if (!(__cov__1S9NrL2FplQGxlh0ODfkg['app/api-requests/requests.js'])) {
   __cov__1S9NrL2FplQGxlh0ODfkg['app/api-requests/requests.js'] = {"path":"app/api-requests/requests.js","s":{"1":0,"2":1,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0},"b":{},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"requests","line":8,"loc":{"start":{"line":8,"column":0},"end":{"line":8,"column":26}}},"2":{"name":"(anonymous_2)","line":9,"loc":{"start":{"line":9,"column":29},"end":{"line":9,"column":45}}},"3":{"name":"(anonymous_3)","line":12,"loc":{"start":{"line":12,"column":33},"end":{"line":12,"column":53}}},"4":{"name":"(anonymous_4)","line":15,"loc":{"start":{"line":15,"column":19},"end":{"line":15,"column":36}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":2,"column":61}},"2":{"start":{"line":8,"column":0},"end":{"line":20,"column":1}},"3":{"start":{"line":9,"column":5},"end":{"line":19,"column":8}},"4":{"start":{"line":10,"column":10},"end":{"line":10,"column":58}},"5":{"start":{"line":11,"column":10},"end":{"line":11,"column":50}},"6":{"start":{"line":12,"column":10},"end":{"line":18,"column":13}},"7":{"start":{"line":13,"column":14},"end":{"line":13,"column":74}},"8":{"start":{"line":14,"column":14},"end":{"line":14,"column":70}},"9":{"start":{"line":16,"column":14},"end":{"line":16,"column":69}},"10":{"start":{"line":17,"column":14},"end":{"line":17,"column":67}},"11":{"start":{"line":22,"column":0},"end":{"line":22,"column":26}}},"branchMap":{}};
}
__cov__1S9NrL2FplQGxlh0ODfkg = __cov__1S9NrL2FplQGxlh0ODfkg['app/api-requests/requests.js'];
__cov__1S9NrL2FplQGxlh0ODfkg.s['1']++;var pageScan=require('./requests/pageScan'),PageScanOptions=require('./requests/pageScanOptions');function requests(socket){__cov__1S9NrL2FplQGxlh0ODfkg.f['1']++;__cov__1S9NrL2FplQGxlh0ODfkg.s['3']++;socket.on('queue/page',function(data){__cov__1S9NrL2FplQGxlh0ODfkg.f['2']++;__cov__1S9NrL2FplQGxlh0ODfkg.s['4']++;console.log('requests.js queue/page -->',data);__cov__1S9NrL2FplQGxlh0ODfkg.s['5']++;var options=new PageScanOptions(data);__cov__1S9NrL2FplQGxlh0ODfkg.s['6']++;pageScan(options).then(function(response){__cov__1S9NrL2FplQGxlh0ODfkg.f['3']++;__cov__1S9NrL2FplQGxlh0ODfkg.s['7']++;console.log('requests.js queue/page --> success',response);__cov__1S9NrL2FplQGxlh0ODfkg.s['8']++;socket.emit('update/'+data.token+'/'+data.uid,response);}).catch(function(error){__cov__1S9NrL2FplQGxlh0ODfkg.f['4']++;__cov__1S9NrL2FplQGxlh0ODfkg.s['9']++;console.log('requests.js queue/page --> error',error);__cov__1S9NrL2FplQGxlh0ODfkg.s['10']++;socket.emit('update/'+data.token+'/'+data.uid,error);});});}__cov__1S9NrL2FplQGxlh0ODfkg.s['11']++;module.exports=requests;
