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
  [`GET /api/indexList`](req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
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