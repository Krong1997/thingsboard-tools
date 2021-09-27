const getDeviceToken = require('./getDeviceToken');

async function getDeviceTokenList(deviceList) {
    try {
        const deviceTokenList = [];

        if (!Array.isArray(deviceList)) return deviceTokenList;

        for (let i = 0; i < deviceList.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const token = await getDeviceToken(deviceList[i].id);
            deviceTokenList.push({
                name: deviceList[i].name,
                id: deviceList[i].id,
                token,
            });
        }

        return deviceTokenList;
    } catch (error) {
        console.error('[Get device token list error]', error);
        return error;
    }
}

module.exports = getDeviceTokenList;
