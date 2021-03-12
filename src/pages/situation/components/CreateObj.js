import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Form, Input, Select, Button, Row, Col } from 'antd';
import styles from './index.css';
import reactTestRendererProductionMin from 'react-test-renderer/cjs/react-test-renderer.production.min';
const { TextArea } = Input;
const { Option } = Select;

const FormItem = Form.Item;
class CreateObj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      indexArr: []
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
      indexArr: []
    });
  }
  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 组装数据；
        const { indexArr } = this.state;
        const indexLength = indexArr.length;
        var reqObj = {
          objName: values.objName,
          alarmThreshold: values.alarmThreshold,
          belongToArrange: values.belongToArrange,
          indexArr: []
        };
        for (let i = 0; i < indexLength; i++) {
          reqObj.indexArr.push({
            indexId: values[`indexId_${i}`],
            impactFactors_2: values[`impactFactors_${i}`]
          });
        }
        onOk(reqObj);
        this.hideModalHandler();
      }
    });
  }
  createObjIndex = () => {
    const newState = { ...this.state };
    const newIndexArr = newState.indexArr;
    newIndexArr.push({
      indexId: '',
      impactFactors: ''
    })
    this.setState({
      indexArr: newIndexArr
    })
  }
  componentDidMount = () => {
    const { record } = this.props;
    const { indexArr } = record;
    this.setState({
      indexArr: indexArr || []
    });
  }
  renderIndesList = () => {
    const { indexArr } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return indexArr.map((item, i) => {
      const { indexId, impactFactors } = item;
      return (
        <Row key={Math.random()}>
          <Col span={9}>
            <FormItem
            >
              {
                getFieldDecorator(`indexId_${i}`, {
                  initialValue: indexId,
                })(<Select onChange={(val) => { this.handleObjIndexIdChange(val, i) }} >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
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
                  initialValue: impactFactors,
                })(<Input placeholder="推荐影响因子0.5~1" onChange={(e) => { this.handleObjimpactFactorsChange(e, i) }} />)
              }
            </FormItem>
          </Col>
          <Col span={1} />
          <Col span={4}>
            <Button type="danger" size="small" shape="round" onClick={() => { this.deleteObjIndex(i); }}>删除</Button>
          </Col>
        </Row>
      );
    });
  }
  deleteObjIndex = (i) => {
    const newState = { ...this.state };
    const { indexArr } = newState;
    indexArr.splice(i, 1);
    this.setState({
      indexArr
    }, () => {
      this.serFieldsValues();
    });
  };
  handleObjIndexIdChange = (val, i) => {
    var newState = { ...this.state };
    var { indexArr } = newState;
    indexArr[i].indexId = val;
    this.setState({
      indexArr
    }, () => {
      this.serFieldsValues();
    });
  }
  handleObjimpactFactorsChange = (e, i) => {
    const val = e.target.value;
    var newState = { ...this.state };
    var { indexArr } = newState;
    indexArr[i].impactFactors = val;
    this.setState({
      indexArr
    }, () => {
      this.serFieldsValues();
    });
  }
  serFieldsValues = () => {
    const { form } = this.props;
    const { setFieldsValue } = form;
    var { indexArr } = this.state;
    for (let i = 0; i < indexArr.length; i++) {
      setFieldsValue({
        [`indexId_${i}`]: indexArr[i].indexId,
        [`impactFactors_${i}`]: indexArr[i].impactFactors
      })
    }
  }

  render() {
    const { children, form, record } = this.props;
    const { getFieldDecorator } = form;
    const { id, objName, alarmThreshold, belongToArrange } = record;

    return (
      <span>
        <span onClick={this.showModalHandler}>
          {children}
        </span>
        <Modal
          title="监测对象管理"
          id={id}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form onSubmit={this.okHandler} layout="vertical">
            <FormItem
              label="监测对象名称"
            >
              {
                getFieldDecorator('objName', {
                  initialValue: objName,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              label="预警阈值"
            >
              {
                getFieldDecorator('alarmThreshold', {
                  initialValue: alarmThreshold,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              label="所属层次"
            >
              {
                getFieldDecorator('belongToArrange', {
                  initialValue: belongToArrange,
                })(<Select />)
              }
            </FormItem>
            <Row className={styles.rowMarginBottom}>
              <Col span={16} className={styles.growCol}>
                <FormItem className={styles.removeFormItemMargin} label="运行指标设置" />
              </Col>
              <Col span={4}>
                <Button type="primary" size="small" onClick={this.createObjIndex} shape="round">新增</Button>
              </Col>
            </Row>
            {
              this.renderIndesList()
            }
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(CreateObj);
