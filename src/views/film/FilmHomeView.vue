<template>
  <div>
    <!-- 轮播图部分 -->
    <v-container fluid class="px-0 pt-0" style="position: relative">
      <v-carousel
        v-model="carousel.value"
        height="450"
        cycle
        hide-delimiters
        interval="3500"
      >
        <v-carousel-item
          v-for="carousel in carousel.carouselList"
          :key="carousel.id"
          :value="carousel.id"
          :src="carousel.picture"
          :to="carousel.to"
        >
        </v-carousel-item>
      </v-carousel>
      <!-- 轮播省略图  {幻灯片组} -->
      <v-slide-group
        style="position: absolute; left: 500px; bottom: 0px"
        v-model="carousel.value"
        class="pa-4"
        show-arrows
      >
        <v-slide-item
          v-for="carousel in carousel.carouselList"
          :key="carousel.id"
          :value="carousel.id"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            :class="{ mask: !active }"
            class="ma-4"
            height="60"
            width="100"
            :to="carousel.to"
            @click="toggle"
          >
            <v-img :src="carousel.picture" height="100%"></v-img>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>
    <!-- 搜索、筛选、影音列表、分页、 -->
    <v-container fluid class="d-flex justify-center">
      <v-card width="980" flat>
        <!-- 搜索容器 -->
        <v-container style="width: 470px">
          <v-menu offset-y allow-overflow>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                rounded
                dense
                v-model="searchValue"
                hide-details
                v-bind="attrs"
                v-on="on"
                placeholder="精彩世界一起探索"
                outlined
              >
                <template #append-outer>
                  <v-btn
                    small
                    fab
                    color="info"
                    class="mt-n2"
                    @click="sendHotData"
                  >
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </template>
            <v-card>
              <v-subheader>热门搜索</v-subheader>
              <v-list dense class="pt-0">
                <v-list-item
                  color="info"
                  v-for="item in hotSearch"
                  :key="item.id"
                  @click="searchFilmByHotSearch(item)"
                >
                  <v-list-item-icon class="mr-2"
                    ><v-icon color="error"
                      >mdi-numeric-{{ item.id }}-box</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-caption">{{
                      item.title
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list></v-card
            >
          </v-menu>
        </v-container>
        <!-- 筛选容器 -->
        <v-container fluid class="elevation-8 rounded-lg">
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <th width="70">分类</th>
                  <td>
                    <v-chip-group active-class="info" v-model="classify.value">
                      <v-chip
                        small
                        color="transparent"
                        v-for="item in classify.list"
                        :key="item.id"
                        :value="item.id"
                        >{{ item.name }}</v-chip
                      >
                    </v-chip-group>
                  </td>
                </tr>
                <tr>
                  <th>分类</th>
                  <td>
                    <v-chip-group
                      active-class="info"
                      v-model="genre.value"
                      column
                    >
                      <v-chip small color="transparent">全部</v-chip>
                      <v-chip
                        small
                        color="transparent"
                        v-for="item in genre.list"
                        :key="item.id"
                        :value="item.id"
                        >{{ item.name }}</v-chip
                      >
                    </v-chip-group>
                  </td>
                </tr>
                <tr>
                  <th>地区</th>
                  <td>
                    <v-chip-group
                      active-class="info"
                      v-model="area.value"
                      column
                    >
                      <v-chip small color="transparent">全部</v-chip>
                      <v-chip
                        small
                        color="transparent"
                        v-for="item in area.list"
                        :key="item.id"
                        :value="item.id"
                        >{{ item.name }}</v-chip
                      >
                    </v-chip-group>
                  </td>
                </tr>
                <tr>
                  <th>时间</th>
                  <td>
                    <v-chip-group
                      active-class="info"
                      v-model="releaseTime.value"
                      column
                    >
                      <v-chip small color="transparent">全部</v-chip>
                      <v-chip
                        small
                        color="transparent"
                        v-for="item in releaseTime.list"
                        :key="item.id"
                        :value="item.id"
                        >{{ item.name }}</v-chip
                      >
                    </v-chip-group>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
        <!-- 视频卡片列表 -->
        <v-container fluid>
          <h3 class="pa-3">影音列表</h3>

          <template>
            <div
              v-for="film in films.list"
              :key="film.id"
              class="d-inline-block mr-3 mb-5"
            >
              <v-hover v-slot="{ hover }">
                <film-card
                  :class="hover ? 'elevation-6' : 'elevation-0'"
                  :id="film.id"
                  :title="film.title"
                  :sub-title="film.subtitle"
                  :cover="film.pic"
                >
                  <template #topLabel>
                    <v-chip
                      small
                      class="rounded-r-0"
                      :color="labelColor(film.topLabel)"
                    >
                      {{ film.topLabel }}</v-chip
                    >
                  </template>
                  <template #bottomLabel v-if="film.bottomLabel">
                    <v-chip
                      dark
                      small
                      class="rounded-0"
                      color="rgba(0,0,0,0.3)"
                    >
                      {{ film.bottomLabel }}</v-chip
                    >
                  </template>
                </film-card>
              </v-hover>
            </div>
          </template>
        </v-container>
        <!-- 分页器 -->
        <v-container fluid v-show="films.total > 1">
          <v-pagination
            v-model="films.page"
            :length="films.total"
            total-visible="7"
          >
          </v-pagination>
        </v-container>
      </v-card>
      <v-card width="234" class="ml-18" flat>
        <!-- 分割符 -->
        <v-container class="d-flex align-center py-0">
          <v-divider></v-divider>
          <v-subheader class="text-caption">追剧中</v-subheader>
          <v-divider></v-divider>
        </v-container>
        <template>
          <div v-for="film in chasingDrama" :key="film.id" class="mb-3">
            <v-hover v-slot="{ hover }">
              <film-card
                :class="hover ? 'elevation-6' : 'elevation-0'"
                height="117"
                :id="film.id"
                :title="film.title"
                :sub-title="film.subtitle"
                :cover="film.pic"
              >
                <template #topLabel>
                  <v-chip
                    small
                    class="rounded-r-0"
                    :color="labelColor(film.topLabel)"
                  >
                    {{ film.topLabel }}</v-chip
                  >
                </template>
                <template #bottomLabel v-if="film.bottomLabel">
                  <v-chip dark small class="rounded-0" color="rgba(0,0,0,0.3)">
                    {{ film.bottomLabel }}</v-chip
                  >
                </template>
              </film-card>
            </v-hover>
          </div>
        </template>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FilmCard from "../../components/film/FilmCard.vue";
