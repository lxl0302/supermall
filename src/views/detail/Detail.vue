<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info ref="params" :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-params-info ref="comment" :paramsInfo="paramInfo"/>
      <goods-list ref="recommends" :goods="recommends"/>
    </scroll>
    <detial-bottom-bar @addCart="addToCart"/>
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
  import DetailNavBar from "./DetailNavBar";
  import DetailSwiper from "./DetailSwiper";
  import DetailBaseInfo from "./DetailBaseInfo";
  import DetailShopInfo from "./DetailShopInfo";
  import DetailGoodsInfo from "./DetailImageInfo";
  import DetailParamsInfo from "./DetailParamsInfo";
  import DetialBottomBar from "./DetialBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Toast from "../../components/common/toast/Toast";

  import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'

  export default {
    name: "Detail",
    components: {
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetialBottomBar,
      Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        themeTopYs: [0, 1000, 2000, 3000],
        recommends: [],
        isShowBackTop: false,
        message: '',
        show: false
      }
    },
    created() {
      // 1.保存传入得iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.获取商家信息
        this.shop = new Shop(data.shopInfo)

        // 4.获取页面详情信息
        this.detailInfo = data.detailInfo

        // 5.获取参数信息
        this.paramsInfo = data.itemParams

        this.$nextTick(() => {
          // this.themeTopYs.push(0);
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          //
          // console.log(this.themeTopYs);
        })
      })
    },
    mounted() {
    },
    updated() {

    },
    methods: {
      addToCart() { // 添加购物车
        // 1.获取购物车需要展示的信息
        const  product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPirce;
        product.iid = this.iid

        // 2.将商品添加到购物车中 并且进行补充
        // this.$store.cartList.push(product) 此为错误示范 state中的值需要经过方法来改变
        this.$store.dispatch('addCart',product).then(res => {
          this.show = true;
          this.message = res;

          setTimeout(() => {
            this.show = false;
          }, 1500)
          // this.$toast.show(res, 1000)
        })

      },
      detailImageLoad() {
        // this.$refs.scroll.refresh()
      },
      titleClick(index) {
        console.log(index);
        // this.$refs.scroll.scrollTo(0, this.themeTopYs, 100)
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
