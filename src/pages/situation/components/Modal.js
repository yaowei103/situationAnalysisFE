import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
class UserEditModal extends Component {
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
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModalHandler}>
          {children}
        </span>
        <Modal
          title="新增指标"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="所属对象"
            >
              {
                getFieldDecorator('belongToObj', {
                  initialValue: belongToObj,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="监测指标"
            >
              {
                getFieldDecorator('testIndex', {
                  initialValue: testIndex,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="指标说明"
            >
              {
                getFieldDecorator('indexDesc', {
                  initialValue: indexDesc,
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(UserEditModal);
