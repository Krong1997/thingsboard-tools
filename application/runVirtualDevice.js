const { MQTT, DEVICE } = require('../constant/env');
const createMQTTClient = require('../controllers/mqtt/mqttClient');

async function runTest() {
    const isSendData = Boolean(DEVICE.isSendMockData);
    const isSubscribeRPC = Boolean(MQTT.isSubscribeRPC);
    createMQTTClient({
        frequency: MQTT.publish_frequency,
        isSendData,
        isSubscribeRPC,
    });
}

runTest();
