import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
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
      indicatorInformationList: []
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
      indicatorInformationList: []
    });
  }

  mapIndicatorResult = (reqId) => {
    const { indicatorOptions } = this.props;
    return indicatorOptions.find((item, index) => {
      return item.id === reqId;
    });
  }

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 组装数据；
        const { indicatorInformationList } = this.state;
        const indexLength = indicatorInformationList.length;
        var reqObj = {
          objectName: values.objectName,
          runThreshold: Number(values.runThreshold),
          levelId: values.levelId,
          indicatorInformationList: []
        };
        for (let i = 0; i < indexLength; i++) {
          reqObj.indicatorInformationList.push({
            id: values[`indexId_${i}`],
            name: this.mapIndicatorResult(values[`indexId_${i}`]).name,
            impactFactor: Number(values[`impactFactors_${i}`])
          });
        }
        onOk(reqObj);
        this.hideModalHandler();
      }
    });
  }
  createObjIndex = () => {
    const newState = { ...this.state };
    const newIndexArr = newState.indicatorInformationList;
    newIndexArr.push({
      id: '',
      impactFactor: ''
    })
    this.setState({
      indicatorInformationList: newIndexArr
    })
  }
  componentDidMount = () => {
    const { record } = this.props;
    const { indicatorInformationList } = record;
    this.setState({
      indicatorInformationList: indicatorInformationList || []
    });
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

  renderIndesList = () => {
    const { indicatorInformationList } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return indicatorInformationList.map((item, i) => {
      const { id, impactFactor } = item;
      return (
        <Row key={Math.random()}>
          <Col span={9}>
            <FormItem
            >
              {
                getFieldDecorator(`indexId_${i}`, {
                  initialValue: id,
                })(<Select onChange={(val) => { this.handleObjIndexIdChange(val, i) }} >
                  {this.renderIndicatorOptions()}
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
    const { indicatorInformationList } = newState;
    indicatorInformationList.splice(i, 1);
    this.setState({
      indicatorInformationList
    }, () => {
      this.setFieldsValues();
    });
  };
  handleObjIndexIdChange = (val, i) => {
    var newState = { ...this.state };
    var { indicatorInformationList } = newState;
    indicatorInformationList[i].id = val;
    this.setState({
      indicatorInformationList
    }, () => {
      this.setFieldsValues();
    });
  }
  handleObjimpactFactorsChange = (e, i) => {
    const val = e.target.value;
    var newState = { ...this.state };
    var { indicatorInformationList } = newState;
    indicatorInformationList[i].impactFactor = val;
    this.setState({
      indicatorInformationList
    }, () => {
      this.setFieldsValues();
    });
  }
  setFieldsValues = () => {
    const { form } = this.props;
    const { setFieldsValue } = form;
    var { indicatorInformationList } = this.state;
    for (let i = 0; i < indicatorInformationList.length; i++) {
      setFieldsValue({
        [`indexId_${i}`]: indicatorInformationList[i].id,
        [`impactFactors_${i}`]: indicatorInformationList[i].impactFactor
      })
    }
  }

  render() {
    const { children, form, record } = this.props;
    const { getFieldDecorator } = form;
    const { id, objectName, runThreshold, levelId } = record;

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
                getFieldDecorator('objectName', {
                  initialValue: objectName,
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
            <FormItem
              label="所属层次"
            >
              {
                getFieldDecorator('levelId', {
                  initialValue: levelId,
                })(<Select>
                  {this.renderLevelOptions()}
                </Select>)
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
