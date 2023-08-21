<template>
  <div>
    <!-- 视频播放器 -->
    <div id="mui-player"></div>
    <!-- 播放器在非全屏模式显示的元素 -->
    <v-card tile flat color="grey lighten-4">
      <v-card-text class="d-flex align-center">
        <span>67 条弹幕</span>
        <!-- 弹幕开关 -->
        <v-btn class="ml-1" plain icon @click="barrage.open = !barrage.open">
          <!-- 弹幕的打开 -->
          <svg
            v-show="barrage.open"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.989 4.828c-.47 0-.975.004-1.515.012l-1.71-2.566a1.008 1.008 0 00-1.678 1.118l.999 1.5c-.681.018-1.403.04-2.164.068a4.013 4.013 0 00-3.83 3.44c-.165 1.15-.245 2.545-.245 4.185 0 1.965.115 3.67.35 5.116a4.012 4.012 0 003.763 3.363l.906.046c1.205.063 1.808.095 3.607.095a.988.988 0 000-1.975c-1.758 0-2.339-.03-3.501-.092l-.915-.047a2.037 2.037 0 01-1.91-1.708c-.216-1.324-.325-2.924-.325-4.798 0-1.563.076-2.864.225-3.904.14-.977.96-1.713 1.945-1.747 2.444-.087 4.465-.13 6.063-.131 1.598 0 3.62.044 6.064.13.96.034 1.71.81 1.855 1.814.075.524.113 1.962.141 3.065v.002c.01.342.017.65.025.88a.987.987 0 101.974-.068c-.008-.226-.016-.523-.025-.856v-.027c-.03-1.118-.073-2.663-.16-3.276-.273-1.906-1.783-3.438-3.74-3.507-.9-.032-1.743-.058-2.531-.078l1.05-1.46a1.008 1.008 0 00-1.638-1.177l-1.862 2.59c-.38-.004-.744-.007-1.088-.007h-.13zm.521 4.775h-1.32v4.631h2.222v.847h-2.618v1.078h2.618l.003.678c.36.026.714.163 1.01.407h.11v-1.085h2.694v-1.078h-2.695v-.847H16.8v-4.63h-1.276a8.59 8.59 0 00.748-1.42L15.183 7.8a14.232 14.232 0 01-.814 1.804h-1.518l.693-.308a8.862 8.862 0 00-.814-1.408l-1.045.352c.297.396.572.847.825 1.364zm-4.18 3.564l.154-1.485h1.98V8.294h-3.2v.98H9.33v1.43H7.472l-.308 3.453h2.277c0 1.166-.044 1.925-.12 2.277-.078.352-.386.528-.936.528-.308 0-.616-.022-.902-.055l.297 1.067.062.005c.285.02.551.04.818.04 1.001-.067 1.562-.419 1.694-1.057.11-.638.176-1.903.176-3.795h-2.2zm7.458.11v-.858h-1.254v.858h1.254zm-2.376-.858v.858h-1.199v-.858h1.2zm-1.199-.946h1.2v-.902h-1.2v.902zm2.321 0v-.902h1.254v.902h-1.254z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.846 14.627a1 1 0 00-1.412.075l-5.091 5.703-2.216-2.275-.097-.086-.008-.005a1 1 0 00-1.322 1.493l2.963 3.041.093.083.007.005c.407.315 1 .27 1.354-.124l5.81-6.505.08-.102.005-.008a1 1 0 00-.166-1.295z"
              fill="#00AEEC"
            ></path>
          </svg>
          <!-- 弹幕的关闭 -->
          <svg
            v-show="!barrage.open"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.085 4.891l-.999-1.499a1.008 1.008 0 011.679-1.118l1.709 2.566c.54-.008 1.045-.012 1.515-.012h.13c.345 0 .707.003 1.088.007l1.862-2.59a1.008 1.008 0 011.637 1.177l-1.049 1.46c.788.02 1.631.046 2.53.078 1.958.069 3.468 1.6 3.74 3.507.088.613.13 2.158.16 3.276l.001.027c.01.333.017.63.025.856a.987.987 0 01-1.974.069c-.008-.23-.016-.539-.025-.881v-.002c-.028-1.103-.066-2.541-.142-3.065-.143-1.004-.895-1.78-1.854-1.813-2.444-.087-4.466-.13-6.064-.131-1.598 0-3.619.044-6.063.13a2.037 2.037 0 00-1.945 1.748c-.15 1.04-.225 2.341-.225 3.904 0 1.874.11 3.474.325 4.798.154.949.95 1.66 1.91 1.708a97.58 97.58 0 005.416.139.988.988 0 010 1.975c-2.196 0-3.61-.047-5.513-.141A4.012 4.012 0 012.197 17.7c-.236-1.446-.351-3.151-.351-5.116 0-1.64.08-3.035.245-4.184A4.013 4.013 0 015.92 4.96c.761-.027 1.483-.05 2.164-.069zm4.436 4.707h-1.32v4.63h2.222v.848h-2.618v1.078h2.431a5.01 5.01 0 013.575-3.115V9.598h-1.276a8.59 8.59 0 00.748-1.42l-1.089-.384a14.232 14.232 0 01-.814 1.804h-1.518l.693-.308a8.862 8.862 0 00-.814-1.408l-1.045.352c.297.396.572.847.825 1.364zm-4.18 3.564l.154-1.485h1.98V8.289h-3.2v.979h2.067v1.43H7.483l-.308 3.454h2.277c0 1.166-.044 1.925-.12 2.277-.078.352-.386.528-.936.528-.308 0-.616-.022-.902-.055l.297 1.067.062.004c.285.02.551.04.818.04 1.001-.066 1.562-.418 1.694-1.056.11-.638.176-1.903.176-3.795h-2.2zm7.458.11v-.858h-1.254v.858H15.8zm-2.376-.858v.858h-1.199v-.858h1.2zm-1.199-.946h1.2v-.902h-1.2v.902zm2.321 0v-.902H15.8v.902h-1.254zm3.517 10.594a4 4 0 100-8 4 4 0 000 8zm-.002-1.502a2.5 2.5 0 01-2.217-3.657l3.326 3.398a2.49 2.49 0 01-1.109.259zm2.5-2.5c0 .42-.103.815-.286 1.162l-3.328-3.401a2.5 2.5 0 013.614 2.239z"
            ></path>
          </svg>
        </v-btn>

        <v-menu
          offset-y
          top
          :close-on-content-click="false"
          nudge-left="157"
          nudge-top="10"
          origin="center center"
          transition="scale-transition"
        >
          <template #activator="{ on, attrs }">
            <!--  -->
            <!-- 弹幕设置 -->
            <v-btn plain icon v-on="on" v-bind="attrs">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.645 4.881l1.06-1.473a.998.998 0 10-1.622-1.166L13.22 4.835a110.67 110.67 0 00-1.1-.007h-.131c-.47 0-.975.004-1.515.012L8.783 2.3A.998.998 0 007.12 3.408l.988 1.484c-.688.019-1.418.042-2.188.069a4.013 4.013 0 00-3.83 3.44c-.165 1.15-.245 2.545-.245 4.185 0 1.965.115 3.67.35 5.116a4.012 4.012 0 003.763 3.363c1.903.094 3.317.141 5.513.141a.988.988 0 000-1.975 97.58 97.58 0 01-5.416-.139 2.037 2.037 0 01-1.91-1.708c-.216-1.324-.325-2.924-.325-4.798 0-1.563.076-2.864.225-3.904.14-.977.96-1.713 1.945-1.747 2.444-.087 4.465-.13 6.063-.131 1.598 0 3.62.044 6.064.13.96.034 1.71.81 1.855 1.814.075.524.113 1.962.141 3.065v.002c.005.183.01.07.014-.038.004-.096.008-.189.011-.081a.987.987 0 101.974-.069c-.004-.105-.007-.009-.011.09-.002.056-.004.112-.007.135l-.002.01a.574.574 0 01-.005-.091v-.027c-.03-1.118-.073-2.663-.16-3.276-.273-1.906-1.783-3.438-3.74-3.507-.905-.032-1.752-.058-2.543-.079zm-3.113 4.703h-1.307v4.643h2.2v.04l.651-1.234c.113-.215.281-.389.482-.509v-.11h.235c.137-.049.283-.074.433-.074h1.553V9.584h-1.264a8.5 8.5 0 00.741-1.405l-1.078-.381c-.24.631-.501 1.23-.806 1.786h-1.503l.686-.305c-.228-.501-.5-.959-.806-1.394l-1.034.348c.294.392.566.839.817 1.35zm-1.7 5.502h2.16l-.564 1.068h-1.595v-1.068zm-2.498-1.863l.152-1.561h1.96V8.289H7.277v.969h2.048v1.435h-1.84l-.306 3.51h2.254c0 1.155-.043 1.906-.12 2.255-.076.348-.38.523-.925.523-.305 0-.61-.022-.893-.055l.294 1.056.061.005c.282.02.546.039.81.039.991-.065 1.547-.414 1.677-1.046.11-.631.175-1.883.175-3.757H8.334zm5.09-.8v.85h-1.188v-.85h1.187zm-1.188-.955h1.187v-.893h-1.187v.893zm2.322.007v-.893h1.241v.893h-1.241zm.528 2.757a1.26 1.26 0 011.087-.627l4.003-.009a1.26 1.26 0 011.094.63l1.721 2.982c.226.39.225.872-.001 1.263l-1.743 3a1.26 1.26 0 01-1.086.628l-4.003.009a1.26 1.26 0 01-1.094-.63l-1.722-2.982a1.26 1.26 0 01.002-1.263l1.742-3zm1.967.858a1.26 1.26 0 00-1.08.614l-.903 1.513a1.26 1.26 0 00-.002 1.289l.885 1.492c.227.384.64.62 1.086.618l2.192-.005a1.26 1.26 0 001.08-.615l.904-1.518a1.26 1.26 0 00.001-1.288l-.884-1.489a1.26 1.26 0 00-1.086-.616l-2.193.005zm2.517 2.76a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z"
                ></path>
              </svg>
            </v-btn>
          </template>
          <!-- 弹幕设置菜单 -->
          <!-- 弹幕设置卡片 -->
          <v-card
            dark
            width="350"
            max-width="350"
            tile
            color="rgba(28,28,28,.9)"
          >
            <v-card-title class="text-body-1">弹幕设置</v-card-title>
            <v-card-text class="white--text text-caption">
              <v-divider></v-divider>
              <!-- 不透明度 -->
              <div class="d-flex align-center my-3">
                <span class="mr-3">不透明度</span>
                <v-slider
                  v-model="barrage.opacity"
                  min="0.1"
                  max="1"
                  step="0.1"
                  hide-details
                  thumb-label
                  thumb-color="error"
                  track-color="grey"
                  track-fill-color="error"
                >
                  <template #thumb-label="{ value }"
                    >{{ value * 100 + "%" }}
                  </template>
                </v-slider>
              </div>
              <!-- 弹幕字号-->
              <div class="d-flex align-center my-3">
                <span class="mr-3">弹幕字号</span>
                <v-slider
                  v-model="barrage.fontSize"
                  min="-1"
                  max="1"
                  step="1"
                  hide-details
                  thumb-color="error"
                  track-color="grey"
                  track-fill-color="error"
                  :tick-labels="['小', '适中', '大']"
                  tick-size="3"
                  class="text-caption grey--text font-weight-bold"
                >
                </v-slider>
              </div>
              <!-- 弹幕速度-->
              <div class="d-flex align-center my-3">
                <span class="mr-3">弹幕速度</span>
                <v-slider
                  v-model="barrage.speed"
                  min="-1"
                  max="1"
                  step="1"
                  hide-details
                  thumb-color="error"
                  track-color="grey"
                  track-fill-color="error"
                  :tick-labels="['慢', '适中', '快']"
                  tick-size="3"
                  class="text-caption grey--text font-weight-bold"
                >
                </v-slider>
              </div>
              <!-- 显示区域-->
              <div class="d-flex align-center my-3">
                <span class="mr-3">显示区域</span>
                <v-slider
                  v-model="barrage.area"
                  min="0.25"
                  max="1"
                  step="0.25"
                  hide-details
                  thumb-color="error"
                  track-color="grey"
                  track-fill-color="error"
                  :tick-labels="['1/4', '半屏', '3/4', '全屏']"
                  tick-size="3"
                  class="text-caption grey--text font-weight-bold"
                >
                </v-slider>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>

        <!-- 发送弹幕输入框 -->
        <v-text-field
          class="ml-2"
          dense
          hide-details
          solo
          background-color="grey lighten-2"
          placeholder="来笔弹幕压压惊！！！"
        ></v-text-field>
        <!-- 发送 -->
        <v-btn height="40" color="info" width="90" class="ml-2">发送</v-btn>
      </v-card-text>
    </v-card>

    <!-- 视频左侧底部左侧自定义控件 -->
    <div id="costomLeftControls">
      <button
        v-show="costomControls.footer.nextMedia"
        id="nextMedia"
        class="player-btn footer-control keyboard-input"
        title="下一集"
      >
        <svg
          t="1584686776454"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1682"
          width="23"
          height="23"
        >
          <path
            d="M783.14692466 563.21664097L240.85307534 879.55472126c-39.1656664 24.10194914-90.38230866-6.02548665-90.38230865-51.21664226v-632.676158c0-45.19115433 51.21664097-75.31859011 90.38230865-51.21664226l542.29384932 316.33808029c39.1656664 21.08920518 39.1656664 81.34407804 0 102.43328194z"
            p-id="1683"
            fill="#ffffff"
          ></path>
          <path
            d="M873.52923331 734.94302767c0 42.17841036-39.1656664 78.33133408-90.38230865 78.33133407s-90.38230866-36.15292371-90.38230735-78.33133407V289.05697233c0-42.17841036 39.1656664-78.33133408 90.38230735-78.33133407s90.38230866 36.15292371 90.38230865 78.33133407v445.88605534z"
            p-id="1684"
            fill="#ffffff"
          ></path>
        </svg>
      </button>
    </div>
    <!-- 视频右侧底部左侧自定义控件 -->
    <div id="costomRightControls">
      <!-- 弹幕设置 -->
      <button
        ref="barrageBtn"
        @mouseover="showBarrageMenu(true)"
        v-show="costomControls.footer.right.barrageSetting"
        class="player-btn footer-control keyboard-input pt-0"
      >
        <svg
          class="mt-3"
          fill="white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.645 4.881l1.06-1.473a.998.998 0 10-1.622-1.166L13.22 4.835a110.67 110.67 0 00-1.1-.007h-.131c-.47 0-.975.004-1.515.012L8.783 2.3A.998.998 0 007.12 3.408l.988 1.484c-.688.019-1.418.042-2.188.069a4.013 4.013 0 00-3.83 3.44c-.165 1.15-.245 2.545-.245 4.185 0 1.965.115 3.67.35 5.116a4.012 4.012 0 003.763 3.363c1.903.094 3.317.141 5.513.141a.988.988 0 000-1.975 97.58 97.58 0 01-5.416-.139 2.037 2.037 0 01-1.91-1.708c-.216-1.324-.325-2.924-.325-4.798 0-1.563.076-2.864.225-3.904.14-.977.96-1.713 1.945-1.747 2.444-.087 4.465-.13 6.063-.131 1.598 0 3.62.044 6.064.13.96.034 1.71.81 1.855 1.814.075.524.113 1.962.141 3.065v.002c.005.183.01.07.014-.038.004-.096.008-.189.011-.081a.987.987 0 101.974-.069c-.004-.105-.007-.009-.011.09-.002.056-.004.112-.007.135l-.002.01a.574.574 0 01-.005-.091v-.027c-.03-1.118-.073-2.663-.16-3.276-.273-1.906-1.783-3.438-3.74-3.507-.905-.032-1.752-.058-2.543-.079zm-3.113 4.703h-1.307v4.643h2.2v.04l.651-1.234c.113-.215.281-.389.482-.509v-.11h.235c.137-.049.283-.074.433-.074h1.553V9.584h-1.264a8.5 8.5 0 00.741-1.405l-1.078-.381c-.24.631-.501 1.23-.806 1.786h-1.503l.686-.305c-.228-.501-.5-.959-.806-1.394l-1.034.348c.294.392.566.839.817 1.35zm-1.7 5.502h2.16l-.564 1.068h-1.595v-1.068zm-2.498-1.863l.152-1.561h1.96V8.289H7.277v.969h2.048v1.435h-1.84l-.306 3.51h2.254c0 1.155-.043 1.906-.12 2.255-.076.348-.38.523-.925.523-.305 0-.61-.022-.893-.055l.294 1.056.061.005c.282.02.546.039.81.039.991-.065 1.547-.414 1.677-1.046.11-.631.175-1.883.175-3.757H8.334zm5.09-.8v.85h-1.188v-.85h1.187zm-1.188-.955h1.187v-.893h-1.187v.893zm2.322.007v-.893h1.241v.893h-1.241zm.528 2.757a1.26 1.26 0 011.087-.627l4.003-.009a1.26 1.26 0 011.094.63l1.721 2.982c.226.39.225.872-.001 1.263l-1.743 3a1.26 1.26 0 01-1.086.628l-4.003.009a1.26 1.26 0 01-1.094-.63l-1.722-2.982a1.26 1.26 0 01.002-1.263l1.742-3zm1.967.858a1.26 1.26 0 00-1.08.614l-.903 1.513a1.26 1.26 0 00-.002 1.289l.885 1.492c.227.384.64.62 1.086.618l2.192-.005a1.26 1.26 0 001.08-.615l.904-1.518a1.26 1.26 0 00.001-1.288l-.884-1.489a1.26 1.26 0 00-1.086-.616l-2.193.005zm2.517 2.76a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z"
          ></path>
        </svg>
        <!-- 弹幕设置卡片 -->
        <v-card
          ref="barrageMenu"
          @mouseleave="showBarrageMenu(false)"
          :style="{
            left: player.barrage.left + 'px',
            top: player.barrage.top + 'px',
          }"
          dark
          width="350"
          max-width="350"
          tile
          color="rgba(28,28,28,.9)"
        >
          <v-card-title class="text-body-1">弹幕设置</v-card-title>
          <v-card-text class="white--text text-caption">
            <v-divider></v-divider>
            <!-- 不透明度 -->
            <div class="d-flex align-center my-3">
              <span class="mr-3">不透明度</span>
              <v-slider
                v-model="barrage.opacity"
                min="0.1"
                max="1"
                step="0.1"
                hide-details
                thumb-label
                thumb-color="error"
                track-color="grey"
                track-fill-color="error"
              >
                <template #thumb-label="{ value }"
                  >{{ value * 100 + "%" }}
                </template>
              </v-slider>
            </div>
            <!-- 弹幕字号-->
            <div class="d-flex align-center my-3">
              <span class="mr-3">弹幕字号</span>
              <v-slider
                v-model="barrage.fontSize"
                min="-1"
                max="1"
                step="1"
                hide-details
                thumb-color="error"
                track-color="grey"
                track-fill-color="error"
                :tick-labels="['小', '适中', '大']"
                tick-size="3"
                class="text-caption grey--text font-weight-bold"
              >
              </v-slider>
            </div>
            <!-- 弹幕速度-->
            <div class="d-flex align-center my-3">
              <span class="mr-3">弹幕速度</span>
              <v-slider
                v-model="barrage.speed"
                min="-1"
                max="1"
                step="1"
                hide-details
                thumb-color="error"
                track-color="grey"
                track-fill-color="error"
                :tick-labels="['慢', '适中', '快']"
                tick-size="3"
                class="text-caption grey--text font-weight-bold"
              >
              </v-slider>
            </div>
            <!-- 显示区域-->
            <div class="d-flex align-center my-3">
              <span class="mr-3">显示区域</span>
              <v-slider
                v-model="barrage.area"
                min="0.25"
                max="1"
                step="0.25"
                hide-details
                thumb-color="error"
                track-color="grey"
                track-fill-color="error"
                :tick-labels="['1/4', '半屏', '3/4', '全屏']"
                tick-size="3"
                class="text-caption grey--text font-weight-bold"
              >
              </v-slider>
            </div>
          </v-card-text>
        </v-card>
      </button>
      <!-- 弹幕的打开和关闭 -->
      <button
        v-show="costomControls.footer.right.barrageOpenClose"
        class="player-btn footer-control keyboard-input"
      >
        <!-- 弹幕的打开 -->
        <svg
          fill="white"
          v-show="barrage.open"
          @click="barrage.open = false"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.989 4.828c-.47 0-.975.004-1.515.012l-1.71-2.566a1.008 1.008 0 00-1.678 1.118l.999 1.5c-.681.018-1.403.04-2.164.068a4.013 4.013 0 00-3.83 3.44c-.165 1.15-.245 2.545-.245 4.185 0 1.965.115 3.67.35 5.116a4.012 4.012 0 003.763 3.363l.906.046c1.205.063 1.808.095 3.607.095a.988.988 0 000-1.975c-1.758 0-2.339-.03-3.501-.092l-.915-.047a2.037 2.037 0 01-1.91-1.708c-.216-1.324-.325-2.924-.325-4.798 0-1.563.076-2.864.225-3.904.14-.977.96-1.713 1.945-1.747 2.444-.087 4.465-.13 6.063-.131 1.598 0 3.62.044 6.064.13.96.034 1.71.81 1.855 1.814.075.524.113 1.962.141 3.065v.002c.01.342.017.65.025.88a.987.987 0 101.974-.068c-.008-.226-.016-.523-.025-.856v-.027c-.03-1.118-.073-2.663-.16-3.276-.273-1.906-1.783-3.438-3.74-3.507-.9-.032-1.743-.058-2.531-.078l1.05-1.46a1.008 1.008 0 00-1.638-1.177l-1.862 2.59c-.38-.004-.744-.007-1.088-.007h-.13zm.521 4.775h-1.32v4.631h2.222v.847h-2.618v1.078h2.618l.003.678c.36.026.714.163 1.01.407h.11v-1.085h2.694v-1.078h-2.695v-.847H16.8v-4.63h-1.276a8.59 8.59 0 00.748-1.42L15.183 7.8a14.232 14.232 0 01-.814 1.804h-1.518l.693-.308a8.862 8.862 0 00-.814-1.408l-1.045.352c.297.396.572.847.825 1.364zm-4.18 3.564l.154-1.485h1.98V8.294h-3.2v.98H9.33v1.43H7.472l-.308 3.453h2.277c0 1.166-.044 1.925-.12 2.277-.078.352-.386.528-.936.528-.308 0-.616-.022-.902-.055l.297 1.067.062.005c.285.02.551.04.818.04 1.001-.067 1.562-.419 1.694-1.057.11-.638.176-1.903.176-3.795h-2.2zm7.458.11v-.858h-1.254v.858h1.254zm-2.376-.858v.858h-1.199v-.858h1.2zm-1.199-.946h1.2v-.902h-1.2v.902zm2.321 0v-.902h1.254v.902h-1.254z"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.846 14.627a1 1 0 00-1.412.075l-5.091 5.703-2.216-2.275-.097-.086-.008-.005a1 1 0 00-1.322 1.493l2.963 3.041.093.083.007.005c.407.315 1 .27 1.354-.124l5.81-6.505.08-.102.005-.008a1 1 0 00-.166-1.295z"
            fill="#00AEEC"
          ></path>
        </svg>
        <!-- 弹幕的关闭 -->
        <svg
          fill="white"
          v-show="!barrage.open"
          @click="barrage.open = true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.085 4.891l-.999-1.499a1.008 1.008 0 011.679-1.118l1.709 2.566c.54-.008 1.045-.012 1.515-.012h.13c.345 0 .707.003 1.088.007l1.862-2.59a1.008 1.008 0 011.637 1.177l-1.049 1.46c.788.02 1.631.046 2.53.078 1.958.069 3.468 1.6 3.74 3.507.088.613.13 2.158.16 3.276l.001.027c.01.333.017.63.025.856a.987.987 0 01-1.974.069c-.008-.23-.016-.539-.025-.881v-.002c-.028-1.103-.066-2.541-.142-3.065-.143-1.004-.895-1.78-1.854-1.813-2.444-.087-4.466-.13-6.064-.131-1.598 0-3.619.044-6.063.13a2.037 2.037 0 00-1.945 1.748c-.15 1.04-.225 2.341-.225 3.904 0 1.874.11 3.474.325 4.798.154.949.95 1.66 1.91 1.708a97.58 97.58 0 005.416.139.988.988 0 010 1.975c-2.196 0-3.61-.047-5.513-.141A4.012 4.012 0 012.197 17.7c-.236-1.446-.351-3.151-.351-5.116 0-1.64.08-3.035.245-4.184A4.013 4.013 0 015.92 4.96c.761-.027 1.483-.05 2.164-.069zm4.436 4.707h-1.32v4.63h2.222v.848h-2.618v1.078h2.431a5.01 5.01 0 013.575-3.115V9.598h-1.276a8.59 8.59 0 00.748-1.42l-1.089-.384a14.232 14.232 0 01-.814 1.804h-1.518l.693-.308a8.862 8.862 0 00-.814-1.408l-1.045.352c.297.396.572.847.825 1.364zm-4.18 3.564l.154-1.485h1.98V8.289h-3.2v.979h2.067v1.43H7.483l-.308 3.454h2.277c0 1.166-.044 1.925-.12 2.277-.078.352-.386.528-.936.528-.308 0-.616-.022-.902-.055l.297 1.067.062.004c.285.02.551.04.818.04 1.001-.066 1.562-.418 1.694-1.056.11-.638.176-1.903.176-3.795h-2.2zm7.458.11v-.858h-1.254v.858H15.8zm-2.376-.858v.858h-1.199v-.858h1.2zm-1.199-.946h1.2v-.902h-1.2v.902zm2.321 0v-.902H15.8v.902h-1.254zm3.517 10.594a4 4 0 100-8 4 4 0 000 8zm-.002-1.502a2.5 2.5 0 01-2.217-3.657l3.326 3.398a2.49 2.49 0 01-1.109.259zm2.5-2.5c0 .42-.103.815-.286 1.162l-3.328-3.401a2.5 2.5 0 013.614 2.239z"
          ></path>
        </svg>
      </button>
      <!-- 视频的倍速 -->
      <button
        ref="doubleSpeedBtn"
        @mouseover="showDoubleSpeedMenu(true)"
        class="player-btn footer-control keyboard-input"
        style="width: max-content; min-width: max-content"
      >
        <v-card
          ref="doubleSpeedMenu"
          color="rgba(28,28,28,.9)"
          tile
          dark
          @mouseleave="showDoubleSpeedMenu(false)"
          :style="{
            left: player.doubleSpeed.left + 'px',
            top: player.doubleSpeed.top + 'px',
          }"
          style="position: absolute"
          width="max-content"
          min-width="max-content"
        >
          <v-card-text class="pa-2">
            <v-list dense class="py-0" color="transparent">
              <v-list-item-group
                mandatory
                v-model="player.doubleSpeed.value"
                color="info"
              >
                <v-list-item
                  v-for="speed in player.doubleSpeed.list"
                  :key="speed.id"
                  :value="speed.speed"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ speed.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
        <span>{{
          player.doubleSpeed.value === 1
            ? "倍速"
            : player.doubleSpeed.value + "x"
        }}</span>
      </button>
      <!-- 视频的原画 -->
      <button
        ref="clarityBtn"
        @mouseover="showClarityMenu(true)"
        class="player-btn footer-control keyboard-input"
        style="width: max-content; min-width: max-content"
      >
        <v-card
          ref="clarityMenu"
          color="rgba(28,28,28,.9)"
          tile
          dark
          @mouseleave="showClarityMenu(false)"
          :style="{
            left: player.clarity.left + 'px',
            top: player.clarity.top + 'px',
          }"
          style="position: absolute"
          width="max-content"
          min-width="max-content"
        >
          <v-card-text class="pa-2">
            <v-list dense class="py-0" color="transparent">
              <v-list-item-group
                mandatory
                v-model="player.clarity.value"
                color="info"
              >
                <v-list-item
                  v-for="cla in player.clarity.list"
                  :key="cla.id"
                  :value="cla.name"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ cla.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
        原画
      </button>
      <!-- 视频的选集 -->
      <button
        ref="anthologyBtn"
        @mouseover="showAnthologyMenu(true)"
        style="width: max-content; min-width: max-content"
        class="player-btn footer-control keyboard-input"
        v-show="
          costomControls.footer.right.anthology.show &&
          collection !== undefined &&
          collection.length > 1
        "
      >
        <v-card
          ref="anthologyMenu"
          color="rgba(28,28,28,.9)"
          tile
          dark
          class="overflow-y-auto"
          @mouseleave="showAnthologyMenu(false)"
          :style="{
            left: player.anthology.left + 'px',
            top: player.anthology.top + 'px',
          }"
          style="position: absolute"
          width="max-content"
          max-height="450"
          min-width="max-content"
        >
          <v-card-text
            class="my-1 px-2 overflow-y-auto overflow-player"
            style="max-height: 350px"
          >
            <v-list dense class="py-0 text-left" color="transparent">
              <v-list-item-group
                mandatory
                v-model="player.anthology.value"
                color="info"
              >
                <v-list-item
                  v-for="(anth, index) in player.anthology.list"
                  :key="anth.id"
                  :value="anth.id"
                >
                  <v-list-item-icon class="mr-5">
                    <v-icon v-if="player.anthology.value === anth.id"
                      >mdi-play-protected-content</v-icon
                    >
                    <span v-else>{{ "p" + (index + 1) }}</span>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ anth.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
        选集
      </button>
      <!-- 发送弹幕输入框 -->
      <div
        style="width: 360px; min-width: 360px"
        class="mr-14"
        v-show="costomControls.footer.right.sendBarrage"
      >
        <div class="d-flex align-center" style="height: 100%">
          <!-- 输入框  hide-details 隐藏提示语句-->
          <v-text-field
            dense
            dark
            hide-details
            background-color="grey darken-4"
            placeholder="走过路过不要错过！！"
            append-outer-icon="mdi-send-circle"
            @click:append-outer=""
            solo
          ></v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "mui-player/dist/mui-player.min.css";
