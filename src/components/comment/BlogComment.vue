<template>
  <v-list-item dense>
    <!-- 头像 -->
    <v-list-item-avatar class="align-self-start">
      <v-img :src="headPic"></v-img>
    </v-list-item-avatar>
    <!-- 昵称、评论内容、(置顶、博主赞过、时间、回复、举报)、回复组件、夏季回复列表、展开更多评论 -->
    <v-list-item-content>
      <v-list-item-title class="font-weight-black text-darken-1 grey--text"
        >{{ nickname }}
        <!-- 回复的那个人的评论 -->
        <div
          class="d-inline-block"
          v-if="!isLandLord && replyId !== landLordId"
        >
          <v-icon class="mt-n1">mdi-menu-right</v-icon>
          {{ reply_nickname }}
        </div>
      </v-list-item-title>
      <v-list-item-subtitle
        class="pt-1 text-body-1 grey--text text--darken-4"
        >{{ text }}</v-list-item-subtitle
      >
      <v-list-item-subtitle class="mt-2">
        <!-- 置顶 -->
        <v-chip class="mr-3" color="error" outlined label small v-show="isTop"
          >置顶</v-chip
        >
        <v-chip
          class="mr-3"
          color="warning"
          outlined
          label
          small
          v-show="isLiked"
          >博主觉得很赞</v-chip
        >
        <!-- 时间 -->
        <span class="mr-3" v-text="getDifferenceAndNow(time)"></span>
        <!-- 回复链接 -->
        <v-hover v-slot="{ hover }">
          <a
            class="mr-3 text-darken-1"
            :class="{ 'grey--text': !hover }"
            @click="showReply"
            >回复</a
          >
        </v-hover>
        <!-- 举报链接 -->
        <v-hover v-slot="{ hover }">
          <a
            class="mr-3 text-darken-1"
            :class="{ 'grey--text': !hover, 'red--text': hover }"
            @click="showCommentReportDialog"
            >举报</a
          >
        </v-hover>
      </v-list-item-subtitle>
      <v-list-item-subtitle v-show="reply">
        <send-comment
          :type="3"
          :comment-id="this.id"
          :show="reply"
        ></send-comment>
      </v-list-item-subtitle>
      <v-list-item-subtitle v-if="isLandLord && comments.length > 0">
        <!-- 使用评论组件 -->
        <blog-comment
          :is-land-lord="false"
          v-for="c in comments"
          :key="c.id"
          :id="c.id"
          :head-pic="c.commentator.headPic"
          :nickname="c.commentator.nickname"
          :text="c.text"
          :time="c.time"
          :reply-id="c.reply.id"
          :reply_nickname="c.reply.nickname"
          :land-lord-id="id"
          :is-liked="c.isAuthorLiked"
        ></blog-comment>
      </v-list-item-subtitle>
      <v-list-item-subtitle v-if="isLandLord && count > 0">
        <v-sheet width="200">
          <!-- 分割符 -->
          <v-container class="d-flex align-center py-0">
            <v-divider></v-divider>
            <a class="grey--text" @click="getMoreComments">展开更多评论</a>
            <v-divider></v-divider>
          </v-container>
        </v-sheet>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import SendComment from "./SendComment.vue";
