<template>
  <v-container>
    <v-sheet>
      <!-- 视频标签 -->
      <h5 class="text-h6 font-weight-black">
        {{ collection.list[collection.lastPlay].title }}
      </h5>
      <div class="font-weight-bold">
        <!-- 播放数量 -->
        <v-chip small label color="transparent" class="ml-n4" text-color="grey">
          <v-icon size="20" class="mr-1">mdi-play-circle-outline</v-icon>
          {{ collection.playCount | numFormat }}
        </v-chip>
        <!-- 弹幕量 -->
        <v-chip small label color="transparent" text-color="grey">
          <v-icon size="20" class="mr-1">mdi-segment</v-icon>
          {{ collection.barrageCount | numFormat }}
        </v-chip>
        <!-- 时间 -->
        <v-chip small label color="transparent" text-color="grey">
          {{ collection.time }}
        </v-chip>
        <!-- 是否转载 -->
        <v-chip
          v-if="!collection.reprintEnabled"
          small
          label
          color="transparent"
          text-color="grey"
        >
          <v-icon color="error" size="20" class="mr-1"
            >mdi-close-octagon</v-icon
          >
          未经作者同意，禁止转载
        </v-chip>
      </div>
    </v-sheet>
    <!-- 视频播放器 -->
    <v-sheet class="d-flex justify-space-between mt-2">
      <!-- 视频播放器、弹幕、评分、评论 -->
      <v-sheet color="transparent" width="800" min-width="800" max-width="800">
        <!-- 视频播放器 -->
        <mui-player
          :id="collection.list[collection.lastPlay].id"
          :title="collection.list[collection.lastPlay].title"
          :collection="collection.list"
          :next-media="collection.lastPlay + 1 < collection.list.length"
          :poster="collection.poster"
          :play-time="collection.playTime"
        ></mui-player>
      </v-sheet>
      <!-- 猜你喜欢、选集 -->
      <v-sheet color="green" width="350" min-width="350" max-width="350"
        >猜你喜欢、选集</v-sheet
      >
    </v-sheet>
  </v-container>
</template>

<script>
import eventBus from "../../utils/eventBus";
import MuiPlayer from "../../components/player/MuiPlayer.vue";
export default {
  name: "",
  props: ["id"],
  components: {
    MuiPlayer,
  },
  data() {
    return {
      // 合集
      collection: {},
    };
  },
  methods: {
    getCollectionList() {
      this.collection = {
        id: 567, // 合集编号
        lastPlay: 2, // 上次播放的合集中的位置（合集索引）
        lastTime: 450, // 上次播放的时间点（秒）
        like: 56721, // 点赞量
        collect: 4567, // 收藏量
        share: 456, // 分享量
        poster:
          "https://pic4.zhimg.com/v2-6ad24f187fc1c4fcea0a6e83199dcd03_r.jpg?source=1940ef5c", // 合集封面
        playCount: 64578, // 播放数量
        time: "2022-01-31 14:22:45", // 合集发布时间
        barrageCount: 23421, // 弹幕量
        reprintEnabled: false, // 不可转载    // 合集列表
        list: [
          { id: 1001, title: "Java语言发展史" },
          { id: 1002, title: "Java语言跨平台原理" },
          { id: 1003, title: "JRE和JDK" },
          { id: 1004, title: "JDK的下载和安装" },
          { id: 1005, title: "常用DOS命令" },
          { id: 1006, title: "Path环境变量的配置" },
          { id: 1007, title: "HelloWorld案例" },
          { id: 1008, title: "HelloWorld案例常见问题" },
          { id: 1009, title: "Notepad软件的安装和使用" },
          { id: 1010, title: "注释" },
          { id: 1011, title: "关键字" },
          { id: 1012, title: "常量" },
          { id: 1013, title: "数据类型" },
          { id: 1014, title: "变量" },
          { id: 1015, title: "变量使用的注意事项" },
          { id: 1016, title: "标识符" },
          { id: 1017, title: "类型转换" },
          { id: 1018, title: "算术运算符" },
          { id: 1019, title: "字符的+操作" },
          { id: 1020, title: "字符串的+操作" },
        ],
      };
    },
  },
  created() {
    // 自动触发changeTab事件，更改头部应用栏的数据为school
    eventBus.setToolbarTabValue("/school");
    // 获取合集
    this.getCollectionList();
  },
};
</script>

<style scoped lang="less"></style>
