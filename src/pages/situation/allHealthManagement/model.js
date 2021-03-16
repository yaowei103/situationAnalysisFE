
import * as api from './service';
export default {
    namespace: 'allHealth',
    state: {
        path: undefined,
        list: []
    },
    subscriptions: {
        setupHistory({ dispatch, history }) {
            history.listen(({ pathname, query, state }) => {
                if (pathname === '/situation/allHealthManagement') {
                    dispatch({ type: 'fetch', payload: query });
                }
            });
        },
    },

    effects: {
        *fetch({ payload: { page = 1, keyWord } }, { call, put }) {
            const result = yield call(api.fetch, { page, keyWord });
            const { data: list } = result;
            yield put({
                type: 'save',
                payload: {
                    list,
                },
            });
        },
        *updateLevel({ payload }, { call, put }) {
            yield call(api.updateLevel, payload);
            yield put({ type: 'reload' });
        },
        *addObj({ value }, { call, put }) {
            yield put({ type: 'addOneObj', value });
        },
        *delObj({ value }, { call, put }) {
            yield put({ type: 'deleteOneObj', value });
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
            // const page = yield select(state => state.users.page);
            yield put({ type: 'fetch', payload: { page: 1, keyWord: '' } });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        addOneObj(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            const id = action.value.id;
            newState.list.map((item, index) => {
                if (item.id === id) {
                    const newItem = { ...item };
                    newItem.objectList.push({
                        objectName: '',
                        impactFactor: ''
                    });
                    return newItem;
                }
            });
            return newState;
        },
        deleteOneObj(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            const { healthItemId, objConfigId } = action.value;
            const healthItemIndex = newState.list.findIndex((item) => {
                return item.id === healthItemId;
                // const newItem = { ...item };
                // newItem.objectList.push({
                //     objectName: '',
                //     impactFactor: ''
                // });
                // return newItem;
            });
            const healthItemObj = newState.list[healthItemIndex];
            if (objConfigId !== '') {
                const objItemIndex = healthItemObj.objectList.findIndex((item) => { return item.id === objConfigId });
                healthItemObj.objectList.splice(objItemIndex, 1);
            } else {
                healthItemObj.objectList.pop();
            }
            return newState;
        }
    },

};
