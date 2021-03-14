import { request } from '@utils';
// export function getMenuData() {
//   return request('/getMenuData', {
//     method: 'GET',
//   });
// }
export function getMenuData(payload) {
  // return request('/getMenuData', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     ...payload,
  //   }),
  // });
  return Promise.resolve({
    data: [
      {
        title: "态势管理",
        key: "taishi",
        children: [
          {
            title: "运行指标管理",
            key: "indexManagement",
          },
          {
            title: "监测对象管理",
            key: "objManagement",
          },
          {
            title: "业务系统健康度管理",
            key: "bizSystemManagement",
          },
          {
            title: "全息健康度管理",
            key: "allHealthManagement",
          }
        ]
      },
    ],
    status: 0
  })
}