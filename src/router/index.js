import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import BlogHomeView from "../views/blog/BlogHomeView.vue";
import ExamHomeView from "../views/exam/ExamHomeView.vue";
import FilmHomeView from "../views/film/FilmHomeView.vue";
import SchoolHomeView from "../views/school/SchoolHomeView.vue";
import BlogContentView from "../views/blog/BlogContentView.vue";
import SchoolVideo from "../views/school/SchoolVideo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "主页",
    component: HomeView,
  },
  {
    path: "/blog",
    name: "博客",
    component: BlogHomeView,
  },
  {
    path: "/exam",
    name: "考证",
    component: ExamHomeView,
  },
  {
    path: "/film",
    name: "影音",
    component: FilmHomeView,
  },
  {
    path: "/school",
    name: "学堂",
    component: SchoolHomeView,
  },
  {
    path: "/blog-content/:id",
    props: true,
    name: "博客详情页",
    component: BlogContentView,
  },
  {
    path: "/school-video/:id",
    props: true,
    name: "视频播放页",
    component: SchoolVideo,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
