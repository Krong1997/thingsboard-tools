const fs = require('fs');
const { FILE } = require('../constant/env');
const { showSimpleMessage, showErrorLog } = require('./showMsgOnLog');
const { jsonStringify } = require('./jsonHandler');
const deviceList = require('../output/deviceList.json');

function saveTestInformation(count, start) {
    showSimpleMessage('Save output...');
    // 要處理檔案不存在的問題，可能從init下手
    const jsonPath = FILE.logFilePath;
    const data = jsonStringify({
        deviceCount: deviceList.length,
        testCount: count,
        startTime: start,
        updateTime: new Date().toLocaleString(),
    });

    fs.writeFileSync(jsonPath, data, (err) => {
        showErrorLog('Data written to file error', err);
    });
}

function saveErrorDeviceList(errorDeviceList) {
    showSimpleMessage('Save error device list...');

    const jsonPath = FILE.errorLogFilePath;
    const data = jsonStringify({
        ...errorDeviceList,
        updateTime: new Date().toLocaleString(),
    });

    fs.writeFileSync(jsonPath, data, (err) => {
        showErrorLog('Data written to file error', err);
    });
}

function saveVirtualDeviceReceiveRPC(RPCMessageList) {
    showSimpleMessage('Save receiving RPC message...');

    const jsonPath = FILE.RPCMessageLogFilePath;
    const data = jsonStringify({
        ...RPCMessageList,
        updateTime: new Date().toLocaleString(),
    });

    fs.writeFileSync(jsonPath, data, (err) => {
        showErrorLog('Data written to file error', err);
    });
}

function saveTenantToken(token) {
    showSimpleMessage('Save token');

    const filePath = FILE.JWTokenFilePath;

    fs.writeFileSync(filePath, `Bearer ${token}`, (err) => {
        showErrorLog('Data written to file error', err);
    });
}

function saveServerTwoWayRPCToDevice(config) {
    showSimpleMessage('Save receiving RPC message...');
    const { isError, messageList } = config;

    const jsonPath = FILE.sendTwoWayRPCLogFilePath;

    if (isError) {
        const data = jsonStringify({
            error: messageList,
            updateTime: new Date().toLocaleString(),
        });

        fs.writeFileSync(jsonPath, data, (err) => {
            showErrorLog('Data written to file error', err);
        });
    } else {
        const data = jsonStringify({
            data: messageList,
            updateTime: new Date().toLocaleString(),
        });

        fs.writeFileSync(jsonPath, data, (err) => {
            showErrorLog('Data written to file error', err);
        });
    }
}

module.exports = {
    saveTestInformation,
    saveErrorDeviceList,
    saveVirtualDeviceReceiveRPC,
    saveTenantToken,
    saveServerTwoWayRPCToDevice,
};
