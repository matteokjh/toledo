import Vue from 'vue';
import Router from 'vue-router';

import index from '@/pages/index';
import toledo from '@/pages/toledo';
import mDetail from '@/pages/m-detail';
import mIndex from '@/pages/m-index';


Vue.use(Router);

//判断是否从移动端进入
var ua = navigator.userAgent;
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/); //iPad除外
let isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
let isAndroid = ua.match(/(Android)\s+([\d.]+)/);
let isMobile = isIphone || isAndroid;

var mobile = 1;
if(!isMobile){
    mobile = 0;
}

let routes = [
    {
        path: '/', 
        name: 'index',
        component: mobile ? mIndex : index
    },
    
    {
        path: '/toledo', 
        name: 'toledo',
        component: mobile ? mDetail : toledo
    }
    
];

export default new Router({
    mode: 'hash',
    routes: routes
});