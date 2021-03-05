import { PureComponent } from 'react';
import { Form, Icon, Input, Button } from 'antd';
// import { formatMessage } from 'umi/locale';
import UserModal from '../components/Modal';

class TableSearch extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        onSubmit && onSubmit(values);
      }
    });
  }
  createHandler = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }
  render() {
    const { form, value: defaultValue } = this.props;
    const {
      getFieldDecorator,
    } = form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
        >
          {getFieldDecorator('account', {
            initialValue: defaultValue,
            rules: [{ required: false, message: 'Please input the word' }],
          })(
            <Input placeholder="请输入关键字搜索" />
          )}
          {/* prefix={<Icon type="github" style={{ color: 'rgba(0,0,0,.25)' }} />} */}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <UserModal
            record={{}}
            onOk={this.createHandler}
          >
            {/* <TableSearch value="12345" onSubmit={handleSearch} /> */}
            <Button type="primary">新增</Button>
          </UserModal>
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create({ name: 'tableSearch' })(TableSearch);