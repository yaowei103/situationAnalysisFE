import React from 'react';
import { connect } from 'dva';
// import { Link } from 'umi';
import { Table, Pagination, Popconfirm, Button, Input, Icon } from 'antd';
import { Page } from '@components';
import styles from './index.css';
import TableSearch from '../components/TableSearch';


function IndexManagement({ dispatch, list: dataSource, loading, total, page: current, indicatorOptions, objectOptions, levelOptions }) {
  function deleteHandler(id) {
    // 调用models users 内remove方法
    dispatch({
      type: 'indexManagement/removeIndex',
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
  function handleSearch({ keyWord }) {
    dispatch({
      type: 'indexManagement/fetchIndex',
      payload: {
        keyWord
      }
    });
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      // render: text => <Link to={`/sys/users/${text}`}>{text}</Link>,
    },
    {
      title: '所属对象',
      dataIndex: 'objectName',
      key: 'objectName',
    },
    {
      title: '监测指标',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '指标说明',
      dataIndex: 'instruction',
      key: 'instruction',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          {
            record.isOriginalValue === 'N'
              ? <Popconfirm title="确认删除吗？" onConfirm={deleteHandler.bind(null, record.id)}>
                <a href="/">删除</a>
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
        <TableSearch dispatch={dispatch} value="" onSearch={handleSearch} createType="index" indicatorOptions={indicatorOptions} objectOptions={objectOptions} levelOptions={levelOptions} />
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
  const { list, total, page } = state.indexManagement;
  const { indicatorOptions, objectOptions, levelOptions } = state.global;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
    indicatorOptions,
    objectOptions,
    levelOptions
  };
}
export default connect(mapStateToProps)(IndexManagement);
