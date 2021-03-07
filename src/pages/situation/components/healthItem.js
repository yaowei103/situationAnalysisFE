import React from 'react';
import { connect } from 'dva';
// import { Link } from 'umi';
import { Button, Select, Row, Col, Popconfirm } from 'antd';
// import { Page } from '@components';
import styles from './index.css';
import CreateAllHealthObj from './CreateAllHealthObj';
// import UserModal from '../components/Modal';
// import HealthItem from '../components/healthItem';


function HealthItem({ dispatch, list, objConfigArr, listItem }) {

  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  function addObj(resultVal, forArrangeId) {
    dispatch({
      type: 'allHealth/addObj',
      value: {
        resultVal,
        forArrangeId
      }
    });
  }

  function deleteHandler(healthItemId, objConfigId) {
    debugger;
  }

  function renderSelect(objConfigArr) {
    return objConfigArr.map((item, i) => {
      return <Select.Option key={i} value={item.id}>{item.name}</Select.Option>;
    });
  }

  function renderObjList(objConfig, healthItemId) {
    return objConfig.map((item, index) => {
      return (
        <Row className={styles.itemRow} key={index}>
          <Col span={6} className={styles.col}>
            <Select className={styles.select} disabled defaultValue={item.obj} >
              {
                renderSelect(objConfigArr)
              }
            </Select>
          </Col>
          <Col span={6} className={styles.col}>
            <strong>影响因子：</strong> <div className={styles.underLine}> {item.impactFactors} </div>
          </Col>
          <Col span={6} className={styles.col}>
            <Popconfirm title="确认删除吗？" onConfirm={deleteHandler.bind(null, healthItemId, item.id)}>
              <Button type="danger" size="small" shape="round">删除</Button>
            </Popconfirm>
          </Col>
        </Row>
      );
    });
  }

  return (
    <div className={styles.healthItem}>
      <Row className={styles.itemRow}>
        <Col span={6} className={styles.col}>
          <strong>层次名称：</strong> <div className={styles.underLine}> {listItem.arrangeName} </div>
        </Col>
        <Col span={6} className={styles.col}>
          <strong>影响因子：</strong> <div className={styles.underLine}> {listItem.impactFactors} </div>
        </Col>
        <Col span={6} className={styles.col}>
          <strong>预警阈值：</strong> <div className={styles.underLine}> {listItem.alarmThreshold} </div>
        </Col>
      </Row>
      <Row className={styles.itemRow}>
        <Col span={6} className={styles.col}>
          <strong>对象设置</strong>
          <CreateAllHealthObj objConfigArr={objConfigArr} onOk={(resultVal) => { addObj(resultVal, listItem.id); }}>
            <Button className={styles.createBtn} type="primary" shape="round" size="small" >新增</Button>
          </CreateAllHealthObj>
        </Col>
      </Row>
      {
        renderObjList(listItem.objConfig, listItem.id)
      }
    </div>
  );
}

function mapStateToProps(state) {
  const { list, objConfigArr } = state.allHealth;
  return {
    objConfigArr,
    list,
    loading: state.loading.models.users,
  };
}
export default connect(mapStateToProps)(HealthItem);
