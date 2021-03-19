
import * as api from './service';
export default {
    namespace: 'indexManagement',
    state: {
        path: undefined,
        list: [],
        total: null,
        page: null,
    },
    subscriptions: {
        setupHistory({ dispatch, history }) {
            history.listen(({ pathname, query, state }) => { // eslint-disable-line
                if (pathname === '/situation/indexManagement') {
                    dispatch({ type: 'fetchIndex', payload: query });
                }
            });
        },
    },

    effects: {
        *fetchIndex({ payload: { page = 1, keyWord } }, { call, put }) {
            const result = yield call(api.fetchIndex, { page, keyWord });
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
        *removeIndex({ payload: id }, { call, put }) {
            yield call(api.removeIndex, id);
            yield put({ type: 'reload' });
        },
        *createIndex({ payload: values }, { call, put }) {
            yield call(api.createIndex, values);
            yield put({ type: 'reload' });
        },
        // *patch({ payload: { id, values } }, { call, put }) {
        //     yield call(api.patch, id, values);
        //     yield put({ type: 'reload' });
        // },
        // *create({ payload: values }, { call, put }) {
        //     yield call(api.create, values);
        //     yield put({ type: 'reload' });
        // },
        *reload(action, { put, select }) {
            const page = yield select(state => state.indexManagement.page);
            yield put({ type: 'fetchIndex', payload: { page } });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
