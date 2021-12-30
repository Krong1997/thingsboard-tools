const sendStaticData = require('../controllers/devices/sendStaticData');
const { showSimpleMessage } = require('../helpers/showMsgOnLog');

async function sendInitStaticData() {
    showSimpleMessage('Send static data...');

    const response = await sendStaticData();

    if (response.status >= 400) {
        showSimpleMessage('Send static data error');
    } else {
        showSimpleMessage('Done');
    }
}

sendInitStaticData();
