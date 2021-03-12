import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';
const { TextArea } = Input;

const FormItem = Form.Item;
class CreateIndex extends Component {
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
    const { id, belongToObj, indexName, indexDesc } = record;
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
          title="指标管理"
          id={id}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="指标名称"
            >
              {
                getFieldDecorator('indexName', {
                  initialValue: indexName,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所属对象"
            >
              {
                getFieldDecorator('belongToObj', {
                  initialValue: belongToObj,
                })(<Select />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="指标说明"
            >
              {
                getFieldDecorator('indexDesc', {
                  initialValue: indexDesc,
                })(<TextArea />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(CreateIndex);
