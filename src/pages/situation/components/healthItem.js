import React from 'react';
import { connect } from 'dva';
// import { Link } from 'umi';
import { Button, Select, Row, Col, Popconfirm, Form, Input } from 'antd';
// import { Page } from '@components';
import styles from './index.css';
import CreateAllHealthObj from './CreateAllHealthObj';
// import UserModal from '../components/Modal';
// import HealthItem from '../components/healthItem';
const FormItem = Form.Item;


function HealthItem({ dispatch, objectOptions, listItem, form }) {

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const { getFieldDecorator } = form;

  const createHandler = (values) => {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  const addObj = (resultVal, forArrangeId) => {
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

  function renderSelect(objectOptions) {
    return objectOptions && objectOptions.map((item, i) => {
      return <Select.Option key={i} value={item.id}>{item.name}</Select.Option>;
    });
  }

  function renderObjList(objectList, healthItemId) {
    return objectList && objectList.map((item, index) => {
      return (
        <Row className={styles.itemRow} key={index}>
          <Col span={6} className={styles.col}>
            <FormItem
              className={styles.allWidth}
              {...formItemLayout}
            >
              {
                getFieldDecorator('id', {
                  initialValue: item.id,
                })(<Select className={styles.select} >
                  {
                    renderSelect(objectOptions)
                  }
                </Select>)
              }
            </FormItem>
          </Col>
          <Col span={6} className={styles.col}>
            {/* <strong>影响因子：</strong> <div className={styles.underLine}> {item.impactFactor} </div> */}
            <FormItem
              {...formItemLayout}
              label="影响因子"
            >
              {
                getFieldDecorator('impactFactor', {
                  initialValue: item.impactFactor,
                })(<Input />)
              }
            </FormItem>
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
    <div className={styles.healthItem} id={listItem.id}>
      <Row className={styles.itemRow}>
        <Col span={6} className={styles.col}>
          {/* <strong>层次名称：</strong> <div className={styles.underLine}> {listItem.name} </div> */}
          <FormItem
            {...formItemLayout}
            label="层次名称："
          >
            {
              getFieldDecorator('name', {
                initialValue: listItem.name,
              })(<Input disabled />)
            }
          </FormItem>
        </Col>
        <Col span={6} className={styles.col}>
          {/* <strong>影响因子：</strong> <div className={styles.underLine}> {listItem.impactFactor} </div> */}
          <FormItem
            {...formItemLayout}
            label="影响因子:"
          >
            {
              getFieldDecorator('impactFactor', {
                initialValue: listItem.impactFactor,
              })(<Input />)
            }
          </FormItem>
        </Col>
        <Col span={6} className={styles.col}>
          {/* <strong>预警阈值：</strong> <div className={styles.underLine}> {listItem.runThreshold} </div> */}
          <FormItem
            {...formItemLayout}
            label="预警阈值:"
          >
            {
              getFieldDecorator('runThreshold', {
                initialValue: listItem.runThreshold,
              })(<Input />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        {/* <Col span={6} className={styles.col}> */}
        <span>对象设置</span><Button className={styles.createBtn} type="primary" shape="round" size="small" >新增</Button>
        {/* <CreateAllHealthObj objectOptions={objectOptions} onOk={(resultVal) => { addObj(resultVal, listItem.id); }} /> */}
        {/* </Col> */}
      </Row>
      {
        renderObjList(listItem.objectList, listItem.id)
      }
    </div>
  );
}

function mapStateToProps(state) {
  // const { list } = state.allHealth;
  const { objectOptions } = state.global;
  return {
    loading: state.loading.models.users,
    objectOptions
  };
}
export default connect(mapStateToProps)(HealthItem);
