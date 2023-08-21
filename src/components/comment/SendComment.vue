<template>
  <v-list-item dense>
    <v-list-item-avatar size="50" class="align-self-start mt-5">
      <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        <v-textarea
          :id="'commentText-' + type + '-' + commentId"
          no-resize
          hide-details
          rows="2"
          outlined
          v-model="commentText"
        ></v-textarea>
      </v-list-item-title>
      <v-list-item-subtitle class="py-1">
        <!-- 表情菜单 -->
        <v-menu offset-y :close-on-content-click="false" v-model="tabMenu">
          <template v-slot:activator="{ on, attrs }">
            <!-- 表情包按钮 -->
            <v-btn small color="#F5F5F5" v-bind="attrs" v-on="on">
              <v-icon>mdi-emoticon-outline</v-icon>
              表情
            </v-btn>
          </template>
          <v-sheet width="500">
            <v-container>
              <v-tabs v-model="tabValue" slider-size="4">
                <v-tab v-for="emoji in emojis" :key="emoji.id">{{
                  emoji.name
                }}</v-tab>

                <v-tab-item v-for="emoji in emojis" :key="emoji.id">
                  <v-container>
                    <a
                      v-for="emoji1 in emoji.iconArr"
                      :key="emoji1.id"
                      class="d-inline-block text-center"
                      style="font-size: 25px; width: 35px; height: 35px"
                      @click="sendEmoji(emoji1.icon)"
                      >{{ emoji1.icon }}</a
                    >
                  </v-container>
                </v-tab-item>
                <v-tab-item>2</v-tab-item>
              </v-tabs>
            </v-container>
          </v-sheet>
        </v-menu>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action class="align-self-start mt-0 pt-2">
      <v-btn height="66" color="info">发送</v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "",
  props: {
    //文本框的id编号
    commentId: { type: Number, required: true },
    // 1.博客的评论  2.视频的评论 3.评论
    type: { type: Number, required: true },
    show: { type: Boolean, default: true },
  },
  data() {
    return {
      // 表情包
      emojis: [],
      tabMenu: false,
      tabValue: 0, //表情包tab栏的值
      commentText: "", //发送评论的内容
    };
  },
  watch: {
    show(newData) {
      // 如果show的值是false，则清空评论内容的值
      if (!newData) {
        this.commentText = "";
      }
    },
  },
  methods: {
    // 获取表情包
    getMeojis() {
      this.emojis = [
        {
          id: 1,
          name: "表情",
          iconArr: [
            {
              id: 1,
              icon: "😄",
            },
            {
              id: 2,
              icon: "😃",
            },
            {
              id: 3,
              icon: "😀",
            },
            {
              id: 4,
              icon: "😊",
            },
            {
              id: 5,
              icon: "😉",
            },
            {
              id: 6,
              icon: "😍",
            },
            {
              id: 7,
              icon: "😘",
            },
            {
              id: 8,
              icon: "😚",
            },
            {
              id: 9,
              icon: "😗",
            },
            {
              id: 10,
              icon: "😙",
            },
            {
              id: 11,
              icon: "😜",
            },
            {
              id: 12,
              icon: "😝",
            },
            {
              id: 13,
              icon: "😛",
            },
            {
              id: 14,
              icon: "😳",
            },
            {
              id: 15,
              icon: "😁",
            },
            {
              id: 16,
              icon: "😔",
            },
            {
              id: 17,
              icon: "😌",
            },
            {
              id: 18,
              icon: "😒",
            },
            {
              id: 19,
              icon: "😞",
            },
            {
              id: 20,
              icon: "😣",
            },
            {
              id: 21,
              icon: "😢",
            },
            {
              id: 22,
              icon: "😂",
            },
            {
              id: 23,
              icon: "😭",
            },
            {
              id: 24,
              icon: "😪",
            },
            {
              id: 25,
              icon: "😥",
            },
            {
              id: 26,
              icon: "😰",
            },
            {
              id: 27,
              icon: "😅",
            },
            {
              id: 28,
              icon: "😓",
            },
            {
              id: 29,
              icon: "😩",
            },
            {
              id: 30,
              icon: "😫",
            },
            {
              id: 31,
              icon: "😨",
            },
            {
              id: 32,
              icon: "😱",
            },
            {
              id: 33,
              icon: "😠",
            },
            {
              id: 34,
              icon: "😡",
            },
            {
              id: 35,
              icon: "😤",
            },
            {
              id: 36,
              icon: "😖",
            },
            {
              id: 37,
              icon: "😆",
            },
            {
              id: 38,
              icon: "😋",
            },
            {
              id: 39,
              icon: "😷",
            },
            {
              id: 40,
              icon: "😎",
            },
            {
              id: 41,
              icon: "😴",
            },
            {
              id: 42,
              icon: "😵",
            },
            {
              id: 43,
              icon: "😲",
            },
            {
              id: 44,
              icon: "😟",
            },
            {
              id: 45,
              icon: "😦",
            },
            {
              id: 46,
              icon: "😧",
            },
            {
              id: 47,
              icon: "😈",
            },
            {
              id: 48,
              icon: "👿",
            },
            {
              id: 49,
              icon: "😮",
            },
            {
              id: 50,
              icon: "😬",
            },
            {
              id: 51,
              icon: "😐",
            },
            {
              id: 52,
              icon: "😕",
            },
            {
              id: 53,
              icon: "😯",
            },
            {
              id: 54,
              icon: "😶",
            },
            {
              id: 55,
              icon: "😇",
            },
            {
              id: 56,
              icon: "😏",
            },
            {
              id: 57,
              icon: "😑",
            },
            {
              id: 58,
              icon: "😺",
            },
            {
              id: 59,
              icon: "😸",
            },
            {
              id: 60,
              icon: "😻",
            },
            {
              id: 61,
              icon: "😽",
            },
            {
              id: 62,
              icon: "😼",
            },
            {
              id: 63,
              icon: "🙀",
            },
            {
              id: 64,
              icon: "😿",
            },
            {
              id: 65,
              icon: "😹",
            },
            {
              id: 66,
              icon: "😾",
            },
            {
              id: 67,
              icon: "👹",
            },
            {
              id: 68,
              icon: "👺",
            },
          ],
        },
        {
          id: 2,
          name: "动物",
          iconArr: [
            {
              id: 69,
              icon: "🐶",
            },
            {
              id: 70,
              icon: "🐺",
            },
            {
              id: 71,
              icon: "🐱",
            },
            {
              id: 72,
              icon: "🐭",
            },
            {
              id: 73,
              icon: "🐹",
            },
            {
              id: 74,
              icon: "🐰",
            },
            {
              id: 75,
              icon: "🐸",
            },
            {
              id: 76,
              icon: "🐨",
            },
            {
              id: 77,
              icon: "🐻",
            },
            {
              id: 78,
              icon: "🐷",
            },
            {
              id: 79,
              icon: "🐽",
            },
            {
              id: 80,
              icon: "🐮",
            },
            {
              id: 81,
              icon: "🐗",
            },
            {
              id: 82,
              icon: "🐵",
            },
            {
              id: 83,
              icon: "🐒",
            },
            {
              id: 84,
              icon: "🐴",
            },
            {
              id: 85,
              icon: "🐑",
            },
            {
              id: 86,
              icon: "🐘",
            },
            {
              id: 87,
              icon: "🐼",
            },
            {
              id: 88,
              icon: "🐧",
            },
            {
              id: 89,
              icon: "🐦",
            },
            {
              id: 90,
              icon: "🐤",
            },
            {
              id: 91,
              icon: "🐥",
            },
            {
              id: 92,
              icon: "🐣",
            },
            {
              id: 93,
              icon: "🐔",
            },
            {
              id: 94,
              icon: "🐍",
            },
            {
              id: 95,
              icon: "🐢",
            },
            {
              id: 96,
              icon: "🐛",
            },
            {
              id: 97,
              icon: "🐝",
            },
            {
              id: 98,
              icon: "🐜",
            },
            {
              id: 99,
              icon: "🐞",
            },
            {
              id: 100,
              icon: "🐌",
            },
            {
              id: 101,
              icon: "🐙",
            },
            {
              id: 102,
              icon: "🐠",
            },
            {
              id: 103,
              icon: "🐟",
            },
            {
              id: 104,
              icon: "🐬",
            },
            {
              id: 105,
              icon: "🐳",
            },
            {
              id: 106,
              icon: "🐋",
            },
            {
              id: 107,
              icon: "🐄",
            },
            {
              id: 108,
              icon: "🐏",
            },
            {
              id: 109,
              icon: "🐀",
            },
            {
              id: 110,
              icon: "🐃",
            },
            {
              id: 111,
              icon: "🐅",
            },
            {
              id: 112,
              icon: "🐇",
            },
            {
              id: 113,
              icon: "🐉",
            },
            {
              id: 114,
              icon: "🐎",
            },
            {
              id: 115,
              icon: "🐐",
            },
            {
              id: 116,
              icon: "🐓",
            },
            {
              id: 117,
              icon: "🐕",
            },
            {
              id: 118,
              icon: "🐖",
            },
            {
              id: 119,
              icon: "🐁",
            },
            {
              id: 120,
              icon: "🐂",
            },
            {
              id: 121,
              icon: "🐲",
            },
            {
              id: 122,
              icon: "🐡",
            },
            {
              id: 123,
              icon: "🐊",
            },
            {
              id: 124,
              icon: "🐫",
            },
            {
              id: 125,
              icon: "🐪",
            },
            {
              id: 126,
              icon: "🐆",
            },
            {
              id: 127,
              icon: "🐈",
            },
            {
              id: 128,
              icon: "🐩",
            },
            {
              id: 129,
              icon: "🐾",
            },
            {
              id: 130,
              icon: "🙈",
            },
            {
              id: 131,
              icon: "🙉",
            },
            {
              id: 132,
              icon: "💀",
            },
            {
              id: 133,
              icon: "👽",
            },
            {
              id: 134,
              icon: "😺",
            },
            {
              id: 135,
              icon: "😸",
            },
            {
              id: 136,
              icon: "😻",
            },
            {
              id: 137,
              icon: "😽",
            },
            {
              id: 138,
              icon: "😼",
            },
            {
              id: 139,
              icon: "🙀",
            },
            {
              id: 140,
              icon: "😿",
            },
            {
              id: 141,
              icon: "😹",
            },
            {
              id: 142,
              icon: "😾",
            },
          ],
        },
        {
          id: 3,
          name: "食物",
          iconArr: [
            {
              id: 143,
              icon: "☕",
            },
            {
              id: 144,
              icon: "🍵",
            },
            {
              id: 145,
              icon: "🍶",
            },
            {
              id: 146,
              icon: "🍼",
            },
            {
              id: 147,
              icon: "🍺",
            },
            {
              id: 148,
              icon: "🍻",
            },
            {
              id: 149,
              icon: "🍸",
            },
            {
              id: 150,
              icon: "🍹",
            },
            {
              id: 151,
              icon: "🍷",
            },
            {
              id: 152,
              icon: "🍴",
            },
            {
              id: 153,
              icon: "🍕",
            },
            {
              id: 154,
              icon: "🍔",
            },
            {
              id: 155,
              icon: "🍟",
            },
            {
              id: 156,
              icon: "🍗",
            },
            {
              id: 157,
              icon: "🍖",
            },
            {
              id: 158,
              icon: "🍝",
            },
            {
              id: 159,
              icon: "🍛",
            },
            {
              id: 160,
              icon: "🍤",
            },
            {
              id: 161,
              icon: "🍣",
            },
            {
              id: 162,
              icon: "🍥",
            },
            {
              id: 163,
              icon: "🍙",
            },
            {
              id: 164,
              icon: "🍘",
            },
            {
              id: 165,
              icon: "🍚",
            },
            {
              id: 166,
              icon: "🍜",
            },
            {
              id: 167,
              icon: "🍲",
            },
            {
              id: 168,
              icon: "🍢",
            },
            {
              id: 169,
              icon: "🍡",
            },
            {
              id: 170,
              icon: "🍳",
            },
            {
              id: 171,
              icon: "🍞",
            },
            {
              id: 172,
              icon: "🍩",
            },
            {
              id: 173,
              icon: "🍮",
            },
            {
              id: 174,
              icon: "🍦",
            },
            {
              id: 175,
              icon: "🍨",
            },
            {
              id: 176,
              icon: "🍧",
            },
            {
              id: 177,
              icon: "🎂",
            },
            {
              id: 178,
              icon: "🍰",
            },
            {
              id: 179,
              icon: "🍪",
            },
            {
              id: 180,
              icon: "🍫",
            },
            {
              id: 181,
              icon: "🍬",
            },
            {
              id: 182,
              icon: "🍭",
            },
            {
              id: 183,
              icon: "🍯",
            },
            {
              id: 184,
              icon: "🍎",
            },
            {
              id: 185,
              icon: "🍏",
            },
            {
              id: 186,
              icon: "🍊",
            },
            {
              id: 187,
              icon: "🍋",
            },
            {
              id: 188,
              icon: "🍒",
            },
            {
              id: 189,
              icon: "🍇",
            },
            {
              id: 190,
              icon: "🍉",
            },
            {
              id: 191,
              icon: "🍓",
            },
            {
              id: 192,
              icon: "🍑",
            },
            {
              id: 193,
              icon: "🍈",
            },
            {
              id: 194,
              icon: "🍌",
            },
            {
              id: 195,
              icon: "🍐",
            },
            {
              id: 196,
              icon: "🍍",
            },
            {
              id: 197,
              icon: "🍠",
            },
            {
              id: 198,
              icon: "🍆",
            },
            {
              id: 199,
              icon: "🍅",
            },
            {
              id: 200,
              icon: "🌽",
            },
          ],
        },
        {
          id: 4,
          name: "自然",
          iconArr: [
            {
              id: 201,
              icon: "💐",
            },
            {
              id: 202,
              icon: "🌸",
            },
            {
              id: 203,
              icon: "🌷",
            },
            {
              id: 204,
              icon: "🍀",
            },
            {
              id: 205,
              icon: "🌹",
            },
            {
              id: 206,
              icon: "🌻",
            },
            {
              id: 207,
              icon: "🌺",
            },
            {
              id: 208,
              icon: "🍁",
            },
            {
              id: 209,
              icon: "🍃",
            },
            {
              id: 210,
              icon: "🍂",
            },
            {
              id: 211,
              icon: "🌿",
            },
            {
              id: 212,
              icon: "🌾",
            },
            {
              id: 213,
              icon: "🍄",
            },
            {
              id: 214,
              icon: "🌵",
            },
            {
              id: 215,
              icon: "🌴",
            },
            {
              id: 216,
              icon: "🌲",
            },
            {
              id: 217,
              icon: "🌳",
            },
            {
              id: 218,
              icon: "🌰",
            },
            {
              id: 219,
              icon: "🌱",
            },
            {
              id: 220,
              icon: "🌼",
            },
            {
              id: 221,
              icon: "🌐",
            },
            {
              id: 222,
              icon: "🌞",
            },
            {
              id: 223,
              icon: "🌝",
            },
            {
              id: 224,
              icon: "🌚",
            },
            {
              id: 225,
              icon: "🌑",
            },
            {
              id: 226,
              icon: "🌒",
            },
            {
              id: 227,
              icon: "🌓",
            },
            {
              id: 228,
              icon: "🌔",
            },
            {
              id: 229,
              icon: "🌕",
            },
            {
              id: 230,
              icon: "🌖",
            },
            {
              id: 231,
              icon: "🌗",
            },
            {
              id: 232,
              icon: "🌜",
            },
            {
              id: 233,
              icon: "🌛",
            },
            {
              id: 234,
              icon: "🌙",
            },
            {
              id: 235,
              icon: "🌍",
            },
            {
              id: 236,
              icon: "🌎",
            },
            {
              id: 237,
              icon: "🌏",
            },
            {
              id: 238,
              icon: "🌋",
            },
            {
              id: 239,
              icon: "🌌",
            },
            {
              id: 240,
              icon: "🌠",
            },
            {
              id: 241,
              icon: "⭐",
            },
            {
              id: 242,
              icon: "☀",
            },
            {
              id: 243,
              icon: "⛅",
            },
            {
              id: 244,
              icon: "☁",
            },
            {
              id: 245,
              icon: "⚡",
            },
            {
              id: 246,
              icon: "☔",
            },
            {
              id: 247,
              icon: "❄",
            },
            {
              id: 248,
              icon: "⛄",
            },
            {
              id: 249,
              icon: "🌀",
            },
            {
              id: 250,
              icon: "🌁",
            },
            {
              id: 251,
              icon: "🌈",
            },
            {
              id: 252,
              icon: "🌊",
            },
            {
              id: 253,
              icon: "🔥",
            },
            {
              id: 254,
              icon: "✨",
            },
            {
              id: 255,
              icon: "🌟",
            },
            {
              id: 256,
              icon: "💫",
            },
            {
              id: 257,
              icon: "💥",
            },
            {
              id: 258,
              icon: "💢",
            },
            {
              id: 259,
              icon: "💦",
            },
            {
              id: 260,
              icon: "💧",
            },
            {
              id: 261,
              icon: "🌘",
            },
            {
              id: 262,
              icon: "💤",
            },
            {
              id: 263,
              icon: "💨",
            },
          ],
        },
        {
          id: 5,
          name: "生肖",
          iconArr: [
            {
              id: 264,
              icon: "🐁",
            },
            {
              id: 265,
              icon: "🐂",
            },
            {
              id: 266,
              icon: "🐅",
            },
            {
              id: 267,
              icon: "🐇",
            },
            {
              id: 268,
              icon: "🐉",
            },
            {
              id: 269,
              icon: "🐍",
            },
            {
              id: 270,
              icon: "🐎",
            },
            {
              id: 271,
              icon: "🐐",
            },
            {
              id: 272,
              icon: "🐒",
            },
            {
              id: 273,
              icon: "🐓",
            },
            {
              id: 274,
              icon: "🐕",
            },
            {
              id: 275,
              icon: "🐖",
            },
            {
              id: 276,
              icon: "♈",
            },
            {
              id: 277,
              icon: "♉",
            },
            {
              id: 278,
              icon: "♊",
            },
            {
              id: 279,
              icon: "♋",
            },
            {
              id: 280,
              icon: "♌",
            },
            {
              id: 281,
              icon: "♍",
            },
            {
              id: 282,
              icon: "♎",
            },
            {
              id: 283,
              icon: "♏",
            },
            {
              id: 284,
              icon: "♐",
            },
            {
              id: 285,
              icon: "♑",
            },
            {
              id: 286,
              icon: "♒",
            },
            {
              id: 287,
              icon: "♓",
            },
          ],
        },
        {
          id: 6,
          name: "运动",
          iconArr: [
            {
              id: 288,
              icon: "📰",
            },
            {
              id: 289,
              icon: "🎨",
            },
            {
              id: 290,
              icon: "🎬",
            },
            {
              id: 291,
              icon: "🎤",
            },
            {
              id: 292,
              icon: "🎧",
            },
            {
              id: 293,
              icon: "🎼",
            },
            {
              id: 294,
              icon: "🎵",
            },
            {
              id: 295,
              icon: "🎶",
            },
            {
              id: 296,
              icon: "🎹",
            },
            {
              id: 297,
              icon: "🎻",
            },
            {
              id: 298,
              icon: "🎷",
            },
            {
              id: 299,
              icon: "🎸",
            },
            {
              id: 300,
              icon: "👾",
            },
            {
              id: 301,
              icon: "🎮",
            },
            {
              id: 302,
              icon: "🃏",
            },
            {
              id: 303,
              icon: "🎴",
            },
            {
              id: 304,
              icon: "🀄",
            },
            {
              id: 305,
              icon: "🎲",
            },
            {
              id: 306,
              icon: "🎯",
            },
            {
              id: 307,
              icon: "🏈",
            },
            {
              id: 308,
              icon: "🏀",
            },
            {
              id: 309,
              icon: "⚽",
            },
            {
              id: 310,
              icon: "⚾",
            },
            {
              id: 311,
              icon: "🎾",
            },
            {
              id: 312,
              icon: "🎱",
            },
            {
              id: 313,
              icon: "🏉",
            },
            {
              id: 314,
              icon: "🎳",
            },
            {
              id: 315,
              icon: "⛳",
            },
            {
              id: 316,
              icon: "🚵",
            },
            {
              id: 317,
              icon: "🚴",
            },
            {
              id: 318,
              icon: "🏁",
            },
            {
              id: 319,
              icon: "🏇",
            },
            {
              id: 320,
              icon: "🏆",
            },
            {
              id: 321,
              icon: "🎿",
            },
            {
              id: 322,
              icon: "🏂",
            },
            {
              id: 323,
              icon: "🏊",
            },
            {
              id: 324,
              icon: "🏄",
            },
            {
              id: 325,
              icon: "🎣",
            },
          ],
        },
        {
          id: 7,
          name: "人物",
          iconArr: [
            {
              id: 326,
              icon: "👂",
            },
            {
              id: 327,
              icon: "👀",
            },
            {
              id: 328,
              icon: "👃",
            },
            {
              id: 329,
              icon: "👅",
            },
            {
              id: 330,
              icon: "👄",
            },
            {
              id: 331,
              icon: "👍",
            },
            {
              id: 332,
              icon: "👎",
            },
            {
              id: 333,
              icon: "👌",
            },
            {
              id: 334,
              icon: "👊",
            },
            {
              id: 335,
              icon: "✊",
            },
            {
              id: 336,
              icon: "✌",
            },
            {
              id: 337,
              icon: "👋",
            },
            {
              id: 338,
              icon: "✋",
            },
            {
              id: 339,
              icon: "👐",
            },
            {
              id: 340,
              icon: "👆",
            },
            {
              id: 341,
              icon: "👇",
            },
            {
              id: 342,
              icon: "👉",
            },
            {
              id: 343,
              icon: "👈",
            },
            {
              id: 344,
              icon: "🙌",
            },
            {
              id: 345,
              icon: "🙏",
            },
            {
              id: 346,
              icon: "☝",
            },
            {
              id: 347,
              icon: "👏",
            },
            {
              id: 348,
              icon: "🚶",
            },
            {
              id: 349,
              icon: "💪",
            },
            {
              id: 350,
              icon: "🏃",
            },
            {
              id: 351,
              icon: "💃",
            },
            {
              id: 352,
              icon: "👫",
            },
            {
              id: 353,
              icon: "👪",
            },
            {
              id: 354,
              icon: "👬",
            },
            {
              id: 355,
              icon: "👭",
            },
            {
              id: 356,
              icon: "💏",
            },
            {
              id: 357,
              icon: "💑",
            },
            {
              id: 358,
              icon: "👯",
            },
            {
              id: 359,
              icon: "🙆",
            },
            {
              id: 360,
              icon: "🙅",
            },
            {
              id: 361,
              icon: "💁",
            },
            {
              id: 362,
              icon: "🙋",
            },
            {
              id: 363,
              icon: "💇",
            },
            {
              id: 364,
              icon: "💅",
            },
            {
              id: 365,
              icon: "👰",
            },
            {
              id: 366,
              icon: "🙎",
            },
            {
              id: 367,
              icon: "🙍",
            },
            {
              id: 368,
              icon: "🙇",
            },
            {
              id: 369,
              icon: "🎩",
            },
            {
              id: 370,
              icon: "👑",
            },
            {
              id: 371,
              icon: "👒",
            },
            {
              id: 372,
              icon: "👟",
            },
            {
              id: 373,
              icon: "👞",
            },
            {
              id: 374,
              icon: "👡",
            },
            {
              id: 375,
              icon: "👠",
            },
            {
              id: 376,
              icon: "👢",
            },
            {
              id: 377,
              icon: "👕",
            },
            {
              id: 378,
              icon: "👔",
            },
            {
              id: 379,
              icon: "👚",
            },
            {
              id: 380,
              icon: "👗",
            },
            {
              id: 381,
              icon: "🎽",
            },
            {
              id: 382,
              icon: "👖",
            },
            {
              id: 383,
              icon: "👘",
            },
            {
              id: 384,
              icon: "👙",
            },
            {
              id: 385,
              icon: "💼",
            },
            {
              id: 386,
              icon: "👜",
            },
            {
              id: 387,
              icon: "👝",
            },
            {
              id: 388,
              icon: "👛",
            },
            {
              id: 389,
              icon: "👓",
            },
            {
              id: 390,
              icon: "🎀",
            },
            {
              id: 391,
              icon: "🌂",
            },
            {
              id: 392,
              icon: "💄",
            },
            {
              id: 393,
              icon: "💋",
            },
            {
              id: 394,
              icon: "👣",
            },
            {
              id: 395,
              icon: "💎",
            },
            {
              id: 396,
              icon: "💍",
            },
          ],
        },
        {
          id: 8,
          name: "花样",
          iconArr: [
            {
              id: 397,
              icon: "👑",
            },
            {
              id: 398,
              icon: "🔥",
            },
            {
              id: 399,
              icon: "✨",
            },
            {
              id: 400,
              icon: "🌟",
            },
            {
              id: 401,
              icon: "💫",
            },
            {
              id: 402,
              icon: "💥",
            },
            {
              id: 403,
              icon: "🎀",
            },
            {
              id: 404,
              icon: "🌂",
            },
            {
              id: 405,
              icon: "💄",
            },
            {
              id: 406,
              icon: "💛",
            },
            {
              id: 407,
              icon: "💙",
            },
            {
              id: 408,
              icon: "💜",
            },
            {
              id: 409,
              icon: "💚",
            },
            {
              id: 410,
              icon: "❤",
            },
            {
              id: 411,
              icon: "💔",
            },
            {
              id: 412,
              icon: "💗",
            },
            {
              id: 413,
              icon: "💓",
            },
            {
              id: 414,
              icon: "💕",
            },
            {
              id: 415,
              icon: "💖",
            },
            {
              id: 416,
              icon: "💞",
            },
            {
              id: 417,
              icon: "💘",
            },
            {
              id: 418,
              icon: "💌",
            },
            {
              id: 419,
              icon: "💋",
            },
            {
              id: 420,
              icon: "🎍",
            },
            {
              id: 421,
              icon: "💝",
            },
            {
              id: 422,
              icon: "🎎",
            },
            {
              id: 423,
              icon: "🎒",
            },
            {
              id: 424,
              icon: "🎓",
            },
            {
              id: 425,
              icon: "🎏",
            },
            {
              id: 426,
              icon: "🎆",
            },
            {
              id: 427,
              icon: "🎇",
            },
            {
              id: 428,
              icon: "🎐",
            },
            {
              id: 429,
              icon: "🎑",
            },
            {
              id: 430,
              icon: "🎃",
            },
            {
              id: 431,
              icon: "👻",
            },
            {
              id: 432,
              icon: "🎅",
            },
            {
              id: 433,
              icon: "🎄",
            },
            {
              id: 434,
              icon: "🎁",
            },
            {
              id: 435,
              icon: "🎋",
            },
            {
              id: 436,
              icon: "🎉",
            },
            {
              id: 437,
              icon: "🎊",
            },
            {
              id: 438,
              icon: "🎈",
            },
            {
              id: 439,
              icon: "🎌",
            },
          ],
        },
        {
          id: 9,
          name: "文字",
          iconArr: [
            {
              id: 440,
              icon: "🈯",
            },
            {
              id: 441,
              icon: "🈳",
            },
            {
              id: 442,
              icon: "🈵",
            },
            {
              id: 443,
              icon: "🈴",
            },
            {
              id: 444,
              icon: "🈲",
            },
            {
              id: 445,
              icon: "🉐",
            },
            {
              id: 446,
              icon: "🈹",
            },
            {
              id: 447,
              icon: "🈺",
            },
            {
              id: 448,
              icon: "🈶",
            },
            {
              id: 449,
              icon: "🈚",
            },
            {
              id: 450,
              icon: "🚾",
            },
            {
              id: 451,
              icon: "🅿",
            },
            {
              id: 452,
              icon: "🈷",
            },
            {
              id: 453,
              icon: "🈸",
            },
            {
              id: 454,
              icon: "🈂",
            },
            {
              id: 455,
              icon: "Ⓜ",
            },
            {
              id: 456,
              icon: "🉑",
            },
            {
              id: 457,
              icon: "㊙",
            },
            {
              id: 458,
              icon: "㊗",
            },
            {
              id: 459,
              icon: "🆑",
            },
            {
              id: 460,
              icon: "🆘",
            },
            {
              id: 461,
              icon: "🆔",
            },
            {
              id: 462,
              icon: "🔞",
            },
            {
              id: 463,
              icon: "🚫",
            },
            {
              id: 464,
              icon: "🆚",
            },
            {
              id: 465,
              icon: "🅱",
            },
            {
              id: 466,
              icon: "🅰",
            },
            {
              id: 467,
              icon: "🆎",
            },
            {
              id: 468,
              icon: "🅾",
            },
            {
              id: 469,
              icon: "❇",
            },
          ],
        },
        {
          id: 10,
          name: "物件",
          iconArr: [
            {
              id: 470,
              icon: "🔮",
            },
            {
              id: 471,
              icon: "🎥",
            },
            {
              id: 472,
              icon: "📷",
            },
            {
              id: 473,
              icon: "📹",
            },
            {
              id: 474,
              icon: "📼",
            },
            {
              id: 475,
              icon: "💿",
            },
            {
              id: 476,
              icon: "📀",
            },
            {
              id: 477,
              icon: "💽",
            },
            {
              id: 478,
              icon: "💾",
            },
            {
              id: 479,
              icon: "💻",
            },
            {
              id: 480,
              icon: "📱",
            },
            {
              id: 481,
              icon: "☎",
            },
            {
              id: 482,
              icon: "📞",
            },
            {
              id: 483,
              icon: "📟",
            },
            {
              id: 484,
              icon: "📠",
            },
            {
              id: 485,
              icon: "📡",
            },
            {
              id: 486,
              icon: "📺",
            },
            {
              id: 487,
              icon: "📻",
            },
            {
              id: 488,
              icon: "🔊",
            },
            {
              id: 489,
              icon: "🔉",
            },
            {
              id: 490,
              icon: "🔈",
            },
            {
              id: 491,
              icon: "🔇",
            },
            {
              id: 492,
              icon: "🔔",
            },
            {
              id: 493,
              icon: "🔕",
            },
            {
              id: 494,
              icon: "📢",
            },
            {
              id: 495,
              icon: "📣",
            },
            {
              id: 496,
              icon: "⏳",
            },
            {
              id: 497,
              icon: "⌛",
            },
            {
              id: 498,
              icon: "⏰",
            },
            {
              id: 499,
              icon: "⌚",
            },
            {
              id: 500,
              icon: "🔓",
            },
            {
              id: 501,
              icon: "🔒",
            },
            {
              id: 502,
              icon: "🔐",
            },
            {
              id: 503,
              icon: "🔑",
            },
            {
              id: 504,
              icon: "🔎",
            },
            {
              id: 505,
              icon: "💡",
            },
            {
              id: 506,
              icon: "🔦",
            },
            {
              id: 507,
              icon: "🔆",
            },
            {
              id: 508,
              icon: "🔅",
            },
            {
              id: 509,
              icon: "🔌",
            },
            {
              id: 510,
              icon: "🔋",
            },
            {
              id: 511,
              icon: "🔍",
            },
            {
              id: 512,
              icon: "🛁",
            },
            {
              id: 513,
              icon: "🛀",
            },
            {
              id: 514,
              icon: "🚿",
            },
            {
              id: 515,
              icon: "🚽",
            },
            {
              id: 516,
              icon: "🔧",
            },
            {
              id: 517,
              icon: "🔩",
            },
            {
              id: 518,
              icon: "🔨",
            },
            {
              id: 519,
              icon: "🚪",
            },
            {
              id: 520,
              icon: "🚬",
            },
            {
              id: 521,
              icon: "💣",
            },
            {
              id: 522,
              icon: "🔫",
            },
            {
              id: 523,
              icon: "🔪",
            },
            {
              id: 524,
              icon: "💊",
            },
            {
              id: 525,
              icon: "💰",
            },
            {
              id: 526,
              icon: "💴",
            },
            {
              id: 527,
              icon: "💵",
            },
            {
              id: 528,
              icon: "💷",
            },
            {
              id: 529,
              icon: "💶",
            },
            {
              id: 530,
              icon: "💳",
            },
            {
              id: 531,
              icon: "💸",
            },
            {
              id: 532,
              icon: "📲",
            },
            {
              id: 533,
              icon: "📧",
            },
            {
              id: 534,
              icon: "📥",
            },
            {
              id: 535,
              icon: "📤",
            },
            {
              id: 536,
              icon: "✉",
            },
            {
              id: 537,
              icon: "📩",
            },
            {
              id: 538,
              icon: "📨",
            },
            {
              id: 539,
              icon: "📯",
            },
            {
              id: 540,
              icon: "📫",
            },
            {
              id: 541,
              icon: "📪",
            },
            {
              id: 542,
              icon: "📬",
            },
            {
              id: 543,
              icon: "📭",
            },
            {
              id: 544,
              icon: "📮",
            },
            {
              id: 545,
              icon: "📦",
            },
            {
              id: 546,
              icon: "📝",
            },
            {
              id: 547,
              icon: "📄",
            },
            {
              id: 548,
              icon: "📃",
            },
            {
              id: 549,
              icon: "📑",
            },
            {
              id: 550,
              icon: "📊",
            },
            {
              id: 551,
              icon: "📈",
            },
            {
              id: 552,
              icon: "📉",
            },
            {
              id: 553,
              icon: "📜",
            },
            {
              id: 554,
              icon: "📋",
            },
            {
              id: 555,
              icon: "📅",
            },
            {
              id: 556,
              icon: "📆",
            },
            {
              id: 557,
              icon: "📇",
            },
            {
              id: 558,
              icon: "📁",
            },
            {
              id: 559,
              icon: "📂",
            },
            {
              id: 560,
              icon: "✂",
            },
            {
              id: 561,
              icon: "📌",
            },
            {
              id: 562,
              icon: "📎",
            },
            {
              id: 563,
              icon: "✒",
            },
            {
              id: 564,
              icon: "✏",
            },
            {
              id: 565,
              icon: "📏",
            },
            {
              id: 566,
              icon: "📐",
            },
            {
              id: 567,
              icon: "📕",
            },
            {
              id: 568,
              icon: "📗",
            },
            {
              id: 569,
              icon: "📘",
            },
            {
              id: 570,
              icon: "📙",
            },
            {
              id: 571,
              icon: "📓",
            },
            {
              id: 572,
              icon: "📔",
            },
            {
              id: 573,
              icon: "📒",
            },
            {
              id: 574,
              icon: "📚",
            },
            {
              id: 575,
              icon: "📖",
            },
            {
              id: 576,
              icon: "🔖",
            },
            {
              id: 577,
              icon: "📛",
            },
            {
              id: 578,
              icon: "🔬",
            },
          ],
        },
        {
          id: 11,
          name: "标识",
          iconArr: [
            {
              id: 579,
              icon: "🚻",
            },
            {
              id: 580,
              icon: "🚹",
            },
            {
              id: 581,
              icon: "🚺",
            },
            {
              id: 582,
              icon: "🚼",
            },
            {
              id: 583,
              icon: "🚰",
            },
            {
              id: 584,
              icon: "🚮",
            },
            {
              id: 585,
              icon: "♿",
            },
            {
              id: 586,
              icon: "🚭",
            },
            {
              id: 587,
              icon: "🛂",
            },
            {
              id: 588,
              icon: "🛄",
            },
            {
              id: 589,
              icon: "🛅",
            },
            {
              id: 590,
              icon: "🛃",
            },
            {
              id: 591,
              icon: "🚫",
            },
            {
              id: 592,
              icon: "🔞",
            },
            {
              id: 593,
              icon: "🚯",
            },
            {
              id: 594,
              icon: "🚱",
            },
            {
              id: 595,
              icon: "🚳",
            },
            {
              id: 596,
              icon: "🚷",
            },
            {
              id: 597,
              icon: "🚸",
            },
            {
              id: 598,
              icon: "⛔",
            },
            {
              id: 599,
              icon: "✳",
            },
            {
              id: 600,
              icon: "❇",
            },
            {
              id: 601,
              icon: "❎",
            },
            {
              id: 602,
              icon: "✅",
            },
            {
              id: 603,
              icon: "✴",
            },
            {
              id: 604,
              icon: "💟",
            },
            {
              id: 605,
              icon: "📳",
            },
            {
              id: 606,
              icon: "📴",
            },
            {
              id: 607,
              icon: "💠",
            },
            {
              id: 608,
              icon: "➿",
            },
            {
              id: 609,
              icon: "♻",
            },
            {
              id: 610,
              icon: "⛎",
            },
            {
              id: 611,
              icon: "🔟",
            },
            {
              id: 612,
              icon: "⬆",
            },
            {
              id: 613,
              icon: "⬇",
            },
            {
              id: 614,
              icon: "⬅",
            },
            {
              id: 615,
              icon: "➡",
            },
            {
              id: 616,
              icon: "🔣",
            },
            {
              id: 617,
              icon: "🔢",
            },
            {
              id: 618,
              icon: "🔠",
            },
            {
              id: 619,
              icon: "🔡",
            },
            {
              id: 620,
              icon: "🔤",
            },
            {
              id: 621,
              icon: "↗",
            },
            {
              id: 622,
              icon: "↖",
            },
            {
              id: 623,
              icon: "↘",
            },
            {
              id: 624,
              icon: "↙",
            },
            {
              id: 625,
              icon: "↔",
            },
            {
              id: 626,
              icon: "↕",
            },
            {
              id: 627,
              icon: "🔄",
            },
            {
              id: 628,
              icon: "◀",
            },
            {
              id: 629,
              icon: "▶",
            },
            {
              id: 630,
              icon: "🔼",
            },
            {
              id: 631,
              icon: "🔽",
            },
            {
              id: 632,
              icon: "↩",
            },
            {
              id: 633,
              icon: "↪",
            },
            {
              id: 634,
              icon: "ℹ",
            },
            {
              id: 635,
              icon: "⏪",
            },
            {
              id: 636,
              icon: "⏫",
            },
            {
              id: 637,
              icon: "⏬",
            },
            {
              id: 638,
              icon: "⤵",
            },
            {
              id: 639,
              icon: "⤴",
            },
            {
              id: 640,
              icon: "🆗",
            },
            {
              id: 641,
              icon: "🔀",
            },
            {
              id: 642,
              icon: "🔁",
            },
            {
              id: 643,
              icon: "🔂",
            },
            {
              id: 644,
              icon: "🆕",
            },
            {
              id: 645,
              icon: "🆙",
            },
            {
              id: 646,
              icon: "🆒",
            },
            {
              id: 647,
              icon: "🆓",
            },
            {
              id: 648,
              icon: "🆖",
            },
            {
              id: 649,
              icon: "📶",
            },
            {
              id: 650,
              icon: "🎦",
            },
            {
              id: 651,
              icon: "🈁",
            },
            {
              id: 652,
              icon: "🔯",
            },
            {
              id: 653,
              icon: "🏧",
            },
            {
              id: 654,
              icon: "💹",
            },
            {
              id: 655,
              icon: "💲",
            },
            {
              id: 656,
              icon: "💱",
            },
            {
              id: 657,
              icon: "❌",
            },
            {
              id: 658,
              icon: "❗",
            },
            {
              id: 659,
              icon: "❓",
            },
            {
              id: 660,
              icon: "❕",
            },
            {
              id: 661,
              icon: "❔",
            },
            {
              id: 662,
              icon: "⭕",
            },
            {
              id: 663,
              icon: "🔝",
            },
            {
              id: 664,
              icon: "🔚",
            },
            {
              id: 665,
              icon: "🔙",
            },
            {
              id: 666,
              icon: "🔛",
            },
            {
              id: 667,
              icon: "🔜",
            },
            {
              id: 668,
              icon: "🔃",
            },
            {
              id: 669,
              icon: "🕛",
            },
            {
              id: 670,
              icon: "🕑",
            },
            {
              id: 671,
              icon: "🕒",
            },
            {
              id: 672,
              icon: "🕞",
            },
            {
              id: 673,
              icon: "🕓",
            },
            {
              id: 674,
              icon: "➕",
            },
            {
              id: 675,
              icon: "➖",
            },
            {
              id: 676,
              icon: "➗",
            },
            {
              id: 677,
              icon: "♠",
            },
            {
              id: 678,
              icon: "♥",
            },
            {
              id: 679,
              icon: "♣",
            },
            {
              id: 680,
              icon: "♦",
            },
            {
              id: 681,
              icon: "💮",
            },
            {
              id: 682,
              icon: "💯",
            },
            {
              id: 683,
              icon: "✔",
            },
            {
              id: 684,
              icon: "☑",
            },
            {
              id: 685,
              icon: "🔘",
            },
            {
              id: 686,
              icon: "🔗",
            },
            {
              id: 687,
              icon: "➰",
            },
            {
              id: 688,
              icon: "〰",
            },
            {
              id: 689,
              icon: "〽",
            },
            {
              id: 690,
              icon: "🔱",
            },
            {
              id: 691,
              icon: "◼",
            },
            {
              id: 692,
              icon: "◻",
            },
            {
              id: 693,
              icon: "◾",
            },
            {
              id: 694,
              icon: "◽",
            },
            {
              id: 695,
              icon: "▪",
            },
            {
              id: 696,
              icon: "▫",
            },
            {
              id: 697,
              icon: "🔺",
            },
            {
              id: 698,
              icon: "🔲",
            },
            {
              id: 699,
              icon: "🔳",
            },
            {
              id: 700,
              icon: "⚫",
            },
            {
              id: 701,
              icon: "⚪",
            },
            {
              id: 702,
              icon: "🔴",
            },
            {
              id: 703,
              icon: "🔵",
            },
            {
              id: 704,
              icon: "🔻",
            },
            {
              id: 705,
              icon: "🔶",
            },
            {
              id: 706,
              icon: "🔷",
            },
            {
              id: 707,
              icon: "🔸",
            },
            {
              id: 708,
              icon: "🔹",
            },
            {
              id: 709,
              icon: "✖",
            },
          ],
        },
        {
          id: 12,
          name: "房车",
          iconArr: [
            {
              id: 710,
              icon: "🏠",
            },
            {
              id: 711,
              icon: "🏡",
            },
            {
              id: 712,
              icon: "🏫",
            },
            {
              id: 713,
              icon: "🏢",
            },
            {
              id: 714,
              icon: "🏣",
            },
            {
              id: 715,
              icon: "🏥",
            },
            {
              id: 716,
              icon: "🏦",
            },
            {
              id: 717,
              icon: "🏪",
            },
            {
              id: 718,
              icon: "🏩",
            },
            {
              id: 719,
              icon: "🏨",
            },
            {
              id: 720,
              icon: "💒",
            },
            {
              id: 721,
              icon: "⛪",
            },
            {
              id: 722,
              icon: "🏬",
            },
            {
              id: 723,
              icon: "🏤",
            },
            {
              id: 724,
              icon: "🌇",
            },
            {
              id: 725,
              icon: "🌆",
            },
            {
              id: 726,
              icon: "🏯",
            },
            {
              id: 727,
              icon: "🏰",
            },
            {
              id: 728,
              icon: "⛺",
            },
            {
              id: 729,
              icon: "🏭",
            },
            {
              id: 730,
              icon: "🗼",
            },
            {
              id: 731,
              icon: "🗾",
            },
            {
              id: 732,
              icon: "🗻",
            },
            {
              id: 733,
              icon: "🌄",
            },
            {
              id: 734,
              icon: "🚢",
            },
            {
              id: 735,
              icon: "⛵",
            },
            {
              id: 736,
              icon: "🚤",
            },
            {
              id: 737,
              icon: "🚣",
            },
            {
              id: 738,
              icon: "⚓",
            },
            {
              id: 739,
              icon: "🚀",
            },
            {
              id: 740,
              icon: "✈",
            },
            {
              id: 741,
              icon: "💺",
            },
            {
              id: 742,
              icon: "🚁",
            },
            {
              id: 743,
              icon: "🚂",
            },
            {
              id: 744,
              icon: "🚊",
            },
            {
              id: 745,
              icon: "🚉",
            },
            {
              id: 746,
              icon: "🚞",
            },
            {
              id: 747,
              icon: "🚆",
            },
            {
              id: 748,
              icon: "🚄",
            },
            {
              id: 749,
              icon: "🚅",
            },
            {
              id: 750,
              icon: "🚈",
            },
            {
              id: 751,
              icon: "🚇",
            },
            {
              id: 752,
              icon: "🚝",
            },
            {
              id: 753,
              icon: "🚋",
            },
            {
              id: 754,
              icon: "🚃",
            },
            {
              id: 755,
              icon: "🚎",
            },
            {
              id: 756,
              icon: "🚌",
            },
            {
              id: 757,
              icon: "🚍",
            },
            {
              id: 758,
              icon: "🚙",
            },
            {
              id: 759,
              icon: "🚘",
            },
            {
              id: 760,
              icon: "🚗",
            },
            {
              id: 761,
              icon: "🚕",
            },
            {
              id: 762,
              icon: "🚖",
            },
            {
              id: 763,
              icon: "🚛",
            },
            {
              id: 764,
              icon: "🚚",
            },
            {
              id: 765,
              icon: "🚨",
            },
            {
              id: 766,
              icon: "🚓",
            },
            {
              id: 767,
              icon: "🚔",
            },
            {
              id: 768,
              icon: "🚒",
            },
            {
              id: 769,
              icon: "🚑",
            },
            {
              id: 770,
              icon: "🚐",
            },
            {
              id: 771,
              icon: "🚲",
            },
            {
              id: 772,
              icon: "🚡",
            },
            {
              id: 773,
              icon: "🚟",
            },
            {
              id: 774,
              icon: "🚠",
            },
            {
              id: 775,
              icon: "🚜",
            },
            {
              id: 776,
              icon: "💈",
            },
            {
              id: 777,
              icon: "🚏",
            },
            {
              id: 778,
              icon: "🎫",
            },
            {
              id: 779,
              icon: "🚦",
            },
            {
              id: 780,
              icon: "🚥",
            },
            {
              id: 781,
              icon: "⚠",
            },
            {
              id: 782,
              icon: "🚧",
            },
            {
              id: 783,
              icon: "🔰",
            },
            {
              id: 784,
              icon: "⛽",
            },
            {
              id: 785,
              icon: "🏮",
            },
            {
              id: 786,
              icon: "♨",
            },
            {
              id: 787,
              icon: "🗿",
            },
            {
              id: 788,
              icon: "🎪",
            },
            {
              id: 789,
              icon: "🎭",
            },
            {
              id: 790,
              icon: "📍",
            },
            {
              id: 791,
              icon: "🚩",
            },
          ],
        },
      ];
    },
    //     发送表情
    sendEmoji(icon) {
      let input = document.getElementById(
        "commentText-" + this.type + "-" + this.commentId
      );
      // 输入框的文本替换
      input.setRangeText(icon);
      // 获取光标位置
      let cursor = input.selectionStart;
      // 光标移动到表情的后方
      input.selectionStart = cursor + icon.length;
      // 聚焦输入框
      input.focus();
      // 同步数据源(评论文本)
      this.commentText = input.value;
      // 关闭表情包
      this.tabMenu = false;
    },
  },
  created() {
    this.getMeojis();
  },
};
</script>

<style scoped lang="less"></style>
