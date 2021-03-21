import { PureComponent, useEffect } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'dva';
// import { formatMessage } from 'umi/locale';
import CreateIndex from './CreateIndex';
import CreateObj from './CreateObj';
import CreateBizSys from './CreateBizSys';

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
      biz: 'bizSystemManagement/createBiz',
    };
    dispatch({
      type: createMap[createType],
      payload: values,
    });
  }

  componentDidMount() {
    const { dispatch, createType } = this.props;
    if (createType === 'index') {
      dispatch({
        type: 'global/getObjectOptions'
      });
    } else if (createType === 'obj') {
      dispatch({
        type: 'global/getIndicatorOptions'
      });
      dispatch({
        type: 'global/getLevelOptions'
      });
    } else if (createType === 'biz') {
      dispatch({
        type: 'global/getObjectOptions'
      });
    }
  }

  callIndicatorOptions = (oId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/getIndicatorOptions',
      payload: {
        oId
      }
    });
  }

  renderCreateComponent = (createType) => {
    const { indicatorOptions, objectOptions, levelOptions, dispatch, state } = this.props;
    if (createType === 'index') {
      return (
        <CreateIndex
          record={{}}
          objectOptions={objectOptions}
          onOk={(values) => { this.createHandler(values, createType) }}
        >
          <Button type="primary">新增</Button>
        </CreateIndex>
      );
    } else if (createType === 'obj') {
      return (
        <CreateObj
          record={state.objManagement.createObj}
          dispatch={dispatch}
          indicatorOptions={indicatorOptions}
          objectOptions={objectOptions}
          levelOptions={levelOptions}
          onOk={(values) => { this.createHandler(values, createType) }}
        >
          <Button type="primary" onClick={() => { this.callIndicatorOptions('new'); }}>新增</Button>
        </CreateObj>
      );
    } else if (createType === 'biz') {
      return (
        <CreateBizSys
          record={{}}
          indicatorOptions={indicatorOptions}
          objectOptions={objectOptions}
          levelOptions={levelOptions}
          onOk={(values) => { this.createHandler(values, createType) }}
        >
          <Button type="primary">新增</Button>
        </CreateBizSys>
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
          {getFieldDecorator('keyWord', {
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

function mapStateToProps(state) {
  // const { list, total, page } = state;
  // const { indicatorOptions, objectOptions, levelOptions } = state.global;
  return {
    // list: formatDataForRowSpan(list),
    state
  };
}
export default connect(mapStateToProps)(Form.create({ name: 'tableSearch' })(TableSearch));