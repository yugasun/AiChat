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
 * @file AipKg
 * @author baiduAip
 */
const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClient = require('./http/httpClient');

const objectTools = require('./util/objectTools');

const EventPromise = require('./util/eventPromise');

const METHOD_POST = 'POST';

const PATH_KG_TASK_QUERY = '/rest/2.0/kg/v1/pie/task_query';
const PATH_KG_TASK_INFO = '/rest/2.0/kg/v1/pie/task_info';
const PATH_KG_TASK_CREATE = '/rest/2.0/kg/v1/pie/task_create';
const PATH_KG_TASK_UPDATE = '/rest/2.0/kg/v1/pie/task_update';
const PATH_KG_TASK_START = '/rest/2.0/kg/v1/pie/task_start';
const PATH_KG_TASK_STATUS = '/rest/2.0/kg/v1/pie/task_status';

const scope = require('./const/devScope').DEFAULT;

/**
 * AipKG类，构造调用KG(知识图谱)
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipKg extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }
    getUserTasks(options) {
        let param = {};
        let promise = this.registTask(this.getUserTasksImpl, objectTools.merge(param, options));
        return promise;
    }
    getUserTasksImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_KG_TASK_QUERY,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.getUserTasksImpl, param);
        }
        return promise;
    }
    getTaskInfo(taskId) {
        let param = {id: taskId};
        let promise = this.registTask(this.getTaskInfoImpl, param);
        return promise;
    }
    getTaskInfoImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_KG_TASK_INFO,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.getTaskInfoImpl, param);
        }
        return promise;
    }
    createTask(name, tplStr, inputMapping, urlPattern, outputFile, options) {
        let param = {
            name: name,
            template_content: tplStr,
            input_mapping_file: inputMapping,
            url_pattern: urlPattern,
            output_file: outputFile
        };
        let promise = this.registTask(this.createTaskImpl, objectTools.merge(param, options));
        return promise;
    }
    createTaskImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_KG_TASK_CREATE,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.createTaskImpl, param);
        }
        return promise;
    }
    updateTask(taskId, options) {
        let param = {
            id: taskId
        };
        let promise = this.registTask(this.updateTaskImpl, objectTools.merge(param, options));
        return promise;
    }
    updateTaskImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_KG_TASK_UPDATE,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.updateTaskImpl, param);
        }
        return promise;
    }
    startTask(taskId) {
        let param = {
            id: taskId
        };
        let promise = this.registTask(this.startTaskImpl, param);
        return promise;
    }
    startTaskImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_KG_TASK_START,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.startTaskImpl, param);
        }
        return promise;
    }
    getTaskStatus(taskId) {
        let param = {
            id: taskId
        };
        let promise = this.registTask(this.getTaskStatusImpl, param);
        return promise;
    }
    getTaskStatusImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_KG_TASK_STATUS,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.getTaskStatusImpl, param);
        }
        return promise;
    }
}

module.exports = AipKg;
