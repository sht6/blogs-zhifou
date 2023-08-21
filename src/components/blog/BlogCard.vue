<template>
  <v-list-item three-line :to="'/blog-content/' + id">
    <v-list-item-content>
      <v-list-item-title class="font-weight-bold">
        {{ title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ desc }}
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <v-avatar size="30" class="mr-3">
          <v-img :src="headPic"></v-img>
        </v-avatar>
        <span class="mr-6">{{ nickName }}</span>
        <span class="mr-6">{{ time }}</span>
        <div class="d-inline-block mr-6">
          <v-icon size="18" class="mr-1">mdi-eye</v-icon>
          {{ eye | numFormat }}
        </div>
        <div class="d-inline-block mr-6 red--text">
          <v-icon size="18" class="mr-1" color="red">mdi-thumb-up</v-icon>
          {{ like | numFormat }}
        </div>
        <div class="d-inline-block blue--text">
          <v-icon size="18" class="mr-1" color="blue">mdi-message-text</v-icon>
          {{ comment | numFormat }}
        </div>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-avatar tile width="160" height="100" class="rounded-lg">
      <v-img :src="cover"></v-img>
    </v-list-item-avatar>
  </v-list-item>
</template>

<script>
export default {
  name: "",
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    desc: { type: String, default: "" },
    time: { type: String, required: true },
    cover: { type: String, required: true },
    eye: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    comment: { type: Number, default: 0 },
    nickName: { type: String, required: true },
    headPic: { type: String, required: true },
    to: { type: String },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less"></style>
