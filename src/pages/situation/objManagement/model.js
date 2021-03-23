
import * as api from './service';
export default {
    namespace: 'objManagement',
    state: {
        path: undefined,
        list: [],
        total: null,
        page: null,
        lastIndexKey: 0,
        createObj: {
            indicatorInfoList: [],
            indicatorName: "",
            isOriginalValue: "",
            lastIndexKey: 0,
            objectName: '',
            runThreshold: ''
        }
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
        *fetchObj({ payload: { page = 1, keyWord } }, { call, put }) {
            const result = yield call(api.fetchObj, { page, keyWord });
            const { data: { contents: list, totalSize: total } } = result;
            list.map((item, index) => {
                item.levelName = item.levelName === null ? '' : item.levelName;
                item.objectName = item.objectName === null ? '' : item.objectName;
                //添加key
                item.key = index;
                item.lastIndexKey = 0;
                item.indicatorInfoList.map((item1, index1) => {
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
        *removeObj({ payload: id }, { call, put }) {
            yield call(api.removeObj, id);
            yield put({ type: 'reload' });
        },
        *updateObjList({ value }, { call, put }) {
            yield put({ type: 'updateObjListOne', value });
        },
        *delObjList({ value }, { call, put }) {
            yield put({ type: 'delObjListOne', value });
        },
        *updateObj({ payload: values }, { call, put }) {
            yield call(api.updateObj, values);
            yield put({ type: 'reload' });
        },
        *updateNewObj({ value }, { call, put, select }) {
            yield put({ type: 'updateNewObjOne', value });
        },
        *createObj({ payload: values }, { call, put, select }) {
            const createObj = yield select(state => state.objManagement.createObj);
            yield call(api.createObj, createObj);
            yield put({ type: 'reload' });
        },

        *createObjList({ value }, { call, put }) {
            yield put({ type: 'createObjListOne', value });
        },

        *reload(action, { put, select }) {
            const page = yield select(state => state.objManagement.page);
            yield put({ type: 'fetchObj', payload: { page, keyWord: '' } });
        },
        *copyObjToCreateObj({ value }, { call, put }) {
            yield put({ type: 'copyObjToCreateObjFn', value });
        },
        *emptyCreateObj({ value }, { call, put }) {
            yield put({ type: 'emptyCreateObjFn', value });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        updateObjListOne(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            const { val, i, objId, type } = action.value;
            newState.createObj.indicatorInfoList[i][type] = val;
            return {
                ...state,
                ...newState
            }
        },
        createObjListOne(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            const { objId } = action.value;
            const { createObj } = newState;
            createObj.indicatorInfoList.push({
                id: '',
                impactFactor: '',
                // key: createObj.lastIndexKey
                key: Math.random()
            });
            createObj.lastIndexKey = createObj.lastIndexKey + 1;
            return {
                ...state,
                ...newState,
            };
        },
        delObjListOne(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            const { index, objId } = action.value;
            newState.createObj.indicatorInfoList.splice(index, 1);
            return {
                ...state,
                ...newState
            };
        },
        copyObjToCreateObjFn(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            const { oId } = action.value;
            if (oId != undefined && oId != 'new') {
                newState.createObj = newState.list.find((item) => {
                    return item.id == oId;
                });
            }
            return {
                ...state,
                ...newState
            }
        },
        updateNewObjOne(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            const { key, value, objId } = action.value;
            newState.createObj[key] = value;
            return {
                ...state,
                ...newState
            }
        },
        emptyCreateObjFn(state, action) {
            const newState = JSON.parse(JSON.stringify(state));
            newState.createObj = {
                indicatorInfoList: [],
                indicatorName: "",
                isOriginalValue: "",
                lastIndexKey: 0,
                objectName: '',
                runThreshold: ''
            };
            return {
                ...state,
                ...newState
            }
        },
    },

};
