"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIPAddress = void 0;
var os = require("os");
/**
 * @Author: 水痕
 * @Date: 2021-10-30 14:47:44
 * @LastEditors: 水痕
 * @Description: 获取电脑本地的ip地址
 * @param {*}
 * @return {*}
 */
var getIPAddress = function () {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
};
exports.getIPAddress = getIPAddress;
