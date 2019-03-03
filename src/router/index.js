import Vue from 'vue';
import Router from 'vue-router';

import index from '@/components/index';
import toledo from '@/components/toledo';
import mDetail from '@/components/m-detail';
import mIndex from '@/components/m-index';


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
    routes
});