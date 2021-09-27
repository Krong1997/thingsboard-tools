const { serverTwoWayRPCToDevice } = require('../controllers/RPC/serverRPC');
const device = require('../config/device.json');

async function sendTwoWayRPCToDevice() {
    setInterval(() => {
        serverTwoWayRPCToDevice({
            deviceId: device.id,
            method: 'echo',
            params: {
                action: 'echo',
                test: 'test',
            },
        });
    }, 31000);
}

sendTwoWayRPCToDevice();
