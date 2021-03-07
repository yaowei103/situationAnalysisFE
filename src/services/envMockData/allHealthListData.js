export default {
  data: {
    objConfigArr: [
      {
        id: '0',
        name: '视频流采集设备'
      },
      {
        id: '1',
        name: '图像采集设备'
      },
      {
        id: '2',
        name: '计算设备'
      },
      {
        id: '3',
        name: '存储设备'
      },
    ],
    list: [
      {
        id: '0',
        arrangeName: '采集设备',
        impactFactors: '0.8',
        alarmThreshold: '60',
        objConfig: [
          {
            id: '0',
            obj: '0',
            impactFactors: '0.8'
          },
          {
            id: '1',
            obj: '1',
            impactFactors: '0.6'
          },
          {
            id: '1',
            obj: '1',
            impactFactors: '0.6'
          },
        ]
      },
      {
        id: '1',
        arrangeName: '采集设备',
        impactFactors: '0.8',
        alarmThreshold: '60',
        objConfig: [
          {
            id: '0',
            obj: '0',
            impactFactors: '0.8'
          },
          {
            id: '1',
            obj: '1',
            impactFactors: '0.6'
          },
          {
            id: '1',
            obj: '1',
            impactFactors: '0.6'
          },
        ]
      }
    ]
  },
  status: 0
};
