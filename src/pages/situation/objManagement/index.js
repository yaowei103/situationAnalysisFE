import React from 'react';
import { connect } from 'dva';
// import { Link } from 'umi';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { Page } from '@components';
import styles from './index.css';
// import UserModal from '../components/Modal';
import TableSearch from '../components/TableSearch';
import { formatDataForRowSpan } from '../../lib/resDataFormat';


function ObjManagement({ dispatch, list: dataSource, loading, total, page: current, indicatorOptions, objectOptions, levelOptions }) {
  function deleteHandler(id) {
    // 调用models users 内remove方法
    dispatch({
      type: 'objManagement/removeObj',
      payload: id,
    });
  }
  function pageChangeHandler(page) {
    dispatch({
      type: 'users/fetch',
      payload: { page },
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
      type: 'objManagement/fetchObj',
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
      render(text, record) {
        return {
          children: record.id,
          props: {
            rowSpan: record.rowSpan,
          }
        }
      }
    },
    {
      title: '所属层次',
      dataIndex: 'levelName',
      key: 'levelName',
      render(text, record) {
        return {
          children: record.levelName,
          props: {
            rowSpan: record.rowSpan,
          }
        }
      }
    },
    {
      title: '检测对象',
      dataIndex: 'objectName',
      key: 'objectName',
      render(text, record) {
        return {
          children: record.objectName,
          props: {
            rowSpan: record.rowSpan,
          }
        }
      }
    },
    {
      title: '统计指标',
      dataIndex: 'indicatorName',
      key: 'indicatorName',
    },
    {
      title: '报警阈值',
      dataIndex: 'runThreshold',
      key: 'runThreshold',
      render(text, record) {
        return {
          children: record.runThreshold,
          props: {
            rowSpan: record.rowSpan,
          }
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          {/* <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a href="/">Edit</a>
          </UserModal> */}
          {
            record.operation
              ? <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
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
        <TableSearch dispatch={dispatch} value="" onSearch={handleSearch} createType="obj" indicatorOptions={indicatorOptions} objectOptions={objectOptions} levelOptions={levelOptions} />
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
  const { list, total, page } = state.objManagement;
  const { indicatorOptions, objectOptions, levelOptions } = state.global;
  return {
    // list: formatDataForRowSpan(list),
    list,
    total,
    page,
    loading: state.loading.models.users,
    indicatorOptions,
    objectOptions,
    levelOptions
  };
}
export default connect(mapStateToProps)(ObjManagement);
