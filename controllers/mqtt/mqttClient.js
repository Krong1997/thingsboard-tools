const {
    MQTT,
    FILE,
    BUFFER,
    DEVICE,
} = require('../../constant/env');
const { rawData } = require('../../helpers/mockData');
const { initConnect, subscribeRPC } = require('./mqttConnector');
const { saveTestInformation } = require('../../helpers/saveOutput');
const { showSimpleMessage, showDebugLog } = require('../../helpers/showMsgOnLog');
const { telemetryTopic } = require('../../constant/mqttTopic');
const { jsonStringify } = require('../../helpers/jsonHandler');
// 要處理檔案不存在的問題，可能從init下手
const deviceList = require('../../output/deviceList.json');

const startTime = new Date().toLocaleString();
const timeArr = [];
const saveOutputFrequency = Number(FILE.saveOutputFrequency) * 1000;
const connectDelay = Number(BUFFER.connectDelay);
const sendDataDelay = Number(MQTT.publish_frequency);
const testTime = Number(MQTT.testTime);
const isSaveLog = Boolean(FILE.isSaveLog);

function publishData(config) {
    const {
        client,
        device,
        frequency,
        idx,
    } = config;

    const timeId = setInterval(() => {
        const data = jsonStringify(rawData(device.name, device.storageNum));

        client.publish(telemetryTopic, data, () => {
            showSimpleMessage(`${device.name} send data`);
            timeArr[idx] += 1;
        });

        if (timeArr[idx] >= testTime && testTime !== 0) {
            clearInterval(timeId);
            showSimpleMessage('test end');
        }

        if (client.disconnected) clearInterval(timeId);
    }, frequency);
}

function connectToTB(config) {
    const {
        device,
        isSendData,
        isSubscribeRPC,
        idx,
    } = config;

    if (DEVICE.isRandomConnect) {
        const isConnect = Math.random() > 0.5;
        if (!isConnect) return;

        const client = initConnect(device);

        if (isSendData) {
            showDebugLog('MQTT', 'Client will send data');
            setTimeout(() => {
                publishData({ ...config, client });
            }, (connectDelay * (idx + 1) + sendDataDelay));
        }

        if (isSubscribeRPC) {
            showDebugLog('MQTT', 'Client will subscribe RPC topic');
            subscribeRPC(client);
        }
    } else {
        const client = initConnect(device);

        if (isSendData) {
            showDebugLog('MQTT', 'Client will send data');
            setTimeout(() => {
                publishData({ ...config, client });
            }, (connectDelay * (idx + 1) + sendDataDelay));
        }

        if (isSubscribeRPC) {
            showDebugLog('MQTT', 'Client will subscribe RPC topic');
            subscribeRPC(client);
        }
    }
}

function createMQTTClient(config) {
    showDebugLog('MQTT', 'Try to connect to TB');
    deviceList.forEach((device, idx) => {
        const connectConfig = {
            ...config,
            device,
            idx,
        };

        timeArr[idx] = 0;

        // Set timeout to avoid all device connect at the same time.
        setTimeout(() => {
            connectToTB(connectConfig);
        }, connectDelay * (idx + 1));
    });
}

// Save total publish data times to json file every some seconds.
if (isSaveLog) {
    setInterval(() => {
        const totalTimes = timeArr.reduce((accu, curr) => accu + curr);
        saveTestInformation(totalTimes, startTime);
    }, saveOutputFrequency);
}

module.exports = createMQTTClient;