import { labelColor } from "@/utils/label.js";
export default {
  name: "FilmHomeView",
  components: {
    FilmCard,
  },
  data() {
    return {
      carousel: {
        value: null,
        carouselList: [],
      },
      // 点击当前list的每一项，将当前项的title的值赋值输入框
      searchValue: null,
      // 热门数据原
      hotSearch: [],
      // 分类的数据
      classify: {
        value: null,
        list: [],
      },
      // 类型
      genre: {
        value: null,
        list: [], //分类集合
      },
      // 地区
      area: {
        value: null,
        list: [],
      },
      // 上映时间
      releaseTime: {
        value: null,
        list: [],
      },
      // 影音列表
      films: {
        page: null,
        total: null,
        list: [],
      },
      // 追剧列表
      chasingDrama: [],
    };
  },
  methods: {
    // 获取追加列表
    getChasingDrama() {
      this.chasingDrama = [
        {
          id: 1,
          title: "继承者们",
          subtitle: "高富帅遇灰姑娘擦爱火",
          topLabel: "首播",
          bottomLabel: "播放到第 24 集",
          pic: "https://m.ykimg.com/05830000629425FF2037DD08EFD0E016?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
        {
          id: 2,
          title: "寒武纪",
          topLabel: "VIP",
          bottomLabel: "播放到第 2 集",
          subtitle: "侯明昊贺军翔倾情出演",
          pic: "https://m.ykimg.com/0583000058F5D08AADBA1FA0880E133D?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
        {
          id: 3,
          title: "水怪2：黑木林",
          topLabel: "",
          bottomLabel: "播放到 28:55",
          subtitle: "民间传说水猴子惊悚来袭",
          pic: "https://liangcang-material.alicdn.com/prod/upload/8eb79232bfa248f0b12f4402c3d1a180.jpg?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
      ];
    },
    labelColor,
    // 获取影音列表
    getFilms() {
      this.films.list = [
        {
          id: 1,
          title: "长津湖",
          subtitle: "抗美援朝经典之战",
          topLabel: "9.6",
          bottomLabel: "",
          pic: "https://m.ykimg.com/0584000061A868231FD852098F9700D0?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
        {
          id: 2,

          title: "门锁",

          subtitle: "白百何诠释独居女",

          topLabel: "8.6",

          bottomLabel: "",

          pic: "https://m.ykimg.com/0584000061C567B913F7FF09582A36A3?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
        {
          id: 3,

          title: "铁道英雄",

          subtitle: "铁道英雄热血抗战",

          topLabel: "7.6",

          bottomLabel: "",

          pic: "https://m.ykimg.com/0584000061D00101202742096F393ABB?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
        {
          id: 4,

          title: "再战江湖",

          subtitle: "陈小春肉搏黑帮",

          topLabel: "8.9",

          bottomLabel: "",

          pic: "https://m.ykimg.com/0527000061BC409520274208DAE3909E?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
        {
          id: 5,

          title: "扫毒2天地对决",

          subtitle: "华仔古仔双雄争锋",

          topLabel: "9.2",

          bottomLabel: "",

          pic: "https://m.ykimg.com/058400005F1EBF374265930D3F704B41?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
        {
          id: 6,

          title: "二龙湖往事：惊魂夜",

          subtitle: "东北农村离奇诡事",

          topLabel: "8.4",

          bottomLabel: "",

          pic: "https://m.ykimg.com/0527000061B0646D13F7FF0951E5C6AD?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
        {
          id: 7,

          title: "1950他们正年轻",

          subtitle: "致敬抗美援朝英雄",

          topLabel: "7.7",

          bottomLabel: "",

          pic: "https://m.ykimg.com/0584000061C564C313EB660A46DB5B33?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
        {
          id: 8,

          title: "反贪风暴4",

          subtitle: "古仔闯牢狠打虎",

          topLabel: "5.6",

          bottomLabel: "",

          pic: "https://m.ykimg.com/058400006047253913EA350855339545?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
        {
          id: 9,

          title: "请叫我总监",

          subtitle: "职场邂逅欢乐甜怼",

          topLabel: "7.9",

          bottomLabel: "32 集全",

          pic: "https://m.ykimg.com/05840000616FACD013F7FF098083A771?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
        {
          id: 10,

          title: "良辰好景知几何",

          subtitle: "将军爱上清冷才女",

          topLabel: "8.9",

          bottomLabel: "",

          pic: "https://m.ykimg.com/05840000626514521FD85209207E984E?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
        {
          id: 11,

          title: "怦然心动20岁 第二季",

          subtitle: "毕业之旅甜蜜回归",

          topLabel: "9.6",

          bottomLabel: "更新至06-05期",

          pic: "https://m.ykimg.com/0584000062980D9713EB660937D7BF75?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
        {
          id: 12,

          title: "了不起！舞社",

          subtitle: "毕业之旅甜蜜回归",

          topLabel: "9.0",

          bottomLabel: "更新至06-12期",

          pic: "https://m.ykimg.com/058400006258C3D913EB66114B215112?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80",
        },
      ];
      this.films.page = 2;
      this.films.total = 20;
    },
    // 获取影音发送时间
    getReleaseTime() {
      this.releaseTime.list = [
        { id: 1, name: "2022" },
        { id: 2, name: "2021" },
        { id: 3, name: "2020" },
        { id: 4, name: "2019" },
        { id: 5, name: "2018" },
        { id: 6, name: "2017" },
        { id: 7, name: "2016" },
        { id: 8, name: "2015" },
        { id: 9, name: "2014" },
        { id: 10, name: "2013" },
        { id: 11, name: "2012" },
        { id: 12, name: "2011" },
        { id: 13, name: "2010" },
        { id: 14, name: "00年代" },
        { id: 15, name: "90年代" },
        { id: 16, name: "80年代" },
        { id: 17, name: "70年代" },
      ];
    },
    // 获取地区的数据
    getFilmAreas(classifyValue) {
      switch (classifyValue) {
        case 1:
          this.area.list = [
            { id: 1, name: "内地" },
            { id: 2, name: "中国香港" },
            { id: 3, name: "中国台湾" },
            { id: 4, name: "韩国" },
            { id: 5, name: "美国" },
            { id: 6, name: "日本" },
            { id: 7, name: "英国" },
            { id: 8, name: "泰国" },
          ];
          break;
        case 2:
          this.area.list = [
            { id: 1, name: "内地" },
            { id: 2, name: "中国香港" },
            { id: 3, name: "中国台湾" },
            { id: 4, name: "韩国" },
            { id: 5, name: "美国" },
            { id: 6, name: "日本" },
            { id: 7, name: "英国" },
            { id: 8, name: "泰国" },
            { id: 9, name: "法国" },
            { id: 10, name: "俄罗斯" },
            { id: 11, name: "意大利" },
            { id: 12, name: "德国" },
            { id: 13, name: "加拿大" },
          ];
          break;
        case 3:
          this.area.list = [
            { id: 1, name: "内地" },
            { id: 3, name: "中国台湾" },
            { id: 4, name: "韩国" },
            { id: 5, name: "美国" },
            { id: 7, name: "英国" },
          ];
          break;
        case 4:
          this.area.list = [
            { id: 1, name: "内地" },
            { id: 6, name: "日本" },
            { id: 5, name: "美国" },
            { id: 3, name: "中国台湾" },
            { id: 2, name: "中国香港" },
            { id: 4, name: "韩国" },
            { id: 7, name: "英国" },
            { id: 9, name: "法国" },
          ];
          break;
        case 5:
          this.area.list = [
            { id: 1, name: "内地" },
            { id: 2, name: "中国香港" },
            { id: 3, name: "中国台湾" },
            { id: 4, name: "韩国" },
            { id: 5, name: "美国" },
            { id: 6, name: "日本" },
            { id: 7, name: "英国" },
            { id: 10, name: "俄罗斯" },
            { id: 12, name: "德国" },
            { id: 13, name: "加拿大" },
            { id: 14, name: "澳大利亚" },
            { id: 15, name: "瑞士" },
            { id: 16, name: "西班牙" },
            { id: 17, name: "丹麦" },
            { id: 18, name: "墨西哥" },
            { id: 19, name: "新加波" },
            { id: 20, name: "印度" },
            { id: 21, name: "以色列" },
          ];
          break;
      }
    },
    // 获取类型的数据
    getFilmGenre(classifyValue) {
      switch (classifyValue) {
        case 1:
          this.genre.list = [
            { id: 1, name: "青春" },

            { id: 2, name: "爱情" },

            { id: 3, name: "谍战" },

            { id: 4, name: "冒险" },

            { id: 5, name: "穿越" },

            { id: 6, name: "仙侠" },

            { id: 7, name: "罪案" },

            { id: 8, name: "年代" },

            { id: 9, name: "古装" },

            { id: 10, name: "武侠" },

            { id: 11, name: "警匪" },

            { id: 12, name: "战争" },

            { id: 13, name: "军旅" },

            { id: 14, name: "神话" },

            { id: 15, name: "科幻" },

            { id: 16, name: "悬疑" },

            { id: 17, name: "历史" },

            { id: 18, name: "儿童" },

            { id: 19, name: "农村" },

            { id: 20, name: "都市" },

            { id: 21, name: "家庭" },

            { id: 22, name: "喜剧" },

            { id: 23, name: "偶像" },

            { id: 24, name: "时装" },
          ];

          break;
        case 2:
          this.genre.list = [
            { id: 2, name: "爱情" },

            { id: 4, name: "冒险" },

            { id: 10, name: "武侠" },

            { id: 11, name: "警匪" },

            { id: 12, name: "战争" },

            { id: 14, name: "神话" },

            { id: 15, name: "科幻" },

            { id: 16, name: "悬疑" },

            { id: 17, name: "历史" },

            { id: 18, name: "儿童" },

            { id: 25, name: "犯罪" },

            { id: 26, name: "恐怖" },

            { id: 27, name: "惊悚" },

            { id: 28, name: "戏曲" },

            { id: 29, name: "冒险" },

            { id: 30, name: "剧情" },

            { id: 31, name: "运动" },
          ];

          break;
        case 3:
          this.genre.list = [
            { id: 1, name: "相声" },

            { id: 22, name: "喜剧" },

            { id: 32, name: "音乐" },

            { id: 33, name: "舞蹈" },

            { id: 23, name: "偶像" },

            { id: 34, name: "情感" },

            { id: 35, name: "婚恋" },

            { id: 36, name: "体育" },

            { id: 37, name: "明星访谈" },

            { id: 38, name: "旅游" },

            { id: 39, name: "文化" },

            { id: 40, name: "时尚" },

            { id: 41, name: "美食" },

            { id: 42, name: "生活" },

            { id: 43, name: "益智" },

            { id: 44, name: "晚会" },

            { id: 45, name: "游戏" },

            { id: 46, name: "亲子" },
          ];

          break;
        case 4:
          this.genre.list = [
            { id: 47, name: "热血" },

            { id: 48, name: "格斗" },

            { id: 49, name: "恋爱" },

            { id: 50, name: "美少女" },

            { id: 51, name: "校园" },

            { id: 52, name: "搞笑" },

            { id: 53, name: "神魔" },

            { id: 54, name: "机战" },

            { id: 15, name: "科幻" },

            { id: 55, name: "真人" },
          ];

          break;
        case 5:
          this.genre.list = [
            { id: 41, name: "美食" },

            { id: 56, name: "人物" },

            { id: 57, name: "军事" },

            { id: 17, name: "历史" },

            { id: 58, name: "自然" },

            { id: 59, name: "探险" },

            { id: 60, name: "科技" },

            { id: 39, name: "文化" },

            { id: 61, name: "刑侦" },

            { id: 62, name: "社会" },

            { id: 38, name: "旅游" },
          ];

          break;
      }
    },
    // 获取分类的数据
    getFilmClassify() {
      this.classify.list = [
        { id: 1, name: "电视剧" },
        { id: 2, name: "电影" },
        { id: 3, name: "综艺" },
        { id: 4, name: "动漫" },
        { id: 5, name: "纪录片" },
      ];
      // 让数组中的第一项上来就被选中
      this.classify.value = this.classify.list[0].id;
    },
    // 获取轮播图的数据
    getCarouselList() {
      this.carousel.carouselList = [
        {
          id: 1,

          picture:
            "https://liangcang-material.alicdn.com/prod/upload/c32d6f8e20fb4270a120efa8b074f189.jpg?x-oss-process=image/resize,w_2074/interlace,1/quality,Q_80",

          to: "",
        },
        {
          id: 2,

          picture:
            "https://liangcang-material.alicdn.com/prod/upload/810308e3087342f0a1c89700b842399a.webp.jpg?x-oss-process=image/resize,w_2074/interlace,1/quality,Q_80",

          to: "",
        },
        {
          id: 3,

          picture:
            "https://liangcang-material.alicdn.com/prod/upload/9045dd09b30a4d4e8eded62a01658c11.jpg?x-oss-process=image/resize,w_2074/interlace,1/quality,Q_80",

          to: "",
        },
        {
          id: 4,
          picture:
            "https://liangcang-material.alicdn.com/prod/upload/d270a00903c34ae29c07910884b9f048.jpg?x-oss-process=image/resize,w_2074/interlace,1/quality,Q_80",
          to: "",
        },
      ];
    },
    // 获取热门搜索的数据原
    getHotSearch() {
      this.hotSearch = [
        { id: 1, title: "法医秦明" },
        { id: 2, title: "长津湖" },
        { id: 3, title: "门锁" },
        { id: 4, title: "流浪地球" },
        { id: 5, title: "阿凡达" },
        { id: 6, title: "速度与激情" },
        { id: 7, title: "反贪风暴" },
        { id: 8, title: "乘风破浪的姐姐" },
        { id: 9, title: "知否知否应是绿肥红瘦" },
        { id: 10, title: "扫毒" },
      ];
    },
    // 从热门搜索影音中获取搜索框显示的值
    searchFilmByHotSearch(film) {
      // 将film的title赋值给searchValue
      this.searchValue = film.title;
      // 点击按钮向服务器获取数据
    },
    // 点击按钮发送请求跳转页面
    sendHotData() {
      this.searchValue = "";
    },
  },
  watch: {
    "classify.value"(newData) {
      // 只要上面的分类改变则其他的要变为全部
      this.genre.value = 0;
      // 动态获取类型
      this.getFilmGenre(newData);
      // 只要上面的分类改变则其他的要变为全部
      this.area.value = 0;
      // 动态获取类型
      this.getFilmAreas(newData);
      // 让上映时间全部上来就选中
      this.releaseTime.value = 0;
    },
  },
  mounted() {
    this.getCarouselList();
    this.getHotSearch();
    this.getFilmClassify();
    this.getReleaseTime();
    this.getFilms();
    this.getChasingDrama();
  },
};
</script>
<style scoped lang="less">
.mask:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
