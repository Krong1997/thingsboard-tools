const fs = require('fs');

const addDevices = require('../controllers/devices/addDevice');
const getDeviceTokenList = require('../controllers/devices/getDeviceTokenList');
const { showLog } = require('../helpers/showMsgOnLog');
const { FILE } = require('../constant/env');

async function initTBDevices() {
    showLog('Add devices...');

    const jsonPath = FILE.deviceJsonPath;
    const deviceList = await getDeviceTokenList(await addDevices());
    const data = JSON.stringify(deviceList);

    if (Array.isArray(deviceList)) {
        if (deviceList.length < 1) {
            showLog('Add devices error');
            return;
        }

        showLog('Output json file');

        fs.writeFileSync(jsonPath, data, (err) => {
            console.error('Data written to file error', err);
        });

        showLog('Done');
    }
}

initTBDevices();