import MuiPlayer from "mui-player";
import MuiPlayerDesktopPlugin from "mui-player-desktop-plugin";
export default {
  name: "MuiPlayer",
  props: {
    // 视频编号
    id: {
      type: Number,
      required: true,
    },
    // 视频标题
    title: {
      type: String,
      required: true,
    },
    // 是否有下一级控件
    nextMedia: {
      type: Boolean,
      defaulted: false,
    },
    // 合集
    collection: {
      type: Array,
      defaulted: null,
    },
    // 封面
    poster: {
      type: String,
      required: true,
    },
    // 播放的时间
    playTime: {
      type: Number,
      defaulted: 0,
    },
  },
  data() {
    return {
      // 视频播放器对象
      mp: null,
      // 全屏
      fullScreen: {
        page: false, //网页是否全屏
        window: false, //全屏是否播放
      },
      // 播放器的配置
      player: {
        // 倍速
        doubleSpeed: {
          top: 1000, //倍速菜单的(上)位置
          left: 1000, //倍速菜单的(左)位置
          value: 1, //倍速值
          list: [], //倍速列表
        },
        // 清晰度
        clarity: {
          top: 1000, //清晰度菜单的(上)位置
          left: 1000, //清晰度菜单的(左)位置
          value: "", //清晰度的值
          list: [], //清晰度列表
        },
        // 清晰度
        anthology: {
          top: 1000, //清晰度菜单的(上)位置
          left: 1000, //清晰度菜单的(左)位置
          value: this.id, //清晰度的值
          list: this.collection, //清晰度列表
        },
        // 弹幕
        barrage: {
          top: 1000, //清晰度菜单的(上)位置
          left: 1000, //清晰度菜单的(左)位置
        },
      },
      // 弹幕的打开和关闭

      barrage: {
        open: true,
        opacity: 1, //不透明度
        fontSize: 0, //-1 小  0  适中  1 大
        speed: 0, //-1慢  0  适中  1 快
        area: 1, //0.25 1/4  0.5 2/4  0.75 3/4 1
      },
      // 自定义控件
      costomControls: {
        footer: {
          nextMedia: this.nextMedia,
          right: {
            sendBarrage: false, //发送弹幕的显示与隐藏
            barrageSetting: false, //弹幕设置是否显示
            barrageOpenClose: false, //弹幕开关控件是否显示
            anthology: {
              show: false, //选集控件是否显示
            },
          },
        },
      },
      config: {
        container: "#mui-player",
        title: this.title,
        src: "http://v.itheima.com/20天学会java/01、Java课程简介.mp4",
        //   封面
        poster: this.poster,
        plugins: [
          // pc端扩展插件
          new MuiPlayerDesktopPlugin({
            fullScaling: 1, //全屏时的控件缩放比例

            customSetting: [
              {
                name: "playbackRate", //播放倍速
                show: false, //不显示
              },
            ],
          }),
        ],
      },
    };
  },
  methods: {
    // 是否展示选集菜单
    showBarrageMenu(isShow) {
      // 显示菜单
      if (isShow) {
        // 获取清晰度控件元素
        let btn = this.$refs.barrageBtn.getBoundingClientRect();

        // 获取清晰度菜单元素
        let menu = this.$refs.barrageMenu.$el.getBoundingClientRect();

        // 获取宽度差
        let width_diff = btn.width - menu.width;

        // 清晰度菜单左侧距离
        this.player.barrage.left =
          (width_diff < 0 ? width_diff : -width_diff) / 2;
        // 清晰度菜单上部距离
        this.player.barrage.top = -(menu.height + 15);

        // 隐藏倍速菜单
        this.showDoubleSpeedMenu(false);
        // 隐藏清晰度菜单
        this.showClarityMenu(false);
        // 隐藏选集菜单
        this.showAnthologyMenu(false);
      } else {
        // 不显示菜单
        // 清晰度菜单左侧距离
        this.player.barrage.left = 1000;
        // 清晰度菜单上部距离
        this.player.barrage.top = 1000;
      }
    },
    // 是否展示选集菜单
    showAnthologyMenu(isShow) {
      // 显示菜单
      if (isShow) {
        // 获取清晰度控件元素
        let btn = this.$refs.anthologyBtn.getBoundingClientRect();

        // 获取清晰度菜单元素
        let menu = this.$refs.anthologyMenu.$el.getBoundingClientRect();

        // 获取宽度差
        let width_diff = btn.width - menu.width;

        // 清晰度菜单左侧距离
        this.player.anthology.left =
          (width_diff < 0 ? width_diff : -width_diff) / 2;
        // 清晰度菜单上部距离
        this.player.anthology.top = -(menu.height + 15);

        // 隐藏倍速菜单
        this.showDoubleSpeedMenu(false);
        // 隐藏清晰度菜单
        this.showClarityMenu(false);
        // 隐藏弹幕菜单
        this.showBarrageMenu(false);
      } else {
        // 不显示菜单
        // 清晰度菜单左侧距离
        this.player.anthology.left = 1000;
        // 清晰度菜单上部距离
        this.player.anthology.top = 1000;
      }
    },
    // 显示清晰度菜单
    showClarityMenu(isShow) {
      // 显示菜单
      if (isShow) {
        // 获取清晰度控件元素
        let btn = this.$refs.clarityBtn.getBoundingClientRect();

        // 获取清晰度菜单元素
        let menu = this.$refs.clarityMenu.$el.getBoundingClientRect();

        // 获取宽度差
        let width_diff = btn.width - menu.width;

        // 清晰度菜单左侧距离
        this.player.clarity.left =
          (width_diff < 0 ? width_diff : -width_diff) / 2;
        // 清晰度菜单上部距离
        this.player.clarity.top = -(menu.height + 15);

        // 隐藏倍速菜单
        this.showDoubleSpeedMenu(false);
        // 隐藏选集菜单
        this.showAnthologyMenu(false);
        // 隐藏弹幕菜单
        this.showBarrageMenu(false);
      } else {
        // 不显示菜单
        // 清晰度菜单左侧距离
        this.player.clarity.left = 1000;
        // 清晰度菜单上部距离
        this.player.clarity.top = 1000;
      }
    },
    //获取清晰度的列表
    getVedioClarityList() {
      let clarityArr = [
        {
          id: 1,
          name: "原画",
          src: "http://v.itheima.com/20天学会java/01、Java课程简介.mp4",
          defaulted: false,
        },
        {
          id: 2,
          name: "1080P 超清",
          src: "http://v.itheima.com/20天学会java/02、Java语言概述.mp4",
          defaulted: true,
        },
        {
          id: 3,
          name: "720P 高清",
          src: "http://v.itheima.com/20天学会java/03、Java开发环境搭建：JDK安装、常用命令行命令.mp4",
          defaulted: false,
        },
        {
          id: 4,
          name: "460P 标清",
          src: "http://v.itheima.com/20天学会java/04、Java入门程序：HelloWorld.mp4",
          defaulted: false,
        },
        {
          id: 5,
          name: "360P 流畅",
          src: "http://v.itheima.com/20天学会java/05、Java入门程序：常见问题.mp4",
          defaulted: false,
        },
      ];
      clarityArr.some((item) => {
        if (item.defaulted) {
          this.player.clarity.value = item.name;
          // 让当前清晰度的值等于视频地址
          this.config.src = item.src;
          return true;
        }
      });
      this.player.clarity.list = clarityArr;
    },
    // 隐藏所有的自定义菜单
    hideAllControls() {
      this.showDoubleSpeedMenu(false); //倍速菜单
      this.showClarityMenu(false); //清晰度菜单
      this.showAnthologyMenu(false); //隐藏选集的菜单
      this.showBarrageMenu(false); //隐藏弹幕菜单
    },
    // 显示倍速菜单
    showDoubleSpeedMenu(isShow) {
      // 显示菜单
      if (isShow) {
        // 获取倍速控件元素
        let btn = this.$refs.doubleSpeedBtn.getBoundingClientRect();

        // 获取倍速菜单元素
        let menu = this.$refs.doubleSpeedMenu.$el.getBoundingClientRect();

        // 获取宽度差
        let width_diff = btn.width - menu.width;

        // 倍速菜单左侧距离
        this.player.doubleSpeed.left =
          (width_diff < 0 ? width_diff : -width_diff) / 2;
        // 倍速菜单上部距离
        this.player.doubleSpeed.top = -(menu.height + 15);
        // 隐藏倍速菜单
        this.showClarityMenu(false);
        // 隐藏选集菜单
        this.showAnthologyMenu(false);
        // 隐藏弹幕菜单
        this.showBarrageMenu(false);
      } else {
        // 不显示菜单
        // 倍速菜单左侧距离
        this.player.doubleSpeed.left = 1000;
        // 倍速菜单上部距离
        this.player.doubleSpeed.top = 1000;
      }
    },
    // 获取倍速列表
    getVedioDoubleSpeeds() {
      this.player.doubleSpeed.list = [
        { id: 1, speed: 0.5, text: "0.5x" }, // 编号，倍速值，文本内容
        { id: 2, speed: 0.75, text: "0.75x" },
        { id: 3, speed: 1, text: "1x" },
        { id: 4, speed: 1.5, text: "1.5x" },
        { id: 5, speed: 2, text: "2x" },
      ];
    },
    // 向视频播放器中添加自定义的左侧控件
    addCustomLeftFooterControls() {
      // 获取左侧底部控件
      let leftPart = document.getElementById("left-part");
      // 时间控件
      let childNode = leftPart.childNodes[1];
      // 将自定义控件添加在时间控件之前
      leftPart.insertBefore(document.getElementById("nextMedia"), childNode);
    },
    // 向视频播放器中添加自定义的右侧控件
    addCustomRightFooterControls() {
      // 获取左侧底部控件
      let rightPart = document.getElementById("right-part");

      // 获取多个右侧控件
      let moveRightControls = document.getElementById(
        "costomRightControls"
      ).childNodes;

      // 使用循环添加底部控件
      while (moveRightControls.length !== 0) {
        rightPart.prepend(moveRightControls[0]);
      }
    },
  },
  watch: {
    // 切换清晰度
    "player.clarity.value"(newData) {
      if (this.mp !== null) {
        // 获取视频播放的当前时间
        let currentTime = this.mp.video().currentTime;

        // 切换清晰度对应的视频地址
        let clarityList = this.player.clarity.list;
        clarityList.some((item) => {
          if (item.name === newData) {
            this.mp.video().src = item.src;
            this.mp.video().currentTime = currentTime;
            this.mp.video().play();
            // 提示语句
            this.mp.showToast({
              message: item.name + "切换成功",
              style: {
                backgroundColor: "#2caf49",
                color: "#FFF",
                fontSize: "12px",
              },
            });

            // 关闭清晰度菜单
            this.showClarityMenu(false);
            return true;
          }
        });
      }
    },
    // 点击倍数值是否发生变化
    "player.doubleSpeed.value"(newData) {
      // 隐藏倍速菜单
      this.showDoubleSpeedMenu(false);
      // 调整视频速度
      if (this.mp) {
        // 设置视频的播放速度
        this.mp.video().playbackRate = newData;
      }
    },
    // 是否网页或者全屏播放
    fullScreen: {
      deep: true,
      handler(newData) {
        if (newData.page || newData.window) {
          this.costomControls.footer.right.sendBarrage = true;
          this.costomControls.footer.right.barrageSetting = true;
          this.costomControls.footer.right.barrageOpenClose = true;
          this.costomControls.footer.right.anthology.show = true;
        } else {
          this.costomControls.footer.right.sendBarrage = false;
          this.costomControls.footer.right.barrageSetting = false;
          this.costomControls.footer.right.barrageOpenClose = false;
          this.costomControls.footer.right.anthology.show = false;
        }
      },
    },
  },
  mounted() {
    // 初始化 MuiPlayer 插件，MuiPlayer 方法传递一个对象，该对象包括所有插件的配置
    let mpr = new MuiPlayer(this.config);

    //     监听播放器已创建完成
    mpr.on("ready", (event) => {
      this.mp = mpr;

      this.addCustomLeftFooterControls();
      this.addCustomRightFooterControls();
      // 获取所有的播放器控件
      Array.from(this.mp.getControls()).forEach((ele, index) => {
        if ([4, 5, 6, 7, 8, 9].indexOf(index) !== -1) {
          // 播放、音量、画中画、设置、页面全屏、全屏===监听鼠标悬浮
          ele.onmouseover = () => {
            this.hideAllControls();
          };
        }
      });

      // 当鼠标移出整个底部控件容器的时候，也要隐藏
      document.getElementById("mui-player").onmouseleave = () => {
        this.hideAllControls();
      };
      // 当鼠标放到下一级的时候，也要监听
      document.getElementById("nextMedia").onmouseover = () => {
        this.showDoubleSpeedMenu(false);
      };

      //控制台显示和隐藏的切换
      this.mp.on("controls-toggle", (data) => {
        if (!data.show) {
          // 隐藏倍速菜单
          this.hideAllControls();
        }
      });

      //监听网页是否全局播放
      this.mp.on("pagefull-change", (data) => {
        if (data.pagefull) {
          this.fullScreen.page = true;
          this.fullScreen.window = false;
        } else {
          this.fullScreen.page = false;
        }
      });
      //监听是否全局播放
      this.mp.on("fullscreen-change", (data) => {
        if (data.fullscreen) {
          this.fullScreen.window = true;
          this.fullScreen.page = false;
        } else {
          this.fullScreen.window = false;
        }
      });
    });
  },
  created() {
    this.getVedioDoubleSpeeds();
    this.getVedioClarityList();
  },
};
</script>

<style scoped lang="less">
// 滚动条的设置
.overflow-player::-webkit-scrollbar {
  width: 5px;
  background-color: #a7a5a5;
  border-radius: 5px;
}
.overflow-player::-webkit-scrollbar-thumb {
  background-color: #267ac4;
  border-radius: 5px;
}
</style>
