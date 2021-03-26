import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
// import ReactDOM from 'react-dom';
import { Modal, Form, Input, Select, Button, Row, Col, message } from 'antd';
import styles from './index.css';
// import reactTestRendererProductionMin from 'react-test-renderer/cjs/react-test-renderer.production.min';
// const { TextArea } = Input;
const { Option } = Select;

const FormItem = Form.Item;
const CreateBizSys = (props) => {
  const [state, setState] = useState({
    visible: false,
    objInformationList: props.record.objectList || []
  });
  const { children, form, record, allState } = props;
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

  const okHandler = () => {
    const { onOk, allState } = props;
    const newBiz = allState.bizSystemManagement.createBiz;
    onOk(newBiz);
    hideModalHandler();
  }

  const renderObjectOptions = () => {
    const { objectOptions } = props;
    return objectOptions && objectOptions.map((item, index) => {
      return <Option key={item.id} value={item.id}>{item.name}</Option>;
    })
  }

  const renderList = (bId) => {
    const { objInformationList } = state;
    const { form } = props;
    return objInformationList.map((item, i) => {
      const { id, impactFactor } = item;
      return (
        <Row key={item.key}>
          <Col span={9}>
            <FormItem
            >
              <Select value={id} onChange={(val) => { handleBizObjIdChange('id', val, i, id) }} >
                {renderObjectOptions()}
              </Select>
            </FormItem>
          </Col>
          <Col span={1} />
          <Col span={9}>
            <FormItem
            >
              <Input value={impactFactor} placeholder="推荐影响因子0.5~1" onChange={(e) => { handleBizObjIdChange('impactFactor', e.target.value, i, id) }} />
            </FormItem>
          </Col>
          <Col span={1} />
          <Col span={4}>
            <Button type="danger" size="small" shape="round" onClick={() => { deleteBizObj(i, bId); }}>删除</Button>
          </Col>
        </Row>
      );
    });
  }
  const deleteBizObj = (index, bId) => {
    const { dispatch } = props;
    dispatch({
      type: 'bizSystemManagement/delBizList',
      value: { index, bId }
    });
  };
  const handleBizObjIdChange = (type, val, i, bId) => {
    const { dispatch } = props;
    dispatch({
      type: 'bizSystemManagement/updateBizList',
      value: {
        i,
        val,
        type,
        bId,
        message
      }
    });
  }

  const handleBizChange = (key, value, bId) => {
    const { dispatch } = props;
    dispatch({
      type: 'bizSystemManagement/updateNewBiz',
      value: {
        key,
        value,
        bId
      }
    });
  }

  const createBizObj = (bId) => {
    const { dispatch } = props;
    dispatch({
      type: 'bizSystemManagement/createBizList',
      value: { bId }
    });
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
            <Input value={name} onChange={(e) => { handleBizChange('name', e.target.value, id || 'new') }} />
          </FormItem>
          <FormItem
            label="预警阈值"
          >
            <Input value={runThreshold} onChange={(e) => { handleBizChange('runThreshold', e.target.value, id || 'new') }} />
          </FormItem>
          <Row className={styles.rowMarginBottom}>
            <Col span={16} className={styles.growCol}>
              <FormItem className={styles.removeFormItemMargin} label="对象设置" />
            </Col>
            <Col span={4}>
              <Button type="primary" size="small" onClick={() => { createBizObj(id || 'new') }} shape="round">新增</Button>
            </Col>
          </Row>
          {
            renderList(id)
          }
        </Form>
      </Modal>
    </span>
  );
}
function mapStateToProps(state) {
  const { list, total, page } = state.bizSystemManagement;
  const { indicatorOptions, objectOptions, levelOptions } = state.global;
  return {
    // list: formatDataForRowSpan(list),
    allState: state,
    list,
    total,
    page,
    loading: state.loading.models.users,
    indicatorOptions,
    objectOptions,
    levelOptions
  };
}
export default connect(mapStateToProps)(Form.create()(CreateBizSys));
