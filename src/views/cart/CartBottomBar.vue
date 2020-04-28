<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate">
      去计算：{{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkbutton/CheckButton";

  import { mapGetters } from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() { // 是否全部选中
        if(this.cartList.length === 0) return false

        for(let item of this.cartList) {
          if(!item.checked) {
            return false
          }
        }

        return true
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) { // 全部选中
          this.cartList.forEach(item => item.checked = false)
        }else  {
          this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .calculate {
    width: 100px;
    background-color: red;
    text-align: center;
  }

  .price {
    margin-left: 50px;
    flex: 1;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 120px;
  }

  .check-button {
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-left: 5px;
  }

  .bottom-bar {
    display: flex;
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    font-size: 14px;
  }
</style>
