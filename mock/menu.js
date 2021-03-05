const Mock = require('mockjs');
const menuData = [
    {
        title: "态势管理",
        key: "taishi",
        children: [
            {
                title: "监测对象管理",
                key: "objManagement",
            },
            {
                title: "监测层次管理",
                key: "arrangeManagement",
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
    // {
    //     title: "gitDataV",
    //     key: "gitDataV",
    // },
    // {
    //     title: "地域分析",
    //     key: "regionalAnalysis",
    // },
    // {
    //     title: "users",
    //     key: "users",
    // },
    // {
    //     title: "404",
    //     key: "404",
    // },
    // {
    //     title: "用户行为",
    //     key: "yonghuxingwei",
    //     children: [
    //         {
    //             title: "路径分析",
    //             key: "pathAnalysis",
    //         },
    //         {
    //             title: "view1",
    //             key: "p1",
    //         },
    //         {
    //             title: "view2",
    //             key: "p2",
    //         },
    //     ]
    // },
    // {
    //     title: "echarts组件",
    //     key: "echarts",
    //     children: [
    //         {
    //             key: 'Bar',
    //             title: 'Bar'
    //         },
    //         {
    //             key: 'line',
    //             title: 'Line'
    //         },
    //         {
    //             key: 'area',
    //             title: 'Area'
    //         },
    //         {
    //             key: 'yBar',
    //             title: 'YBar'
    //         },
    //         {
    //             key: 'funnel',
    //             title: 'Funnel'
    //         },
    //         {
    //             key: 'pie',
    //             title: 'Pie'
    //         },
    //         {
    //             key: 'pieDoughnut',
    //             title: 'PieDoughnut'
    //         },
    //         {
    //             key: 'sankey',
    //             title: 'Sankey'
    //         },
    //     ]
    // },
    // {
    //     title: "d3.js组件",
    //     key: "d3Chart",
    //     children: [
    //         {
    //             title: "树图",
    //             key: "treePage",
    //         },
    //     ]
    // },
    // {
    //     title: "iframe",
    //     key: "iframe",
    //     children: [
    //         {
    //             title: "bing",
    //             key: "bing",
    //         }
    //     ]
    // },
    // {
    //     title: "请给star",
    //     key: "github",
    // },
];
const data = Mock.mock({
    data: menuData,
    status: 0
});
module.exports = {
    [`POST /getMenuData`](req, res) {
        res.status(200).json(data);
    },
};