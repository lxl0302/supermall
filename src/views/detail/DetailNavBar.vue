<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" class="title-item"
             :class="{anji : index == currentIndex}"
             @click="dianji(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      dianji(index) { // 列表点击
        this.currentIndex = index;
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.push('/home')
      }
    }
  }
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}

.title-item {
  flex: 1;
}

.anji {
  color: pink;
  font-size: 18px;
}

.back img{
  margin-top: 10px;
}
</style>
