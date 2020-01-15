import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue'
import Index from '../views/Index.vue';
import Detail from '../views/Detail.vue';
import Login from '../views/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import Products from '../views/Products.vue';
import Orders from '../views/Orders.vue';
import Coupon from '../views/Coupon.vue';
import Checkout from '../views/Checkout.vue';
import Pay from '../views/Pay.vue';
import ProductList from '../views/ProductList.vue';
import Contact from '../views/Contact.vue';

Vue.use(VueRouter);

const routes = [
  // {
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/productlist',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/detail/:productId',
    name: 'Detail',
    component: Detail,
  },
  {
    path: '/checkout',
    name: 'Chekout',
    component: Checkout,
  },
  {
    path: '/pay/:orderId',
    name: Pay,
    component: Pay,
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { requiresAuth: true },
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: Coupon,
        meta: { requiresAuth: true },
      },
    ],
  },
];
//   path: '/',
//   name: 'home',
//   component: Home
// },
// {
// path: '/about',
// name: 'about',
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
// }
// ]

const router = new VueRouter({
  routes,
});

export default router;
