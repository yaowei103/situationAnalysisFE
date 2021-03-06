const Mock = require('mockjs');

const { Random } = Mock;
let indexList = Mock.mock({
  'data|5-12': [{
    id: '@id',
    belongToObj: '@name',
    testIndex: '@name',
    indexDesc: Random.cparagraph(1),
    operation: '@operation'
    // 'age|18-32': 1
  }],
  status: 0
});

module.exports = {
  [`GET /api/objList`](req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
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
    });
  },
  [`GET /api/arrangeList`](req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      total: 40,
      currentPage: 1,
      data: [
        {
          id: '1',
          belongToArrange: '采集设备',
          monitorObj: '视频流采集设备',
          statisticalIndicators: '在线率',
          alarmThreshold: '60',
          operation: false
        },
        {
          id: '2',
          belongToArrange: '采集设备',
          monitorObj: '视频流采集设备',
          statisticalIndicators: '在线率',
          alarmThreshold: '60',
          operation: false
        },
        {
          id: '3',
          belongToArrange: '采集设备',
          monitorObj: '视频流采集设备',
          statisticalIndicators: '在线率',
          alarmThreshold: '60',
          operation: false
        },
        {
          id: '4',
          belongToArrange: '采集设备',
          monitorObj: '视频流采集设备',
          statisticalIndicators: '在线率',
          alarmThreshold: '60',
          operation: true
        },
      ]
    });
  },
  [`GET /api/bizSystemList`](req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      total: 50,
      currentPage: 1,
      data: [
        {
          id: '1',
          bizSystem: '视频监控联网/共享平台',
          impactFactors: '1',
          monitoredObj: '视频流采集设备、图像采集设备、其他感知设备',
          platform: '联网平台1',
          alarmThreshold: '60',
          operationEdit: true,
          operationDelete: false
        },
        {
          id: '2',
          bizSystem: '视频监控联网/共享平台',
          impactFactors: '1',
          monitoredObj: '视频流采集设备、图像采集设备、其他感知设备',
          platform: '联网平台2',
          alarmThreshold: '60',
          operationEdit: true,
          operationDelete: false
        },
        {
          id: '3',
          bizSystem: '视频监控联网/共享平台',
          impactFactors: '1',
          monitoredObj: '视频流采集设备、图像采集设备、其他感知设备',
          platform: '联网平台3',
          alarmThreshold: '60',
          operationEdit: true,
          operationDelete: false
        },
        {
          id: '4',
          bizSystem: '视频图像信息解析系统',
          impactFactors: '2',
          monitoredObj: '计算设备、存储设备、网络设备、操作系统、中间件、数据库',
          platform: '解析系统1',
          alarmThreshold: '60',
          operationEdit: true,
          operationDelete: false
        },
        {
          id: '5',
          bizSystem: '视频图像信息解析系统',
          impactFactors: '2',
          monitoredObj: '计算设备、存储设备、网络设备、操作系统、中间件、数据库',
          platform: '解析系统2',
          alarmThreshold: '60',
          operationEdit: true,
          operationDelete: true
        },
      ]
    });
  },

  [`POST /api/users`](req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let user = req.body;
    if (typeof user === 'string') {
      user = JSON.parse(user)
    }
    user.id = Mock.mock('@id');
    indexList.data.push(user);
    res.status(200).json(indexList);
  },

  [`PATCH /api/users/:id`](req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { params: { id }, query, body } = req;
    console.log(id, query);
    // db.data = db.data.map(item => item.id === id ? user : item);
    res.status(200).json(indexList);
  },

  [`DELETE /api/users/:id`](req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { params: { id } } = req;
    indexList.data = indexList.data.filter(item => item.id !== id);
    res.status(200).json(indexList);
  }
};