<template>
  <v-sheet :width="width">
    <v-container>
      <!-- 封面 -->
      <v-img class="rounded-lg" :height="height" :src="cover">
        <span style="position: absolute; top: 5px; right: 0px">
          <slot name="topLabel"></slot>
        </span>
        <span style="position: absolute; bottom: 5px; right: 0px">
          <slot name="bottomLabel"></slot>
        </span>
      </v-img>
      <!-- 标题 -->
      <div class="my-1 text-body-1">{{ title }}</div>
      <div class="my-1 grey--text text-darken-1 text-body-2">
        {{ subTitle }}
      </div>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: "",
  props: {
    width: { type: String, default: "224" }, //卡片高度
    height: { type: String, default: "300" }, //图像高度
    cover: { type: String, required: true }, //封面
    title: { type: String, required: true }, //标题
    subTitle: { type: String, required: true }, //副标题
    id: { type: Number, required: true }, //图片id
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less"></style>
