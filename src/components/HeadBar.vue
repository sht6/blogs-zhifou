<template>
  <!-- 应用栏容器 -->
  <v-container fluid>
    <!-- 应用栏菜单选项 -->
    <v-tabs centered slider-size="4" :value="tabValue">
      <v-tab v-for="item in tabMenus" :key="item.id" :to="item.href">{{
        item.name
      }}</v-tab>
    </v-tabs>
    <!-- 登录按钮 -->

    <v-btn absolute right top class="mr-16" text @click="showLoginDialog()"
      >登录</v-btn
    >
    <!-- 登录对话框 -->
    <login-register-dialog></login-register-dialog>
  </v-container>
</template>

<script>
import LoginRegisterDialog from "./LoginRegisterDialog.vue";
import eventBus from "../utils/eventBus";
export default {
  name: "headBar",
  components: {
    LoginRegisterDialog,
  },
  data() {
    return {
      tabValue: null, //选项值
      tabMenus: [],
    };
  },
  created() {
    this.getTabBarMenus();
    // 自定义事件--更改选项卡的值
    eventBus.$on("changeTab", (tabValue) => {
      this.tabValue = tabValue;
    });
  },
  methods: {
    // 显示登录框
    showLoginDialog() {
      eventBus.$emit("showDialog", true);
    },
    // 获取应用栏的菜单
    getTabBarMenus() {
      this.tabMenus = [
        { id: 1, name: "首页", href: "/" },
        { id: 2, name: "博客", href: "/blog" },
        { id: 3, name: "学堂", href: "/school" },
        { id: 4, name: "影音", href: "/film" },
        { id: 5, name: "考证", href: "/exam" },
      ];
    },
  },
};
</script>

<style scoped lang="less"></style>
