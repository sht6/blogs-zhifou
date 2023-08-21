<template>
  <v-container fluid class="d-flex justify-center">
    <!-- 课程菜单 -->
    <v-card height="min-content" elevation="8">
      <v-toolbar color="blue" dark dense>
        <!-- 分配父子元素容器的剩余空间 -->
        <v-spacer></v-spacer>
        热门课程
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="pa-2">
        <v-list flat dense>
          <v-list-item-group color="blue" v-model="subValue">
            <v-list-item
              v-for="sub in subMenus"
              :key="sub.id"
              :value="sub.id"
              >{{ sub.name }}</v-list-item
            >
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
    <!-- 课程阶段 -->
    <v-card flat width="850" class="ml-8">
      <v-card
        elevation="8"
        v-for="(stage, index) in subStage"
        :key="stage.id"
        :class="{ 'mt-4': index !== 0 }"
      >
        <v-card-title>
          <v-chip label color="info">
            <v-icon class="mr-2"
              >mdi-numeric-{{ index + 1 }}-circle-outline</v-icon
            >
            {{ stage.label }}
          </v-chip>
        </v-card-title>
        <v-card-text>{{ stage.describe }}</v-card-text>
        <v-card-text class="pt-0">
          <v-chip-group column active-class="warning" v-model="targetValue">
            <v-chip
              label
              :value="target.id"
              v-for="target in stage.targetList"
              :key="target.id"
              >{{ target.name }}</v-chip
            >
          </v-chip-group>
        </v-card-text>
        <v-card-text class="pt-0" v-show="showVedioArea(stage.targetList)">
          <school-vedio-card-h
            v-for="video in videoList"
            :key="video.id"
            class="px-0"
            :id="video.id"
            :cover="video.cover"
            :title="video.title"
            :is_new="video.is_new === 1"
            :is_hot="video.is_hot === 1"
            :time="video.time"
            :desc="video.introduce"
            :studyCount="video.read"
          ></school-vedio-card-h>
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import SchoolVedioCardH from "../../components/school/SchoolVedioCardH.vue";
export default {
  name: "SchoolHomeView",
  components: {
    SchoolVedioCardH,
  },
  data: () => ({
    subMenus: [],
    // 课程菜单的值
    subValue: null,
    // 目标纸片的值
    targetValue: null,
    // 课程的阶段
    subStage: [],
    // 视频数据
    videoList: [],
  }),
  created() {
    // 获取课程列表
    this.getSubMenus();
  },
  watch: {
    // 目标纸片的值是否发生改变
    targetValue(newValue) {
      this.getVideoByTargetValue(newValue);
    },
    // 课程菜单值是否发生变化
    subValue(newValue) {
      // 根据课程编号获取课程的阶段
      this.getSbuStage(newValue);
    },
  },
  methods: {
    // 根据不同纸片目标值展示不同视频列表
    getVideoByTargetValue(tar_id) {
      // 先清除上一次的视频集合
      this.videoList = [];
      switch (tar_id) {
        case 1:
          this.videoList = [
            {
              id: 1,
              title: "20天Java入门基础视频教程（含Java项目和Java真题）",
              cover:
                "http://yun.itheima.com/Upload/Images/20211011/6163b1914c81b.jpg",
              introduce:
                "1，全网最强，最实用Java入门课程。<br>2、讲解由浅到深，没有废话，在最短时间教会最实用技术。<br>3、采用一线大厂真实需求驱动知识的学习，更清楚，更高效，更实用<br>4、大量的案例实战，初学者可以边学边干，边干边学，能学会，能学好，能学通。",
              time: "2021-12-31",
              is_new: 1,
              is_hot: 0,
              read: 32433,
            },
            {
              id: 2,
              title: "Java零基础入门到精通",
              cover:
                "http://yun.itheima.com/Upload/Images/20210416/6079621233532.jpg",
              introduce:
                "1，知识讲解详细，各阶段学习者都能学有所获。<br>2，使用图形的方式演示代码、分析逻辑，用直观的方式让复杂的知识学习起来变的轻松。",
              time: "2021-11-23",
              is_new: 1,
              is_hot: 1,
              read: 5674238,
            },
          ];
          break;
        case 2:
          this.videoList = [
            {
              id: 3,
              title: "30天精通JavaWeb（IDEA版）_JavaEE基础教程",
              cover:
                "http://yun.itheima.com/Upload/Images/20210416/6079682a1c788.jpg",
              introduce:
                "本套JavaWeb教程内容丰富且全面，全是干货，无论你是初学者，自学者，还是有数年编程经验的大神，此套教程都将是你不可或缺的学习宝典。",
              time: "2021-07-14",
              is_new: 1,
              is_hot: 0,
              read: 12343,
            },
          ];
          break;
        case 3:
          this.videoList = [
            {
              id: 4,
              title: "Maven项目管理从基础到实战_Java进阶教程",
              cover:
                "http://yun.itheima.com/Upload/Images/20210421/607ffff1c1288.jpg",
              introduce:
                "基本涵盖了Maven使用的所有知识点，让大家在工作中避免坑点",
              time: "2021-05-10",
              is_new: 1,
              is_hot: 0,
              read: 2133,
            },
          ];
          break;
        case 4:
          this.videoList = [
            {
              id: 5,
              title: "Java进阶Git全套教程，完整的项目管理工具教程",
              cover:
                "http://yun.itheima.com/Upload/Images/20210416/607966393e6b0.jpg",
              introduce: "详细讲解Git的基本操作，让学生在团队协作中游刃有余。",
              time: "2021-05-10",
              is_new: 0,
              is_hot: 1,
              read: 75745,
            },
          ];
          break;
        case 5:
          this.videoList = [
            {
              id: 6,
              title:
                "SSM框架教程Spring+SpringMVC+MyBatis全覆盖_Java热门框架教程",
              cover:
                "http://yun.itheima.com/Upload/Images/20210423/6082a66d77286.jpg",
              introduce:
                "适合对SSM没有使用过的同学，讲解通俗易懂，覆盖了当前SSM使用的基本操作。",
              time: "2021-04-30",
              is_new: 1,
              is_hot: 0,
              read: 12344,
            },
          ];
          break;
        case 6:
          this.videoList = [
            {
              id: 7,
              title: "全面学习Mybatis插件之Mybatis-Plus_Java框架教程",
              cover:
                "http://yun.itheima.com/Upload/Images/20210423/6082a72196933.jpg",
              introduce:
                "本课程从0开始全面讲解Mybatis-Plus框架的使用，从快速入门到原理分析再到插件的应用，让初学者快速上手。",
              time: "2020-07-11",
              is_new: 1,
              is_hot: 0,
              read: 21388,
            },
          ];
          break;
        case 7:
          this.videoList = [
            {
              id: 8,
              title:
                "SpringBoot2全套视频教程_java微服务架构SpringBoot基础到项目实战",

              cover:
                "http://yun.itheima.com/Upload/Images/20211026/617769f5c2e8b.jpg",

              introduce:
                "1.内容结构分层：适用于各种层面的学习者学习，标准开发者也可以从中收获大量的新知识，并应用到企业开发中<br>2.知识学习与实战开发相结合：各篇章中将提供标准开发案例，不仅学知识，还可以快速将所学知识应用到实用开发过程<br>3.通俗易懂：课程分阶段制作，每个阶段针对不同的学习目标设计，小白可以3天轻松上手SpringBoot，持续学习将可以由浅入深逐步深入SpringBoot底层原理学习SpringBoot的设计理念",

              time: "2021-02-18",

              is_new: 0,

              is_hot: 0,

              read: 12313,
            },

            {
              id: 9,

              title: "SpringBoot全套教程_Java微服务架构教程",

              cover:
                "http://yun.itheima.com/Upload/Images/20210504/6090a59820ad4.jpg",

              introduce:
                "本课程采用由浅入深,层层递进的讲解方式, 让你轻松掌握SpringBoot的快速构建Spring项目的方式，并且还深入剖析SpringBoot内部核心原理，如：自动配置原理，start原理，自定义start等, 让你知其然，知其所以然。",

              time: "2022-02-18",

              is_new: 1,

              is_hot: 0,

              read: 2342,
            },
          ];

          break;
        case 8:
          this.videoList = [
            {
              id: 10,

              title: "Java实战项目《传智健康》超完整的企业级医疗行业项目",

              cover:
                "http://yun.itheima.com/Upload/Images/20210527/60af30d473a31.jpg",

              introduce:
                "传智健康管理系统是一款应用于健康管理机构的业务系统，实现健康管理机构工作内容可视化、患者管理专业化、健康评估数字化、 健康干预流程化、知识库集成化，从而提高健康管理师的工作效率， 加强与患者间的互动，增强管理者对健康管理机构运营情况的了解。",

              time: "2021-02-10",

              is_new: 0,

              is_hot: 1,

              read: 43232,
            },
          ];

          break;

        case 9:
          this.videoList = [
            {
              id: 11,

              title: "微服务技术全栈教程SpringCloud+Elasticsearch+分布式系统",

              cover:
                "http://yun.itheima.com/Upload/Images/20210810/61124af16ad4b.jpg",

              introduce:
                "微服务是当下所有互联网项目的首选架构，而目前网络中的微服务课程主要围绕SpringCloud相关技术栈。然而微服务不仅仅是SpringCloud，还包括很多分布式系统要面临的问题。例如：分布式事务、分布式缓存、分布式搜索、分布式锁、持续集成、等等。",

              time: "2021-03-4",

              is_new: 1,

              is_hot: 0,

              read: 12432,
            },
          ];

          break;

        case 10:
          this.videoList = [
            {
              id: 12,

              title: "Java进阶教程快速入门Dubbo框架",

              cover:
                "http://yun.itheima.com/Upload/Images/20210525/60ac75d11acbe.jpg",

              introduce: "深入剖析Dubbo架构原理，全面掌握Dubbo的原理和应用",

              time: "2021-05-4",

              is_new: 1,

              is_hot: 0,

              read: 242334,
            },
          ];

          break;

        case 11:
          this.videoList = [
            {
              id: 13,

              title: "Java进阶教程Zookeeper框架从入门到精通",

              cover:
                "http://yun.itheima.com/Upload/Images/20210525/60ac7676b6dc9.jpg",

              introduce:
                "课程包含ZooKeeper的基本操作、集群搭建、常用javaApi、CuratorAPI、服务监控等理论知识，并且讲解配置中心、分布式锁原理、分布式id生成器等常见企业及应用，相信一定会对你的工作提供不少帮助",

              time: "2021-05-05",

              is_new: 1,

              is_hot: 0,

              read: 241214,
            },
          ];

          break;

        case 12:
          this.videoList = [
            {
              id: 14,

              title: "Java进阶教程消息队列RabbitMQ深入浅出",

              cover:
                "http://yun.itheima.com/Upload/Images/20210525/60ac94bae9f94.jpg",

              introduce:
                "RabbitMQ是由erlang语言开发，基于AMQP（Advanced Message Queue 高级消息队列协议）协议实现的消息队列，它是一种应用程序之间的通信方法，消息队列在分布式系统开发中应用非常广泛。",

              time: "2021-05-08",

              is_new: 1,

              is_hot: 0,

              read: 43533,
            },
          ];

          break;

        case 13:
          this.videoList = [
            {
              id: 15,

              title: "全面解剖RocketMQ和项目实战_Java进阶教程",

              cover:
                "http://yun.itheima.com/Upload/Images/20210423/6082aab05fb77.jpg",

              introduce:
                "通过本课程可以让初学者对分布式系统解耦有一定认识，并且能够通过快速使用RocketMQ实现分布式服务的异步通信，同时本课程还会通过项目案例实战让学员对RocketMQ的应用场景有所体会，最后再通过源码角度让学员对RocketMQ的原理有所理解。",

              time: "2021-05-09",

              is_new: 1,

              is_hot: 0,

              read: 12313,
            },
          ];

          break;

        case 14:
          this.videoList = [
            {
              id: 16,

              title: "深入解析docker容器化技术_Java进阶教程",

              cover:
                "http://yun.itheima.com/Upload/Images/20210416/6079670a5db7b.jpg",

              introduce:
                "系统的学习Docker技术栈，掌握最先进的容器技术。Docker容器、镜像操作，什么是虚拟化以及docker架构，Docker镜像以及容器操作，搭建私有仓库、编写Dockerfile以及docker可视化工具等。",

              time: "2021-05-10",

              is_new: 1,

              is_hot: 0,

              read: 6723,
            },
          ];

          break;

        case 15:
          this.videoList = [
            {
              id: 17,

              title: "Redis入门到精通，Java核心缓存技术教程",

              cover:
                "http://yun.itheima.com/Upload/Images/20210423/6082b08c25c01.jpg",

              introduce:
                "缓存是目前企业级应用中的核心组成部分，当今主流的电商、生活服务、直播等领域都离不开缓存的使用。Redis作为当下主流的缓存技术，已经成为互联网企业的不二首选，基于redis集群的缓存结构设计目前已在同领域内占据半壁江山。本课程从redis入门开始，面向不同层次的学习者设计课程，既可以带领初学者入门，同时也为已经入门的开发者提供近30个企业级解决方案，并结合当下较为集中的缓存问题进行深入剖析，并给处对应的企业级解决方案。",

              time: "2021-05-12",

              is_new: 1,

              is_hot: 0,

              read: 43232,
            },
          ];

          break;

        case 16:
          this.videoList = [
            {
              id: 18,

              title: "MongoDB基础入门到高级进阶_Java进阶教程NoSQL技术",

              cover:
                "http://yun.itheima.com/Upload/Images/20210423/6082b0f212e15.jpg",

              introduce:
                "MongoDB是一个开源、高性能、无模式的文档型数据库，是NoSQL数据库产品中的一种。它的出现主要应对“三高”等问题，它可以解决需要存储数据量大、高并发读写、高可用的现实问题，适用于社交朋友圈、游戏积分、物流轨迹、商品评论等业务。架构成本较低，各方面却很优秀，MongoDB值得您选择。",

              time: "2021-05-13",

              is_new: 1,

              is_hot: 1,

              read: 2134,
            },
          ];

          break;

        case 17:
          this.videoList = [
            {
              id: 19,

              title: "Java进阶教程ELK高级搜索_ElasticStack技术栈",

              cover:
                "http://yun.itheima.com/Upload/Images/20210423/6082ae0f8fc1c.jpg",

              introduce:
                "本课程基于最新的ELK7.3版本讲解，包含实际运维部署理论与实践，以及ELK整体流程的项目。",

              time: "2021-05-14",

              is_new: 0,

              is_hot: 1,

              read: 21334,
            },
          ];

          break;

        case 18:
          this.videoList = [
            {
              id: 20,

              title: "Java实战项目SaaS移动办公完整版《iHRM 人力资源管理系统》",

              cover:
                "http://yun.itheima.com/Upload/Images/20210416/6078e2faddfba.jpg",

              introduce:
                "iHRM是一款基于SaaS平台的人力资源管理系统， 企业通过该系统可以完成员工管理、审批管理、考勤管理、社保公积金管理、薪资管理等功能，为企业的人力资源管理提供一站式解决方案。",

              time: "2021-05-15",

              is_new: 0,

              is_hot: 1,

              read: 20503,
            },
          ];

          break;

        case 19:
          this.videoList = [
            {
              id: 21,

              title:
                "Java项目《好客租房》Java企业级解决方案（Spring全家桶+分布式解决方案+微信授权+爬虫解决方案等）",

              cover:
                "http://yun.itheima.com/Upload/Images/20210428/6088bb9b5f36e.jpg",

              introduce:
                "好客租房是一个无中介化房屋租赁平台。包含房源智能推荐、地图找房、行情查询、电子合同、限时秒杀等功能。从房屋基本情况入手，从源头建立信任基础，建立房主和租客交易双方的信任关系，利用区块链技术去除中介的垄断地位，利用智能合约技术提高交易效率。",

              time: "2021-05-16",

              is_new: 0,

              is_hot: 1,

              read: 25323,
            },
          ];

          break;

        case 20:
          this.videoList = [
            {
              id: 22,

              title:
                "Java项目《万信金融》企业级开发实战（springboot，springcloud全家桶技术等）",

              cover:
                "http://yun.itheima.com/Upload/Images/20210519/60a47530772f1.jpg",

              introduce:
                "1、能够了解金融行业的相关业务，如借钱、出借等<br/>2、能够使用MySQL进行业务数据持久化<br/>3、能够掌握RocketMQ的事务消息机制完成部分场景下的分布式事务控制<br/>4、能够使用Elasticsearch完成标的信息搜索",

              time: "2021-05-17",

              is_new: 0,

              is_hot: 1,

              read: 23423,
            },
          ];

          break;

        case 21:
          this.videoList = [
            {
              id: 23,

              title: "Java分布式微服务项目闪聚支付，Java移动支付全生态系统",

              cover:
                "http://yun.itheima.com/Upload/Images/20210603/60b83f6ed8812.jpg",

              introduce:
                "闪聚支付是一个提供聚合支付的平台，目前主要的做法是线上聚合收银台（开放API），线下C2B一码多付、B2C商家扫码。闪聚支付不仅应以SaaS服务形式，为各商户提供订单管理、门店管理、财务数据统计等基础服务，还以支付为入口，通过广告、营销、金融等服务，构建一个移动支付的全生态系统。",

              time: "2021-05-17",

              is_new: 1,

              is_hot: 0,

              read: 24332,
            },
          ];

          break;

        case 22:
          this.videoList = [
            {
              id: 24,

              title: "品达通用权限系统",

              cover:
                "http://yun.itheima.com/Upload/Images/20210616/60c9563cd3a3c.jpg",

              introduce:
                "1. 基于SpringCloud(Hoxton.SR1) +SpringBoot(2.2.2.RELEASE) 的微服务框架<br/>2. 具备通用的用户管理、资源权限管理、网关统一鉴权、XSS防跨站攻击等多个模块<br/>23. 支持多业务系统、多服务并行开发，可以作为后端服务的开发脚手架",

              time: "2021-05-18",

              is_new: 1,

              is_hot: 0,

              read: 3423,
            },
          ];

          break;

        case 23:
          this.videoList = [
            {
              id: 25,

              title: "Java项目集信达短信平台系统实战",

              cover:
                "http://yun.itheima.com/Upload/Images/20210610/60c1b1db38482.jpg",

              introduce:
                "随着企业业务扩张、短信规模化使用，传统短信平台的接入方式和单一的信息发送功能，已不能满足现代企业管理的需求，所以统一入口、减少对接成本、简单易行的操作与维护、高稳定、高可靠的移动信息化应用成为短信平台发展趋势。",

              time: "2021-05-19",

              is_new: 1,

              is_hot: 0,

              read: 2131,
            },
          ];

          break;

        case 24:
          this.videoList = [
            {
              id: 26,

              title: "Java面试大厂名企高频真题视频教程",

              cover:
                "http://yun.itheima.com/Upload/Images/20210929/615435ca813c1.jpg",

              introduce:
                "1. 精选试题。本课程在题目的选取上本着贵精不贵多的原则，从大厂面试题中精心挑选<br/>2. 深挖底层。不单对面试题目做出解答，更会对题目关联的知识点进行深层次的剖析<br/>3. 形象易懂。注重对底层数据结构的可视化展示，结合代码讲解更容易掌握",

              time: "2021-05-20",

              is_new: 1,

              is_hot: 0,

              read: 12433,
            },
          ];

          break;

        case 25:
          this.videoList = [
            {
              id: 27,

              title: "Web前端零基础入门HTML5+CSS3+前端项目",

              cover:
                "http://yun.itheima.com/Upload/Images/20211231/61ce744050fc1.jpg",

              introduce:
                "课程中和课程尾配备两个实战项目，项目一类型是企业站，可以让同学们快速的将基础知识点进行反复练习；项目二类型是电商站，可以让同学们掌握更复杂的网页效果的开发流程和布局标准。本教程严格按照专业的开发流程：专业的测量工具，做到100%还原设计稿。",

              time: "2021-07-31",

              is_new: 0,

              is_hot: 1,

              read: 855464,
            },
          ];

          break;

        case 26:
          this.videoList = [
            {
              id: 28,

              title: "移动web开发实战",

              cover:
                "http://yun.itheima.com/Upload/Images/20211124/619ddd80ad427.jpg",

              introduce:
                "本课程采用2+5模式, 前两天承接HTML+CSS, 使用字体图标、平面转换、动画等，丰富网页效果和呈现方式；后5天完成移动端和多端适配效果。课程采用闭环方式设计，每天课程都有完整的案例或项目， 让学生学以致用。",

              time: "2021-08-31",

              is_new: 1,

              is_hot: 0,

              read: 34800,
            },
          ];

          break;

        case 27:
          this.videoList = [
            {
              id: 29,

              title: "JavaScript深入浅出_语法解析+项目实战",

              cover:
                "http://yun.itheima.com/Upload/Images/20211124/619ddf1370b50.jpg",

              introduce:
                "本课程主要讲解JavaScript基本语法, 包含最新ES6语法，比如let、模板字符串。主要讲解变量、数据类型、数组、函数和对象等等。让你一边学习一边练习，重点知识及时实践，加深记忆，巩固学习成果。",

              time: "2021-03-31",

              is_new: 1,

              is_hot: 0,

              read: 32468,
            },
          ];

          break;

        case 28:
          this.videoList = [
            {
              id: 30,

              title: "JavaScript核心之Web APIs实用案例",

              cover:
                "http://yun.itheima.com/Upload/Images/20211124/619de88e74bcc.jpg",

              introduce:
                "1. pink老师主讲<br>2. 本课程主要讲解DOM、BOM操作、网页特效、正则表达式、本地存储等。拒绝冷偏知识点，突出实用。<br>3. 课程采用闭环方式设计，每天课程都有完整的实用案例或项目，把当天所有重点内容进行综合强化练习， 让学生学以致用。<br>4. 课堂案例在实际开发中都有运用场景。",

              time: "2021-05-31",

              is_new: 1,

              is_hot: 1,

              read: 23428,
            },
          ];

          break;

        case 29:
          this.videoList = [
            {
              id: 31,

              title: "前端进阶Ajax零基础入门",

              cover:
                "http://yun.itheima.com/Upload/Images/20211124/619de402201a4.jpg",

              introduce:
                "1. 案例丰富：知识点配套的案例丰富多样，满足学生学习的兴趣<br>2. 深入原理：会深入讲解如何封装自己的模板引擎和 Ajax 函数<br>3. 涵盖广泛：涵盖了 Ajax、跨域、JSONP、模板引擎、节流防抖、XHR Level2 等常用技术点<br>4. 由浅入深讲解了 Git 中的核心概念、常用指令、分支操作、远程仓库的使用、SSH 公钥的配置等",

              time: "2021-04-21",

              is_new: 0,

              is_hot: 0,

              read: 23428,
            },
          ];

          break;

        case 30:
          this.videoList = [
            {
              id: 32,

              title: "前端高级Node.js零基础入门教程",

              cover:
                "http://yun.itheima.com/Upload/Images/20211124/619dea23907c0.jpg",

              introduce:
                "1. 培养开源能力：独立开发并发布自己的 npm 包<br>2. 深入原理：CORS 跨域方案的原理、express 自定义中间件的开发<br>3. 拓展后端知识面：MySQL 数据库常用操作、JWT 认证方案<br>4. 面向全栈：基于 Node.js 开发 API 接口项目",

              time: "2021-09-21",

              is_new: 0,

              is_hot: 0,

              read: 5647,
            },
          ];

          break;

        case 31:
          this.videoList = [
            {
              id: 33,

              title: "前端框架Vue2+Vue3全套视频",

              cover:
                "http://yun.itheima.com/Upload/Images/20210804/610a3c7f629c9.jpg",

              introduce:
                "1. 工程化开发，现在市场还是直接引入 vue.js 到 html 页面， 开发中不用这个方式，我们是直接按照工程化的方式进行讲解。<br>2. 案例驱动教学，精心设计的 4 大案例，保证每一位学生听得懂、写得出、能实践。<br>3. 深入浅出地讲解 Vue2 / Vue3 中的指令、组件、侦听器与计算属性，以及生命周期、数据共享、动态组件、插槽、路由等核心技术点。<br>4. 同时，涵盖了 axios 在 Vue 项目中的最佳实践方案；以及 Vant 组件库的主题自定制方案。<br>5. 最后一天的 Vue 基础收尾案例，助力学生更加轻松的过渡到 Vue 项目课的学习！",

              time: "2021-06-21",

              is_new: 1,

              is_hot: 0,

              read: 54326,
            },
          ];

          break;

        case 32:
          this.videoList = [
            {
              id: 34,

              title: "前端React精品教程",

              cover:
                "http://yun.itheima.com/Upload/Images/20210507/60949658c6885.jpg",

              introduce:
                "React 是时下最流行的前端框架之一，是很多大厂的首选前端开发框架！历经数月精心研发，内容包括：React 脚手架、JSX、函数组件、类组件、受控组件、组件通讯、Context、组件生命周期、高阶组件、render-props、组件性能优化、虚拟DOM和Diff算法等等。让您零基础入门到理解原理，从容学习 React，达到企业级使用 React 标准。",

              time: "2021-04-02",

              is_new: 1,

              is_hot: 0,

              read: 565465,
            },
          ];

          break;

        case 33:
          this.videoList = [
            {
              id: 35,

              title: "前端TypeScript零基础入门到实战开发",

              cover:
                "http://yun.itheima.com/Upload/Images/20211227/61c969706d557.jpg",

              introduce:
                "本套教程从零开始学习 TypeScript，上手时不需要工程化配置，完全没有任何学习负担。课程知识点全面，从 TypeScript 基础类型，到高级类型，到 TypeScript 的类型声明文件，再到配合 React 的使用，一应俱全。除了纯粹的类型外，还包括 TypeScript 类型兼容性、结构化类型等 TypeScript 原理内容。课程最后，通过一个经典案例，来验证 TypeScript 的学习成果。",

              time: "2021-01-02",

              is_new: 1,

              is_hot: 1,

              read: 56456,
            },
          ];

          break;

        case 34:
          this.videoList = [
            {
              id: 36,

              title: "手把手快速带你开发微信小程序",

              cover:
                "http://yun.itheima.com/Upload/Images/20211124/619dec424adb9.jpg",

              introduce:
                "本课程从小程序账号注册、开发环境搭建、基础语法、路由导航、数据请求、分包、组件化等方面详细阐述了小程序开发必备的基础知识。<br>学完小程序基础之后，利用 uni-app 技术实现微信小程序的开发，可以做到一次开发多端部署。<br>项目拥有首页、搜索页、商品列表页、商品详情页、购物车、登录支付等主要功能。涵盖了分包、vuex、组件化开发等核心技术点的使用。",

              time: "2021-08-07",

              is_new: 0,

              is_hot: 0,

              read: 54343,
            },
          ];

          break;

        case 35:
          this.videoList = [
            {
              id: 37,

              title: "大数据数据开发基础MySQL8.0从入门到精通",

              cover:
                "http://yun.itheima.com/Upload/Images/20211215/61b9c2839d016.jpg",

              introduce:
                "1、 新：本课程基于最新MySQL8.0，包含很多新特性<br>2、 全：本课程涵盖了从入门到高阶几乎所有的MySQL知识模块，一站式学习。<br>3、 深：本课程有大量篇幅来讲解MySQL的高阶部分，对于高阶知识点一挖到底。<br>4、 细：本课程知识点讲解细腻，所有知识点模块的讲解都是实战操作。",

              time: "2021-10-07",

              is_new: 1,

              is_hot: 0,

              read: 21377,
            },
          ];

          break;

        case 36:
          this.videoList = [
            {
              id: 38,

              title: "2022版大数据Hadoop入门教程",

              cover:
                "http://yun.itheima.com/Upload/Images/20211209/61b166b3c3c2d.jpg",

              introduce:
                "高效、快捷掌握Hadoop必备知识，大大缩短Hadoop离线阶段学习时间。以企业实用场景为依托，以企业最终数据应用为目标，引导学习方向。",

              time: "2021-11-07",

              is_new: 1,

              is_hot: 0,

              read: 43258,
            },
          ];

          break;

        case 37:
          this.videoList = [
            {
              id: 39,

              title:
                "大数据离线数据仓库，企业级在线教育项目实战（Hive数仓项目完整流程）",

              cover:
                "http://yun.itheima.com/Upload/Images/20211220/61c027098afc4.jpg",

              introduce:
                "1、建立集团数据仓库，统一集团数据中心，把分散的业务数据集中存储和处理 2、项目从需求调研、设计、版本控制、研发、测试到落地上线，涵盖了项目的完整工序 3、挖掘分析海量用户行为数据，定制多维数据集合，形成数据集市，供各个场景主题使用。",

              time: "2021-05-07",

              is_new: 1,

              is_hot: 0,

              read: 43535,
            },
          ];

          break;

        case 38:
          this.videoList = [
            {
              id: 40,

              title: "Python入门到精通（19天全）",

              cover:
                "http://yun.itheima.com/Upload/Images/20210513/609ca0c226d54.jpg",

              introduce:
                "1，对于编程0基础的同学或者想把python作为第二门编程语言的同学十分适合。<br>2，生动形象，浅显易懂，清晰明了。<br>3，针对基础语法详细讲解，构建python编程的基础能力。",

              time: "2021-09-07",

              is_new: 1,

              is_hot: 1,

              read: 45544,
            },

            {
              id: 41,

              title:
                "Python编程进阶，深入学习Python高级语法，多任务编程及网络编程",

              cover:
                "http://yun.itheima.com/Upload/Images/20220303/6220621f27202.png",

              introduce:
                "1. 高效简介的授课风格, 用最短的时间清晰简介的讲解知识点, 只上干货!<br>2. 系统性的讲解Python进阶内容，为深入学习 数据分析和大数据 铺垫坚实的基础, 全网首发！",

              time: "2021-02-07",

              is_new: 1,

              is_hot: 0,

              read: 34231,
            },
          ];

          break;

        case 39:
          this.videoList = [
            {
              id: 42,

              title: "大数据spark3.2从基础到精通",

              cover:
                "http://yun.itheima.com/Upload/Images/20211201/61a6e28be533d.jpg",

              introduce:
                "全网首套基于Python语言的Spark教程！高效、快捷掌握Spark3.2必备知识，大大缩短Spark阶段学习时间。",

              time: "2021-07-07",

              is_new: 1,

              is_hot: 0,

              read: 2312,
            },

            {
              id: 43,

              title: "大数据Hive+Spark离线数仓工业项目实战",

              cover:
                "http://yun.itheima.com/Upload/Images/20211220/61c02878e0450.jpg",

              introduce:
                "一站制造项目基石与前瞻、数据仓库建模方法 离线数仓分层、Sqoop数据存采集、数仓ODS&amp;DWD层建设、数仓DWS维度层建设、数仓DWB指标层建设、数仓ST主题层建设、一站制造任务调度、Prometheus概述 实现linux服务器监控 实现MySQL服务监控 实现Flink服务监控 Grafana监控看板。一站制造：运营ciss系统、oa系统、erp系统一体化智能制造大数据分析系统",

              time: "2021-08-07",

              is_new: 1,

              is_hot: 0,

              read: 7554,
            },
          ];

          break;

        case 40:
          this.videoList = [
            {
              id: 44,

              title: "人工智能之python编程零基础入门",

              cover:
                "http://yun.itheima.com/Upload/Images/20210625/60d581ef92bf6.jpg",

              introduce:
                "Python编程入门，针对0基础就python语言基础语法的各个点逐步讲解，由浅入深，通俗易懂，层层深入。",

              time: "2021-01-07",

              is_new: 1,

              is_hot: 0,

              read: 45354,
            },

            {
              id: 45,

              title: "4天快速入门Python数据挖掘",

              cover:
                "http://yun.itheima.com/Upload/Images/20210803/6108bd10ae342.jpg",

              introduce:
                "该阶段主要是介绍一些数据科学领域用Python语言实现的基础库，如简洁、轻便的数据可视化展示工具Matplotlib，高效的运算工具Numpy，方便的数据处理工具Pandas，为人工智能阶段打基础。",

              time: "2021-03-07",

              is_new: 1,

              is_hot: 1,

              read: 56551,
            },
          ];

          break;

        case 41:
          this.videoList = [
            {
              id: 46,

              title: "最简单快速入门Python机器学习",

              cover:
                "http://yun.itheima.com/Upload/Images/20210603/60b87dceef356.jpg",

              introduce:
                "该阶段是机器学习的入门课程，主要介绍一些经典的传统机器学习算法，如分类算法：KNN算法，朴素贝叶斯算法，逻辑回归，决策树算法以及随机森林；回归算法：线性回归，岭回归；聚类算法：KMeans算法，结合Python语言实现的经典机器学习库Sikit-Learn库，实现一些小型预测案例。",

              time: "2021-09-07",

              is_new: 1,

              is_hot: 0,

              read: 6576,
            },
          ];

          break;

        case 42:
          this.videoList = [
            {
              id: 47,

              title: "AI深度学习自然语言处理NLP零基础入门",

              cover:
                "http://yun.itheima.com/Upload/Images/20210603/60b87ce48daae.jpg",

              introduce:
                "本课程由浅到深，由原理到实践，层层递进的讲解方式，适合自然语言处理入门学习。在解析理论算法的同时，更加注重代码实践。每一个知识点，每一个专题都以代码驱动, 结合实际案例模型, 培养真实代码开发能力和解决实际问题的能力。让学生们学懂、学通、学会。",

              time: "2021-03-07",

              is_new: 1,

              is_hot: 1,

              read: 14355,
            },
          ];

          break;

        case 43:
          this.videoList = [
            {
              id: 48,

              title: "AI-OpenCV图像处理10小时零基础入门",

              cover:
                "http://yun.itheima.com/Upload/Images/20210603/60b87a9d5f32b.jpg",

              introduce:
                "本课程由浅到深，由原理到实践，层层递进的讲解方式，让你轻松掌握opencv的使用。使用opencv对图像进行炫酷的变换，特征提取等，结合实际案例，培养解决实际问题的能力，非常适合零基础入门学习。",

              time: "2021-05-09",

              is_new: 1,

              is_hot: 0,

              read: 37097,
            },
          ];

          break;

        case 44:
          this.videoList = [
            {
              id: 49,

              title: "3天带你玩转Python深度学习",

              cover:
                "http://yun.itheima.com/Upload/Images/20210803/6108bdfc1aeb0.jpg",

              introduce:
                "该阶段是深度学习的入门课程，主要介绍经典的深度学习框架TensorFlow的使用，IO操作，以及神经网络基础、卷积神经网络的相关知识，并用卷积神经网络原理搭建、设计自己的网络，实现对验证码图片内容的识别。让你用最快地办法入门深度学习，用最简单方式轻松掌握TensorFlow深度学习框架。",

              time: "2021-03-09",

              is_new: 1,

              is_hot: 0,

              read: 12432,
            },
          ];

          break;

        case 45:
          this.videoList = [
            {
              id: 50,

              title: "AI深度学习计算机视觉CV零基础入门",

              cover:
                "http://yun.itheima.com/Upload/Images/20210603/60b87d2b496c9.jpg",

              introduce:
                "本课程采用由浅到深，由原理到实践，层层递进的讲解方式，结合实际案例，培养解决实际问题的能力。让你轻松掌握tensorFlow的使用, 使用tensorflow构建神经网络并完成图像分类任务。非常适合零基础入门学习。",

              time: "2021-06-09",

              is_new: 1,

              is_hot: 0,

              read: 54343,
            },
          ];

          break;

        case 46:
          this.videoList = [
            {
              id: 51,

              title: "Photoshop零基础到精通",

              cover:
                "http://yun.itheima.com/Upload/Images/20210514/609e10567f768.jpg",

              introduce:
                "本课程采用由浅入深、讲解详尽，从基础知识、中小实例到实战案例，逐层深入，逐步拓展，零基础的学员也能够轻松学会使用短期内学会并使用 PS进行修图、数码照片处理、网页设计、UI设计、平面设计等。",

              time: "2021-03-09",

              is_new: 1,

              is_hot: 0,

              read: 65456,
            },
          ];

          break;

        case 47:
          this.videoList = [
            {
              id: 52,

              title: "UI基础教程Illustrator视频教程，设计软件入门到精通",

              cover:
                "http://yun.itheima.com/Upload/Images/20211227/61c967ff283d0.jpg",

              introduce:
                "Adobe illustrator，常被称为“AI”，是一种应用于出版、多媒体和在线图像的工业标准矢量插画的软件。该软件主要应用于印刷出版、海报书籍排版、专业插画、多媒体图像处理和互联网页面的制作等，也可以为线稿提供较高的精度和控制，适合生产任何小型设计到大型的复杂项目。<br>本阶段课程由浅入深讲解ai软件的各项基本操作，通过课程的学习，能熟练应用ai设计与制作各类图标、logo、海报等平面设计内容。",

              time: "2021-04-09",

              is_new: 0,

              is_hot: 0,

              read: 65798,
            },
          ];

          break;

        case 48:
          this.videoList = [
            {
              id: 53,

              title: "平面设计全套系列课（基础入门+实战项目）",

              cover:
                "http://yun.itheima.com/Upload/Images/20211223/61c3d5dc726ad.jpg",

              introduce:
                "1.提高视觉设计的能力，加强商业广告设计l理念的学习；<br>2.掌握平面设计规范及印刷原理；<br>3.户内外广告设计规范与技巧；<br>4.对平面类设计工作流程及各种规范的掌握；<br>5.分析项目及操作的独立能力培养；<br>6.掌握logo及vi系统设计技巧。",

              time: "2021-08-11",

              is_new: 1,

              is_hot: 0,

              read: 231685,
            },
          ];

          break;

        case 49:
          this.videoList = [
            {
              id: 54,

              title: "4天从零学会C4D",

              cover:
                "http://yun.itheima.com/Upload/Images/20211227/61c968175291b.jpg",

              introduce:
                "全称CINEMA 4D，是一款容易上手的三维建模与渲染软件，能应用到多个领域，电影《毁灭战士》《阿凡达》中都有大量场景是C4D渲染，随着用户对个性化设计需求越来越旺盛，尤其是电商设计领域被大量使用，已经成为电商设计领域最热门的设计软件。零基础入门C4D，本阶段课程将讲解C4D的基本操作，主流的建模方式与渲染方式，通过长C4D软件与PS软件结合的方式制作电商视觉界面项目。",

              time: "2021-11-11",

              is_new: 1,

              is_hot: 1,

              read: 1243,
            },
          ];

          break;

        case 50:
          this.videoList = [
            {
              id: 55,

              title: "Figma零基础到精通+APP项目实战教程",

              cover:
                "http://yun.itheima.com/Upload/Images/20211011/616412abb51f4.jpg",

              introduce:
                "1、全网最全，最简单的Figma入门课程。<br>2、讲解由浅到深，没有废话，在最短时间教会最实用技术。<br>3、采用一线大厂真实需求驱动知识的学习，更清楚，更高效，更实用。<br>4、大量的案例操作，即便是初学者也能迅速上手。",

              time: "2021-03-11",

              is_new: 0,

              is_hot: 1,

              read: 45353,
            },
          ];

          break;

        case 51:
          this.videoList = [
            {
              id: 56,

              title: "2022最新软件测试基础入门到项目实战",

              cover:
                "http://yun.itheima.com/Upload/Images/20220112/61de47e319f10.png",

              introduce:
                "以终为始，由交付实战目标为终，推出所学知识；从认识软件及软件测试，到如何设计测试、缺陷标准及缺陷管理，最终以项目实战贯穿所学知识，让知识与应用相结合。",

              time: "2021-01-13",

              is_new: 0,

              is_hot: 0,

              read: 21321,
            },
          ];

          break;

        case 52:
          this.videoList = [
            {
              id: 57,

              title: "Linux系统2天快速入门",

              cover:
                "http://yun.itheima.com/Upload/Images/20211217/61bc3c40e8ca6.jpg",

              introduce:
                "本视频包含Linux操作系统介绍、Linux的常用命令、vi编辑器。学习掌握本阶段内容，可具备Linux项目搭建能力。",

              time: "2021-01-15",

              is_new: 1,

              is_hot: 0,

              read: 87984,
            },
          ];

          break;

        case 53:
          this.videoList = [
            {
              id: 58,

              title: "软件测试MySQL数据库知识精讲+项目实战",

              cover:
                "http://yun.itheima.com/Upload/Images/20211217/61bc3da876d8f.jpg",

              introduce:
                "本视频包含数据安装，数据表操作、数据操作-增删改查、条件查询、排序、聚合函数、分组、分页、连接查询、自关联、子查询、子查询演练。<br>学习掌握本阶段内容，可具备数据库校验能力；还可以快速、规范的掌握数据库增删改查操作。",

              time: "2021-01-18",

              is_new: 1,

              is_hot: 0,

              read: 87984,
            },
          ];

          break;

        case 54:
          this.videoList = [
            {
              id: 59,

              title: "10天玩转Python软件测试",

              cover:
                "http://yun.itheima.com/Upload/Images/20211214/61b82e7e129bc.jpg",

              introduce:
                "学习本阶段内容，可掌握Python语法, 具备编程能力； 能建立编程思维以及面向对象程序设计思想； 能掌握UnitTest框架管理测试用例。",

              time: "2021-01-25",

              is_new: 0,

              is_hot: 0,

              read: 123,
            },
          ];

          break;

        case 55:
          this.videoList = [
            {
              id: 60,

              title: "软件测试web自动化测试精讲与实战",

              cover:
                "http://yun.itheima.com/Upload/Images/20211224/61c5615a445f5.jpg",

              introduce:
                "本视频将教会大家搭建Web自动化和移动自动化测试环境；掌握Web自动化测试流程和脚本编写；掌握移动自动化测试中元素的定位方法、元素操作和手势操作；熟练掌握ADB工具的使用； 掌握PO模式的设计思想，并能够对页面进行封装；掌握数据驱动的实现方式； 能够在实际项目灵活运用自动化的相关技术。",

              time: "2021-04-25",

              is_new: 1,

              is_hot: 0,

              read: 35465,
            },
          ];

          break;

        case 56:
          this.videoList = [
            {
              id: 61,

              title: "零基础入门移动自动化——Appium框架",

              cover:
                "http://yun.itheima.com/Upload/Images/20211227/61c96843a3051.jpg",

              introduce:
                "Appium是一个开源的、跨平台的自动化测试框架，该框架适用于Native Application、Mobile Web Application或Hybrid Application的自动化测试。",

              time: "2021-04-25",

              is_new: 1,

              is_hot: 0,

              read: 68789,
            },
          ];

          break;

        case 57:
          this.videoList = [
            {
              id: 62,

              title: "轻松教你使用Appium进行IOS真机自动化测试",

              cover:
                "http://yun.itheima.com/Upload/Images/20210922/614aa12fb0796.jpg",

              introduce:
                "1，讲解清晰，将环境安装的步骤和注意事项呈现给听众。<br>2、从模拟器到真机实操，都进行演示讲解。<br>3，内容丰富，生动形象，学完即可完成IOS端环境安装及实操。",

              time: "2021-03-02",

              is_new: 0,

              is_hot: 0,

              read: 1256,
            },
          ];

          break;

        case 58:
          this.videoList = [
            {
              id: 63,

              title: "接口测试精讲+传智健康实战教程",

              cover:
                "http://yun.itheima.com/Upload/Images/20211214/61b8314385eec.jpg",

              introduce:
                "接口测试是所有自动化测试中应用频率最高部分。黑马此阶段共分成14个部分进行详讲。涉及HTTP,Postman,Pymysql，requests库，集成UnitTes，Dubbo等诸多工具，最后用传智健康项目进行本阶段项目实战。",

              time: "2021-03-02",

              is_new: 1,

              is_hot: 0,

              read: 65462,
            },
          ];

          break;

        case 59:
          this.videoList = [
            {
              id: 64,

              title: "4天快速入门性能测试",

              cover:
                "http://yun.itheima.com/Upload/Images/20211214/61b832709ab13.jpg",

              introduce:
                "性能测试属于高级测试范畴，对于薪资的提升帮助很大，本阶段视频讲解性能测试环境搭建，JMeter工具的使用，性能测试监控、分析和调优方法",

              time: "2021-07-02",

              is_new: 1,

              is_hot: 0,

              read: 3216,
            },
          ];

          break;

        case 60:
          this.videoList = [
            {
              id: 65,

              title: "软件测试微信小程序自动化测试实战",

              cover:
                "http://yun.itheima.com/Upload/Images/20211224/61c55fff1ddd1.jpg",

              introduce:
                "本视频涵盖:微信小程序基础介绍、Ego微商项目介绍、Ego微商项目部署、Ego微商小程序计划篇、Ego微商小程序设计篇、Ego微商小程序执行总结篇、Ego微商小程序接口测试篇、持续集成",

              time: "2021-03-02",

              is_new: 1,

              is_hot: 0,

              read: 6544,
            },

            {
              id: 66,

              title: "软件测试4天搞定金融项目",

              cover:
                "http://yun.itheima.com/Upload/Images/20211224/61c560b62fd2f.jpg",

              introduce:
                "本视频讲解金融项目功能测试解决方案、真实项目测试体验解决方案、复杂业务接口测试解决方案 接口加解密测试解决方案、数据分离解决方案 持续集成解决方案、自动化测试报告解决方案、高并发测试解决方案",

              time: "2021-07-02",

              is_new: 1,

              is_hot: 0,

              read: 3215,
            },
          ];

          break;

        default:
          this.videoList = null;
      }
    },
    //显示阶段目标视频的区域
    showVedioArea(stageTargetList) {
      let valueArr = [];
      // 将当前阶段的目标值保存在数组中
      stageTargetList.some((item, index) => {
        valueArr[index] = item.id;
      });
      // 判断目标值是否在targetValue中，如果在，返回true，如果不在，返回false
      return valueArr.indexOf(this.targetValue) !== -1;
    },
    // 根据课程编号获取课程的阶段
    getSbuStage(sub_id) {
      switch (sub_id) {
        case 1:
          this.subStage = [
            {
              id: 1,
              label: "JavaSE 基础",
              describe:
                "打好Java基础才能真正成为Java开发的高手，学习Java企业级技术和项目才能游刃有余。",
              targetList: [{ id: 1, name: "Java 基础快速入门" }],
            },
            {
              id: 2,
              label: "JavaWeb",
              describe:
                "JavaWeb是整个Web开发的基础课程，本阶段JavaWeb教程旨在用最短的时间掌握最全的JavaWeb核心技术——数据库、前端、web核心，为后期的分布式、微服务打下坚实的基础。",
              targetList: [{ id: 2, name: "JavaWeb 核心编程" }],
            },
            {
              id: 3,
              label: "JavaEE 开发框架",
              describe:
                "本阶段为企业级服务端开发必备技能，可以优化之前web阶段学习内容，使开发网站和企业管理系统更加快捷，更加方便维护。",
              targetList: [
                { id: 3, name: "Maven" },
                { id: 4, name: "Git" },
                { id: 5, name: "SSM" },
                { id: 6, name: "MyBatisPlus" },
                { id: 7, name: "SpringBoot" },
                { id: 8, name: "【医疗行业】传智健康" },
              ],
            },
            {
              id: 4,
              label: "中间件&服务框架",
              describe:
                "本阶段汇集了当下热门的微服务框架，学完后可增加中级程序员的知识储备，为面试或将来技术的深入奠定良好的基础。",
              targetList: [
                { id: 9, name: "微服务框架SpringCloud" },
                { id: 10, name: "Dubbo" },
                { id: 11, name: "Zookeeper" },
                { id: 12, name: "RabbitMQ" },
                { id: 13, name: "RocketMQ" },
                { id: 14, name: "容器化Docker" },
                { id: 15, name: "Redis" },
                { id: 16, name: "MongoDB" },
                { id: 17, name: "搜索技术" },
              ],
            },
            {
              id: 5,
              label: "企业级项目实战",
              describe:
                "“项目经验”是企业了解人才能力的关键因素，为了更快更好地进入企业，就要选择真实、可靠、紧跟企业需要的项目课，沉浸不同阶段和规模的项目实战。在项目中，类似权限管理、短信这类功能，其整体实现思路基本一致，如果有一套通用的解决方案可以复用，就能有效减少资源的重复，缩短开发周期，减少出错率。",
              targetList: [
                { id: 18, name: "企业服务 SaaSiHRM" },
                { id: 19, name: "生活服务 好客租房" },
                { id: 20, name: "金融行业 万信金融" },
                { id: 21, name: "支付工具 聚合支付" },
                { id: 22, name: "【通用领域】权限管理一体化解决方案" },
                { id: 23, name: "【通用领域】短信网关平台" },
              ],
            },
            {
              id: 6,
              label: "面试专题课",
              describe:
                "以100+企业大厂真实高频Java面试真题为主干，轻松应对大厂面试",
              targetList: [{ id: 24, name: "Java大厂面试专题" }],
            },
          ];
          break;
        case 2:
          this.subStage = [
            {
              id: 7,
              label: "基础入门",
              describe:
                "为零基础学员量身定制，教你搭建PC端和移动端静态页面，让你从小白升级成网页“化妆师”，轻松掌握 HTML5 和 CSS3 相关知识。",
              targetList: [
                { id: 25, name: "HTML+CSS" },
                { id: 26, name: "移动web布局" },
              ],
            },
            {
              id: 8,
              label: "技术进阶",
              describe:
                "让网页“动”起来，带你学会前端工程师核心语言——JavaScript，实现网页数据交互与动画效果，并实现与后端数据的联通。",
              targetList: [
                { id: 27, name: "JavaScript" },
                { id: 28, name: "Web APIs" },
                { id: 29, name: "数据交互&异步编程" },
              ],
            },
            {
              id: 9,
              label: "Vue 开发",
              describe:
                "掌握多行业解决方案，项目开发拿来即用，帮你搞定前端工程师必备热门框架Vue.js。",
              targetList: [
                { id: 30, name: "Node.js" },
                { id: 31, name: "Vue2+Vue3" },
              ],
            },
            {
              id: 10,
              label: "React&小程序开发",
              describe:
                "React帮你解锁中高级前端工程师能力地图，多端项目让你满足90%+企业需求。",
              targetList: [
                { id: 32, name: "React核心技术" },
                { id: 33, name: "TypeScript开发" },
                { id: 34, name: "小程序" },
              ],
            },
          ];
          break;
        case 3:
          this.subStage = [
            {
              id: 11,
              label: "大数据开发入门",
              describe:
                "从传统关系型数据库入手，掌握数据迁移工具、BI数据可视化工具、SQL，对后续学习打下坚实基础。",
              targetList: [{ id: 35, name: "MySQL" }],
            },
            {
              id: 12,
              label: "大数据核心基础",
              describe:
                "学习Linux、Hadoop、Hive，掌握大数据基础技术，满足大数据开发行业的初级需求，可以从事ETL及Hive数仓工程师。",
              targetList: [{ id: 36, name: "Hadoop" }],
            },
            {
              id: 13,
              label: "千亿级数仓技术",
              describe:
                "本阶段课程以真实项目为驱动，学习离线数仓技术，学员可轻松应对高级数仓工程师、中级大数据工程师的岗位。",
              targetList: [{ id: 37, name: "Hive数仓项目" }],
            },
            {
              id: 14,
              label: "PB级内存计算",
              describe:
                "Spark官方已经在自己首页中将Python作为第一语言，在3.2版本的更新中，高亮提示内置捆绑Pandas；课程完全顺应技术社区和招聘岗位需求的趋势，全网首家加入Python on Spark的内容；你将胜任Spark开发工程师、中级大数据工程师。",
              targetList: [
                { id: 38, name: "Python" },
                { id: 39, name: "Spark" },
              ],
            },
          ];
          break;
        case 4:
          this.subStage = [
            {
              id: 15,
              label: "人工智能开发入门",
              describe:
                "从人工智能Python语言入手，掌握Python基础语法，对后续学习打下坚实基础。",
              targetList: [{ id: 40, name: "Python" }],
            },
            {
              id: 16,
              label: "机器学习核心技术",
              describe:
                "掌握核心机器学习算法原理，掌握分类、回归、聚类使用场景，满足人工智能数据挖掘类岗位，薪资可达到15K-20K。",
              targetList: [{ id: 41, name: "Python机器学习" }],
            },
            {
              id: 17,
              label: "NLP自然语言处理技术",
              describe:
                "本阶段课程将掌握突破市场最热超高年薪的NLP技术，学生可应对市场上NLP工程师，根据市场反馈薪资突破30K。",
              targetList: [{ id: 42, name: "NLP" }],
            },
            {
              id: 18,
              label: "CV计算机视觉技术",
              describe:
                "掌握计算机视觉基础算法原理，掌握目标检测、分类、跟踪等各类CV任务，学生可应对市场上CV工程师岗位，薪资可达20K以上。",
              targetList: [
                { id: 43, name: "AI-OpenCV" },
                { id: 44, name: "Python深度学习" },
                { id: 45, name: "CV深度学习" },
              ],
            },
          ];
          break;
        case 5:
          this.subStage = [
            {
              id: 19,
              label: "小白设计入门",
              describe:
                "万事开头难，但学习设计并不难，本套【小白设计入门基础课程】，对于从事平面设计/电商设计/UI设计有指导意义，帮助学员打开进入设计行业的大门。",
              targetList: [
                { id: 46, name: "Photoshop" },
                { id: 47, name: "Adobe illustrator" },
              ],
            },
            {
              id: 20,
              label: "品牌视觉设计",
              describe:
                "平面设计是沟通传播、风格化和通过文字和图像解决问题的艺术。本阶段课程包括标识（商标和品牌）、出版物（杂志，报纸和书籍）、平面广告，海报，广告牌，网站图形元素、标志和产品包装等。帮助学员提高视觉设计的能力，加强平面类设计工作流程及各种规范的了解，以及掌握分析项目及独立设计能力的培养。",
              targetList: [{ id: 48, name: "平面设计" }],
            },
            {
              id: 21,
              label: "视觉运营设计",
              describe:
                "本课程将全面地学习电商设计师需具备的电商设计基础理论与实战技巧，让想要学习电商设计的学员能够通过本课程得到系统的学习与提升。 熟练掌握和学习后，可直接进入企业及外包公司从事电商设计师/视觉设计师/运营设计师等岗位。",
              targetList: [{ id: 49, name: "C4D" }],
            },
            {
              id: 22,
              label: "UI/UE设计",
              describe:
                "本阶段课程理论与实战相结合，项目涵盖图标设计、APP设计、H5营销页设计、网页设计、数据可视化设计。为你全面讲解设计规范、技巧、流程，非常实用！让你从完全不懂UI设计到清楚如何进行UI设计，帮你扫频UI设计的障碍。",
              targetList: [{ id: 50, name: "Figma" }],
            },
          ];
          break;
        case 6:
          this.subStage = [
            {
              id: 23,
              label: "功能测试",
              describe:
                "学习本阶段内容，可全流程功能测试解决方案、Web自动化测试解决方案、数据分离解决方案、自动化测试报告解决方案、日志收集解决方案",
              targetList: [
                { id: 51, name: "软件测试入门" },
                { id: 52, name: "Linux系统" },
                { id: 53, name: "MySQL数据库+项目实战" },
              ],
            },
            {
              id: 24,
              label: "Python编程",
              describe:
                "学习本阶段内容，可掌握Python语法, 具备编程能力； 能建立编程思维以及面向对象程序设计思想； 能掌握UnitTest框架管理测试用例。",
              targetList: [{ id: 54, name: "Python软件测试" }],
            },
            {
              id: 25,
              label: "UI自动化",
              describe:
                "ui自动化大体分为web自动化和app自动化，在自动化测试领域中占比很大，经常使用。",
              targetList: [
                { id: 55, name: "web自动化测试" },
                { id: 56, name: "Appium自动化测试" },
                { id: 57, name: "Appium自动化测试IOS" },
              ],
            },
            {
              id: 26,
              label: "接口自动化",
              describe: "接口测试是所有自动化测试中应用频率最高部分",
              targetList: [{ id: 58, name: "接口测试" }],
            },
            {
              id: 27,
              label: "性能测试",
              describe:
                "性能测试属于高级测试范畴，对于薪资的提升帮助很大，本阶段视频讲解性能测试环境搭建，JMeter工具的使用，性能测试监控、分析和调优方法",
              targetList: [{ id: 59, name: "性能测试快速入门" }],
            },
            {
              id: 28,
              label: "综合项目强化",
              describe:
                "通过微信小程序、金融项目两个实战项目综合强化功能测试、接口测试、性能测试。",
              targetList: [{ id: 60, name: "项目测试" }],
            },
          ];
          break;
        default:
          // 清空课程阶段
          this.subStage = [];
      }
    },
    // 获取课程标题
    getSubMenus() {
      this.subMenus = [
        { id: 1, name: "JavaEE" },
        { id: 2, name: "HTML&JS+前端" },
        { id: 3, name: "Python+大数据开发" },
        { id: 4, name: "人工智能开发" },
        { id: 5, name: "UI/UE设计" },
        { id: 6, name: "软件测试" },
      ];

      this.subValue = this.subMenus[0].id;
    },
  },
};
</script>

<style scoped></style>
