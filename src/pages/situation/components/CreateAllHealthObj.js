import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
class CreateAllHealthObjModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      obj: {},
      impactFactors: ''
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
  renderSelect = (objConfigArr) => {
    return objConfigArr.map((item, i) => {
      return <Select.Option key={i} value={item.id}>{item.name}</Select.Option>;
    });
  }
  selectChange = (value) => {
    this.setState({
      obj: value,
    });
  }
  render() {
    const { children, form, objConfigArr } = this.props;
    const { obj, impactFactors } = this.state;
    const { getFieldDecorator } = form;
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
          title="新增对象"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="选择对象"
            >
              {
                getFieldDecorator('obj', {
                  initialValue: obj.value,
                })(
                  <Select name="obj" defaultValue={obj.value} onChange={(value) => { this.selectChange(value); }}>
                    {
                      this.renderSelect(objConfigArr)
                    }
                  </Select>
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="影响因子"
            >
              {
                getFieldDecorator('impactFactors', {
                  initialValue: impactFactors,
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(CreateAllHealthObjModal);
