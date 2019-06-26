'use strict';

const format = require('../utils/format');

class responseHandler {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  handle(err, req, res, next) {
    console.log('aaaaa');
    res.body = format.getFormat(200, '20181221', true, 'OK', res.body);
    next();
  }
}

module.exports = new responseHandler();
