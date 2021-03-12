
import * as api from './service';
export default {
    namespace: 'objManagement',
    state: {
        path: undefined,
        list: [],
        total: null,
        page: null,
    },
    subscriptions: {
        setupHistory({ dispatch, history }) {
            history.listen(({ pathname, query, state }) => { // eslint-disable-line
                if (pathname === '/situation/objManagement') {
                    dispatch({ type: 'fetchObj', payload: query });
                }
            });
        },
    },

    effects: {
        *fetchObj({ payload: { page = 1, searchParam } }, { call, put }) {
            const result = yield call(api.fetchObj, { page, searchParam });
            const { data: list, total } = result;
            yield put({
                type: 'save',
                payload: {
                    list,
                    total,
                    page: parseInt(page, 10),
                },
            });
        },
        *removeObj({ payload: id }, { call, put }) {
            yield call(api.removeObj, id);
            yield put({ type: 'reload' });
        },
        // *patch({ payload: { id, values } }, { call, put }) {
        //     yield call(api.patch, id, values);
        //     yield put({ type: 'reload' });
        // },
        *createObj({ payload: values }, { call, put }) {
            yield call(api.createObj, values);
            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }) {
            const page = yield select(state => state.users.page);
            yield put({ type: 'fetch', payload: { page } });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
