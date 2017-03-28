function formatDate(date){
    if(typeof date === 'undefined'){
        return null;
    }
    var seconds = Math.floor((new Date() - moment(date)) / 1000);
    var interval = Math.floor(seconds / 31536000);
    interval = Math.floor(seconds / 2592000);
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return moment(date).format('MMMM Do - h:mm a').toString();
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    if(seconds < 10){
        return 'just now';
    } else if(seconds < 60) {
        return 'less than a minute ago';
    } else {
        return 'about a minute ago';
    }
}

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

function handlScan(name,requestId){
    socket.emit('handleScan', {
        uid:window.uid,
        token:window.apiToken,
        currentPage:window.currentPage,
        requestId:requestId,
        action:name
    });
}
