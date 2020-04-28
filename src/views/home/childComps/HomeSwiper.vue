<template>
    <swiper>
      <swiper-item v-for="(item, key) in banners" :key="key">
        <a :href = "item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>
<script>
  import {Swiper, SwiperItem} from 'components/common/swiper' // 轮播图
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return {
            isLoad: false
          }
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() { // 将加载完轮播图的事件发送过去 方便我们监听商品分类的位置
        if(!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>
<style scoped>
</style>
