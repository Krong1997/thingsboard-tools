const path = require('path');
const { pathToFileURL } = require('url');

require('dotenv').config();

const JWTokenFileName = 'JWTToken.txt';
const deviceListFileName = 'deviceList.json';
const LogFileName = `mockData/MockDataInfo${Date.now()}.json`;
const ErrorLogFileName = `error/ErrorLog${Date.now()}.json`;
const RPCMessageLogFileName = `RPC/RPCMessageLog${Date.now()}.json`;
const twoWayRPCLogFileName = `RPC/SendTwoWayRPCLog${Date.now()}.json`;
const configDeviceFileName = 'device.json';

module.exports = {
    SERVER: {
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT || '80',
        isDebug: process.env.DEBUG === 'true',
        adminEmail: process.env.ADMIN_EMAIL || 'sysadmin@thingsboard.org',
        adminPassword: process.env.ADMIN_PASSWORD || 'sysadmin',
        tenantEmail: process.env.TENANT_EMAIL || 'test@gmail.com',
        tenantGroupName: process.env.TENANT_GROUP_NAME || 'thingsboard-tools-tenant-group',
        tenantName: process.env.TENANT_NAME || 'thingsboard-tools-tenant',
    },
    DEVICE: {
        deviceName: process.env.DEVICE_NAME || 'device',
        deviceType: process.env.DEVICE_TYPE || 'default',
        numberOfDevices: process.env.NUMBER_OF_DEVICES || 1,
        isSendMockData: process.env.SEND_MOCK_DATA === 'true',
        isRandomConnect: process.env.RANDOM_CONNECT === 'true',
        deviceListFileName,
    },
    FILE: {
        deviceJsonPath: pathToFileURL(path.join(__dirname, `/../output/${deviceListFileName}`)),
        logFilePath: pathToFileURL(path.join(__dirname, `/../output/${LogFileName}`)),
        errorLogFilePath: pathToFileURL(path.join(__dirname, `/../output/${ErrorLogFileName}`)),
        RPCMessageLogFilePath: pathToFileURL(path.join(__dirname, `/../output/${RPCMessageLogFileName}`)),
        sendTwoWayRPCLogFilePath: pathToFileURL(path.join(__dirname, `/../output/${twoWayRPCLogFileName}`)),
        JWTokenFilePath: pathToFileURL(path.join(__dirname, `/../output/${JWTokenFileName}`)),
        configDeviceFilePath: pathToFileURL(path.join(__dirname, `/../config/${configDeviceFileName}`)),
        saveOutputFrequency: process.env.SAVE_OUTPUT_FREQUENCY || 30,
        isSaveLog: process.env.SAVE_LOG === 'true',
    },
    MQTT: {
        publish_frequency: process.env.PUBLISH_FREQUENCY || '10',
        port: process.env.MQTT_PORT || '1883',
        testTime: process.env.TEST_TIME || 0,
        isSubscribeRPC: process.env.SUBSCRIBE_RPC === 'true',
    },
    BUFFER: {
        connectDelay: process.env.CONNECT_DELAY || 5,
    },
    ICAP: {
        host: process.env.ICAP_HOST || '127.0.0.1',
        port: process.env.ICAP_PORT || '3000',
    },
};
