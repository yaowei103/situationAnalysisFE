import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import { Modal, Form, Input, Select, Button, Row, Col } from 'antd';
import styles from './index.css';
// import reactTestRendererProductionMin from 'react-test-renderer/cjs/react-test-renderer.production.min';
const { TextArea } = Input;
const { Option } = Select;

const FormItem = Form.Item;
const CreateBizSys = (props) => {
  const [state, setState] = useState({
    visible: false,
    objInformationList: props.record.objectList || []
  });
  const { children, form, record } = props;
  const { getFieldDecorator } = form;
  const { id, name, runThreshold, objectList } = record;

  useEffect(() => {
    const { record } = props;
    const { objectList } = record;
    setState((state) => ({
      ...state,
      objInformationList: objectList
    }));
  }, [])

  useEffect(() => {
    const { record } = props;
    const { objectList } = record;
    setState((state) => ({
      ...state,
      objInformationList: objectList || []
    }));
  }, [objectList])

  const showModalHandler = (e) => {
    if (e) e.preventDefault();
    setState((state) => ({
      ...state,
      visible: true
    }));
  }
  const hideModalHandler = () => {
    setState((state) => ({
      ...state,
      visible: false,
      objInformationList: []
    }));
  }

  const mapIndicatorResult = (reqId) => {
    const { objectOptions } = props;
    return objectOptions.find((item, index) => {
      return item.id === reqId;
    });
  }

  const okHandler = () => {
    const { onOk } = props;
    props.form.validateFields((err, values) => {
      if (!err) {
        // 组装数据；
        const { objInformationList } = state;
        const indexLength = objInformationList.length;
        var reqObj = {
          name: values.name,
          platform: "解析系统1",
          impactFactor: 2,
          runThreshold: Number(values.runThreshold),
          objectList: []
        };
        if (id) {
          reqObj.id = id;
        }
        for (let i = 0; i < indexLength; i++) {
          reqObj.objectList.push({
            id: values[`indexId_${i}`],
            objectName: mapIndicatorResult(values[`indexId_${i}`]).name,
            impactFactor: Number(values[`impactFactors_${i}`])
          });
        }
        onOk(reqObj);
        hideModalHandler();
      }
    });
  }
  const createObjIndex = () => {
    const newState = { ...state };
    const newIndexArr = newState.objInformationList;
    newIndexArr.push({
      id: '',
      impactFactor: ''
    })
    setState((state) => ({
      ...state,
      objInformationList: newIndexArr
    }))
  }

  const renderObjectOptions = () => {
    const { objectOptions } = props;
    return objectOptions && objectOptions.map((item, index) => {
      return <Option key={item.id} value={item.id}>{item.name}</Option>;
    })
  }

  const renderList = () => {
    const { objInformationList } = state;
    const { form } = props;
    const { getFieldDecorator } = form;
    return objInformationList.map((item, i) => {
      const { id, impactFactor } = item;
      return (
        <Row key={Math.random()}>
          <Col span={9}>
            <FormItem
            >
              {
                getFieldDecorator(`indexId_${i}`, {
                  initialValue: id,
                })(<Select onChange={(val) => { handleObjIndexIdChange(val, i) }} >
                  {renderObjectOptions()}
                </Select>)
              }
            </FormItem>
          </Col>
          <Col span={1} />
          <Col span={9}>
            <FormItem
            >
              {
                getFieldDecorator(`impactFactors_${i}`, {
                  initialValue: impactFactor,
                })(<Input placeholder="推荐影响因子0.5~1" onChange={(e) => { handleObjimpactFactorsChange(e, i) }} />)
              }
            </FormItem>
          </Col>
          <Col span={1} />
          <Col span={4}>
            <Button type="danger" size="small" shape="round" onClick={() => { deleteObjIndex(i); }}>删除</Button>
          </Col>
        </Row>
      );
    });
  }
  const deleteObjIndex = (i) => {
    const newState = { ...state };
    const { objInformationList } = newState;
    objInformationList.splice(i, 1);
    setState((state) => ({
      ...state,
      objInformationList
    }));
    setFieldsValues();
  };
  const handleObjIndexIdChange = (val, i) => {
    var newState = { ...state };
    var { objInformationList } = newState;
    objInformationList[i].id = val;
    setState((state) => ({
      ...state,
      objInformationList
    }));
    setFieldsValues();
  }
  const handleObjimpactFactorsChange = (e, i) => {
    const val = e.target.value;
    var newState = { ...state };
    var { objInformationList } = newState;
    objInformationList[i].impactFactor = val;
    setState((state) => ({
      ...state,
      objInformationList
    }));
    setFieldsValues();
  }
  const setFieldsValues = () => {
    const { form } = props;
    const { setFieldsValue } = form;
    var { objInformationList } = state;
    for (let i = 0; i < objInformationList.length; i++) {
      setFieldsValue({
        [`indexId_${i}`]: objInformationList[i].id,
        [`impactFactors_${i}`]: objInformationList[i].impactFactor
      })
    }
  }

  return (
    <span>
      <span onClick={showModalHandler}>
        {children}
      </span>
      <Modal
        title="业务系统管理"
        id={id}
        visible={state.visible}
        onOk={okHandler}
        onCancel={hideModalHandler}
      >
        <Form onSubmit={okHandler} layout="vertical">
          <FormItem
            label="业务系统名称"
          >
            {
              getFieldDecorator('name', {
                initialValue: name,
              })(<Input />)
            }
          </FormItem>
          <FormItem
            label="预警阈值"
          >
            {
              getFieldDecorator('runThreshold', {
                initialValue: runThreshold,
              })(<Input />)
            }
          </FormItem>
          <Row className={styles.rowMarginBottom}>
            <Col span={16} className={styles.growCol}>
              <FormItem className={styles.removeFormItemMargin} label="对象设置" />
            </Col>
            <Col span={4}>
              <Button type="primary" size="small" onClick={createObjIndex} shape="round">新增</Button>
            </Col>
          </Row>
          {
            renderList()
          }
        </Form>
      </Modal>
    </span>
  );
}
export default Form.create()(CreateBizSys);
