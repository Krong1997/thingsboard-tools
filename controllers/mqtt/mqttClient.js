const {
    MQTT,
    FILE,
    BUFFER,
} = require('../../constant/env');
const { rawData } = require('../../helpers/mockData');
const { initConnect, subscribeRPC } = require('./mqttConnector');
const { saveTestInformation } = require('../../helpers/saveOutput');
const { showLog } = require('../../helpers/showMsgOnLog');
const { telemetryTopic } = require('../../constant/mqttTopic');
// 要處理檔案不存在的問題，可能從init下手
const deviceList = require('../../output/deviceList.json');

const timeArr = [];
const saveOutputFrequency = Number(FILE.saveOutputFrequency) * 1000;
const connectDelay = Number(BUFFER.connectDelay);
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
        const data = JSON.stringify(rawData());

        client.publish(telemetryTopic, data, () => {
            showLog(`${device.name} send data`);
            timeArr[idx] += 1;
        });

        if (timeArr[idx] >= testTime && testTime !== 0) {
            clearInterval(timeId);
            showLog('test end');
        }

        if (client.disconnected) clearInterval(timeId);
    }, frequency);
}

function connectToTB(config) {
    const {
        device,
        deviceListLength,
        isSendData,
        isSubscribeRPC,
    } = config;
    const client = initConnect(device);

    if (isSendData) {
        setTimeout(() => {
            publishData({ ...config, client });
        }, (connectDelay * deviceListLength));
    }

    if (isSubscribeRPC) {
        subscribeRPC(client);
    }
}

function MQTTConnecter(config) {
    // const { frequency, isSendData } = config;
    const deviceListLength = deviceList.length;

    deviceList.forEach((device, idx) => {
        const connectConfig = {
            ...config,
            device,
            idx,
            deviceListLength,
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
        saveTestInformation(totalTimes);
    }, saveOutputFrequency);
}

module.exports = {
    MQTTConnecter,
};
