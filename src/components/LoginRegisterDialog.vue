<template>
  <!-- 对话框 -->
  <v-dialog persistent width="1000" v-model="show" content-class="rounded-0">
    <div class="d-flex">
      <!-- 网站信息 -->
      <v-card
        dark
        tile
        width="500"
        height="573"
        class="dialog_bg pa-16 d-flex flex-column"
      >
        <!-- 关闭的按钮 -->
        <v-btn
          light
          absolute
          fab
          small
          style="top: 10px; right: -20px"
          @click="show = false"
        >
          <v-icon size="30" color="grey">mdi-close</v-icon>
        </v-btn>
        <!-- 网站标题 -->
        <v-container class="mb-auto">
          <h1>知否</h1>
          <p class="text-caption grey--text text-lighten-2">
            全方位的教学、考证、博客、咨询网站
          </p>
        </v-container>
        <!-- 推荐博主 -->
        <v-container class="mb-auto">
          <!-- 头像、昵称 -->
          <div>
            <v-avatar size="40">
              <v-img :src="recAuthor.head_pic"></v-img>
            </v-avatar>
            <span class="ml-3">{{ recAuthor.nickname }}</span>
          </div>
          <!-- 个性签名 -->
          <p
            class="text-caption grey--text text-lighten-2 mt-3"
            v-html="recAuthor.canvases"
          ></p>
        </v-container>
        <v-container class="text-center"
          ><v-chip
            label
            small
            link
            color="transparent"
            class="grey--text text-lighten-2"
            v-for="link in footerLinks"
            :key="link.id"
            :to="link.to"
          >
            {{ link.name }}
          </v-chip>
        </v-container>
      </v-card>
      <!-- 窗口(登录、注册、注册成功) -->
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card
            tile
            width="500"
            height="573"
            class="pa-16 d-flex flex-column"
          >
            <v-container class="d-flex align-center">
              <h2>登录</h2>
              <span class="text-caption ml-auto">
                没有账号?<a
                  href="#"
                  class="text-decoration-none"
                  @click="step = 2"
                  >点击注册</a
                >
              </span>
            </v-container>
            <!-- 登录区域 -->
            <v-container>
              <v-form ref="loginForm" v-model="login.value" lazy-validation>
                <v-text-field
                  outlined
                  dense
                  v-model="login.account.value"
                  :rules="login.account.rule"
                  label="账号 / 邮箱 / 手机号"
                  placeholder="账号 / 邮箱 / 手机号"
                >
                </v-text-field>
                <v-text-field
                  outlined
                  dense
                  :append-icon="login.password.icon"
                  v-model="login.password.value"
                  :rules="login.password.rule"
                  @click:append="showPasswordText"
                  :type="login.password.type"
                  label="密码"
                  placeholder="请输入密码"
                >
                </v-text-field>
                <v-checkbox
                  dense
                  label="同意本公司的条款与协议"
                  v-model="login.term.value"
                  :rules="login.term.rule"
                  class="mt-0 pt-0 mb-2"
                >
                  <template #label>
                    同意本公司的
                    <a
                      class="text-decoration-none"
                      @click.stop
                      href="http://www.baidu.com"
                      >条款与协议</a
                    >
                  </template>
                </v-checkbox>
                <!-- 登录的按钮 -->
                <v-btn
                  color="success"
                  :disabled="!login.value"
                  block
                  @click="toLogin"
                  >登录</v-btn
                >
              </v-form>
              <v-container class="text-center">
                <a href="#" class="text-caption grey--text text-decoration-none"
                  >忘记密码</a
                >
              </v-container>
            </v-container>

            <v-container class="mt-auto">
              <!-- 分割符 -->
              <v-container class="d-flex align-center">
                <v-divider></v-divider>
                <v-subheader class="text-caption">其他登录方式</v-subheader>
                <v-divider></v-divider>
              </v-container>
              <v-container class="text-center py-0">
                <v-btn
                  small
                  fab
                  v-for="other in otherLoginMethods"
                  :class="{ 'ml-8': other.id - 1 !== 0 }"
                  :to="other.to"
                  :key="other.id"
                  :color="other.color"
                >
                  <v-icon>{{ other.icon }}</v-icon>
                </v-btn>
              </v-container>
            </v-container>
          </v-card>
        </v-window-item>
        <v-window-item :value="2">
          <v-card
            tile
            width="500"
            height="573"
            class="px-16 d-flex align-center"
          >
            <v-container>
              <v-container class="d-flex align-center">
                <h2>注册</h2>
                <span class="text-caption ml-auto">
                  已有账号?<a
                    href="#"
                    class="text-decoration-none"
                    @click="step = 1"
                    >点击登录</a
                  >
                </span>
              </v-container>
              <!-- 注册区域 -->
              <v-container>
                <v-form
                  ref="registerForm"
                  v-model="register.value"
                  lazy-validation
                >
                  <v-text-field
                    outlined
                    dense
                    v-model="register.email.value"
                    :rules="register.email.rule"
                    label="邮箱号码"
                    placeholder="请输入邮箱号码"
                  >
                  </v-text-field>

                  <v-row>
                    <v-col>
                      <v-text-field
                        outlined
                        dense
                        v-model="register.evc.value"
                        :rules="register.evc.rule"
                        label="验证码"
                        placeholder="请输入验证码"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-btn
                        block
                        color="info"
                        @click="getEvc"
                        :disabled="register.btnCountDown.disabled"
                        >{{ register.btnCountDown.text }}</v-btn
                      >
                    </v-col>
                  </v-row>

                  <v-checkbox
                    dense
                    label="同意本公司的条款与协议"
                    v-model="register.term.value"
                    :rules="register.term.rule"
                    class="mt-0 pt-0 mb-2"
                  >
                    <template #label>
                      同意本公司的
                      <a
                        class="text-decoration-none"
                        @click.stop
                        href="http://www.baidu.com"
                        >条款与协议</a
                      >
                    </template>
                  </v-checkbox>
                  <!-- 登录的按钮 -->
                  <v-btn
                    color="success"
                    :disabled="!register.value"
                    block
                    @click="toRegister"
                    >注册</v-btn
                  >
                </v-form>
              </v-container>
            </v-container>
          </v-card>
        </v-window-item>
        <v-window-item :value="3">
          <v-card tile width="500" height="573" class="d-flex align-center">
            <v-container class="text-center">
              <v-icon size="130" color="success">mdi-check-circle</v-icon>
              <h3>欢迎加入知否大家庭</h3>
              <p class="text-caption grey--text">
                请前往注册的邮箱，查看账号信息
                <a class="text-decoration-none" @click="step = 1"
                  >可点击此处前往登录页</a
                >
              </p>
            </v-container>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </v-dialog>
