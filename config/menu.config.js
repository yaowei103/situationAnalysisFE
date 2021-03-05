export default [
    {
        title: "运行态势评估",
        key: "taishi",
        icon: "icon-baobiaofenxi",
        children: [
            {
                title: "监测对象管理",
                link: "/situation/objManagement",
                key: "objManagement",
                // icon: null
            },
            {
                title: "监测层次管理",
                link: "/situation/arrangeManagement",
                key: "arrangeManagement",
                // icon: "link"
            },
            {
                title: "业务系统健康度管理",
                link: "/situation/bizSystemManagement",
                key: "bizSystemManagement",
                // icon: "link"
            },
            {
                title: "全息健康度管理",
                link: "/situation/allHealthManagement",
                key: "allHealthManagement",
                // icon: "link"
            }
        ]
    },
    {
        title: "gitDataV",
        link: "/sys/githubpro",
        key: "gitDataV",
        icon: "github"
    },
    {
        title: "地域分析",
        link: "/sys/regionalAnalysis",
        key: "regionalAnalysis",
        icon: "idcard"
    },
    {
        title: "用户行为",
        key: "yonghuxingwei",
        icon: "contacts",
        children: [
            {
                title: "路径分析",
                link: "/sys/pathAnalysis",
                key: "pathAnalysis",
                icon: "link"
            },
            {
                title: "view1",
                link: "/sys/view/p1",
                key: "p1",
                icon: "line-chart"
            },
            {
                title: "view2",
                link: "/sys/view/p2",
                key: "p2",
                icon: "bar-chart"
            },
        ]
    },
    {
        title: 'Echarts',
        key: 'echarts',
        icon: 'icon-visual',
        children: [
            {
                link: '/sys/echarts/bar',
                key: 'Bar',
                icon: 'bar-chart',
                title: 'Bar'
            },
            {
                link: '/sys/echarts/line',
                key: 'line',
                icon: 'line-chart',
                title: 'Line'
            },
            {
                link: '/sys/echarts/area',
                key: 'area',
                icon: 'area-chart',
                title: 'Area'
            },
            {
                link: '/sys/echarts/yBar',
                key: 'yBar',
                icon: 'icon-yBar',
                title: 'YBar'
            },
            {
                link: '/sys/echarts/funnel',
                key: 'funnel',
                icon: 'icon-funnel',
                title: 'Funnel'
            },
            {
                link: '/sys/echarts/pie',
                icon: 'pie-chart',
                key: "pie",
                title: 'Pie'
            },
            {
                link: '/sys/echarts/pieDoughnut',
                key: 'pieDoughnut',
                icon: 'icon-pieDoughnut',
                title: 'PieDoughnut'
            },
            {
                link: '/sys/echarts/sankey',
                key: 'sankey',
                icon: 'icon-sankey',
                title: 'Sankey'
            },
        ]
    },
    {
        title: "d3.js组件",
        key: "d3Chart",
        icon: "icon-baobiaofenxi",
        children: [
            {
                title: "树图",
                link: "/sys/treePage",
                key: "treePage",
                icon: "icon-tree"
            },
            {
                title: "桑基图",
                link: "/sys/sankeyPage",
                key: "sankeyPage",
                icon: "icon-mapsankey"
            },
        ]
    },
    {
        title: "用户分析",
        link: "/sys/users",
        key: "users",
        icon: "user"
    },
    {
        title: "iframe",
        key: "iframe",
        icon: "icon-chuangkouwindow30",
        children: [
            {
                title: "bing",
                link: "/frame/bing",
                key: "bing",
                icon: "shop",
                url: `https://cn.bing.com/`,
                query: {
                    h: 1200
                }
            },
            {
                title: "百度",
                link: "/frame/baidu",
                key: "baidu",
                icon: "shop",
                url: `https://www.baidu.com/`,
            },]
    }
];