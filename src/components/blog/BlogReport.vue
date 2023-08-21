<template>
  <v-dialog width="550" persistent v-model="report.value">
    <v-card>
      <!-- 举报标题 -->
      <v-card-title class="font-weight-black">
        <v-spacer></v-spacer>
        {{ title }}
        <v-spacer></v-spacer>
      </v-card-title>
      <!-- 分隔符 -->
      <v-divider></v-divider>
      <!-- 下拉框 -->
      <v-container class="px-5">
        <v-row align="center" no-gutters>
          <v-col cols="2" class="align-self-start pt-5">举报理由</v-col>
          <v-col cols="10">
            <v-select
              dense
              solo
              v-model="report.reason.value"
              :items="report.reason.list"
              item-value="id"
              item-text="name"
              label="请选择举报理由"
            >
            </v-select>
          </v-col>
          <v-col cols="2">举报标签</v-col>
          <v-col cols="10">
            <!-- 举报标签 -->
            <v-chip v-show="!report.reason.value" label disabled
              >请先选择举报理由</v-chip
            >
            <v-chip-group
              v-show="report.reason.value"
              column
              v-model="report.label.value"
              multiple
              active-class="info"
            >
              <v-chip
                label
                outlined
                :value="1"
                v-for="label in report.label.list"
                :key="label.id"
                >{{ label.name }}</v-chip
              >
            </v-chip-group>
          </v-col>
          <v-col cols="12" class="mt-4">
            <span>举报详情</span>
            <v-textarea
              class="mt-2"
              outlined
              no-resize
              counter="200"
              v-model="report.content"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <!-- 卡片功能区 -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          small
          rounded
          width="100"
          color="grey"
          dark
          @click="report.value = false"
          >取消</v-btn
        >
        <v-btn small rounded width="100" color="error">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import eventBus from "../../utils/eventBus";
export default {
  name: "",

  data() {
    return {
      // 举报
      report: {
        value: false,
        content: "",
        reason: {
          value: null,
          list: [],
        },
        label: {
          value: [],
          list: [],
        },
      },
      title: "举报未定", //举报的标题
      stamp: 0, ////举报的类型 1.博客  2.视频 3.代表的是评论
      id: 0, //举报的博客和视频的id
    };
  },
  watch: {
    "report.value"(newData) {
      if (!newData) {
        this.report.reason.value = null;
        this.report.content = "";
      }
    },
    "report.reason.value"(newValue) {
      this.getReportLabel(newValue);
    },
  },
  methods: {
    // 根据举报理由的编号进行获取举报标签
    getReportLabel(newData) {
      switch (newData) {
        case 1:
          this.report.label.list = [
            { id: 1, name: "色情" },
            { id: 2, name: "低俗" },
            { id: 3, name: "引导私下交易" },
          ];
          break;
        case 2:
          this.report.label.list = [
            { id: 4, name: "涉政不实信息" },
            { id: 5, name: "涉政不当言论" },
          ];
          break;
        case 3:
          this.report.label.list = [
            { id: 6, name: "虚拟虚假时事" },
            { id: 7, name: "虚拟虚假知识" },
          ];
          break;
        case 4:
          this.report.label.list = [
            { id: 8, name: "杀猪盘" },
            { id: 9, name: "刷单欺诈" },
            { id: 10, name: "换脸合成" },
            { id: 11, name: "养老欺诈" },
          ];
          break;
        case 5:
          this.report.label.list = [
            { id: 12, name: "侮辱谩骂" },
            { id: 13, name: "涉嫌非法集资" },
            { id: 14, name: "危险行为" },
          ];
          break;
        case 6:
          this.report.label.list = [
            { id: 15, name: "骗赞骗互动" },
            { id: 16, name: "内容观感体验差" },
            { id: 17, name: "内容虚假/不完整" },
          ];
          break;
        case 7:
          this.report.label.list = [
            { id: 18, name: "虚假夸大宣传" },
            { id: 19, name: "出售违禁品" },
            { id: 20, name: "售卖假冒商品" },
          ];
          break;
        case 8:
          this.report.label.list = [
            { id: 21, name: "疑似自杀" },
            { id: 22, name: "教唆自杀" },
          ];
          break;
        case 9:
          this.report.label.list = [
            { id: 23, name: "引人不适" },
            { id: 24, name: "价值观导向不良" },
            { id: 25, name: "网暴他人" },
          ];
          break;
        case 10:
          this.report.label.list = [
            { id: 26, name: "商标权" },
            { id: 27, name: "名誉权" },
            { id: 28, name: "肖像权" },
            { id: 29, name: "隐私权" },
            { id: 30, name: "专利权" },
            { id: 31, name: "著作权（本人作品被盗用）" },
            { id: 32, name: "无法确定侵权类型" },
            { id: 33, name: "他人作品被盗用" },
          ];
          break;
        case 11:
          this.report.label.list = [
            { id: 34, name: "危险行为" },
            { id: 35, name: "未成年营销" },
            { id: 36, name: "未成年医美" },
          ];
          break;
        case 12:
          this.report.label.list = [
            { id: 37, name: "侵害未成年" },
            { id: 38, name: "价值观导向不良" },
            { id: 39, name: "儿童邪典" },
          ];
          break;
        default:
          this.report.label.list = [];
      }
    },
    // 获取举报理由
    getReportReasons() {
      let responseReason = [
        {
          id: 1,
          name: "内容违规",
          reason: [
            { id: 1, name: "色情低俗" },
            { id: 2, name: "政治敏感" },
            { id: 3, name: "造谣传谣" },
            { id: 4, name: "涉嫌欺诈" },
            { id: 5, name: "违法犯罪" },
            { id: 6, name: "诱导互动、体验差等" },
            { id: 7, name: "违规卖货、假冒商品" },
            { id: 8, name: "疑似/教唆自残自杀" },
            { id: 9, name: "网暴他人，其他" },
          ],
        },
        {
          id: 2,
          name: "侵权权益",
          reason: [
            { id: 10, name: "侵犯肖像、隐私、名誉、商标、专利、著作权" },
          ],
        },
        {
          id: 3,
          name: "未成年",
          reason: [
            { id: 11, name: "未成年人不当行为" },
            { id: 12, name: "内容不适合未成年观看" },
          ],
        },
      ];

      let reasonList = [];
      responseReason.some((item, index) => {
        reasonList[reasonList.length] = {
          header: item.name,
        };
        item.reason.some((item1) => {
          reasonList[reasonList.length] = item1;
        });
        if (index + 1 !== responseReason.length) {
          reasonList[reasonList.length] = {
            divider: true,
          };
        }
        this.report.reason.list = reasonList;
      });
    },
  },
  created() {
    this.getReportReasons();
    //     显示和隐藏举报对话框
    eventBus.$on("displayReportDialog", (isShow, title, stamp, id) => {
      this.report.value = isShow;
      // 显示的话让他进行赋值
      if (isShow) {
        this.title = title;
        this.stamp = stamp;
        this.id = id;
      }
    });
  },
};
</script>

<style scoped lang="less"></style>
