<template>
  <v-main class="pt-0">
    <!-- 视差背景图 -->
    <v-parallax :src="homeBackPic" height="600">
      <div class="text-center">
        <h1 class="text-h2 font-weight-black mb-6">知否</h1>
        <p>为您打造全方位的影音、博客、教学、考证网站</p>
      </div>
    </v-parallax>
    <!-- 标题介绍 -->
    <v-container>
      <div class="text-center">
        <h1 class="text-h4 font-weight-black mb-2">共享盛宴</h1>
        <p class="mb-0">知否为您打造全方位的影音、博客、教学、考证盛宴</p>
      </div>
    </v-container>
    <v-container fluid class="d-flex justify-center">
      <v-card
        hover
        width="280"
        v-for="card in homeCards"
        :key="card.id"
        :to="card.href"
        :class="{ 'ml-3': card.id - 1 !== 0 }"
      >
        <v-card-title class="font-weight-bold">{{ card.name }}</v-card-title>
        <v-card-subtitle>{{ card.desc }}</v-card-subtitle>
        <v-card-text>
          <v-chip
            small
            color="transparent"
            label
            v-for="label in card.labels"
            >{{ label }}</v-chip
          >
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    homeBackPic: "", //首页背景图
    homeCards: [], //主页卡片信息
  }),
  created() {
    // 获取首页背景图
    this.getHomeBackPic();
    // 获取卡片信息
    this.getHomeCards();
  },
  methods: {
    // 获取主页卡片信息
    getHomeCards() {
      this.homeCards = [
        {
          id: 1,
          name: "博客",
          desc: "百万博主分享经验",
          href: "/blog",
          labels: [
            "Java",
            "Python",
            "Hadoop",
            "Liunx",
            "C++",
            "Unity",
            "UI 设计",
            "Android",
            "IOS",
            "HarmonyOs",
          ],
        },
        {
          id: 2,
          name: "学堂",
          desc: "百万教学视频畅游知识海洋",
          href: "/school",
          labels: [
            "VueJs",
            "前端",
            "后台",
            "大数据",
            "影视后期",
            "游戏开发",
            "人工智能",
            "物联网",
            "游戏建模",
            "应用开发",
          ],
        },
        {
          id: 3,
          name: "视频",
          desc: "百万影视视频畅享盛会",
          href: "/film",
          labels: [
            "电视剧",
            "电影",
            "纪录片",
            "少儿",
            "动漫",
            "短视频",
            "综艺",
            "港剧",
            "台剧",
            "韩剧",
            "恐怖片",
            "好莱坞",
          ],
        },
        {
          id: 4,
          name: "考证",
          desc: "千款认证考试线上测试",
          href: "/exam",
          labels: [
            "模拟考",
            "刷题",
            "期末考",
            "课堂考",
            "甲骨文认证",
            "华为认证",
            "三星认证",
            "TCL认证",
            "微软认证",
          ],
        },
      ];
    },
    // 获取首页背景图
    getHomeBackPic() {
      this.homeBackPic =
        "https://pic3.zhimg.com/v2-fbb002ec83393f1b87a55cfb69c864db_r.jpg";
    },
  },
};
</script>
