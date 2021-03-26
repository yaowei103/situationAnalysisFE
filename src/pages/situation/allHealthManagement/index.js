import React, { useEffect } from 'react';
import { connect } from 'dva';
// import { Link } from 'umi';
import { Form } from 'antd';
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

  return (
    <Page loading={false}>
      <Form>
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
