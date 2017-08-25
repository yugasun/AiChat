'use strict';
/**
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file AipOcr
 * @author baiduAip
 */
const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const objectTools = require('./util/objectTools');

const HttpClient = require('./http/httpClient');

const EventPromise = require('./util/eventPromise');

const METHOD_POST = 'POST';

const PATH_OCR_BANKCARD = '/rest/2.0/ocr/v1/bankcard';
const PATH_OCR_IDCARD = '/rest/2.0/ocr/v1/idcard';
const PATH_OCR_GENERAL = '/rest/2.0/ocr/v1/general';
const PATH_OCR_GENERAL_BASIC = '/rest/2.0/ocr/v1/general_basic';
const PATH_OCR_GENERAL_ENHANCE = '/rest/2.0/ocr/v1/general_enhanced';
const PATH_OCR_WEBIMAGE = '/rest/2.0/ocr/v1/webimage';
const PATH_OCR_DRIVINGLICENSE = '/rest/2.0/ocr/v1/driving_license';
const PATH_OCR_VEHICLELICENSE = '/rest/2.0/ocr/v1/vehicle_license';
const PATH_OCR_TABLE_REQUEST = '/rest/2.0/solution/v1/form_ocr/request';
const PATH_OCR_TABLE_GETRESULT = '/rest/2.0/solution/v1/form_ocr/get_request_result';
const ID_CARD_SIDE_FRONT = 'front';
const ID_CARD_SIDE_BACK = 'back';

const CYCLEINTERVAL = 1000;
const DEFAULTTIMEOUT = 10000;

const scope = require('./const/devScope').DEFAULT;

/**
 * AipOcr类，构造调用文字识别对象
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipOcr extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }
    bankcard(image) {
        let promise = this.registTask(this.bankcardImpl, {image: image});
        return promise;
    }
    bankcardImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_OCR_BANKCARD,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.bankcardImpl, param);
        }
        return promise;
    }
    idcard(image, isFront, options) {
        let side = isFront ? ID_CARD_SIDE_FRONT : ID_CARD_SIDE_BACK;
        let param = {image: image, id_card_side: side};
        let promise = this.registTask(this.idcardImpl, objectTools.merge(param, options));
        return promise;
    }
    idcardImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_OCR_IDCARD,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.idcardImpl, param);
        }
        return promise;
    }
    general(image, options) {
        let param = {image: image};
        let promise = this.registTask(this.generalImpl, objectTools.merge(param, options));
        return promise;
    }
    generalImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_OCR_GENERAL,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.generalImpl, param);
        }
        return promise;
    }
    generalBasic(image, options) {
        let param = {image: image};
        let promise = this.registTask(this.generalBasicImpl, objectTools.merge(param, options));
        return promise;
    }
    generalBasicImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_OCR_GENERAL_BASIC,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.generalBasicImpl, param);
        }
        return promise;
    }
    generalEnhance(image, options) {
        let param = {image: image};
        let promise = this.registTask(this.generalEnhanceImpl, objectTools.merge(param, options));
        return promise;
    }
    generalEnhanceImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_OCR_GENERAL_ENHANCE,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.generalEnhanceImpl, param);
        }
        return promise;
    }
    webImage(image, options) {
        let param = {image: image};
        let promise = this.registTask(this.webImageImpl, objectTools.merge(param, options));
        return promise;
    }
    webImageImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_OCR_WEBIMAGE,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.webImageImpl, param);
        }
        return promise;
    }
    drivingLicense(image, options) {
        let param = {image: image};
        let promise = this.registTask(this.drivingLicenseImpl, objectTools.merge(param, options));
        return promise;
    }
    drivingLicenseImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_OCR_DRIVINGLICENSE,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.drivingLicenseImpl, param);
        }
        return promise;
    }
    vehicleLicense(image, options) {
        let param = {image: image};
        let promise = this.registTask(this.vehicleLicenseImpl, objectTools.merge(param, options));
        return promise;
    }
    vehicleLicenseImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_OCR_VEHICLELICENSE,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.vehicleLicenseImpl, param);
        }
        return promise;
    }
    tableBegin(image, options) {
        let param = {
            image: image
        };
        let promise = this.registTask(this.tableBeginImpl, objectTools.merge(param, options));
        return promise;
    }
    tableBeginImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_OCR_TABLE_REQUEST,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.tableBeginImpl, param);
        }
        return promise;
    }
    tableGetresult(id, type) {
        let param = {
            request_id: id,
            result_type: type
        };
        let promise = this.registTask(this.tableGetresultImpl, param);
        return promise;
    }
    tableGetresultImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_OCR_TABLE_GETRESULT,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.tableGetresultImpl, param);
        }
        return promise;
    }
    tableRecorgnize(image, type, timeout) {
        let promise = new EventPromise();
        timeout = timeout || DEFAULTTIMEOUT;
        this.tableBegin(image).then(function (result) {
            if (result.error_code) {
                promise.resolve(result);
                return;
            }
            let id = result.result[0]['request_id'];
            promise.setValue('beginTime', Date.now());
            let pid = setInterval(function () {
                if (Date.now() - promise.getValue('beginTime') > timeout) {
                    clearInterval(pid);
                    promise.reject({errorMsg: 'get result timeout', requestId: id});
                    return;
                }
                this.tableGetresult(id, type).then(function (result) {
                    if (result['result']['ret_code'] === 3) {
                        clearInterval(pid);
                        promise.resolve(result);
                    }
                }.bind(this), function (error) {
                    promise.reject(error);
                }.bind(this));
            }.bind(this), CYCLEINTERVAL);
        }.bind(this), function (error) {
            promise.reject(error);
        }.bind(this));
        return promise;
    }
}

module.exports = AipOcr;
