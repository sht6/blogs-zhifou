import Vue from "vue";
export default new Vue({
  methods: {
    // 是否显示举报对话框
    isShowReportDialog(show, title, stamp, id) {
      this.$emit("displayReportDialog", show, title, stamp, id);
    },
    // 设置头部应用栏的选项卡的值
    setToolbarTabValue(tabValue) {
      this.$emit("changeTab", tabValue);
    },
  },
});
