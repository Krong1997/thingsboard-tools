const { proxyToTB } = require('../api/proxyToTB');
const { SERVER, FILE } = require('../../constant/env');
const { saveServerTwoWayRPCToDevice } = require('../../helpers/saveOutput');
const { showSimpleMessage, showErrorLog } = require('../../helpers/showMsgOnLog');
const { jsonStringify } = require('../../helpers/jsonHandler');

const globalMessageList = {
    error: [],
    success: [],
};

function saveRPCLog(config) {
    const { isError, messageList } = config;
    const { isSaveLog } = FILE;

    if (isSaveLog) {
        saveServerTwoWayRPCToDevice({
            isError,
            messageList,
        });
    }
}

/**
 * @param {object} config
 * @param {string} config.deviceId TB device id
 * @param {string} config.method RPC method
 * @param {any} config.params RPC payload
 * @param {number} config.timeout RPC timeout
 * @param {boolean} config.persistent RPC is persistent?
 * @param {number} config.retries RPC retry times
 */

async function serverTwoWayRPCToDevice(config) {
    try {
        const {
            deviceId,
            method,
            params,
            timeout = 5000,
            persistent = false,
            retries = 0,
        } = config;
        const opt = {
            method: 'post',
            url: `http://${SERVER.host}:${SERVER.port}/api/plugins/rpc/twoway/${deviceId}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: jsonStringify({
                method,
                params,
                timeout,
                persistent,
                retries,
            }),
        };

        const res = await proxyToTB({ ...opt });

        if (res.status >= 400) {
            showSimpleMessage('RPC error...');
            globalMessageList.error.push({ message: res.data });
            saveRPCLog({
                isError: true,
                messageList: globalMessageList.error,
            });
        } else {
            showSimpleMessage('RPC success!');
            globalMessageList.success.push({ message: res });
            saveRPCLog({
                isError: false,
                messageList: globalMessageList.success,
            });
        }
    } catch (error) {
        showErrorLog('[RPC Error]', error);
    }
}

module.exports = {
    serverTwoWayRPCToDevice,
};
