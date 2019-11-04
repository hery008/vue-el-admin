let routes = [
    {
        path: '/',
        // name: 'layout',
        redirect: {name:'index'},
        // component: ()=>import('../../views/layout.vue'),
        component: 'layout',
        children: [
            {
                path: '/index',
                // name: 'index',
                // component:()=>import('../../views/index/index.vue')
                meta: {title:'后台首页'},
                component:'index/index'
            },
            {
                path: '/shop/goods/list',
                // name: '',
                meta: {title:'商品列表'},
                component:'shop/goods/list'
            }
        ]
    },
    {
        path: '/login',
        // name: 'login',
        meta: {title:'登录页'},
        // component:()=>import('../../views/login/index.vue')
        component:'login/index'
    },
    {
        path: '*',
        redirect: {name:'index'}
    }
]

//获取路由信息方法
let getRoutes = function () { 
    //自动生成路由
    createRoute(routes)
    return routes
}

//自动生成路由
function createRoute (arr) { 
    for (let i = 0; i < arr.length;i++) { 
        if (!arr[i].component) return 
        //去除xindex
        let val = getValue (arr[i].component)
        //生成name
        arr[i].name = arr[i].name || val.replace(/\//g, '_')
        //生成path
        arr[i].path = arr[i].path || `/${val}`
         
        let componentFunc = import(`../../views/${arr[i].component}.vue`)
        arr[i].component = () => componentFunc
        if (arr[i].children && arr[i].children.length > 0) { 
            createRoute (arr[i].children)
        }
    }
}

//去除index
function getValue (str) { 
    let index = str.lastIndexOf('/')
    let val = str.substring(index + 1, str.length)
    if (val === 'index') { 
        return str.substring(index,-1)
    }
    return str
}
export default getRoutes()