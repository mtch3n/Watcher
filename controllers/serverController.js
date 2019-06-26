'use strict';

const fs = require('fs');
const util = require('../utils/util');

class serverController {
  getAllServers(req, res) {
    let raw = fs.readFileSync('./config/server.json');
    let data = JSON.parse(raw);
    res.json(data);
  }

  getServer(req, res) {
    let hostname = util.getServer(req.params.hostname);
    res.json(hostname);
  }
}

module.exports = new serverController();
