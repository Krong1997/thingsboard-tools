const { proxyToTB } = require('../api/proxyToTB');
const { SERVER } = require('../../constant/env');
const { showDebugLog } = require('../../helpers/showMsgOnLog');
const { defaultSuccess } = require('../../constant/defaultResponse');
const deviceList = require('../../output/deviceList.json');
const { jsonStringify, jsonParse } = require('../../helpers/jsonHandler');
const { staticData } = require('../../helpers/mockData');
const saveDeviceListToJsonFile = require('./saveDeviceToJson');

async function sendStaticData() {
    if (!Array.isArray(deviceList)) throw new Error('device is not array');
    const copyDeviceList = jsonParse(jsonStringify(deviceList));
    showDebugLog('Device', 'Send static data');
    for (let i = 0; i < deviceList.length; i += 1) {
        const mockStatic = staticData(deviceList[i].name);
        const storageLength = mockStatic.Storage.length;
        const opt = {
            method: 'post',
            url: `http://${SERVER.host}:${SERVER.port}/api/v1/${deviceList[i].token}/attributes`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: jsonStringify(mockStatic),
        };
        // eslint-disable-next-line no-await-in-loop
        const response = await proxyToTB(opt);
        if (response.status >= 400) {
            return response;
        }
        showDebugLog('Device', 'Set device storage count');
        copyDeviceList[i].storageNum = storageLength;
        showDebugLog('Device', copyDeviceList);
    }
    saveDeviceListToJsonFile(copyDeviceList);
    return defaultSuccess;
}

module.exports = sendStaticData;
