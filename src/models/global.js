
/**
 * @author M
 * @email mpw0311@163.com
 * @version  1.0.0
 * @description  全局model
 */
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as api from '@services';
export default {
    namespace: 'global',
    state: {
        userInfo: {},
        message: [],
        notification: undefined,
        indicatorOptions: [],
        objectOptions: [],
        levelOptions: []
    },
    subscriptions: {
        // setupHistory({ dispatch, history }) {
        //     history.listen((location) => {
        //         const { pathname, query, state } = location;
        //         if (/^\/sys/.test(pathname)) {
        //         } else if (/^\/login/.test(pathname)) {
        //         }
        //     });
        // },
    },

    effects: {
        * logout({ payload }, { call, put }) {
            const { data, status } = yield call(api.logout, { ...payload });
            const { message: msg } = data;
            if (status === 0) {
                message.success(msg || "退出系统");
                sessionStorage.setItem('isLogin', false);
                yield put(routerRedux.push('/login'));
            }
        },
        * getSysInfo(_, { call, put }) {
            const { data = {}, status } = yield call(api.getSysInfo, {});
            if (status === 0) {
                const { userInfo = {}, notification } = data;
                yield put({
                    type: 'save',
                    payload: {
                        userInfo,
                        notification
                    }
                });
            }

        },
        // 请求消息通知栏数据
        *getMessage({ payload = {} }, { call, put, select }) {
            const { size = 0 } = payload;
            let count = yield select(({ global }) => global.message.length);
            const { data = [] } = yield call(api.getMessage, { size: count + size });
            yield put({
                type: 'save',
                payload: {
                    message: data,
                }
            });
        },
        // 请求indicator options
        *getIndicatorOptions({ payload: { oId } }, { call, put, select }) {
            const { data = [] } = yield call(api.getIndicatorOptions, { oId });
            yield put({
                type: 'save',
                payload: {
                    indicatorOptions: data,
                }
            });
        },
        // 请求object options
        *getObjectOptions({ payload = {} }, { call, put, select }) {
            const { data = [] } = yield call(api.getObjectOptions);
            yield put({
                type: 'save',
                payload: {
                    objectOptions: data,
                }
            });
        },
        // 请求level options
        *getLevelOptions({ payload = {} }, { call, put, select }) {
            const { size = 0 } = payload;
            let count = yield select(({ global }) => global.message.length);
            const { data = [] } = yield call(api.getLevelOptions, { size: count + size });
            yield put({
                type: 'save',
                payload: {
                    levelOptions: data,
                }
            });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        clear(state) {
            return {
                ...state,
                userInfo: {},
                message: [],
                notification: undefined,
                indicatorOptions: [],
                objectOptions: [],
                levelOptions: []
            };
        }
    },
};