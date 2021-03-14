import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

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

  renderOptions = () => {
    const { objectOptions } = this.props;
    return objectOptions && objectOptions.map((item, index) => {
      return <Option key={item.id} value={item.id}>{item.name}</Option>;
    })
  }

  render() {
    const { children, form, record } = this.props;
    const { getFieldDecorator } = form;
    const { id, oId, name, instruction } = record;
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
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所属对象"
            >
              {
                getFieldDecorator('oId', {
                  initialValue: oId,
                })(<Select>
                  {this.renderOptions()}
                </Select>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="指标说明"
            >
              {
                getFieldDecorator('instruction', {
                  initialValue: instruction,
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
