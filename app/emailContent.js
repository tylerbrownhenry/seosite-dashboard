String.prototype.supplant = function (o) {
	return this.replace(
		/{([^{}]*)}/g,
		function (a, b) {
			var r = o[b];
			return typeof r === 'string' || typeof r === 'number' ? r : a;
		}
	);
};

var messages = {
  'invoice.created': {
    text: "You have an upcoming payment to SeoDr.com in the amount of ${amount_due}",
    title: "Preparing for payment",
    subject: "Upcoming payment"
  },
	'invoice.payment_succeeded': {
    text: "We have processed your payment successfully. Your new subscription period is from {periodStart} to {periodEnd}.",
    title: "Thank you for your payment",
    subject: "Thank you for your payment"
  },
	'user-sign-up':{
		title: "Thanks for signing up!",
		subject: "Thanks for signing up!",
		text: 'Hello,<br><br>Thank you for signing up!<br><br>'
	}

}

module.exports = {
  process: function(key,input){
      var res = {
        send: false
      };
      if(messages[key]){
        res.send = true;
        res.title = messages[key].title.supplant(input);
        res.text = messages[key].text.supplant(input);
        res.subject = messages[key].subject.supplant(input);
      } else {
        console.log('Email template does not exist:',key);
      }
      return res;
  }
};
