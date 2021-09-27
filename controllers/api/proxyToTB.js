const APICaller = require('../../helpers/apiCaller');
const { getTenantJWTToken } = require('../user/getTenantToken');

let token;

// add error handler

async function tryGetTokenAndResendRequest(config) {
    token = await getTenantJWTToken();

    return APICaller({
        ...config,
        headers: {
            ...config.headers,
            'X-Authorization': `Bearer ${token}`,
        },
    });
}

async function proxyToTB(config) {
    try {
        token = token || await getTenantJWTToken();
        const newConfig = {
            ...config,
            headers: {
                ...config.headers,
                'X-Authorization': `Bearer ${token}`,
            },
        };
        // 執行時間過長會出現token失效
        const response = await APICaller(newConfig);

        if (response.status === 401) return tryGetTokenAndResendRequest(newConfig);

        return response;
    } catch (error) {
        console.error('Proxy to TB error:', error);
        return error;
    }
}

module.exports = {
    proxyToTB,
};
