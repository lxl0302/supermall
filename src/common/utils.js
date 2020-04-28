export function debounce(func, delay) { // 防抖 参数（对哪个函数防抖, 等多久）
  let timer = null
  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
