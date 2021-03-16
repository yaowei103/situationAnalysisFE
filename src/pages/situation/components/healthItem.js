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

  const createHandler = (values) => {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

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

  const saveHandler = (healthItemId) => {
    // const listData = JSON.parse(JSON.stringify(listItem));
    form.validateFields((err, values) => {
      if (!err) {
        const reqData = {
          id: healthItemId,
          name: values[`name_${healthItemId}`],
          impactFactor: values[`impactFactor_${healthItemId}`],
          runThreshold: values[`runThreshold_${healthItemId}`],
          objectList: []
        }
        for (var i = 0; i >= 0; i++) {
          if (values[`id_${healthItemId}_${i}`] === undefined) {
            if (values[`objectName_${healthItemId}_${i}`] === undefined) {
              break;
            } else if (values[`objectName_${healthItemId}_${i}`] !== '') { // 新增的obj
              const objItem = {
                objectName: values[`objectName_${healthItemId}_${i}`],
                impactFactor: values[`impactFactor_${healthItemId}_${i}`],
              };
              reqData.objectList.push(objItem);
            } else {
              break;
            }
          } else {
            const objItem = {
              id: values[`id_${healthItemId}_${i}`],
              objectName: values[`objectName_${healthItemId}_${i}`],
              impactFactor: values[`impactFactor_${healthItemId}_${i}`],
            };
            reqData.objectList.push(objItem);
          }
        }
        // 保存数据
        dispatch({
          type: 'allHealth/updateLevel',
          payload: {
            ...reqData
          }
        });
      }
    });
  }

  const renderSelect = (objectOptions) => {
    return objectOptions && objectOptions.map((item, i) => {
      return <Select.Option key={i} value={item.name}>{item.name}</Select.Option>;
    });
  }

  const renderObjList = (objectList, healthItemId) => {
    return objectList && objectList.map((item, index) => {
      return (
        <Row className={styles.itemRow} key={index}>
          <Col span={6} className={styles.col}>
            <FormItem
              style={{ display: 'none' }}
              {...formAllWidthItemLayout}
            >
              {
                getFieldDecorator(`id_${healthItemId}_${index}`, {
                  initialValue: item.id,
                })(<input />)
              }
            </FormItem>
            <FormItem
              style={styleBottom0}
              {...formAllWidthItemLayout}
            >
              {
                getFieldDecorator(`objectName_${healthItemId}_${index}`, {
                  initialValue: item.objectName,
                })(<Select className={styles.select} >
                  {
                    renderSelect(objectOptions)
                  }
                </Select>)
              }
            </FormItem>
          </Col>
          <Col span={6} className={styles.col}>
            <FormItem
              style={styleBottom0}
              {...formItemLayout}
              label="影响因子"
            >
              {
                getFieldDecorator(`impactFactor_${healthItemId}_${index}`, {
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
            {
              getFieldDecorator(`impactFactor_${listItem.id}`, {
                initialValue: listItem.impactFactor,
              })(<Input />)
            }
          </FormItem>
        </Col>
        <Col span={6} className={styles.col}>
          <FormItem
            {...formItemLayout}
            style={styleBottom10}
            label="预警阈值:"
          >
            {
              getFieldDecorator(`runThreshold_${listItem.id}`, {
                initialValue: listItem.runThreshold,
              })(<Input />)
            }
          </FormItem>
        </Col>
        <Col span={6} className={styles.col}>
          <Button type="primary" onClick={() => { saveHandler(listItem.id) }}>保存</Button>
        </Col>
      </Row>
      <Row className={styles.titleRow}>
        <span>对象设置</span><Button className={styles.createBtn} onClick={() => { createLevelObj(listItem.id) }} type="primary" shape="round" size="small" >新增</Button>
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
