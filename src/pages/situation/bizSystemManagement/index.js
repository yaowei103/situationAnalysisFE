import React from 'react';
import { connect } from 'dva';
// import { Link } from 'umi';
import { Table, Pagination, Popconfirm, Button, Input, Icon } from 'antd';
import { Page } from '@components';
import styles from './index.css';
import UserModal from '../components/Modal';
import TableSearch from '../components/TableSearch';


function BizSystemManagement({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    // 调用models users 内remove方法
    dispatch({
      type: 'users/removeuser',
      payload: id,
    });
  }
  function pageChangeHandler(page) {
    dispatch({
      type: 'users/fetch',
      payload: { page },
    });
  }
  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }
  function handleSearch({ account }) {
    this.props.dispatch({
      type: 'githubPro/getAccountInfo',
      payload: {
        account
      }
    });
  }
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
      dataIndex: 'bizSystem',
      key: 'bizSystem',
    },
    {
      title: '影响因子',
      dataIndex: 'impactFactors',
      key: 'impactFactors',
    },
    {
      title: '所监测对象',
      dataIndex: 'monitoredObj',
      key: 'monitoredObj',
    },
    {
      title: '平台',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: '预警阈值',
      dataIndex: 'alarmThreshold',
      key: 'alarmThreshold',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a href="/">Edit</a>
          </UserModal>
          {
            record.operation
              ? <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
                <a href="/">Delete</a>
              </Popconfirm>
              : ''
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
        <TableSearch dispatch={dispatch} value="" onSubmit={handleSearch} />
        {/* <Button type="primary">新增</Button>
        </UserModal> */}
      </div>
      <Table
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
  const { list, total, page } = state.BizSystemManagement;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
  };
}
export default connect(mapStateToProps)(BizSystemManagement);