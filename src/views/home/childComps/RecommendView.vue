<template>
  <div class="recommend">
      <div v-for="(item, key) in recommends" :key="key" class="recommend-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
  </div>
</template>
<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
    },
    data() {
      return {}
    }
  }
</script>
<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    test-align: center;
    font-size: 12px;
    padding: 15px 0 30px;
    border-bottom: 8px solid #eeeeee;
  }
  
  .recommend-item {
    flex: 1;
  }

  .recommend-item img{
    width: 65px;
    height: 65px;
    margin-top: 10px;
  }
</style>