import eventBus from "../../utils/eventBus";
import getDifferenceAndNow from "../../utils/dataFormat";
export default {
  name: "BlogComment",
  props: {
    // 是否为楼主
    isLandLord: { type: Boolean, default: false },
    //     当前评论的编号
    id: {
      type: Number,
      required: true,
    },
    //     用户头像
    headPic: { type: String, required: true },
    // 用户昵称
    nickname: {
      type: String,
      required: true,
    },
    // 评论内容
    text: {
      type: String,
      required: true,
    },
    //     是否被博主置顶
    isTop: { type: Boolean, default: false },
    //是否被博主点赞
    isLiked: {
      type: Boolean,
      default: false,
    },
    //     时间
    time: { type: String, required: true },
    //    二级评论的数量
    count: { type: Number, default: 0 },
    //     回复的编号
    replyId: { type: Number },
    //     回复的编号名称
    reply_nickname: { type: String },
    //     楼主编号
    landLordId: {
      type: Number,
    },
  },
  components: {
    SendComment,
  },
  data() {
    return {
      reply: false,
      // 二级评论列表
      comments: [],
    };
  },
  methods: {
    getDifferenceAndNow,
    // 显示回复元素
    showReply() {
      // 关闭所有的评论里面的回复元素
      eventBus.$emit("closeReply");
      // 只展示当前自己点击的
      this.reply = true;
    },
    //     展示举报评论对话框
    showCommentReportDialog() {
      eventBus.isShowReportDialog(true, "评论举报", 3, this.id);
    },
    //     获取楼主下面的评论列表
    getMoreComments() {
      switch (this.id) {
        case 1:
          this.comments = this.comments.concat([
            {
              id: 100,
              text: "笑死我了，阿姨还缺人不",
              time: "2022-07-09 10:05:23",
              isAuthorLiked: false,
              like: 12,
              noLike: 2,
              commentator: {
                id: 23,
                nickname: "小黑豆",
                headPic:
                  "https://gd-hbimg.huaban.com/6cc07c768e7191cf7d022f8ea196b24438e2fa07241d7-nRiVKO_fw658",
              },
              reply: { id: 1, nickname: "开心的太阳花朵朵" },
            },
            {
              id: 101,
              text: "哪里都有你啊！！",
              time: "2022-07-09 10:10:23",
              isAuthorLiked: false,
              like: 0,
              noLike: 0,
              commentator: {
                id: 77,
                nickname: "你又能了？",
                headPic:
                  "https://gd-hbimg.huaban.com/4f7893caff1b2e204a3ddc577097b6b0282eaa4d8dc2-bUdXPW_fw658",
              },
              reply: { id: 100, nickname: "小黑豆" },
            },
            {
              id: 102,
              text: "阿姨，养老钱都让你们花没了。！！",
              time: "2022-07-17 06:10:23",
              isAuthorLiked: true,
              like: 10,
              noLike: 0,
              commentator: {
                id: 90,
                nickname: "太阳黑子",
                headPic:
                  "https://gd-hbimg.huaban.com/f27009ca81f54c158c3ae21cc7d07392d16cbd0b3fe7d-Qr5Jte_fw658",
              },
              reply: { id: 100, nickname: "小黑豆" },
            },
            {
              id: 103,
              text: "这人，就不能正经点么？",
              time: "2022-07-20 11:10:23",
              isAuthorLiked: false,
              like: 0,
              noLike: 0,
              commentator: {
                id: 89,
                nickname: "老鼠爱大米",
                headPic:
                  "https://gd-hbimg.huaban.com/6fd6568462f9b8c27c06f5e0dc87e7b9da41648a3e1b1-0BlSXG_fw658",
              },
              reply: { id: 1, nickname: "开心的太阳花朵朵" },
            },
          ]);
          //     获取还有多少条记录
          break;
        case 4:
          this.comments = this.comments.concat([
            {
              id: 200,
              text: "我也觉得讲的不错",
              time: "2021-03-09 10:05:23",
              isAuthorLiked: false,
              like: 1,
              noLike: 0,
              commentator: {
                id: 423,
                nickname: "玉米香肠",
                headPic:
                  "https://gd-hbimg.huaban.com/e9b42d4c6117542c6b18a27283e6afeb3b9fcc2281fd3-MZs3Kt_fw658",
              },
              reply: { id: 4, nickname: "大侠带你走" },
            },
            {
              id: 201,
              text: "师哥咋跑到这个地方了？",
              time: "2021-03-10 07:10:23",
              isAuthorLiked: false,
              like: 0,
              noLike: 0,
              commentator: {
                id: 567,
                nickname: "宿舍 F4",
                headPic:
                  "https://gd-hbimg.huaban.com/f87e3f91e95b51fda276218d0975c192c9e1464358446-bHM9FQ_fw658",
              },
              reply: { id: 200, nickname: "玉米香肠" },
            },
            {
              id: 202,
              text: "阿姨，养老钱都让你们花没了。！！",
              time: "2021-03-10 07:30:23",
              isAuthorLiked: true,
              like: 10,
              noLike: 0,
              commentator: {
                id: 423,
                nickname: "玉米香肠",
                headPic:
                  "https://gd-hbimg.huaban.com/e9b42d4c6117542c6b18a27283e6afeb3b9fcc2281fd3-MZs3Kt_fw658",
              },
              reply: { id: 201, nickname: "宿舍 F4" },
            },
          ]);
          break;
      }
    },
  },
  created() {
    // 是否显示回复元素
    eventBus.$on("closeReply", () => {
      this.reply = false;
    });
  },
};
</script>

<style scoped lang="less"></style>
