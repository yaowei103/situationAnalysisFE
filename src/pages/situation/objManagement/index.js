import React from 'react';
import { connect } from 'dva';
// import { Link } from 'umi';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { Page } from '@components';
import styles from './index.css';
// import UserModal from '../components/Modal';
import TableSearch from '../components/TableSearch';
import { formatDataForRowSpan } from '../../lib/resDataFormat';
import CreateObj from '../components/CreateObj';


function ObjManagement({ dispatch, list: dataSource, loading, total, page: current, indicatorOptions, objectOptions, levelOptions }) {
  // 对数据进行排序，方便合并单元格
  // dataSource.sort((a, b) => {
  //   if (a['objectName'] != b['objectName']) {
  //     return a['objectName'].localeCompare(b['objectName']);
  //   }
  // });
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

  const calcRowSpan = (calcName, row, index, data) => {
    const obj = {
      children: row[calcName],
      props: {},
    };
    // 与上一行不同，计算行数
    if ((index > 0 && row[calcName] !== data[index - 1][calcName]) || index === 0) {
      obj.props.rowSpan = getMergeRowNum(calcName, row, data);
    } else {
      obj.props.rowSpan = 0;
    }
    return obj;
  };

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      // render(text, record, index) {
      //   // return calcRowSpan('id', record, index, dataSource);
      // }
    },
    {
      title: '所属层次',
      dataIndex: 'levelName',
      key: 'levelName',
      // render(text, record, index) {
      //   // return calcRowSpan('levelName', record, index, dataSource);
      // }
    },
    {
      title: '检测对象',
      dataIndex: 'objectName',
      key: 'objectName',
      // render(text, record, index) {
      //   // return calcRowSpan('objectName', record, index, dataSource);
      // }
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
      // render(text, record, index) {
      //   // return calcRowSpan('runThreshold', record, index, dataSource);
      // }
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
              : <CreateObj record={record} onOk={(values) => { editHandler(values, record.id) }} levelOptions={levelOptions} indicatorOptions={indicatorOptions}>
                <a href="/">编辑</a>
              </CreateObj>
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
