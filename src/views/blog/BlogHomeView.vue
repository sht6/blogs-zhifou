<template>
  <!--  -->
  <v-container fluid class="d-flex justify-center">
    <v-card flat width="720">
      <!-- 博客的分类 -->
      <v-container fluid>
        <v-chip-group
          active-class="info"
          v-model="optionMenus.value"
          show-arrows
          center-active
        >
          <v-chip
            small
            label
            color="#EEEEEE"
            :value="option.id"
            v-for="option in optionMenus.options"
            :key="option.id"
            @mouseenter="showFullOptionsMenus(option.id, $event)"
            @click="optionMenus.fullOptionsMenus.value = null"
            >{{ option.name }}
          </v-chip>
        </v-chip-group>
      </v-container>
      <v-divider></v-divider>
      <v-container fluid>
        <v-chip-group v-model="sort" active-class="info" multiple>
          <v-chip outlined small label value="new">最新发布</v-chip>
          <v-chip outlined small label value="like">点赞最多</v-chip>
          <v-chip outlined small label value="eye">浏览最多</v-chip>
        </v-chip-group>
      </v-container>
      <!-- 博客人物简介卡片 -->
      <v-container fluid class="pt-0">
        <template>
          <div
            v-for="blog in showBlogs.blogCardList"
            :key="blog.id"
            :class="{ 'mt-3': blog.id - 1 !== 0 }"
          >
            <v-hover v-slot="{ hover }">
              <blog-card
                :class="hover ? 'elevation-14' : 'elevation-4'"
                :id="blog.id"
                :title="blog.title"
                :desc="blog.introduction"
                :cover="blog.cover"
                :time="blog.time"
                :eye="blog.eye"
                :comment="blog.comment"
                :like="blog.like"
                :nickName="blog.author.nickname"
                :headPic="blog.author.headPic"
                :to="blog.to"
              ></blog-card>
            </v-hover>
          </div>
        </template>
      </v-container>
      <!-- 分页器 -->
      <v-container fluid>
        <v-pagination
          v-show="showBlogs.total > 1"
          v-model="showBlogs.page"
          :length="showBlogs.total"
          total-visible="7"
        >
        </v-pagination>
      </v-container>
    </v-card>
    <v-card flat width="280" class="ml-8">
      <v-container fluid>
        <v-text-field
          dense
          outlined
          hide-details
          append-icon="mdi-magnify"
          @click:append="getBlogCardList"
          placeholder="搜索博客"
        >
        </v-text-field>
      </v-container>
      <v-container fluid>
        <blog-list-box title="热门博客">
          <template #actionBtn>
            <v-btn icon small text plain>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <template #listContent>
            <v-list dense>
              <v-list-item-group>
                <v-list-item
                  color="info"
                  class="px-1"
                  v-for="item in hotBlogs"
                  :key="item.id"
                  :to="'/blog-content/' + item.id"
                >
                  <v-list-item-icon class="mr-2"
                    ><v-icon color="error"
                      >mdi-numeric-{{ item.id }}-box</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-caption">{{
                      item.text
                    }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text>
                      {{ item.read | numFormat }}
                    </v-list-item-action-text>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </template>
        </blog-list-box>
        <!-- 推荐博主 -->
        <blog-list-box title="推荐博主">
          <template #actionBtn>
            <v-btn icon small text plain>
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </template>
          <template #listContent>
            <v-list dense>
              <v-list-item-group>
                <v-list-item
                  color="info"
                  class="px-1 mb-4"
                  v-for="item in recAuthor"
                  :key="item.id"
                >
                  <v-list-item-avatar>
                    <v-img :src="item.headPic"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">{{
                      item.nickname
                    }}</v-list-item-title>
                    <v-list-item-subtitle class="text-caption">{{
                      item.signature
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <!-- 悬浮的关注按钮 -->
                  <v-btn
                    color="success"
                    fab
                    width="20"
                    height="20"
                    absolute
                    style="left: 15px; bottom: 0px"
                  >
                    <v-icon size="18">mdi-plus</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </template>
        </blog-list-box>

        <!-- 热门博客的列表 -->
      </v-container>
    </v-card>
    <!-- 博客分类的详细菜单 -->
    <v-menu
      open-on-hover
      max-width="500"
      :close-on-context-click="false"
      :position-x="optionMenus.fullOptionsMenus.x"
      :position-y="optionMenus.fullOptionsMenus.y"
      v-model="optionMenus.fullOptionsMenus.show"
    >
      <v-card class="px-4">
        <v-chip-group
          column
          active-class="info"
          v-model="optionMenus.fullOptionsMenus.value"
          v-for="(item, index) in optionMenus.options"
          :key="index"
          v-show="optionMenus.fullOptionsMenus.index === index"
        >
          <v-chip
            v-for="item1 in item.options"
            :key="item1.id"
            :value="item1.id"
            small
            label
            color="#EEEEEE"
            >{{ item1.name }}
          </v-chip>
        </v-chip-group>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script>
import BlogCard from "../../components/blog/BlogCard.vue";
import BlogListBox from "../../components/blog/BlogListBox.vue";
export default {
  name: "BlogHomeView",
  components: {
    BlogCard,
    BlogListBox,
  },
  data() {
    return {
      // 博客排序
      sort: null,
      // 博客分类
      optionMenus: {
        value: null, //一级菜单值
        options: [], //选项菜单
        //二级分类菜单
        fullOptionsMenus: {
          index: null, //鼠标悬浮的那个一级菜单的索引
          value: null, //二级菜单值
          show: false, //展示二级分类菜单
          x: 0, //二级菜单距离浏览器的水平向左的位置
          y: 0, //二级菜单距离浏览器的水平向上的位置
        },
      },
      // 博客卡片列表
      showBlogs: {
        page: 1,
        total: null,
        blogCardList: [],
      },
      // 热门博客列表
      hotBlogs: [],
      // 推荐博主
      recAuthor: [],
    };
  },
  created() {
    // 获取博客分类
    this.getOptionsMenus();
    // 获取博客卡片列表
    this.getBlogCardList();
    // 获取热门博客列表
    this.getHotBlog();
    // 获取推荐博主列表
    this.getRecommandAuthorList();
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (this.optionMenus.fullOptionsMenus.show) {
        this.optionMenus.fullOptionsMenus.show = false;
      }
    });
  },
  watch: {
    "optionMenus.fullOptionsMenus.value"(newValue) {
      // 根据二级菜单选中一级菜单
      this.setFirstValueBySecondValue(newValue);
    },
  },
  methods: {
    // 获取博客分类
    getOptionsMenus() {
      this.optionMenus.options = [
        {
          id: 1,

          name: "推荐",

          options: [],
        },
        {
          id: 2,

          name: "教学",

          options: [
            { id: 100, name: "数学" },

            { id: 101, name: "英语" },

            { id: 102, name: "语文" },

            { id: 103, name: "历史" },

            { id: 104, name: "化学" },

            { id: 105, name: "政治" },

            { id: 106, name: "生物" },

            { id: 107, name: "体育" },

            { id: 108, name: "音乐" },
          ],
        },
        {
          id: 3,

          name: "IT",

          options: [
            { id: 109, name: "Java" },

            { id: 110, name: "PHP" },

            { id: 111, name: "C++" },

            { id: 112, name: "Python" },

            { id: 113, name: "Hadoop" },

            { id: 114, name: "Android" },

            { id: 115, name: "HarmonyOS" },

            { id: 116, name: "Vue" },

            { id: 117, name: "HTML" },

            { id: 118, name: "CSS" },
          ],
        },
        {
          id: 4,

          name: "游戏",

          options: [
            { id: 125, name: "LOL" },

            { id: 126, name: "王者荣耀" },

            { id: 127, name: "和平精英" },

            { id: 128, name: "DNF" },

            { id: 129, name: "穿越火线" },

            { id: 130, name: "元神" },
          ],
        },
        {
          id: 5,

          name: "旅游",

          options: [
            { id: 131, name: "骑行" },

            { id: 132, name: "潜水" },

            { id: 133, name: "徒步" },

            { id: 134, name: "登山" },

            { id: 135, name: "国内游" },

            { id: 136, name: "国外游" },

            { id: 137, name: "自驾游" },
          ],
        },
        {
          id: 6,

          name: "时尚",

          options: [
            { id: 138, name: "美妆" },

            { id: 139, name: "护肤" },

            { id: 140, name: "穿搭" },
          ],
        },
        {
          id: 7,

          name: "汽车",

          options: [
            { id: 141, name: "赛车" },

            { id: 142, name: "改装车" },

            { id: 143, name: "新能源车" },

            { id: 144, name: "房车" },

            { id: 145, name: "机车" },

            { id: 146, name: "购车攻略" },
          ],
        },
        {
          id: 8,

          name: "运动",

          options: [
            { id: 147, name: "篮球" },

            { id: 148, name: "足球" },

            { id: 149, name: "网球" },

            { id: 150, name: "健身" },

            { id: 151, name: "滑雪" },

            { id: 152, name: "马拉松" },
          ],
        },
        {
          id: 9,

          name: "舞蹈",

          options: [
            { id: 153, name: "街舞" },

            { id: 154, name: "芭蕾舞" },

            { id: 155, name: "民族舞" },
          ],
        },
        {
          id: 10,

          name: "动物",

          options: [
            { id: 156, name: "犬科动物" },

            { id: 157, name: "猫科动物" },

            { id: 158, name: "爬行动物" },

            { id: 159, name: "两栖动物" },
          ],
        },
        {
          id: 11,

          name: "美食",

          options: [
            { id: 160, name: "热菜" },

            { id: 161, name: "凉菜" },
            { id: 162, name: "汤羹" },
            { id: 163, name: "主食" },
            { id: 164, name: "小吃" },
            { id: 165, name: "西餐" },
            { id: 166, name: "烘焙" },
            { id: 167, name: "饮品" },
            { id: 168, name: "跑酱腌菜" },
          ],
        },
      ];
    },
    // 展示二级菜单分类
    showFullOptionsMenus(index, event) {
      let options = this.optionMenus.options[index - 1].options;
      if (options.length === 0) {
        this.optionMenus.fullOptionsMenus.show = false;
      } else {
        this.optionMenus.fullOptionsMenus.index = index - 1;
        let xy = event.target.getBoundingClientRect(); //获取元素距离浏览器的位置
        this.optionMenus.fullOptionsMenus.x = xy.left;
        this.optionMenus.fullOptionsMenus.y = xy.bottom;
        this.optionMenus.fullOptionsMenus.show = true;
      }
    },
    // 根据二级菜单选中一级菜单 value 二级菜单的值
    setFirstValueBySecondValue(value) {
      this.optionMenus.options.some((item1) => {
        return item1.options.some((item2) => {
          if (item2.id === value) {
            this.optionMenus.value = item1.id;
          }
        });
      });
    },
    // 获取博客卡片列表
    getBlogCardList() {
      this.showBlogs.page = 1;
      this.showBlogs.total = 25;
      this.showBlogs.blogCardList = [
        {
          id: 1,

          title: "小白学前端，希望大佬别嫌弃我这问题太简单不给我说",

          introduction:
            " 刚开始接触前端没有几天，好多地方都不知道什么意思，希望大佬们如果知道的话，在下面评论给我说一下谢谢在uni中这个两个花括号是什么意思 this.$dw.api.getQxglData当中$后面这个值是什么意思呀",

          cover: "https://cdn.vuetifyjs.com/images/john.jpg",

          time: "2021-11-23",

          eye: 16352,

          comment: 4563,

          like: 9875,

          author: {
            nickname: "自古风流",

            headPic: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          },

          to: "",
        },
        {
          id: 2,

          title: "jdbc增删改查操作，封装工具类，实现泛型接口无限套娃",

          introduction:
            "好家伙、转眼就要过年了，这段时间又有师妹通过我实验室师妹要到我的联系方式、让我帮忙给指导大四的项目、要搞一个买卖二手闲置品的商城、既想要 PC web端、又想要小程序，还想要 xx",

          cover: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",

          time: "2021-11-23",

          eye: 17889,

          comment: 24323,

          like: 43249,

          author: {
            nickname: "java李杨勇",

            headPic: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          },

          to: "",
        },
        {
          id: 3,

          title: "Java实现Excel导入和导出，看这一篇就够了(珍藏版)",

          introduction:
            "最近抽了两天时间，把Java实现表格的相关操作进行了封装，本次封装是基于 POI 的二次开发，最终使用只需要调用一个工具类中的方法，就能满足业务中绝大部门的导入和导出需求。",

          cover:
            "https://img2.baidu.com/it/u=2474219441,3739941751&fm=253&fmt=auto&app=138&f=PNG?w=500&h=257",

          time: "2021-12-23",

          eye: 187800,

          comment: 13243,

          like: 64548,

          author: {
            nickname: "zyqok",

            headPic: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          },

          to: "",
        },
        {
          id: 4,

          title:
            "英特尔 Linux Vulkan 驱动程序的首席开发人员离职；JDK 18 功能集被冻结",

          introduction:
            "英特尔 Linux Vulkan 驱动程序的首席开发人员离职；JDK 18 功能集被冻结",

          cover: "https://t7.baidu.com/it/u=1956604245,3662848045&fm=193&f=GIF",

          time: "2021-1-23",

          eye: 52332,

          comment: 26313,

          like: 4554,

          author: {
            nickname: "开源头条",

            headPic: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          },

          to: "",
        },
        {
          id: 5,

          title: "计算机为何可以运行Java代码？",

          introduction: "计算机为何可以运行Java代码？",

          cover: "https://t7.baidu.com/it/u=2529476510,3041785782&fm=193&f=GIF",

          time: "2020-1-23",

          eye: 45353,

          comment: 23789,

          like: 12324,

          author: {
            nickname: "JavaEdge",

            headPic: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          },

          to: "",
        },
      ];
    },
    // 获取热门博客列表
    getHotBlog() {
      this.hotBlogs = [
        { id: 1, text: "考前50分-四六级必考词汇预测", read: 483200 },
        {
          id: 2,
          text: "魔导国东征记－世界守护突破（622～624）三更！•OVERLORD",
          read: 154641,
        },
        {
          id: 3,
          text: "FGO国服《妖精圆桌领域 阿瓦隆･勒･菲 星辰诞生之刻》2.6前篇主线概况攻略",
          read: 120005,
        },
        {
          id: 4,
          text: "1999元的miniLED HDR1000显示器HKC PG271Q简评",
          read: 100058,
        },
        { id: 5, text: "22年四六级翻译预测--共青团", read: 75645 },
        { id: 6, text: "四六级翻译预测--冬奥会", read: 66545 },
        {
          id: 7,
          text: "【兵装榜2】全面推荐泛用兵装，斩击实战检验后",
          read: 56546,
        },
        {
          id: 8,
          text: "为了实现游戏里的二段跳，人类到底能多拼命？",
          read: 46546,
        },
        {
          id: 9,
          text: "2022上半年四级真题--提案，给学校图书馆，学校医院，学生会",
          read: 25646,
        },
        { id: 10, text: "关于2022年高考数学试题的一点点想法", read: 14656 },
      ];
    },
    // 获取推荐博主列表
    getRecommandAuthorList() {
      this.recAuthor = [
        {
          id: 1,
          nickname: "世界充满爱",
          headPic: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          signature: "唤醒財富的21种方法",
        },
        {
          id: 2,
          nickname: "木西Liz",
          headPic: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          signature: "一个有趣的动漫游戏全职主播",
        },
        {
          id: 3,
          nickname: "小梦学姐呀",
          headPic: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          signature:
            "名士才情，英雄肝胆，圣贤学问，仙佛心肠，写经世致用之文，夺造化之功，修身、齐家、治国、平天下。",
        },
        {
          id: 4,
          nickname: "性感悍匪小鸡仔",
          headPic: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          signature: "…眼泪，明明在成为吸血鬼之后再也没有流过的……",
        },
        {
          id: 5,
          nickname: "会特效的特同学",
          headPic: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          signature: "圆梦厦大",
        },
      ];
    },
  },
};
</script>

<style scoped lang="less"></style>
