import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
// import { Link } from 'umi';
import { Button, Select, Row, Col, Popconfirm, Form, Input, Divider, message } from 'antd';
// import { Page } from '@components';
import styles from './index.css';
import CreateAllHealthObj from './CreateAllHealthObj';
// import UserModal from '../components/Modal';
// import HealthItem from '../components/healthItem';
const FormItem = Form.Item;


function HealthItem({ dispatch, objectOptions, listItem, form }) {
  const [state, setState] = useState({
    disabledCreate: false
  });
  useEffect(() => {
    const { objectList } = listItem;
    let disabledCreate;
    if (objectList.length <= 0) {
      disabledCreate = false;
    } else {
      disabledCreate = !objectList.every((item) => { return item.id && item.id != '' });
    }
    setState({
      ...state,
      disabledCreate
    });
  }, [listItem]);


  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  };
  const formAllWidthItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };
  const styleBottom0 = {
    width: '100%',
    marginBottom: 0
  };
  const styleBottom10 = {
    marginBottom: '10px'
  }
  const styleWidth100 = {
    width: '100%'
  };
  const { getFieldDecorator } = form;

  const createLevelObj = (addItemId) => {
    dispatch({
      type: 'allHealth/addObj',
      value: {
        id: addItemId
      }
    });
  }

  const deleteHandler = (healthItemId, objConfigId) => {
    dispatch({
      type: 'allHealth/delObj',
      value: {
        healthItemId,
        objConfigId
      }
    });
  }

  const handleObjChange = (sign, val) => {
    dispatch({
      type: 'allHealth/changeObj',
      value: {
        sign,
        val,
        message
      }
    });
  }

  const saveHandler = (healthItemId) => {
    // 保存数据
    dispatch({
      type: 'allHealth/updateLevel',
      value: {
        healthItemId
      }
    });
  }

  const updateLocalLevel = (healthItemId, field, value) => {
    dispatch({
      type: 'allHealth/updateLocalLevel',
      value: {
        healthItemId,
        field,
        value
      }
    });
  }

  const renderSelect = (objectList, objectOptions) => {
    const allObjArr = objectList.concat(objectOptions);
    return allObjArr && allObjArr.map((item) => {
      return <Select.Option key={item.id} value={item.id}>{item.name || item.objectName}</Select.Option>;
    });
  }

  const renderObjList = (objectList, healthItem) => {
    return objectList && objectList.map((item, index) => {
      return (
        <Row className={styles.itemRow} key={item.id}>
          <Col span={6} className={styles.col}>
            <FormItem
              style={{ display: 'none' }}
              {...formAllWidthItemLayout}
            >
              {
                getFieldDecorator(`id_${healthItem.id}_${item.id}`, {
                  initialValue: item.id,
                })(<input />)
              }
            </FormItem>
            <FormItem
              style={styleBottom0}
              {...formAllWidthItemLayout}
            >
              <Select value={item.id} className={styles.select} onChange={(val) => { handleObjChange(`objectName_${healthItem.id}_${index}`, val); }}>
                {
                  renderSelect(healthItem.objectList, objectOptions)
                }
              </Select>
            </FormItem>
          </Col>
          <Col span={6} className={styles.col}>
            <FormItem
              style={styleBottom0}
              {...formItemLayout}
              label="影响因子"
            >
              <Input value={item.impactFactor} onChange={(e) => { handleObjChange(`impactFactor_${healthItem.id}_${index}`, e.target.value); }} />
            </FormItem>
          </Col>
          <Col span={6} className={styles.col}>
            <Popconfirm title="确认删除吗？" onConfirm={() => { deleteHandler(healthItem.id, item.id); }}>
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
          <FormItem
            {...formItemLayout}
            style={styleBottom10}
            label="层次名称："
          >
            {
              getFieldDecorator(`name_${listItem.id}`, {
                initialValue: listItem.name,
              })(<Input disabled />)
            }
          </FormItem>
        </Col>
        <Col span={6} className={styles.col}>
          <FormItem
            {...formItemLayout}
            style={styleBottom10}
            label="影响因子:"
          >
            <Input value={listItem.impactFactor} onChange={(e) => { updateLocalLevel(listItem.id, 'impactFactor', e.target.value) }} />
          </FormItem>
        </Col>
        <Col span={6} className={styles.col}>
          <FormItem
            {...formItemLayout}
            style={styleBottom10}
            label="预警阈值:"
          >
            <Input value={listItem.runThreshold} onChange={(e) => { updateLocalLevel(listItem.id, 'runThreshold', e.target.value) }} />
          </FormItem>
        </Col>
        <Col span={6} className={styles.col}>
          <Button type="primary" onClick={() => { saveHandler(listItem.id) }}>保存</Button>
        </Col>
      </Row>
      <Row className={styles.titleRow}>
        <span>对象设置</span>
        <Button className={styles.createBtn} disabled={state.disabledCreate} onClick={() => { createLevelObj(listItem.id) }} type="primary" shape="round" size="small" >新增</Button>
      </Row>
      {
        renderObjList(listItem.objectList, listItem)
      }
      <Divider />
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
