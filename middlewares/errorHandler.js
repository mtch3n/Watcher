'use strict';

const format = require('../utils/format');

class errorHandler {
  constructor() {
    this.errorHandler = this.errorHandler.bind(this);
  }

  errorHandler(err, req, res, next) {
    let resObj;
    let statusCode;
    if (err.statusCode >= 500) {
      resObj = format.getFormat(
        err.statusCode,
        '20181212',
        false,
        err.message,
        null,
      );
      statusCode = err.statusCode;
    } else {
      resObj = format.getFormat(
        err.statusCode || 500,
        '20181212',
        false,
        err.message || '',
        null,
        err,
      );
      statusCode = err.statusCode || 500;
    }

    res.status(statusCode).json(resObj);
  }
}
module.exports = new errorHandler();
