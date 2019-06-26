let mailer = require('nodemailer');
let conf = require('../config/mail');
let _ = require('lodash');

let selfSignedConfig = {
  host: 'mail.starlux-airlines.com',
  port: 25,
};

class sendMail {
  send(serviceName) {
    let users = conf;
    // console.log(users.mail);
    let transporter = mailer.createTransport(selfSignedConfig);
    let mailOptions = {
      from: 'service@starlux-airlines.com', // sender address (who sends)
      to: _.toArray(users), // list of receivers (who receives)
      subject: 'Service down',
      html:
        '<p>The following services are down</p>' +
        '<p>[' +
        _.toString(serviceName) +
        ']</p>' +
        '<p>check server status ASAP.</p>',
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
  }
}

module.exports = new sendMail();
