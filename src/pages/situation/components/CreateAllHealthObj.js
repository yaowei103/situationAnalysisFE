import React, { Component } from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
import styles from './index.css';

const FormItem = Form.Item;
class CreateAllHealthObj extends Component {
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
  renderSelect = (objectOptions) => {
    return objectOptions && objectOptions.map((item, i) => {
      return <Select.Option key={i} value={item.id}>{item.name}</Select.Option>;
    });
  }
  selectChange = (value) => {
    this.setState({
      obj: value,
    });
  }
  render() {
    const { form, objectOptions } = this.props;
    const { obj, impactFactor } = this.state;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Row className={styles.itemRow}>
        <Col span={6}>
          <FormItem
            {...formItemLayout}
          // label="选择对象"
          >
            {
              getFieldDecorator('obj', {
                initialValue: obj.value,
              })(
                <Select name="obj" defaultValue={obj.value} onChange={(value) => { this.selectChange(value); }}>
                  {
                    this.renderSelect(objectOptions)
                  }
                </Select>
              )
            }
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem
            {...formItemLayout}
            label="影响因子"
          >
            {
              getFieldDecorator('impactFactor', {
                initialValue: impactFactor,
              })(<Input />)
            }
          </FormItem>
        </Col>
      </Row>
    );
  }
}
export default Form.create()(CreateAllHealthObj);
