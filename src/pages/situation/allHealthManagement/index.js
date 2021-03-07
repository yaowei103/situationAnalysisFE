import React from 'react';
import { connect } from 'dva';
// import { Link } from 'umi';
// import { Table, Pagination, Popconfirm } from 'antd';
import { Page } from '@components';
import styles from './index.css';
// import UserModal from '../components/Modal';
import HealthItem from '../components/healthItem';


function ObjManagement({ dispatch, list, objConfigArr }) {
  function deleteItem() {

  }

  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  return (
    <Page loading={false}>
      {
        list.map((item, index) => {
          return <HealthItem listItem={item} key={index} />
        })
      }
    </Page>
  );
}

function mapStateToProps(state) {
  const { list, objConfigArr } = state.allHealth;
  return {
    objConfigArr,
    list,
    loading: state.loading.models.users,
  };
}
export default connect(mapStateToProps)(ObjManagement);
