fair warning: Most of this readme is out of date or just notes, as this was a personal project.


# Overview

This is the front dashboard of a node/strip dashboard with a backend that scanned websites for seo compatibility

Set config vars to
key:API_HOST value:https://limitless-cove-68401.herokuapp.com/

Testing Webhooks Locally:
 npm install -g stripe-local

 Then
 stripe-local --key sk_test_lffMuPNEqBHdXBkrrwkm6tAu --url http://localhost:3000/stripe/events


Card that saves but fails to charge:
4000000000000341


npm install -g gulp for semantic

npm install semantic-ui --save
cd semantic/
gulp build

# Node Stripe Membership SaaS

This project is a boilerplate express app for creating a membership/subscription site with [Stripe](https://stripe.com), [Mailgun](https://mailgun.com/signup), mongodb and swig. Inspired by [sahat/hackathon-starter](https://github.com/sahat/hackathon-starter) and [RailsApps/rails-stripe-membership-saas](https://github.com/RailsApps/rails-stripe-membership-saas). It also handles stripe webhooks.

Check out the [demo](https://node-stripe-membership-saas.herokuapp.com/dashboard)!

<a href="https://node-stripe-membership-saas.herokuapp.com/dashboard">
    <img src="https://a16545fb495c8760fb33-4cec33efbe2744e99ba863e52edb2075.ssl.cf2.rackcdn.com/stripe-membership-app-screenshot.png">
</a>

### System Requirements

- mongodb
- nodejs

### Getting Started

First update `/app/config/secrets.js` with the following credentials:

- Stripe [API keys](https://dashboard.stripe.com/account/apikeys) and [plan info](https://dashboard.stripe.com/test/plans)
- [Mailgun](https://mailgun.com/signup) for sending forgot/reset password confirmations.
- session secret
- google analytics id

Install dependencies with `npm install`.

Start the server with `node server`.

Note: Stripe webhooks can be recieved at `https://your-url.com/stripe/events`.

### Heroku Deployment

```
heroku create your-awesome-saas-product
heroku addons:add mongohq
heroku config:set SESSION_SECRET='your_secret';
heroku config:set STRIPE_KEY='sk_test_example'
heroku config:set STRIPE_PUB_KEY='pk_test_example'
heroku config:set MAILGUN_USER='example.org'
heroku config:set MAILGUN_PASSWORD='key-secret'
heroku config:set GOOGLE_ANALYTICS='UA-XXXXXX-1'
```

Want add a heroku deploy button? Pull requests welcome :]



# node-testing

To run the following tests:

```
npm install
npm install --global mocha (If need mocha)
mocha tests --recursive --watch

grunt

Structure
-assets
--js
--css
--less
Gruntfile.js
package.json
results.txt (Generated by mocha tests)
-src
-tests
```

npm init
Install Grunt CLI as global:
npm install -g grunt-cli
Install Grunt in your local project:
npm install grunt --save-dev
Install any Grunt Module you may need in your build process. Just for sake of this sample I will add Concat module for combining files together:
npm install grunt-contrib-concat --save-dev

Install DynamoDB
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html
(Install Java As Well)

Download Node SDK
https://aws.amazon.com/sdk-for-node-js/
npm install aws-sdk












# dynamoose-demo

Download DynaDB
http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html

Install Java
http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

Start Dyna
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 9000
If want to change port add -port <PORT NUMBER> //9000


Install AWS CLI
http://docs.aws.amazon.com/cli/latest/userguide/cli-install-macos.html

Run
aws configure
AWS Access Key ID [None]: <YOUR MADE UP ID>
AWS Secret Access Key [None]: <YOUR MADE UP KEY>
Default region name [None]: <YOUR REGION> // us-west-2
Default output format [None]: json

Add to project's .env file
AWS_ACCESS_KEY_ID=<YOUR MADE UP ID>
AWS_SECRET_ACCESS_KEY=<YOUR MADE UP KEY>
AWS_ENDPOINT=http://localhost:9000
AWS_REGION= <YOUR REGION> // us-west-2

Try It!
node testListTable.js









Local RABBITMQ

With Homebrew

Command

brew install rabbitmq
Add: PATH=$PATH:/usr/local/sbin to your .bash_profile or .profile.rabbitmq-server
Open new terminal window:
./rabbitmq-server
(If path doesnt work, you can always go to usr/local/sbin/) and run the command there)

More : https://www.rabbitmq.com/install-homebrew.html

Creating a local user:

rabbitmqctl add_user test test
rabbitmqctl set_user_tags test administrator
rabbitmqctl set_permissions -p / test ".*" ".*" ".*"

RabbitMQ Manager:
http://localhost:15672
