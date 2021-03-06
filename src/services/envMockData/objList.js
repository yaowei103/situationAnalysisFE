export default {
  status: 0,
  total: 30,
  currentPage: 1,
  data: [
    {
      id: '1',
      belongToObj: '视频流采集设备',
      testIndex: '视频流采集设备在线率',
      indexDesc: '每日累计在线时长/24小时的平均值',
      operation: false
    },
    {
      id: '2',
      belongToObj: '视频流采集设备',
      testIndex: '视频流采集设备连通率',
      indexDesc: '联通次数/测试连接总次数',
      operation: false
    },
    {
      id: '3',
      belongToObj: '图像数据采集设备',
      testIndex: '图像数据采集设备在线率',
      indexDesc: '每日累计在线时长/24小时的平均值',
      operation: true
    },
  ]
};
