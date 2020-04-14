<template>
  <div id=home>
    <nav-bar class="home-nav"><div slot="center">蘑菇街</div></nav-bar>
     <home-swiper :banners="banners"/>
     <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar' //导航栏
  import HomeSwiper from './childComps/HomeSwiper' // 轮播图
  import RecommendView from './childComps/RecommendView' // 推荐信息展示

  import {getHomeMultidata} from 'network/home' // 网络请求


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data(){
      return {
        banners: [],
        recommends: []
      }
    },
    created(){
      // 1.请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends =res.data.recommend.list;
      }).catch()
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color:var(--color-tint);
    color: #fff
  }
</style>
