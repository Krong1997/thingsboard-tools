const fs = require('fs');
const { FILE } = require('../constant/env');
const { showLog } = require('./showMsgOnLog');
const deviceList = require('../output/deviceList.json');

function saveTestInformation(count) {
    showLog('Save output...');
    // 要處理檔案不存在的問題，可能從init下手
    const jsonPath = FILE.logFilePath;
    const data = JSON.stringify({
        deviceCount: deviceList.length,
        testCount: count,
        updateTime: new Date().toLocaleString(),
    });

    fs.writeFileSync(jsonPath, data, (err) => {
        console.error('Data written to file error', err);
    });
}

function saveErrorDeviceList(errorDeviceList) {
    showLog('Save error device list...');

    const jsonPath = FILE.errorLogFilePath;
    const data = JSON.stringify({
        ...errorDeviceList,
        updateTime: new Date().toLocaleString(),
    });

    fs.writeFileSync(jsonPath, data, (err) => {
        console.error('Data written to file error', err);
    });
}

function saveVirtualDeviceReceiveRPC(RPCMessageList) {
    showLog('Save receiving RPC message...');

    const jsonPath = FILE.RPCMessageLogFilePath;
    const data = JSON.stringify({
        ...RPCMessageList,
        updateTime: new Date().toLocaleString(),
    });

    fs.writeFileSync(jsonPath, data, (err) => {
        console.error('Data written to file error', err);
    });
}

function saveTenantToken(token) {
    showLog('Save token');

    const filePath = FILE.JWTokenFilePath;

    fs.writeFileSync(filePath, `Bearer ${token}`, (err) => {
        console.error('Data written to file error', err);
    });
}

function saveServerTwoWayRPCToDevice(config) {
    showLog('Save receiving RPC message...');
    const { isError, messageList } = config;

    const jsonPath = FILE.sendTwoWayRPCLogFilePath;

    if (isError) {
        const data = JSON.stringify({
            error: messageList,
            updateTime: new Date().toLocaleString(),
        });

        fs.writeFileSync(jsonPath, data, (err) => {
            console.error('Data written to file error', err);
        });
    } else {
        const data = JSON.stringify({
            data: messageList,
            updateTime: new Date().toLocaleString(),
        });

        fs.writeFileSync(jsonPath, data, (err) => {
            console.error('Data written to file error', err);
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
