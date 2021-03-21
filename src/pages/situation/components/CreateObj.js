import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { Modal, Form, Input, Select, Button, Row, Col } from 'antd';
import styles from './index.css';
// import reactTestRendererProductionMin from 'react-test-renderer/cjs/react-test-renderer.production.min';
const { TextArea } = Input;
const { Option } = Select;

const FormItem = Form.Item;
class CreateObj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      indicatorInfoList: []
    };
  }
  showModalHandler = (e) => {
    if (e) e.preventDefault();
    this.setState({
      visible: true
    });
  }
  hideModalHandler = () => {
    this.setState({
      visible: false,
      indicatorInfoList: []
    });
  }

  mapIndicatorResult = (reqId) => {
    const { indicatorOptions } = this.props;
    return indicatorOptions.find((item, index) => {
      return item.id === reqId;
    });
  }

  okHandler = (oId) => {
    const { onOk, state } = this.props;
    if (!oId) {
      const newObj = state.objManagement.createObj;
      onOk(newObj);
    } else {
      const reqObj = state.objManagement.list.find((item) => {
        return item.id == oId;
      });
      onOk(reqObj);
    }
    this.hideModalHandler();
  }

  renderIndicatorOptions = () => {
    const { indicatorOptions } = this.props;
    return indicatorOptions && indicatorOptions.map((item, index) => {
      return <Option key={item.id} value={item.id}>{item.name}</Option>;
    })
  }

  renderLevelOptions = () => {
    const { levelOptions } = this.props;
    return levelOptions && levelOptions.map((item, index) => {
      return <Option key={item.id} value={item.id}>{item.name}</Option>;
    })
  }

  renderIndesList = (objId) => {
    // const { indicatorInfoList } = this.state;
    const { form, record } = this.props;
    const { getFieldDecorator } = form;
    if (!record.indicatorInfoList) {
      return '';
    }
    return record.indicatorInfoList.map((item, i) => {
      const { id, impactFactor } = item;
      return (
        <Row key={item.key}>
          <Col span={9}>
            <FormItem>
              <Select value={id} onChange={(val) => { this.handleObjIndexIdChange(val, i, objId) }} >
                {this.renderIndicatorOptions()}
              </Select>
            </FormItem>
          </Col>
          <Col span={1} />
          <Col span={9}>
            <FormItem>
              <Input value={impactFactor} placeholder="推荐影响因子0.5~1" onChange={(e) => { this.handleObjimpactFactorsChange(e, i, objId) }} />
            </FormItem>
          </Col>
          <Col span={1} />
          <Col span={4}>
            <Button type="danger" size="small" shape="round" onClick={() => { this.deleteObjIndex(i, objId); }}>删除</Button>
          </Col>
        </Row>
      );
    });
  }
  createObjIndex = (objId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'objManagement/createObjList',
      value: { objId }
    });
  }
  deleteObjIndex = (index, objId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'objManagement/delObjList',
      value: { index, objId }
    });
  };
  handleObjIndexIdChange = (val, i, objId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'objManagement/updateObjList',
      value: {
        i,
        val,
        type: 'id',
        objId
      }
    });
  }
  handleObjimpactFactorsChange = (e, i, objId) => {
    const { dispatch } = this.props
    const val = e.target.value;
    dispatch({
      type: 'objManagement/updateObjList',
      value: {
        i,
        val,
        type: 'impactFactor',
        objId
      }
    });
  }
  setFieldsValues = () => {
    const { form } = this.props;
    const { setFieldsValue } = form;
    var { indicatorInfoList } = this.state;
    for (let i = 0; i < indicatorInfoList.length; i++) {
      setFieldsValue({
        [`indexId_${i}`]: indicatorInfoList[i].id,
        [`impactFactors_${i}`]: indicatorInfoList[i].impactFactor
      })
    }
  }

  handleObjChange = (key, value, objId) => {
    const { dispatch } = this.props
    dispatch({
      type: 'objManagement/updateNewObj',
      value: {
        key,
        value,
        objId
      }
    });
  }

  render() {
    const { children, form, record, levelOptions } = this.props;
    const { getFieldDecorator } = form;
    const { id, objectName, runThreshold, levelName } = record;
    const levelObj = levelOptions.find((item) => { return item.name === levelName })
    const levelId = levelObj && levelObj.id;
    return (
      <span>
        <span onClick={this.showModalHandler}>
          {children}
        </span>
        <Modal
          title="监测对象管理"
          id={id}
          visible={this.state.visible}
          onOk={() => { this.okHandler(id || 'new') }}
          onCancel={this.hideModalHandler}
        >
          <Form onSubmit={this.okHandler} layout="vertical">
            <FormItem
              label="监测对象名称"
            >
              {
                getFieldDecorator('objectName', {
                  initialValue: objectName,
                })(<Input onChange={(e) => { this.handleObjChange('objectName', e.target.value, id || 'new'); }} />)
              }
            </FormItem>
            <FormItem
              label="预警阈值"
            >
              {
                getFieldDecorator('runThreshold', {
                  initialValue: runThreshold,
                })(<Input onChange={(e) => { this.handleObjChange('runThreshold', e.target.value, id || 'new'); }} />)
              }
            </FormItem>
            <FormItem
              label="所属层次"
            >
              {
                getFieldDecorator('levelId', {
                  initialValue: levelId,
                })(<Select onChange={(val) => { this.handleObjChange('levelId', val, id || 'new'); }} >
                  {this.renderLevelOptions()}
                </Select>)
              }
            </FormItem>
            <Row className={styles.rowMarginBottom}>
              <Col span={16} className={styles.growCol}>
                <FormItem className={styles.removeFormItemMargin} label="运行指标设置" />
              </Col>
              <Col span={4}>
                <Button type="primary" size="small" onClick={() => { this.createObjIndex(id ? id : 'new'); }} shape="round">新增</Button>
              </Col>
            </Row>
            {
              this.renderIndesList(id)
            }
          </Form>
        </Modal>
      </span>
    );
  }
}
function mapStateToProps(state) {
  const { list, total, page } = state.objManagement;
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
    levelOptions
  };
}
export default connect(mapStateToProps)(Form.create()(CreateObj));