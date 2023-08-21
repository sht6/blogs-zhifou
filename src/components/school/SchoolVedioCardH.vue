<template>
  <!-- 视频卡片 -->
  <v-list-item>
    <v-list-item-avatar tile width="200" height="120">
      <v-img class="rounded-lg" :src="cover"> </v-img>
    </v-list-item-avatar>
    <!-- 视频介绍 -->
    <v-list-item-content class="align-self-start">
      <v-list-item-title class="font-weight-black"
        >{{ title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <v-chip
          v-if="is_new"
          small
          color="success"
          class="font-weight-black font-italic rounded-0 mr-2"
          >NEW</v-chip
        >
        <v-chip
          v-if="is_hot"
          small
          color="warning"
          class="font-weight-black font-italic rounded-0 mr-2"
          >HOT</v-chip
        >
        <span>更新于：{{ time }}</span>
      </v-list-item-subtitle>
      <!-- 视频介绍 -->
      <div
        class="line__3 text-caption grey--text text-lighten-1"
        v-html="desc"
      ></div>
    </v-list-item-content>
    <!-- 学习 -->
    <v-list-item-action>
      <div class="text-center">
        <span class="text-caption grey--text text-lighten-1"
          >{{ studyCount | numFormat }}人已学习</span
        >
        <v-btn
          block
          color="info"
          small
          class="rounded-pill"
          :to="'/school-video/' + id"
          >开始学习</v-btn
        >
      </div>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "",
  props: {
    id: { type: Number, required: true }, //编号
    cover: { type: String, required: true }, //封面
    title: { type: String, required: true }, //标题
    is_new: { type: Boolean, default: false }, //new
    is_hot: { type: Boolean, default: false }, //hot
    time: { type: String, required: true }, //发布时间
    desc: { type: String, required: true }, //视频描述
    studyCount: { type: Number, required: true }, //学习人数
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less">
.line__3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
