<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">蘑菇街</div>
    </nav-bar>
    <scroller class="home-scroller" 
              ref="scroll" 
              :probe-type="3" 
              @scroll="getPostion"
              :pull-up-load="true"
              @pullingUp="loadMore">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </scroller>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"; // 轮播图
import RecommendView from "./childComps/RecommendView"; // 推荐信息展示
import FeatureView from "./childComps/FeatureView"; // 本周流行

import NavBar from "components/common/navbar/NavBar"; //导航栏
import TabControl from "components/content/tabControl/TabControl"; //分类栏
import GoodsList from "components/content/goods/GoodsList"; // 商品信息
import Scroller from "components/common/scroll/Scroll"; // 滚动
import BackTop from "components/content/backtop/BackTop"; //滚动

import { getHomeMultidata, getHomeGoods } from "network/home"; // 网络请求

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroller,
    BackTop
  },
  data() {
    return {
      banners: [], // 轮播数据
      recommends: [], // 推荐信息
      goods: {
        // 商品类别数据结构
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop", // 判断商品信息点击的类型：new，pop，sell
      isShowBackTop: false // 判断什么时候出现回到顶部按钮
    };
  },
  computed: {
    showGoods() {
      // 商品类型
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**
     * 事件监听
     *
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    getPostion(postion) {
      this.isShowBackTop = -postion.y > 300;
    },
    backClick(){
        this.$refs.scroll.scrollTo(0, 0, 500)
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    /**
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata()
        .then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
        .catch();
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page)
        .then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp()
        })
        .catch();
    }
  }
};
</script>

<style scoped>
.home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.home-scroller{
    /*height:300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }

</style>
