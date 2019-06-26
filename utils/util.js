'use strict';

const _ = require('lodash');
const fs = require('fs');
const request = require('request-promise-native');
const reach = require('is-reachable');

class util {
  constructor() {
    this.getServer = this.getServer.bind(this);
    this.getTestLoads = this.getTestLoads.bind(this);
    this.checkService = this.checkService.bind(this);
  }

  serverConf() {
    let raw = fs.readFileSync('./config/server.json');
    return JSON.parse(raw);
  }

  getServer(server) {
    let flag = null;
    this.serverConf().forEach(function(value) {
      if (value.name.toString() === server.toString()) {
        flag = value;
      }
    });
    return flag;
  }

  getTestLoads(list) {
    let queue = [];
    try {
      _.forEach(list, function(obj) {
        let host = obj.host;
        let server = obj.name;
        let alert = obj.alert;
        _.forEach(obj.ports, function(port) {
          let data = {
            name: server,
            protocol: port.protocol,
            host: host + ':' + port.port,
            alert: alert,
          };
          queue.push(data);
        });
      });
      // queue = _.groupBy(queue, (d) => {
      //   return d.protocol;
      // });
      return queue;
    } catch (e) {
      console.log(e);
      return queue;
    }
  }

  async checkService(obj) {
    let target = this.getTestLoads(obj);
    const result = await Promise.all(
      _.map(target, async (value) => {
        if (value.protocol === 'other') {
          return {
            name: value.name,
            protocol: value.protocol,
            host: value.host,
            status: false,
            msg: 'no matching service protocol',
            alert: value.alert,
          };
        }
        if (value.protocol === 'http' || value.protocol === 'https') {
          let option = {
            uri: value.protocol + '://' + value.host,
            timeout: 3000,
            resolveWithFullResponse: true,
          };
          return request(option)
            .then(function(response) {
              let flag = false;
              console.log(response.statusCode);
              if (
                response.statusCode.toString() < '300' &&
                response.statusCode.toString() <= '200'
              ) {
                flag = true;
              } else {
                flag = false;
              }
              return {
                name: value.name,
                protocol: value.protocol,
                host: value.host,
                status: flag,
                msg: response.statusCode,
                alert: value.alert,
              };
            })
            .catch(function(error) {
              console.log(error.message);
              return {
                name: value.name,
                protocol: value.protocol,
                host: value.host,
                status: false,
                msg: error.message,
                alert: value.alert,
              };
            });
        } else {
          return reach(value.protocol + '://' + value.host).then((s) => {
            return {
              name: value.name,
              protocol: value.protocol,
              host: value.host,
              status: s,
              msg: s ? 'success' : 'error',
              alert: value.alert,
            };
          });
        }
      }),
    );
    return result;
  }
}

module.exports = new util();
