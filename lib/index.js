"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computerIPAddress = void 0;
var axios_1 = require("axios");
var constants_1 = require("./constants");
var utils_1 = require("./utils");
var computerIPAddress = function () { return utils_1.getIPAddress(); };
exports.computerIPAddress = computerIPAddress;
var NodeConsul = /** @class */ (function () {
    function NodeConsul(consulAddress) {
        this.consulAddress = consulAddress;
        this.currentAddress = utils_1.getIPAddress();
    }
    /**
     * @Author: 水痕
     * @Date: 2021-10-30 15:04:59
     * @LastEditors: 水痕
     * @Description: 服务注册
     * @param {string} port 端口号
     * @param {string} serviceName 服务名称
     * @param {string} serviceId 服务地址
     * @param {string[]} tags 标签
     * @param {ICheckConfig} check 健康检查
     * @return {*}
     */
    NodeConsul.prototype.registerService = function (port, serviceName, serviceId, tags, check) {
        return __awaiter(this, void 0, void 0, function () {
            var url, currentAddress, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://" + this.consulAddress + constants_1.REGISTER_URL;
                        currentAddress = this.currentAddress;
                        data = {
                            Address: currentAddress,
                            Port: port,
                            Name: serviceName,
                            id: serviceId,
                            Tags: tags,
                            Check: check,
                        };
                        return [4 /*yield*/, axios_1.default.put(url, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @Author: 水痕
     * @Date: 2021-10-30 15:09:19
     * @LastEditors: 水痕
     * @Description: 根据服务id删除服务
     * @param {string} serviceId 服务地址
     * @return {*}
     */
    NodeConsul.prototype.deregisterServiceById = function (serviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://" + this.consulAddress + constants_1.DEREGISTER_URL + "/" + serviceId;
                        return [4 /*yield*/, axios_1.default.put(url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @Author: 水痕
     * @Date: 2021-10-30 15:12:43
     * @LastEditors: 水痕
     * @Description: 查询全部的服务
     * @return {*}
     */
    NodeConsul.prototype.serviceList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://" + this.consulAddress + constants_1.ALL_SERVICE_URL;
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
     * @Author: 水痕
     * @Date: 2021-10-30 15:19:12
     * @LastEditors: 水痕
     * @Description: 根据id查询服务
     * @param {string} serviceId 服务地址
     * @return {*}
     */
    NodeConsul.prototype.findService = function (serviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://" + this.consulAddress + constants_1.SERVICE_ID_URL + "/" + serviceId;
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    return NodeConsul;
}());
exports.default = NodeConsul;
