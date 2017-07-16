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
	'invoice.payment_failed': {
    text: "Your payment has failed, try updating your credit card in your account settings. The next payment attempt will occur on {next_payment_attempt}",
    title: "Payment Failed",
    subject: "Payment Failed"
  },
	'invoice.payment_failed_last': {
    text: "The final attempt for payment has failed. Your account has been suspended.",
    title: "Final Payment Failed, Account suspended",
    subject: "Payment Failed, Account suspended"
  },
	'user-sign-up':{
		title: "Thanks for signing up!",
		subject: "Thanks for signing up!",
		text: 'Hello,<br><br>Thank you for signing up!<br><br>'
	},
	'card-added':{
		title: "Thanks for adding a card to your account",
		subject: "Thanks for adding a card to your account",
		text: 'You\'ve added a credit card to your account'
	},
	'subscription-added':{
		title: "You\'ve subscribed to a plan",
		subject: "You've subscribed to our {subscriptionId} plan'",
		text: "You've subscribed to our {subscriptionId} plan"
	},
	'subscription-cancelled-at-period-end':{
		title: "You\'ve cancelled your plan",
		subject: "You've cancelled your {planName} plan', it will end on {periodEnd}.",
		text: "You've cancelled your {planName} plan, it will end on {periodEnd}"
	},
	'subscription-added-now':{
		title: "You\'ve subscribed to a plan",
		subject: "You've cancelled your {planName} plan', it will end immediately.",
		text: "You've cancelled your {planName} plan, it will end immediately"
	},
	'sub-account-user-sign-up':{
		title: "A user has been added to your account",
		subject: "A user with the email: {email} has been added to your account.",
		text: "A user with the email: {email} has been added to your account."
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
				console.log('res.subject',input,res.subject);
      } else {
        console.log('Email template does not exist:',key);
      }
      return res;
  }
};
