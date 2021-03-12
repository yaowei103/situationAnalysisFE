import React, { Component } from 'react';
import { Modal, Form, Input, Select, Button, Row, Col } from 'antd';
import styles from './index.css';
const { TextArea } = Input;

const FormItem = Form.Item;
class CreateObj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  showModalHandler = (e) => {
    if (e) e.preventDefault();
    this.setState({
      visible: true,
    });
  }
  hideModalHandler = () => {
    this.setState({
      visible: false,
    });
  }
  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModalHandler();
      }
    });
  }
  render() {
    const { children, form, record } = this.props;
    const { getFieldDecorator } = form;
    const { id, belongToObj, testIndex, indexDesc } = record;

    return (
      <span>
        <span onClick={this.showModalHandler}>
          {children}
        </span>
        <Modal
          title="监测对象管理"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form onSubmit={this.okHandler} layout="vertical">
            <FormItem
              label="监测对象名称"
            >
              {
                getFieldDecorator('testIndex', {
                  initialValue: testIndex,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              label="预警阈值"
            >
              {
                getFieldDecorator('testIndex', {
                  initialValue: testIndex,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              label="所属层次"
            >
              {
                getFieldDecorator('belongToObj', {
                  initialValue: belongToObj,
                })(<Select />)
              }
            </FormItem>
            <Row className={styles.rowMarginBottom}>
              <Col span={16} className={styles.growCol}>
                <FormItem className={styles.removeFormItemMargin} label="运行指标设置" />
              </Col>
              <Col span={4}>
                <Button type="primary" size="small" shape="round">新增</Button>
              </Col>
            </Row>
            <Row>
              <Col span={9}>
                <FormItem
                >
                  {
                    getFieldDecorator('belongToObj', {
                      initialValue: belongToObj,
                    })(<Select />)
                  }
                </FormItem>
              </Col>
              <Col span={1} />
              <Col span={9}>
                <FormItem
                >
                  {
                    getFieldDecorator('belongToObj', {
                      initialValue: belongToObj,
                    })(<Input placeholder="推荐影响因子0.5~1" />)
                  }
                </FormItem>
              </Col>
              <Col span={1} />
              <Col span={4}>
                <Button type="danger" size="small" shape="round">删除</Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(CreateObj);
