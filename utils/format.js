'use strict';

class resFormat {
  constructor() {
    this.getFormat = this.getFormat.bind(this);
  }

  getFormat(statusCode, version, status, message, result, error) {
    if (statusCode == 200 || statusCode >= 500) {
      return {
        version: version,
        status: status,
        message: message,
        result: result,
      };
    } else {
      return {
        version: version,
        status: status,
        message: message,
        result: result,
        error: error,
      };
    }
  }
}

module.exports = new resFormat();
