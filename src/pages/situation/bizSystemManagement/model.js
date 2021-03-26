
import * as api from './service';
export default {
    namespace: 'bizSystemManagement',
    state: {
        path: undefined,
        list: [],
        total: null,
        page: null,
        lastIndexKey: 0,
        createBiz: {
            id: '',
            impactFactor: '',
            name: '',
            objectList: [],
            platform: '',
            runThreshold: '',
            lastIndexKey: 0
        }
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
            list.map((item, index) => {
                //添加key
                item.key = index;
                item.lastIndexKey = 0;
                item.objectList.map((item1, index1) => {
                    item1.key = index1;
                    item.lastIndexKey = index1;
                });
            });
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
        *createBiz({ payload: values }, { call, put, select }) {
            const createBiz = yield select(state => state.bizSystemManagement.createBiz);
            yield call(api.createBiz, createBiz);
            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }) {
            const page = yield select(state => state.bizSystemManagement.page);
            yield put({ type: 'fetchBizSysList', payload: { page, keyWord: '' } });
        },
        *updateNewBiz({ value }, { call, put, select }) {
            yield put({ type: 'updateNewBizOne', value });
        },
        *copyBizToCreateBiz({ value }, { call, put }) {
            yield put({ type: 'copyBizToCreateBizFn', value });
        },
        *emptyCreateBiz({ value }, { call, put }) {
            yield put({ type: 'emptyCreateBizFn', value });
        },
        *createBizList({ value }, { call, put }) {
            yield put({ type: 'createBizListOne', value });
        },
        *updateBizList({ value }, { call, put }) {
            yield put({ type: 'updateBizListOne', value });
        },
        *delBizList({ value }, { call, put }) {
            yield put({ type: 'delBizListOne', value });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        updateNewBizOne(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            const { key, value, objId } = action.value;
            newState.createBiz[key] = value;
            return {
                ...state,
                ...newState
            }
        },
        copyBizToCreateBizFn(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            const { bId } = action.value;
            if (bId != undefined && bId != 'new') {
                newState.createBiz = newState.list.find((item) => {
                    return item.id == bId;
                });
            }
            return {
                ...state,
                ...newState
            }
        },
        emptyCreateBizFn(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            newState.createBiz = {
                id: '',
                impactFactor: '',
                name: '',
                objectList: [],
                platform: '',
                runThreshold: ''
            };
            return {
                ...state,
                ...newState
            }
        },
        createBizListOne(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            const { bId } = action.value;
            const { createBiz } = newState;
            createBiz.objectList.push({
                id: '',
                impactFactor: '',
                objectName: '',
                key: Math.random()
            });
            createBiz.lastIndexKey = createBiz.lastIndexKey + 1;
            return {
                ...state,
                ...newState,
            };
        },
        updateBizListOne(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            const { val, i, bId, type, message } = action.value;
            if (type == 'id') {
                const existIndicator = newState.createBiz.objectList.find(item => (item.id == val));
                if (existIndicator) {
                    existIndicator && message.error('不能绑定相同的对象到同一个业务系统下！');
                    return newState;
                }
            }
            newState.createBiz.objectList[i][type] = val;
            return {
                ...state,
                ...newState
            }
        },
        delBizListOne(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            const { index, bId } = action.value;
            newState.createBiz.objectList.splice(index, 1);
            return {
                ...state,
                ...newState
            };
        },
    },

};