</template>

<script>
import eventBus from "../utils/eventBus";

export default {
  name: "",

  data() {
    return {
      show: false,
      step: 1,
      recAuthor: {}, //推荐的博主
      footerLinks: [], //角部的链接
      login: {
        value: null,
        account: {
          value: "",
          rule: [(v) => !!v || "请填写您的账号信息"],
        },
        password: {
          icon: "mdi-eye",
          value: "",
          type: "password",
          rule: [(v) => !!v || "请输入密码"],
        },
        // 条款与协议
        term: {
          value: false,
          rule: [(v) => !!v || "请认真阅读条款与协议并勾选"],
        },
      }, //登录的数据原
      otherLoginMethods: [], //其他的登录方式
      register: {
        value: null,
        email: {
          value: "",
          rule: [
            (v) => !!v || "请输入您的邮箱",
            (v) =>
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                v
              ) || "请输入正确的邮箱号码",
          ],
        },
        evc: {
          value: "",
          rule: [(v) => !!v || "请输入验证码"],
        },
        // 条款与协议
        term: {
          value: false,
          rule: [(v) => !!v || "请认真阅读条款与协议并勾选"],
        },
        // 按钮倒计时
        btnCountDown: {
          text: "获取验证码",
          time: 60,
          disabled: false,
          clock: null,
        },
      }, //注册的数据源
    };
  },
  methods: {
    // 重置按钮数据
    resetBtnStatus() {
      // 不在进行倒计时
      clearInterval(this.register.btnCountDown.clock);
      // 恢复最初始的状态
      this.register.btnCountDown.text = "获取验证码";
      this.register.btnCountDown.time = 60;
      this.register.btnCountDown.disabled = false;
    },
    // 点击获取验证码的倒计时
    getEvc() {
      this.register.btnCountDown.clock = setInterval(() => {
        if (this.register.btnCountDown.time - 1 === 0) {
          this.resetBtnStatus();
        } else {
          this.register.btnCountDown.disabled = true;
          this.register.btnCountDown.time--;
          this.register.btnCountDown.text =
            this.register.btnCountDown.time + "s秒后获取验证码";
        }
      }, 1000);
    },
    // 请求登录和验证
    toRegister() {
      // 登录之前手动验证表单的状态
      let success = this.$refs.registerForm.validate();
      if (success) {
        alert("请求服务器验证注册信息");
      }
    },
    // 获取其他的登录方式
    getOtherLoginMethods() {
      this.otherLoginMethods = [
        { id: 1, name: "QQ", icon: "mdi-qqchat", color: "info", to: "" },
        { id: 2, name: "微信", icon: "mdi-wechat", color: "success", to: "" },
        { id: 3, name: "微博", icon: "mdi-sina-weibo", color: "error", to: "" },
      ];
    },
    // 请求登录和验证
    toLogin() {
      // 登录之前手动验证表单的状态
      let success = this.$refs.loginForm.validate();
      if (success) {
        alert("请求服务器验证登录信息");
      }
    },
    // 查看密码框输入的文本
    showPasswordText() {
      if (this.login.password.type === "password") {
        this.login.password.type = "text";
        this.login.password.icon = "mdi-eye-off";
      } else {
        this.login.password.type = "password";
        this.login.password.icon = "mdi-eye";
      }
    },
    // 获取脚部的链接
    getFooterLinks() {
      this.footerLinks = [
        { id: 1, name: "知否咨询", to: "" },
        { id: 2, name: "关于我们", to: "" },
        { id: 3, name: "使用条款", to: "" },
        { id: 4, name: "帮助文档", to: "" },
      ];
    },
    // 获取推荐的博主
    getRecAuthor() {
      this.recAuthor = {
        head_pic: "https://cdn.vuetifyjs.com/images/john.jpg", // 头像
        nickname: "落叶归根", // 昵称
        canvases:
          "编程是爱好，恭喜你发现宝藏男孩一枚~希望你们关注我是因为喜欢我，嘿嘿！<br>" +
          "私人微信：kuangshenya 备注来意<br>" +
          "公众号：狂神说", // 个性签名
      };
    },
  },
  created() {
    // 监听一个关闭对话框的事件
    eventBus.$on("showDialog", (isShow) => {
      this.show = isShow;
    });

    // 获取其他的登录方式
    this.getOtherLoginMethods();
  },
  watch: {
    // 监听step的值
    step(oldData) {
      if (oldData === 1) {
        this.$refs.loginForm.reset();
      } else if (oldData === 2) {
        this.$refs.registerForm.reset();
        this.resetBtnStatus();
      }
    },
    // 监听show的变化
    show: {
      immediate: true, //初次实例化之后
      handler(newData) {
        if (newData) {
          this.getRecAuthor(); //如果值为true，则获取推荐博主
          // 获取脚部的链接
          this.getFooterLinks();
        }
      },
    },
  },
};
</script>

<style scoped lang="less">
.dialog_bg {
  background-image: linear-gradient(to bottom, #3a485a, #607089);
}
</style>
