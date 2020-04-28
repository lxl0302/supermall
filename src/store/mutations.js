import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type'

export default {
  [ADD_COUNTER](state, payload) { // 商品重复 ++
    payload.count++
  },
  [ADD_TO_CART](state, payload) { // 添加新商品
    payload.checked = true // 添加商品选中属性
    state.cartList.push(payload)
  }
}
