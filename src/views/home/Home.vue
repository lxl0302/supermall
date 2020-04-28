<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">蘑菇街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 class="tab-control"
                 v-show="isTabFixed"
                 ref="topTabControl"/>
    <scroller class="home-scroller"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control ref = "tabControl"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"/>
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
import {debounce} from  "common/utils";

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
      isShowBackTop: false, // 判断什么时候出现回到顶部按钮
      tabOffsetTop: 0, // 商品类型吸顶效果
      isTabFixed: false, // 商品类型吸顶效果
      saveY: 0 // 保存页面离开时的状态
    };
  },
  computed: {
    showGoods() {
      // 商品类型
      return this.goods[this.currentType].list;
    }
  },
  destroyed() { // 销毁
    console.log('销毁了')
  },
  activated() { // 在本组件
    this.$refs.scroll.scrollTo(0, this.saveY, 0) // 返回上次操作的时候停留的位置
    this.$refs.scroll.refresh()
  },
  deactivated() { // 离开本组件
    this.saveY = this.$refs.scroll.getScrolly()
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1.图片加载完成的事件监听
    // 防抖动
    const refresh = debounce(this.$refs.scroll.refresh,200)
    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  methods: {
    /**
     * 事件监听
     */
    swiperImageLoad() {
      // 所有的组件都有一个属性$el:用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
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
      // 判断是否点击
      if(this.$refs.topTabControl !== undefined) {
        // 让两个TabControl的currentIndex保持一致
        this.$refs.topTabControl.currentIndex = index;
        this.$refs.tabControl.currentFileInfo = index;
      }
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 300;
      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop

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
    getHomeMultidata() { // 获取多个数据
      getHomeMultidata()
        .then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
        .catch();
    },
    getHomeGoods(type) { // 获取商品信息
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

.tab-control {
  position: relative;
  z-index: 10;
}
</style>
