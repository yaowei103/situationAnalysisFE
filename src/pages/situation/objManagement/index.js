import React, { useEffect, useReducer } from 'react';
import { connect } from 'dva';
// import { Link } from 'umi';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { Page } from '@components';
import styles from './index.css';
// import UserModal from '../components/Modal';
import TableSearch from '../components/TableSearch';
import CreateObj from '../components/CreateObj';


function ObjManagement({ dispatch, list, loading, total, page: current, createObj, indicatorOptions, objectOptions, levelOptions, state: store }) {
  const dataSource = JSON.parse(JSON.stringify(list));
  // 对数据进行排序，方便合并单元格
  dataSource.sort((a, b) => {
    if (a['levelName'] != null && b['levelName'] != null) {
      if (a['levelName'] != b['levelName']) {
        return a['levelName'].localeCompare(b['levelName']);
      } else {
        return a['objectName'].localeCompare(b['objectName']);
      }
    }
  });

  function deleteHandler(id) {
    // 调用models users 内remove方法
    dispatch({
      type: 'objManagement/removeObj',
      payload: id,
    });
  }
  function pageChangeHandler(page) {
    dispatch({
      type: 'objManagement/fetchObj',
      payload: { page },
    });
  }

  function editHandler(values, id) {
    dispatch({
      type: 'objManagement/updateObj',
      payload: {
        ...values,
        id
      },
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
  const getMergeRowNum = (col_name, row, dataSource, compare_col_name = null) => {
    const temp = {};
    let n = 0;
    if (col_name !== temp[col_name]) {
      temp[col_name] = row[col_name];
      dataSource.forEach((e) => {
        if (compare_col_name !== null) {
          if (e[col_name] === temp[col_name] && e[compare_col_name] === row[compare_col_name]) {
            console.log(e[col_name], temp[col_name])
            n += 1;
          }
        } else {
          if (e[col_name] === temp[col_name]) {
            console.log(e[col_name], temp[col_name])
            n += 1;
          }
        }
      })
    }
    console.log(col_name + '=' + temp[col_name] + '合作行数', temp, n)
    return n
  };

  const calcRowSpan = (calcName, row, index, data, compare_col_name) => {
    const obj = {
      children: row[calcName],
      props: {},
    };
    // 与上一行不同，计算行数
    if ((index > 0 && row[calcName] !== data[index - 1][calcName]) || index === 0) {
      obj.props.rowSpan = getMergeRowNum(calcName, row, data, compare_col_name);
    } else {
      obj.props.rowSpan = 0;
    }
    return obj;
  };

  const enditObject = (oId) => {
    dispatch({
      type: 'global/getIndicatorOptions',
      payload: {
        oId
      }
    });
    copyObjToCreateObj(oId);
  }

  const copyObjToCreateObj = (oId) => {
    dispatch({
      type: 'objManagement/copyObjToCreateObj',
      value: {
        oId
      }
    });
  };

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render(text, record, index) {
        // return {
        //   children: record.id,
        //   props: {
        //     rowSpan: record.indicatorInfoList.length
        //   },
        // };
        return calcRowSpan('id', record, index, dataSource);
      }
    },
    {
      title: '所属层次',
      dataIndex: 'levelName',
      key: 'levelName',
      render(text, record, index) {
        return calcRowSpan('levelName', record, index, dataSource);
      }
    },
    {
      title: '检测对象',
      dataIndex: 'objectName',
      key: 'objectName',
      render(text, record, index) {
        return calcRowSpan('objectName', record, index, dataSource);
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
      render(text, record, index) {
        return calcRowSpan('runThreshold', record, index, dataSource, 'objectName');
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record, index) => {
        const child = (<span className={styles.operation}>
          {
            record.isOriginalValue
              ? ''
              : <CreateObj record={createObj} dispatch={dispatch} onOk={(values) => { editHandler(values, record.id) }} levelOptions={levelOptions} indicatorOptions={indicatorOptions}>
                <a href="/" onClick={() => { enditObject(record.id); }}>编辑</a>
              </CreateObj>
          }
          {
            record.isOriginalValue
              ? ''
              : <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
                <a href="/">删除</a>
              </Popconfirm>
          }
        </span>);
        const obj = {
          children: child,
          props: {},
        };
        // 与上一行不同，计算行数
        if ((index > 0 && record.objectName !== dataSource[index - 1].objectName) || index === 0) {
          obj.props.rowSpan = getMergeRowNum('operation', record, dataSource, 'objectName');
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
  ];

  return (
    <Page loading={false}>
      <div className={styles.create}>
        <TableSearch dispatch={dispatch} value="" onSearch={handleSearch} createType="obj" indicatorOptions={indicatorOptions} objectOptions={objectOptions} levelOptions={levelOptions} />
      </div>
      <Table
        columns={columns}
        bordered
        loading={loading}
        dataSource={dataSource}
        rowKey={record => record.key}
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
  const { list, total, page, createObj } = state.objManagement;
  const { indicatorOptions, objectOptions, levelOptions } = state.global;
  return {
    // list: formatDataForRowSpan(list),
    state,
    list,
    total,
    page,
    loading: state.loading.models.users,
    indicatorOptions,
    objectOptions,
    levelOptions,
    createObj
  };
}
export default connect(mapStateToProps)(ObjManagement);
