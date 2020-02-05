import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue'
import Index from '../views/front/Index.vue';
import Detail from '../views/front/Detail.vue';
import Login from '../views/front/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import Products from '../views/back/Products.vue';
import Orders from '../views/back/Orders.vue';
import Coupon from '../views/back/Coupon.vue';
import Checkout from '../views/front/Checkout.vue';
import Pay from '../views/front/Pay.vue';
import ProductList from '../views/front/ProductList.vue';
import Contact from '../views/front/Contact.vue';

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

const router = new VueRouter({
  routes,
});

export default router;
