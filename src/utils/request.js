/**
 * @author M
 * @email mpw0311@163.com
 * @version  1.0.0
 * @description  系统通用fetch数据请求
 */
import fetch from 'dva/fetch';
import { message, notification } from 'antd';
import router from 'umi/router';
import { apiPrefix } from '@platformConfig';

// mock data
import loginData from '../services/envMockData/loginData';
import menuData from '../services/envMockData/menuData';
import sysInfoData from '../services/envMockData/sysInfoData';
import messageData from '../services/envMockData/messageData';
import logoutData from '../services/envMockData/logoutData';

import objList from '../services/envMockData/objList';
import arrangeListData from '../services/envMockData/arrangeListData';
import bizSystemListData from '../services/envMockData/bizSystemListData';
// mock data end

const logout = () => {
    // @HACK
    /* eslint-disable no-underscore-dangle */
    window.g_app._store.dispatch({
        type: 'global/logout',
    });
};
const checkIsLogin = (url) => {
    const isLogin = sessionStorage.getItem('isLogin');
    const href = window.location.href;
    if (isLogin !== 'true' && url.indexOf('/login') === -1 && href.indexOf('/login') === -1) {
        message.warning('请在登录后操作!');
        router.push('/login');
        return;
    }
};
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};
const checkStatus = response => {
    const { status } = response;
    if (status >= 200 && status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
        message: `请求错误 ${response.status}: ${response.url}`,
        description: errortext,
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
};
const createStubResponse = (stubRes, waitTime = 200) => {
    const promise = new Promise((resolve, reject) => {
        // setTimeout(() => {
        resolve(stubRes);
        // }, waitTime);
    });
    return promise;
};
export const request = (url, options = {}) => {

    const { method, headers, body } = options;
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        if (!(body instanceof FormData)) {
            options.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...headers,
            };
            options.body = JSON.stringify(options.body);
        } else {
            // newOptions.body is FormData
            options.headers = {
                Accept: 'application/json',
                ...headers,
            };
        }
    }
    let response = {};
    console.log('---------url', url);
    if (url.indexOf('/objList') >= 0) {
        response = createStubResponse(objList);
    } else if (url.indexOf('/arrangeList') >= 0) {
        response = createStubResponse(arrangeListData);
    } else if (url.indexOf('/bizSystemList') >= 0) {
        response = createStubResponse(bizSystemListData);
    } else if (url.indexOf('/login') >= 0) {
        console.log('loginRes::::', loginData);
        response = createStubResponse(loginData);
    } else if (url.indexOf('/getMenuData') >= 0) {
        response = createStubResponse(menuData)
    } else if (url.indexOf('/getSysInfo') >= 0) {
        response = createStubResponse(sysInfoData)
    } else if (url.indexOf('/getMessage') >= 0) {
        response = createStubResponse(messageData)
    } else if (url.indexOf('/logout') >= 0) {
        response = createStubResponse(logoutData);
    } else {
        response = createStubResponse({
            data: {

            },
            status: 0
        });
        // console.log('request url:', apiPrefix + url, 'options:', options);
        // response = await fetch(apiPrefix + url, options)
        //     .then(checkStatus)
        //     .then(response => {
        //         // DELETE and 204 do not return data by default
        //         // using .json will report an error.
        //         if (options.method === 'DELETE' || response.status === 204) {
        //             return response.text();
        //         }
        //         return response.json();
        //     })
        //     .catch(e => {
        //         const { name: status } = e;
        //         if (status === 401) {
        //             logout();
        //             return;
        //         }
        //         // environment should not be used
        //         if (status === 403) {
        //             router.push('/403');
        //             return;
        //         }
        //         if (status <= 504 && status >= 500) {
        //             router.push('/500');
        //             return;
        //         }
        //         if (status >= 404 && status < 422) {
        //             router.push('/404');
        //             return;
        //         }
        //         if (status === 'SyntaxError') {
        //             message.error(`SyntaxError:${e.message}`);
        //             setTimeout(() => {
        //                 logout();
        //             }, 1500);
        //         }
        //     });
    }
    return response;
}
export default async (url, options) => {
    checkIsLogin(url);
    const defaultOptions = {
        //发送cookies
        credentials: 'include',
        //cors跨域
        mode: "cors",//no-cors
    };
    const newOptions = { ...defaultOptions, ...options };
    const response = await request(url, newOptions).then(response => {
        const { data: { alertDesc }, status } = response;
        if (status !== 0) {
            message.error(alertDesc || "无权限！");
            const { hash } = window.location;
            if (hash !== '#/login') {
                setTimeout(() => {
                    logout();
                    // window.location.href= window.location.origin;
                }, 1500);
            }
        }
        return response;
    });
    return response;
}