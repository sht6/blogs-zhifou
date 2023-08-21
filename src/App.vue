<template>
  <v-app>
    <!-- 应用栏区域 必须加app，main才会在他的下边 -->
    <v-app-bar app color="#fff">
      <head-bar></head-bar>
    </v-app-bar>
    <v-main>
      <!-- 路由占位符 -->
      <router-view></router-view>
    </v-main>
    <!-- 网站的页脚 -->
    <v-footer>
      <footer-bar></footer-bar>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
    loading: false,
    selection: 1,
  }),
};
</script>
