'use strict';

const util = require('../utils/util');
const mail = require('../module/mail');
const _ = require('lodash');

class statusController {
  constructor() {
    this.overview = this.overview.bind(this);
    this.getStatus = this.getStatus.bind(this);
  }

  async overview(req, res) {
    // let test = _.forEach(util.serverConf(), (v) => {
    //   delete v.alert;
    // });
    // console.log(JSON.stringify(util.getTestLoads(test)));
    let status = await util.checkService(util.serverConf());
    this.getDownService(status);
    req.log.server(status);
    // res.send(500);
    res.json(status);
  }

  async getStatus(req, res) {
    let host = util.getServer(req.params.hostname);
    let status = await util.checkService([host]);
    this.getDownService(status);
    req.log.server(status);
    res.json(status);
  }

  getDownService(obj) {
    let down = _.pickBy(obj, (service) => {
      return !service.status && service.alert;
    });
    // console.log(_.keys(down));
    if (down.length > 0) {
      let test = _.groupBy(down, (n) => {
        return n.name;
      });
      // console.log('send');
      mail.send(_.keys(test));
    }
  }
}

module.exports = new statusController();
