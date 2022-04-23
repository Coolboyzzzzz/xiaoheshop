<template>
  <div>
    <div class="navbar">
      <!-- 导航部分 -->
      <div class="container">
        <div id="content">
          <div class="nav">
          欢迎光临
          <span class="gradient-text-one">小何书店</span>请
          <router-link to="/login" style="padding-right:5px">登录</router-link>
          <router-link to="/login" style="padding: 0 5px;border-left:1px solid #ac9f9f;">免费注册</router-link>
          <div>
            </div>
             </div>
            <span id="logo">
              <router-link to="/login">个人中心</router-link>
              <router-link to="/center/myorder">我的订单</router-link>
              <router-link to="/shopcart">我的购物车</router-link>
              <a href="/my">我的尚品汇</a>
              <a href="###">尚品汇会员</a>
              <a href="###">企业采购</a>
              <a href="###">关注尚品汇</a>
              <a href="###">合作招商</a>
              <a href="###">商家后台</a>
            </span>
         
        </div>
      </div>
    </div>
    <!-- 导航部分结束 -->
    <!--搜索区域-->
    <div class="container">
      <div style="margin-top: 15px;" class="search">
        <img src="./img/logo.png" style="height:58px" alt="logo">
        <div>
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
            <el-button slot="append" style="font-size:20px" icon="el-icon-search"></el-button>
          </el-input>
          <div class="recommend">
            <span>搜索热词：</span>
            <router-link to="/" v-for="(item,index) in recommend" :key="index">{{item}}</router-link>
          </div>
        </div>
        <div style="width:200px;color:white;position: relative;">
          <div class="searchtext" style="backgroundColor:red">
            <i style="font-size:20px;padding-right:5px" class="el-icon-shopping-cart-2"></i>
            <router-link to="/login">购物车</router-link>
            <span>{{num}}</span>
          </div>
          <div class="searchtext" style="backgroundColor:rgb(246,246,246);">
            <router-link to="/login" style="color: rgb(100,100,100);">我的订单</router-link>
          </div>
        </div>
      </div>
      <!-- 搜索结束 -->
      <!-- 分类菜单栏 -->
      <div style="margin: 20px 0 15px 0 ">
        <el-menu
          style="width:1200px"
          background-color="#545c64"
          text-color="#fff"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#ffd04b"
        >
          <!--   :default-active="activeIndex2"
 
 
          @select="handleSelect"-->
          <el-menu-item index="0" style="pointer-events: none;">
            <i class="el-icon-s-grid"></i>图书分类
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">教育</template>
            <el-submenu index="1-1">
              <template slot="title">教材</template>
              <el-menu-item index="1-1-1" @click="jump('1-1-1')">研究生/本科生/专科生教材</el-menu-item>
              <el-menu-item index="1-1-2" @click="jump('1-1-2')">高职高专教材</el-menu-item>
              <el-menu-item index="1-1-3" @click="jump('1-1-3')">中职教材</el-menu-item>
              <el-menu-item index="1-1-4" @click="jump('1-1-4')">成人教育教材</el-menu-item>
            </el-submenu>
            <el-submenu index="1-2">
              <template slot="title">外语</template>
              <el-menu-item index="1-2-1" @click="jump('1-2-1')">英语</el-menu-item>
              <el-menu-item index="1-2-2" @click="jump('1-2-2')">CTE-6/CTE-4</el-menu-item>
              <el-menu-item index="1-2-3" @click="jump('1-2-3')">日语</el-menu-item>
              <el-menu-item index="1-2-4" @click="jump('1-2-4')">韩语</el-menu-item>
              <el-menu-item index="1-2-5" @click="jump('1-2-5')">小语种</el-menu-item>
            </el-submenu>
            <el-submenu index="1-3">
              <template slot="title">考试</template>
              <el-menu-item index="1-3-1" @click="jump('1-3-1')">学历考试</el-menu-item>
              <el-menu-item index="1-3-2" @click="jump('1-3-2')">公务员</el-menu-item>
              <el-menu-item index="1-3-3" @click="jump('1-3-3')">考研</el-menu-item>
            </el-submenu>
            <el-submenu index="1-4">
              <template slot="title">工具书</template>
              <el-menu-item index="1-4-1" @click="jump('1-4-1')">汉语工具书</el-menu-item>
              <el-menu-item index="1-4-2" @click="jump('1-4-2')">英语工具书</el-menu-item>
              <el-menu-item index="1-4-3" @click="jump('1-4-3')">其他语种工具书</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">小说</template>
            <el-menu-item index="2-1" @click="jump('2-1')">科幻小说</el-menu-item>
            <el-menu-item index="2-2" @click="jump('2-2')">武侠小说</el-menu-item>
            <el-menu-item index="2-3" @click="jump('2-3')">军事小说</el-menu-item>
            <el-menu-item index="2-4" @click="jump('2-4')">情感小说</el-menu-item>
            <el-menu-item index="2-5" @click="jump('2-5')">侦探/悬疑/推理小说</el-menu-item>
            <el-menu-item index="2-6" @click="jump('2-6')">历史小说</el-menu-item>
            <el-menu-item index="2-7" @click="jump('2-7')">社会小说</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">文艺</template>
            <el-submenu index="3-1">
              <template slot="title">文学</template>
              <el-menu-item index="3-1-1" @click="jump('3-1-1')">中国古诗词</el-menu-item>
              <el-menu-item index="3-1-2" @click="jump('3-1-2')">民间文学</el-menu-item>
              <el-menu-item index="3-1-3" @click="jump('3-1-3')">中国现当代随笔</el-menu-item>
              <el-menu-item index="3-1-4" @click="jump('3-1-4')">外国随笔</el-menu-item>
              <el-menu-item index="3-1-5" @click="jump('3-1-5')">名家作品</el-menu-item>
            </el-submenu>
            <el-submenu index="3-2">
              <template slot="title">传记</template>
              <el-menu-item index="3-2-1" @click="jump('3-2-1')">财经人物</el-menu-item>
              <el-menu-item index="3-2-2" @click="jump('3-2-2')">历代帝王</el-menu-item>
              <el-menu-item index="3-2-3" @click="jump('3-2-3')">军事人物</el-menu-item>
              <el-menu-item index="3-2-4" @click="jump('3-2-4')">历史人物</el-menu-item>
              <el-menu-item index="3-2-4" @click="jump('3-2-4')">教育家</el-menu-item>
            </el-submenu>
            <el-submenu index="3-3">
              <template slot="title">艺术</template>
              <el-menu-item index="3-3-1" @click="jump('3-3-1')">艺术理论</el-menu-item>
              <el-menu-item index="3-3-2" @click="jump('3-3-2')">书法/篆刻</el-menu-item>
              <el-menu-item index="3-3-3" @click="jump('3-3-3')">音乐</el-menu-item>
              <el-menu-item index="3-3-4" @click="jump('3-3-4')">雕塑</el-menu-item>
              <el-menu-item index="3-3-5" @click="jump('3-3-5')">绘画</el-menu-item>
              <el-menu-item index="3-3-6" @click="jump('3-3-6')">小人书/连环画</el-menu-item>
            </el-submenu>
            <el-submenu index="3-4">
              <template slot="title">摄影</template>
              <el-menu-item index="3-4-1" @click="jump('3-4-1')">摄影理论</el-menu-item>
              <el-menu-item index="3-4-2" @click="jump('3-4-2')">摄影入门</el-menu-item>
              <el-menu-item index="3-4-3" @click="jump('3-4-3')">摄影进阶</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">人文社科</template>
            <el-submenu index="4-1">
              <template slot="title">历史</template>
              <el-menu-item index="4-1-1" @click="jump('4-1-1')">中国史</el-menu-item>
              <el-menu-item index="4-1-2" @click="jump('4-1-2')">世界史</el-menu-item>
              <el-menu-item index="4-1-3" @click="jump('4-1-3')">历史地理</el-menu-item>
              <el-menu-item index="4-1-4" @click="jump('4-1-4')">民族史</el-menu-item>
            </el-submenu>
            <el-submenu index="4-2">
              <template slot="title">文化</template>
              <el-menu-item index="4-2-1" @click="jump('4-2-1')">传统文化</el-menu-item>
              <el-menu-item index="4-2-2" @click="jump('4-2-2')">各国文化</el-menu-item>
            </el-submenu>
            <el-submenu index="4-3">
              <template slot="title">古籍</template>
              <el-menu-item index="4-3-1" @click="jump('4-3-1')">史类</el-menu-item>
              <el-menu-item index="4-3-2" @click="jump('4-3-2')">经部</el-menu-item>
              <el-menu-item index="4-3-3" @click="jump('4-3-3')">子部</el-menu-item>
              <el-menu-item index="4-3-4" @click="jump('4-3-4')">集部</el-menu-item>
            </el-submenu>
            <el-submenu index="4-4">
              <template slot="title">心理学</template>
              <el-menu-item index="4-4-1" @click="jump('4-4-1')">心理百科</el-menu-item>
              <el-menu-item index="4-4-2" @click="jump('4-4-2')">心理学著作</el-menu-item>
              <el-menu-item index="4-4-3" @click="jump('4-4-3')">社会心理学</el-menu-item>
            </el-submenu>
            <el-submenu index="4-5">
              <template slot="title">社会科学</template>
              <el-menu-item index="4-5-1" @click="jump('4-5-1')">社会科学总论</el-menu-item>
              <el-menu-item index="4-5-2" @click="jump('4-5-2')">社会学</el-menu-item>
              <el-menu-item index="4-5-3" @click="jump('4-5-3')">文化人类学</el-menu-item>
            </el-submenu>
            <el-submenu index="4-6">
              <template slot="title">法律</template>
              <el-menu-item index="4-6-1" @click="jump('4-6-1')">民法</el-menu-item>
              <el-menu-item index="4-6-2" @click="jump('4-6-2')">经济法</el-menu-item>
              <el-menu-item index="4-6-3" @click="jump('4-6-3')">刑法</el-menu-item>
              <el-menu-item index="4-6-4" @click="jump('4-6-4')">理论法学</el-menu-item>
              <el-menu-item index="4-6-5" @click="jump('4-6-5')">法律法规</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">童书</template>
            <el-menu-item index="5-1" @click="jump('5-1')">科普/百科</el-menu-item>
            <el-menu-item index="5-2" @click="jump('5-2')">绘本</el-menu-item>
            <el-menu-item index="5-3" @click="jump('5-3')">文学</el-menu-item>
            <el-menu-item index="5-4" @click="jump('5-4')">少儿英语</el-menu-item>
            <el-menu-item index="5-5" @click="jump('5-5')">幼儿启蒙</el-menu-item>
            <el-menu-item index="5-6" @click="jump('5-6')">动漫卡通</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">经管</template>
            <el-submenu index="6-1">
              <template slot="title">管理</template>
              <el-menu-item index="6-1-1" @click="jump('6-1-1')">一般管理学</el-menu-item>
              <el-menu-item index="6-1-2" @click="jump('6-1-2')">会计</el-menu-item>
              <el-menu-item index="6-1-3" @click="jump('6-1-3')">市场/营销</el-menu-item>
              <el-menu-item index="6-1-4" @click="jump('6-1-4')">管理信息系统</el-menu-item>
              <el-menu-item index="6-1-5" @click="jump('6-1-5')">金融/投资</el-menu-item>
              <el-menu-item index="6-1-6" @click="jump('6-1-6')">MBA</el-menu-item>
              <el-menu-item index="6-1-7" @click="jump('6-1-7')">电子商务</el-menu-item>
            </el-submenu>
            <el-submenu index="6-2">
              <template slot="title">投资/理财</template>
              <el-menu-item index="6-2-1" @click="jump('6-2-1')">证券/股票</el-menu-item>
              <el-menu-item index="6-2-2" @click="jump('6-2-2')">基金</el-menu-item>
              <el-menu-item index="6-2-3" @click="jump('6-2-3')">期货</el-menu-item>
              <el-menu-item index="6-2-4" @click="jump('6-2-4')">外汇</el-menu-item>
              <el-menu-item index="6-2-5" @click="jump('6-2-5')">保险</el-menu-item>
              <el-menu-item index="6-2-6" @click="jump('6-2-6')">纳税</el-menu-item>
            </el-submenu>
            <el-submenu index="6-3">
              <template slot="title">经济</template>
              <el-menu-item index="6-3-1" @click="jump('6-3-1')">经济学理论</el-menu-item>
              <el-menu-item index="6-3-2" @click="jump('6-3-2')">区域经济</el-menu-item>
              <el-menu-item index="6-3-3" @click="jump('6-3-3')">通货膨胀</el-menu-item>
              <el-menu-item index="6-3-4" @click="jump('6-3-4')">经济法</el-menu-item>
              <el-menu-item index="6-3-5" @click="jump('6-3-5')">统计/审计</el-menu-item>
              <el-menu-item index="6-3-6" @click="jump('6-3-6')">经济史</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">期刊</template>
            <el-menu-item index="7-1-1" @click="jump('7-1-1')">娱乐时尚</el-menu-item>
            <el-menu-item index="7-1-2" @click="jump('7-1-2')">旅游/人文</el-menu-item>
            <el-menu-item index="7-1-3" @click="jump('7-1-3')">家庭/美食</el-menu-item>
            <el-menu-item index="7-1-4" @click="jump('7-1-4')">汽车</el-menu-item>
            <el-menu-item index="7-1-5" @click="jump('7-1-5')">IT/科技</el-menu-item>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">科技</template>
            <el-submenu index="8-1">
              <template slot="title">科普读物</template>
              <el-menu-item index="8-1-1" @click="jump('8-1-1')">宇宙知识</el-menu-item>
              <el-menu-item index="8-1-2" @click="jump('8-1-2')">人类故事</el-menu-item>
              <el-menu-item index="8-1-3" @click="jump('8-1-3')">生物世界</el-menu-item>
              <el-menu-item index="8-1-4" @click="jump('8-1-4')">科学世界</el-menu-item>
              <el-menu-item index="8-1-5" @click="jump('8-1-5')">百科知识</el-menu-item>
            </el-submenu>
            <el-submenu index="8-2">
              <template slot="title">建筑</template>
              <el-menu-item index="8-2-1" @click="jump('8-2-1')">建筑科学</el-menu-item>
              <el-menu-item index="8-2-2" @click="jump('8-2-2')">建筑史与建筑文化</el-menu-item>
              <el-menu-item index="8-2-3" @click="jump('8-2-3')">室内设计/装潢装修</el-menu-item>
              <el-menu-item index="8-2-4" @click="jump('8-2-4')">园林景观/环境艺术</el-menu-item>
              <el-menu-item index="8-2-5" @click="jump('8-2-5')">建筑外观设计</el-menu-item>
            </el-submenu>
            <el-submenu index="8-3">
              <template slot="title">医学</template>
              <el-menu-item index="8-3-1" @click="jump('8-3-1')">预防医学/卫生学</el-menu-item>
              <el-menu-item index="8-3-2" @click="jump('8-3-2')">临床医学理论</el-menu-item>
              <el-menu-item index="8-3-3" @click="jump('8-3-3')">内科学</el-menu-item>
              <el-menu-item index="8-3-4" @click="jump('8-3-4')">外科学</el-menu-item>
              <el-menu-item index="8-3-5" @click="jump('8-3-5')">妇产科学</el-menu-item>
              <el-menu-item index="8-3-6" @click="jump('8-3-6')">儿科学</el-menu-item>
              <el-menu-item index="8-3-7" @click="jump('8-3-7')">护理学</el-menu-item>
              <el-menu-item index="8-3-8" @click="jump('8-3-8')">中医</el-menu-item>
              <el-menu-item index="8-3-9" @click="jump('8-3-9')">药学</el-menu-item>
            </el-submenu>
            <el-submenu index="8-4">
              <template slot="title">计算机/网络</template>
              <el-menu-item index="8-4-1" @click="jump('8-4-1')">计算机理论</el-menu-item>
              <el-menu-item index="8-4-2" @click="jump('8-4-2')">操作系统</el-menu-item>
              <el-menu-item index="8-4-3" @click="jump('8-4-3')">数据库</el-menu-item>
              <el-menu-item index="8-4-4" @click="jump('8-4-4')">程序设计</el-menu-item>
              <el-menu-item index="8-4-5" @click="jump('8-4-5')">网络与通信技术</el-menu-item>
              <el-menu-item index="8-4-6" @click="jump('8-4-6')">人工智能</el-menu-item>
              <el-menu-item index="8-4-7" @click="jump('8-4-7')">信息安全</el-menu-item>
            </el-submenu>
            <el-submenu index="8-5">
              <template slot="title">自然科学</template>
              <el-menu-item index="8-5-1" @click="jump('8-5-1')">数学</el-menu-item>
              <el-menu-item index="8-5-2" @click="jump('8-5-2')">力学</el-menu-item>
              <el-menu-item index="8-5-3" @click="jump('8-5-3')">物理学</el-menu-item>
              <el-menu-item index="8-5-4" @click="jump('8-5-4')">化学</el-menu-item>
              <el-menu-item index="8-5-5" @click="jump('8-5-5')">天文学</el-menu-item>
              <el-menu-item index="8-5-6" @click="jump('8-5-6')">地球科学</el-menu-item>
              <el-menu-item index="8-5-7" @click="jump('8-5-7')">生物科学</el-menu-item>
            </el-submenu>
            <el-submenu index="8-6">
              <template slot="title">工业技术</template>
              <el-menu-item index="8-6-1" @click="jump('8-6-1')">一般工业技术</el-menu-item>
              <el-menu-item index="8-6-2" @click="jump('8-6-2')">机械/仪表工业</el-menu-item>
              <el-menu-item index="8-6-3" @click="jump('8-6-3')">电工技术</el-menu-item>
              <el-menu-item index="8-6-4" @click="jump('8-6-4')">冶金工业</el-menu-item>
              <el-menu-item index="8-6-5" @click="jump('8-6-5')">能源与动力工程</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title">成功/励志</template>
            <el-menu-item index="9-1" @click="jump('9-1')">人生哲学</el-menu-item>
            <el-menu-item index="9-2" @click="jump('9-2')">成功/激励</el-menu-item>
            <el-menu-item index="9-3" @click="jump('9-3')">心理与修养</el-menu-item>
            <el-menu-item index="9-4" @click="jump('9-4')">性格与习惯</el-menu-item>
            <el-menu-item index="9-5" @click="jump('9-5')">人际交往</el-menu-item>
            <el-menu-item index="9-6" @click="jump('9-6')">礼仪</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      select: "",
      num: 0,
      recommend: []
    };
  },
  created() {
    this.getrecommend();
  },
  methods: {
    async getrecommend() {
      const {
        data: { res: res }
      } = await this.$axios.get("../../static/recommend.json");
      console.log(res);
      this.recommend = res;
    }
  }
};
</script>



