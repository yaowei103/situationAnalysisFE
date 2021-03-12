import { PureComponent } from 'react';
import { Form, Icon, Input, Button } from 'antd';
// import { formatMessage } from 'umi/locale';
import CreateIndex from './CreateIndex';
import CreateObj from './CreateObj';

class TableSearch extends PureComponent {
  handleSearch = (e) => {
    e.preventDefault();
    const { form, onSearch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        onSearch && onSearch(values);
      }
    });
  }
  createHandler = (values, createType) => {
    const { dispatch } = this.props;
    const createMap = {
      index: 'indexManagement/createIndex',
      obj: 'objManagement/createObj',
      arrange: 'arrangeManagement/createArrange',
    };
    debugger;
    dispatch({
      type: createMap[createType],
      payload: values,
    });
  }
  renderCreateComponent = (createType) => {
    if (createType === 'index') {
      return (
        <CreateIndex
          record={{}}
          onOk={(values) => { this.createHandler(values, createType) }}
        >
          <Button type="primary">新增</Button>
        </CreateIndex>
      );
    } else if (createType === 'obj') {
      return (
        <CreateObj
          record={{}}
          onOk={(values) => { this.createHandler(values, createType) }}
        >
          <Button type="primary">新增</Button>
        </CreateObj>
      );
    } else if (createType === 'arrange') {
      return (
        <CreateIndex
          record={{}}
          onOk={(values) => { this.createHandler(values, createType) }}
        >
          <Button type="primary">新增</Button>
        </CreateIndex>
      );
    }
  }
  render() {
    const { form, value: defaultValue, createType } = this.props;
    const {
      getFieldDecorator,
    } = form;
    return (
      <Form layout="inline" onSubmit={this.handleSearch}>
        <Form.Item
        >
          {getFieldDecorator('searchParam', {
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
          {
            this.renderCreateComponent(createType)
          }
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create({ name: 'tableSearch' })(TableSearch);