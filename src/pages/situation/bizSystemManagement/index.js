import React from 'react';
import { connect } from 'dva';
// import { Link } from 'umi';
import { Table, Pagination, Popconfirm, Button, Input, Icon } from 'antd';
import { Page } from '@components';
import styles from './index.css';
import CreateBizSys from '../components/CreateBizSys';
import TableSearch from '../components/TableSearch';


function BizSystemManagement({ dispatch, list: dataSource, loading, total, page: current, indicatorOptions, objectOptions, levelOptions, createBiz }) {
  function deleteHandler(id) {
    // 调用models users 内remove方法
    dispatch({
      type: 'bizSystemManagement/removeBizSys',
      payload: id,
    });
  }
  function pageChangeHandler(page) {
    dispatch({
      type: 'bizSystemManagement/fetch',
      payload: { page },
    });
  }
  function editHandler(id, values) {
    if (id) {
      values.id = id;
    }
    dispatch({
      type: 'bizSystemManagement/updateBiz',
      payload: { values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'bizSystemManagement/create',
      payload: values,
    });
  }
  function handleSearch({ keyWord }) {
    dispatch({
      type: 'bizSystemManagement/fetchBizSysList',
      payload: {
        keyWord
      }
    });
  }
  const enditBiz = (bId) => {
    dispatch({
      type: 'global/getObjectOptions',
      payload: {
        bId
      }
    });
    copyBizToCreateBiz(bId);
  }

  const copyBizToCreateBiz = (bId) => {
    dispatch({
      type: 'bizSystemManagement/copyBizToCreateBiz',
      value: {
        bId
      }
    });
  };
  /**
   * id: '@id',
        belongToObj: '@name',
        testIndex: '@name',
        indexDesc: Random.cparagraph(1),
        operation: '@operation'
   */
  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      // render: text => <Link to={`/sys/users/${text}`}>{text}</Link>,
    },
    {
      title: '业务系统',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '影响因子',
      dataIndex: 'impactFactor',
      key: 'impactFactor',
    },
    {
      title: '所监测对象',
      dataIndex: 'objectList',
      key: 'objectList',
      render: (text, record) => {
        const { objectList } = record;
        if (objectList.length > 0) {
          const renderTextArr = [];
          objectList.map((item) => {
            renderTextArr.push(item.objectName);
          })
          return (<span>{renderTextArr.join('、')}</span>);
        }

      }
    },
    {
      title: '平台',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: '预警阈值',
      dataIndex: 'runThreshold',
      key: 'runThreshold',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          {
            record.isOriginalValue
              ? ''
              : <CreateBizSys
                record={createBiz}
                onOk={editHandler.bind(null, record.id)} indicatorOptions={indicatorOptions}
                objectOptions={objectOptions}
                levelOptions={levelOptions}
                dispatch={dispatch}
              >
                <a href="/" onClick={() => { enditBiz(record.id); }}>编辑</a>
              </CreateBizSys>
          }
          {
            record.isOriginalValue
              ? ''
              : <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
                <a href="/">删除</a>
              </Popconfirm>
          }
        </span>
      ),
    },
  ];
  return (
    <Page loading={false}>
      <div className={styles.create}>
        {/* <UserModal
          record={{}}
          onOk={createHandler}
        > */}
        <TableSearch dispatch={dispatch} value="" onSearch={handleSearch} createType="biz" indicatorOptions={indicatorOptions} objectOptions={objectOptions} levelOptions={levelOptions} />
        {/* <Button type="primary">新增</Button>
        </UserModal> */}
      </div>
      <Table
        bordered
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        rowKey={record => record.id}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={10}
        onChange={pageChangeHandler}
      />
    </Page>
  );
}

function mapStateToProps(state) {
  const { list, total, page, createBiz } = state.bizSystemManagement;
  const { indicatorOptions, objectOptions, levelOptions } = state.global;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
    indicatorOptions,
    objectOptions,
    levelOptions,
    createBiz
  };
}
export default connect(mapStateToProps)(BizSystemManagement);