<style lang="less" scoped>
.gradient-text-one {
  font-size: 20px;
  letter-spacing: 5px;
  background-image: -webkit-linear-gradient(left, blue, red, yellow);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.navbar {
  background-color: rgb(235, 235, 235);
}
#content {
  height: 34px;
  line-height: 34px;
display: flex;
justify-content: space-between;
}
#logo {
  a{
    margin-left: 5px;
    padding: 0 5px;
    border-left:1px solid #ac9f9f;
  font: 12px "Hiragino Sans GB", "simsun", "Arial";
  color: #646464;
  cursor: pointer;
  }

}
.el-select .el-input,
.el-select {
  width: 130px;
}
.search {
  display: flex;
  justify-content: space-between;
}
.el-input {
  border: 3px solid rgb(0, 194, 154);
  width: 600px;
}
.searchtext {
  height: 44.8px;
  line-height: 44.8px;
  float: left;
  width: 100px;
  text-align: center;
  span {
    position: absolute;
    top: -25%;
    left: 15%;
  }
  a {
    text-decoration: none;
    color: rgb(245, 245, 245);
  }
}
.recommend {
  color: rgb(150, 150, 150);
  font: 12px "Hiragino Sans GB", "simsun", "Arial";
  display: flex;
  justify-content: space-around;
  a {
    text-decoration: none;
    color: rgb(150, 150, 150);
  }
  a:hover {
    text-decoration: underline;
    color: red;
  }
}
.el-menu {
  margin: 0 auto;
  width: 1250px;
  padding-left: 20px;
  border-radius: 15px;
  box-shadow: 16px 16px 32px #d9d9d9, -16px -16px 32px #ffffff;
}
</style>
