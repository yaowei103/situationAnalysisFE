import React, { useEffect } from 'react';
import { connect } from 'dva';
// import { Link } from 'umi';
import { Form, Pagination, Popconfirm } from 'antd';
import { Page } from '@components';
import styles from './index.css';
// import UserModal from '../components/Modal';
import HealthItem from '../components/healthItem';


function IndexManagement({ dispatch, list, form }) {
  useEffect(() => {
    dispatch({
      type: 'global/getObjectOptions'
    });
  }, [])

  const deleteItem = () => {

  }

  const okHandler = () => {
    // const { onOk } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        debugger;
        // onOk(values);
        // this.hideModalHandler();
      }
    });
  }

  const createHandler = (values) => {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }
  return (
    <Page loading={false}>
      <Form onSubmit={okHandler}>
        {
          list && list.map((item, index) => {
            return <HealthItem listItem={item} key={index} form={form} />
          })
        }
      </Form>
    </Page>
  );
}

function mapStateToProps(state) {
  const { list } = state.allHealth;
  return {
    list,
    loading: state.loading.models.users,
  };
}
export default connect(mapStateToProps)(Form.create()(IndexManagement));
