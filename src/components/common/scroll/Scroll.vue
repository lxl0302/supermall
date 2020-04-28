<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "Scroll",
        data() {
            return {
                scroll:{
                    type:Object,
                    default() {
                        return {}
                    }
                }
            }
        },
        //接收父组件来的值
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            // 1.创建BScroll对象
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType:this.probeType, // 用于滑动类型
                click: true,
                pullUpLoad: this.pullUpLoad // 用于上拉加载
            })

            // 2.监听滚动的位置
            this.scroll.on('scroll', (postion) => {
                //console.log(postion);
                this.$emit('scroll', postion)
            })

            // 3.监听上拉事件
            this.scroll.on('pullingUp', () => {
                this.$emit(' ')
            })
        },
        methods:{
            scrollTo(x, y, time=300) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll.finishPullUp()
            },
            refresh() {
              this.scroll.refresh();
            },
            getScrolly() {  // 判断移动位置
              return this.scroll ? this.scroll.y : 0
            }
        }
    }
</script>

<style scoped>

</style>
