import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Bootcamps from '../views/Bootcamp_Pages/Bootcamps.vue';
import FilterBootcamps from '../views/Bootcamp_Pages/FilterBootcamps.vue';
import Bootcamp from '../views/Bootcamp_Pages/Bootcamp.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bootcamps',
    name: 'bootcamps',
    component: Bootcamps
  },
  {
    path: '/bootcamps/within',
    name: 'bootcamps-within',
    component: FilterBootcamps
  },
  {
    path: '/bootcamp/:slug',
    name: 'bootcamp',
    component: Bootcamp,
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
