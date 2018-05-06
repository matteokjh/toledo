import Vue from 'vue';
import Router from 'vue-router';

import HelloWorld from '@/components/HelloWorld';

import index from '@/components/index';

import toledo from '@/components/toledo';


Vue.use(Router);

let routes = [
    
    {
        path: '/helloworld', 
        name: 'HelloWorld',
        component: HelloWorld
    },
    
    {
        path: '/', 
        name: 'index',
        component: index
    },
    
    {
        path: '/toledo', 
        name: 'toledo',
        component: toledo
    }
    
];

export default new Router({
    routes
});