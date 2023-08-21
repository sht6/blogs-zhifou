<template>
  <v-container fluid class="d-flex justify-center">
    <!-- 博主介绍 -->
    <v-sheet width="300">
      <!-- 博主简介 -->
      <v-card elevation="4">
        <v-container>
          <v-list-item class="px-0">
            <v-list-item-avatar>
              <v-img :src="author.headPic"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ author.nickname }}</v-list-item-title>
              <v-list-item-subtitle class="text-caption">{{
                author.signature
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-container>
        <v-container fluid class="text-center text-body-2">
          <v-row>
            <v-col>
              <div>{{ author.fansCount | numFormat }}</div>
              <div class="grey--text">粉丝</div>
            </v-col>
            <v-col>
              <div>{{ author.likeCount | numFormat }}</div>
              <div class="grey--text">获赞</div>
            </v-col>
            <v-col>
              <div>{{ author.integralCount | numFormat }}</div>
              <div class="grey--text">积分</div>
            </v-col>
          </v-row>
        </v-container>
        <v-container fluid class="text-center">
          <v-row>
            <v-col>
              <v-btn block outlined rounded color="info" small>
                <v-icon class="pr-2">mdi-plus</v-icon>
                关注
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block outlined rounded color="warning" small
                ><v-icon class="mr-2">mdi-chat-outline</v-icon> 私信
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <!-- 博客文章 -->
      <v-card elevation="4" class="mt-6">
        <v-container
          ><blog-list-box title="博主文章">
            <template #actionBtn>
              <v-btn icon small text plain>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <template #listContent>
              <v-list dense>
                <v-list-item-group>
                  <v-list-item
                    class="px-1"
                    v-for="item in blogs"
                    :key="item.id"
                    :to="'/blog-content/' + item.id"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="text-caption">{{
                        item.title
                      }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text>
                        {{ item.read | numFormat }}
                      </v-list-item-action-text>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </template>
          </blog-list-box></v-container
        >
      </v-card>
      <!-- 对博客的评分 -->
      <v-card elevation="4" class="mt-6" style="position: sticky; top: 76px">
        <v-container class="text-center">
          <v-subheader>你觉得这篇博客文章怎末样？</v-subheader>
          <v-rating
            hover
            large
            half-incerments
            color="orange"
            v-model="ratingValue"
          ></v-rating>
        </v-container>
      </v-card>
    </v-sheet>
    <!-- 博主文章详情 -->
    <v-sheet width="900" height="min-content" class="ml-5">
      <v-card>
        <v-card-title class="font-weight-black text-h6">{{
          blog.title
        }}</v-card-title>
        <v-card-subtitle>
          <v-container class="grey lighten-5">
            <v-chip label small color="error" class="mr-5">{{
              blog.type
            }}</v-chip>
            <span class="mr-5">发布时间: {{ blog.time }}</span>
            <span
              ><v-icon color="#BDBDBD" class="mr-1">mdi-eye</v-icon
              >{{ blog.eye | numFormat }}</span
            >
            <span>
              文章标签：
              <v-chip
                label
                small
                color="#EEEEEE"
                class="mr-1"
                v-for="label in blog.label"
                :key="label.id"
                >{{ label.name }}</v-chip
              >
            </span>
          </v-container>
        </v-card-subtitle>
        <!-- 文章的主要内容 -->
        <v-container class="px-4" v-html="blog.content"></v-container>
      </v-card>
      <!-- 评论 -->
      <v-card elevation="4" class="mt-8" id="blogComment">
        <v-card-title class="font-weight-black text-h6"
          >留下精彩评论</v-card-title
        >
        <v-card-text>
          <!-- 使用评论组件 -->
          <send-comment :comment-id="blog.id" :type="1"></send-comment>
        </v-card-text>
      </v-card>
      <!-- 评论 -->
      <v-card class="mt-8">
        <v-card-title class="font-weight-black text-h6">精彩评论</v-card-title>
        <v-card-text>
          <!-- 使用评论组件 -->
          <blog-comment
            :is-land-lord="true"
            v-for="c in comments"
            :key="c.id"
            :id="c.id"
            :head-pic="c.commentator.headPic"
            :nickname="c.commentator.nickname"
            :text="c.text"
            :time="c.time"
            :is-top="c.top"
            :is-liked="c.isAuthorLiked"
            :count="c.count"
          ></blog-comment>
        </v-card-text>
      </v-card>
    </v-sheet>
    <v-sheet
      color="transparent"
      class="text--caption text-center"
      style="position: fixed; right: 80px; bottom: 80px"
    >
      <!-- 举报组 -->
      <div class="my-2">
        <v-btn fab outlined small color="grey" @click="showDialog">
          <v-icon>mdi-alert-circle</v-icon>
        </v-btn>
        <div class="mt-2 grey--text">举报</div>
      </div>
      <!-- 分享组 -->
      <div class="my-2">
        <v-btn fab outlined small color="orange">
          <v-icon>mdi-share</v-icon>
        </v-btn>
        <div class="mt-2 grey--text">{{ blog.share | numFormat }}</div>
      </div>
      <!-- 收藏组 -->
      <div class="my-2">
        <v-btn fab outlined small color="red">
          <v-icon>mdi-star</v-icon>
        </v-btn>
        <div class="mt-2 grey--text">{{ blog.collect | numFormat }}</div>
      </div>
      <!-- 评论组 -->
      <div class="my-2">
        <v-btn
          fab
          outlined
          small
          color="blue"
          @click="$vuetify.goTo('#blogComment')"
        >
          <v-icon>mdi-comment-text</v-icon>
        </v-btn>
        <div class="mt-2 grey--text">{{ blog.comment | numFormat }}</div>
      </div>
      <!-- 返回顶部按钮 -->
      <div class="my-2">
        <v-btn fab color="info" @click="$vuetify.goTo(0)">
          <v-icon>mdi-navigation</v-icon>
        </v-btn>
      </div>
    </v-sheet>
    <blog-report></blog-report>
  </v-container>
</template>

<script>
import BlogListBox from "../../components/blog/BlogListBox.vue";
import BlogReport from "../../components/blog/BlogReport.vue";
import SendComment from "../../components/comment/SendComment.vue";
import BlogComment from "../../components/comment/BlogComment.vue";

// 代码高亮主体
import "highlight.js/styles/github-dark.css";
import eventBus from "../../utils/eventBus";
// 代码高亮脚本
window.hljs = require("highlight.js");
// 代码高亮行数的脚本
require("highlightjs-line-numbers.js");
export default {
  name: "",
  components: {
    BlogListBox,
    BlogReport,
    SendComment,
    BlogComment,
  },
  props: ["id"],
  data() {
    return {
      // 博客简介
      author: {},
      // 博主文章
      blogs: [],
      // 星星的评分值
      ratingValue: null,
      // 博客的内容
      blog: {},
      // 评论内容
      comments: [],
    };
  },

  methods: {
    // 根据博客的编号查询博客
    getBlogByBlogId() {
      this.blog = {
        id: 23,
        title: "Java实现图片文件上传",
        time: "2022-12-10",
        type: "原创",
        eye: 24329,
        comment: 34523,
        share: 78,
        collect: 90,
        label: [
          { id: 1, name: "JAVA" },
          { id: 2, name: "JAVA WEB" },
          { id: 3, name: "图像上传" },
          { id: 4, name: "WEB" },
          { id: 5, name: "IT" },
        ],
        content:
          "<p>Java实现后台图片上传，将上传图片的接口进行分层，便于维护接口。</p>\n" +
          "<h3>接口部分（interface）</h3>\n" +
          "<p>将接口分为单图片上传以及多图片上传</p>\n" +
          "<pre>\n" +
          '<code class="language-java">public interface FileUploadService {\n' +
          "\t//单图片上传\n" +
          "    PicUploadResult uplodadImg(MultipartFile uploadFile, HttpServletRequest request);\n" +
          "\n" +
          "\t//多图片上传\n" +
          "    PicUploadResult uploadManyImg(MultipartFile[] uploadFile, HttpServletRequest request);\n" +
          "}\n" +
          "</code></pre>\n" +
          "<br>" +
          "<h3>接口实现类（interface impl）</h3>\n" +
          "<h4>上传图片方法类（主要）</h4>\n" +
          "<p>上传多个图片只是使用了数组的方式将文件存到<em>MultipartFile</em>里面。以防代码冗余，所以将实现方法抽出来</p>\n" +
          "<pre>\n" +
          '<code class="language-java">   /**\n' +
          "     * 上传图片方法类\n" +
          "     * @param multipartFile\n" +
          "     * @param request\n" +
          "     * @return\n" +
          "     */\n" +
          "    private PicUploadResult uploadImgMethod(MultipartFile multipartFile, HttpServletRequest request) {\n" +
          "        PicUploadResult picUploadResult = new PicUploadResult();\n" +
          "\n" +
          "        if (multipartFile.isEmpty()) {\n" +
          "            //返回选择文件提示\n" +
          "            picUploadResult.setLegal(false);\n" +
          "            return picUploadResult;\n" +
          "        }\n" +
          '        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd/");\n' +
          "        String format = sdf.format(new Date());\n" +
          "        //存放上传文件的文件夹\n" +
          "        File file = new File(baseFilePath + format);\n" +
          '        logger.info("-----------存放上传文件的文件夹【" + file + "】-----------");\n' +
          '        logger.info("-----------输出文件夹绝对路径 -- 这里的绝对路径是相当于当前项目的路径而不是“容器”路径【" + file.getAbsolutePath() + "】-----------");\n' +
          "        if (!file.isDirectory()) {\n" +
          "            //递归生成文件夹\n" +
          "            file.mkdirs();\n" +
          "        }\n" +
          "        //获取原始的名字  original:最初的，起始的  方法是得到原来的文件名在客户机的文件系统名称\n" +
          "        String oldName = multipartFile.getOriginalFilename();\n" +
          '        logger.info("-----------文件原始的名字【" + oldName + "】-----------");\n' +
          '        String newName = UUID.randomUUID().toString() + oldName.substring(oldName.lastIndexOf("."), oldName.length());\n' +
          '        logger.info("-----------文件要保存后的新名字【" + newName + "】-----------");\n' +
          "        try {\n" +
          "            //构建真实的文件路径\n" +
          "            File newFile = new File(file.getAbsolutePath() + File.separator + newName);\n" +
          "            //转存文件到指定路径，如果文件名重复的话，将会覆盖掉之前的文件,这里是把文件上传到 “绝对路径”\n" +
          "            multipartFile.transferTo(newFile);\n" +
          '            String filePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + "/picbook/" + UPLOAD_PATH_PREFIX + format + newName;\n' +
          '            logger.info("-----------【" + filePath + "】-----------");\n' +
          "            picUploadResult.setLegal(true);\n" +
          "            picUploadResult.setImgPath(filePath);\n" +
          "            return picUploadResult;\n" +
          "        } catch (Exception e) {\n" +
          "            e.printStackTrace();\n" +
          "        }\n" +
          "        picUploadResult.setLegal(false);\n" +
          "        return picUploadResult;\n" +
          "    }\n" +
          "</code></pre>\n" +
          "<br>" +
          "<h3>实现方法接口</h3>\n" +
          "\n" +
          "<h4>单图片上传</h4>\n" +
          "<br>" +
          "\n" +
          "<pre>\n" +
          '<code class="language-java">public PicUploadResult uplodadImg(MultipartFile multipartFile, HttpServletRequest request) {\n' +
          "    return uploadImgMethod(multipartFile, request);\n" +
          "}\n" +
          "</code></pre>\n" +
          "<br>" +
          "<h4>多图片上传</h4>\n" +
          "<br>" +
          "<pre>\n" +
          '<code class="language-java">public PicUploadResult uploadManyImg(MultipartFile[] uploadFile, HttpServletRequest request) {\n' +
          "\n" +
          "    List&lt;String&gt; imgPaths = new ArrayList&lt;&gt;();\n" +
          "    for (MultipartFile multipartFile : uploadFile) {\n" +
          "        PicUploadResult picUploadResult = uploadImgMethod(multipartFile, request);\n" +
          "        if(picUploadResult.isLegal()){\n" +
          "            imgPaths.add(picUploadResult.getImgPath());\n" +
          "        } else{\n" +
          "            return picUploadResult;\n" +
          "        }\n" +
          "\n" +
          "    }\n" +
          "\n" +
          "    PicUploadResult picUploadResult = new PicUploadResult();\n" +
          "    picUploadResult.setLegal(true);\n" +
          "    picUploadResult.setImgPahts(imgPaths);\n" +
          "    return picUploadResult;\n" +
          "}\n" +
          "</code></pre>\n" +
          "<br>" +
          "<h4>实现方法补充</h4>\n" +
          "<br>" +
          "<pre>\n" +
          '<code class="language-java">    // 项目上传至绝对路径(在yml里配置你的项目绝对路径)\n' +
          '    @Value("${file.save-path}")\n' +
          "    private String baseFilePath;\n" +
          "    // 项目根路径下的目录  -- SpringBoot static 目录相当于是根路径下（SpringBoot 默认）\n" +
          '    private final static String UPLOAD_PATH_PREFIX = "statics/uploadFile/";\n' +
          "</code></pre>\n" +
          "<br>" +
          "<h3>控制层</h3>\n" +
          "<br>" +
          "<pre>\n" +
          '<code class="language-java">public class FileUploadController {\n' +
          "    // 允许上传的格式 图片形式\n" +
          '    private static final String[] IMAGE_TYPE = new String[]{".bmp", ".jpg", ".jpeg", ".png"};\n' +
          "\n" +
          "    @Resource\n" +
          "    private FileUploadService fileUploadService;\n" +
          "\n" +
          '    @PostMapping("/uploadImg")\n' +
          '    public R uploadImg(@RequestParam("file") MultipartFile file, HttpServletRequest request) {\n' +
          "        boolean isFlag = false;\n" +
          "        for (String type : IMAGE_TYPE) {\n" +
          "            System.out.println(file.getOriginalFilename());\n" +
          "            if (StringUtils.endsWithIgnoreCase(file.getOriginalFilename(), type)) {\n" +
          "                isFlag = true;\n" +
          "                break;\n" +
          "            }\n" +
          "        }\n" +
          "\n" +
          "        if (isFlag) {\n" +
          "            PicUploadResult picUploadResult = fileUploadService.uplodadImg(file, request);\n" +
          "            boolean isLegal = picUploadResult.isLegal();\n" +
          "\n" +
          "            if (isLegal) {\n" +
          "                Map resMap = new HashMap&lt;&gt;();\n" +
          '                resMap.put("imgPath", picUploadResult.getImgPath());\n' +
          "                return R.ok(resMap);\n" +
          "            } else {\n" +
          '                return R.error("图片上传有误");\n' +
          "            }\n" +
          "        } else {\n" +
          '            return R.error("上传的图片格式必须为:bmp,jpg,jpeg,png");\n' +
          "        }\n" +
          "\n" +
          "    }\n" +
          "\n" +
          '    @PostMapping("/uploadManyImg")\n' +
          '    public R uploadManyImg(@RequestParam("files") MultipartFile[] files, HttpServletRequest request) {\n' +
          "        boolean isFlag = false;\n" +
          "        for (MultipartFile uploadFile : files) {\n" +
          "            for (String type : IMAGE_TYPE) {\n" +
          "                if (StringUtils.endsWithIgnoreCase(uploadFile.getOriginalFilename(), type)) {\n" +
          "                    isFlag = true;\n" +
          "                    break;\n" +
          "                }\n" +
          "            }\n" +
          "        }\n" +
          "\n" +
          "        if (isFlag) {\n" +
          "            PicUploadResult picUploadResult = fileUploadService.uploadManyImg(files, request);\n" +
          "            boolean isLegal = picUploadResult.isLegal();\n" +
          "\n" +
          "            if (isLegal) {\n" +
          "                Map resMap = new HashMap&lt;&gt;();\n" +
          '                resMap.put("imgPaths", picUploadResult.getImgPahts());\n' +
          "                return R.ok(resMap);\n" +
          "            } else {\n" +
          '                return R.error("图片上传有误");\n' +
          "            }\n" +
          "        } else {\n" +
          '            return R.error("上传的图片格式必须为:bmp,jpg,jpeg,png");\n' +
          "        }\n" +
          "    }\n" +
          "}\n" +
          "</code></pre>\n" +
          "<br>" +
          "<h3>工具类</h3>\n" +
          "\n" +
          "<p>根据实际情况添加所需的字段</p>\n" +
          "<pre>\n" +
          '<code class="language-java">public class PicUploadResult {\n' +
          "    private boolean isLegal;\n" +
          "    private String imgPath;\n" +
          "    private List&lt;String&gt; imgPahts;\n" +
          "}\n" +
          "</code></pre>",
      };
    },
    // 获取博主文章
    getBlogs() {
      this.blogs = [
        { id: 1, title: "考前50分-四六级必考词汇预测", read: 483200 },
        {
          id: 2,
          title: "魔导国东征记－世界守护突破（622～624）三更！•OVERLORD",
          read: 154641,
        },
        {
          id: 3,
          title:
            "FGO国服《妖精圆桌领域 阿瓦隆･勒･菲 星辰诞生之刻》2.6前篇主线概况攻略",
          read: 120005,
        },
        {
          id: 4,
          title: "1999元的miniLED HDR1000显示器HKC PG271Q简评",
          read: 100058,
        },
        { id: 5, title: "22年四六级翻译预测--共青团", read: 75645 },
      ];
    },
    // 获取博客简介
    getAuthorByBlogId() {
      this.author = {
        id: 1,
        nickname: "云中漫步ZDC",
        headPic: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        signature: "人生自古谁无死，留取丹心照汗青",
        fansCount: 776,
        likeCount: 4543,
        integralCount: 24343,
      };
    },
    // 显示举报对话框
    showDialog() {
      eventBus.isShowReportDialog(true, "博客举报", 1, this.blog.id);
    },
    // 获取评论内容
    getComments() {
      this.comments = [
        {
          id: 1,
          text: "阿姨，我不想努力了",
          time: "2022-07-07 20:47:23",
          isAuthorLiked: false,
          top: true,
          like: 234,
          noLike: 1241,
          count: 4,
          commentator: {
            id: 23,
            nickname: "开心的太阳花朵朵",
            headPic:
              "https://img2.woyaogexing.com/2022/07/18/3b040b92628a8f23!400x400.jpg",
          },
        },
        {
          id: 2,
          text: "你的文章也是我白嫖的动力。",
          time: "2022-07-12 12:08:09",
          isAuthorLiked: false,
          top: false,
          like: 89,
          noLike: 1,
          count: 0,
          commentator: {
            id: 24,
            nickname: "爷不考剑桥了",
            headPic:
              "https://img2.woyaogexing.com/2022/07/18/96e2d160eb4d466d!400x400.jpg",
          },
        },
        {
          id: 3,
          text: "下学期要学，先收藏了",
          time: "2022-07-19 09:34:11",
          isAuthorLiked: true,
          top: false,
          like: 56,
          noLike: 6,
          count: 0,
          commentator: {
            id: 34,
            nickname: "august殇",
            headPic:
              "https://img2.woyaogexing.com/2022/07/18/8faf925dfca62a52!400x400.jpg",
          },
        },
        {
          id: 4,
          text: "讲的你还别说，真的不错",
          time: "2020-07-19 09:34:11",
          isAuthorLiked: false,
          top: false,
          like: 21,
          noLike: 45,
          count: 3,
          commentator: {
            id: 78,
            nickname: "大侠带你走",
            headPic:
              "https://img2.woyaogexing.com/2022/07/18/79c32764c11c818c!400x400.jpg",
          },
        },
      ];
    },
  },
  created() {
    this.getAuthorByBlogId();
    this.getBlogs();
    this.getBlogByBlogId();
    this.getComments();
  },
  mounted() {
    // 代码高亮
    hljs.highlightAll();
    // 代码高亮的行数
    hljs.initLineNumbersOnLoad();
    // 自动触发 changeTab的事件，更改头部的应用栏的值为博客
    eventBus.setToolbarTabValue("/blog");
  },
};
</script>

<style lang="less">
code {
  font-family: Consolas;
  font-size: 14px;
}
td.hljs-ln-line.hljs-ln-numbers {
  text-align: right;
  padding-right: 16px;
}
</style>
