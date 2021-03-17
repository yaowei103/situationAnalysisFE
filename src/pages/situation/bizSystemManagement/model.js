
import * as api from './service';
export default {
    namespace: 'bizSystemManagement',
    state: {
        path: undefined,
        list: [],
        total: null,
        page: null,
    },
    subscriptions: {
        setupHistory({ dispatch, history }) {
            history.listen(({ pathname, query, state }) => { // eslint-disable-line
                if (pathname === '/situation/bizSystemManagement') {
                    dispatch({ type: 'fetchBizSysList', payload: query });
                }
            });
        },
    },

    effects: {
        *fetchBizSysList({ payload: { page = 1, keyWord } }, { call, put }) {
            const result = yield call(api.fetchBizSysList, { page, keyWord });
            const { data: { contents: list, totalSize: total } } = result;
            yield put({
                type: 'save',
                payload: {
                    list,
                    total,
                    page: parseInt(page, 10),
                },
            });
        },
        *removeBizSys({ payload: id }, { call, put }) {
            yield call(api.removeBizSys, id);
            yield put({ type: 'reload' });
        },
        // *patch({ payload: { id, values } }, { call, put }) {
        //     yield call(api.patch, id, values);
        //     yield put({ type: 'reload' });
        // },
        *updateBiz({ payload: { values } }, { call, put }) {
            yield call(api.updateBiz, values);
            yield put({ type: 'reload' });
        },
        *createBiz({ payload: values }, { call, put }) {
            yield call(api.createBiz, values);
            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }) {
            // const page = yield select(state => state.users.page);
            yield put({ type: 'fetchBizSysList', payload: { page: 1, keyWord: '' } });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
