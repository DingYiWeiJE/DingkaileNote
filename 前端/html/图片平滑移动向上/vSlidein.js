const DISTANCE = 150
const DURATION = 1000
// 动画对象关联，这里使用weakmap是为了当这个对象被销毁的时候，不会导致内存泄漏
const animationMap = new WeakMap()

// 专门用于监听某个元素跟一个东西是否有重叠，默认是判断是否跟视口有没有重叠
// 参数1：回调函数，当监听到某个元素跟一个东西有重叠的时候，会触发这个回调函数
// 参数2：配置项，可以配置一些监听的参数
// 参数3：监听的元素，可以是一个元素，也可以是一个选择器
// 返回值：一个观察者对象
const ob = new IntersectionObserver((entries) => {
  for(const entry of entries) {
    // 判断这个元素是否跟视口有重叠
    if(entry.isIntersecting) {
      // 获取这个元素对应的动画对象
      const animation = animationMap.get(entry.target)
      // 播放这个动画
      animation.play()
			// 取消监听 因为这个动画只需要播放一次，所以播放了一次动画之后，就取消监听了
			ob.unobserve(entry.target)
		}
	}
})

// 判断元素是否在视口之下
function inBelowViewPort(el) {
  // 获取这个元素的位置信息
  const rect = el.getBoundingClientRect()
  // 判断这个元素是否在视口下方
  return rect.bottom > window.innerHeight
}

export default {
	mounted(el) {
		if (inBelowViewPort(el)) {
			return // 如果这个元素已经在视口下方了，就直接返回
		}
		/* 给这个元素创建一个动画，animate函数中传入一个数组
					数组中的每一个对象代表一个关键帧
			 第二个参数是动画的配置项，是一个对象
		*/
		const animation = el.animate([
			{
				transform: `translateY(${DISTANCE}px)`,
				opacity: 0.5
			},
			{
				transform: `translateY(0 )`,
				opacity: 1
			},
		], {
			duration: DURATION,
			easing: 'ease-in-out',
			// direction: 'alternate',
			// iterations: Infinity
		})
		// 先让这个动画是暂停状态
		animation.pause()
		// 将这个动画和元素关联起来
		animationMap.set(el, animation)
		ob.observe(el)
	},
	unmounted() {
		ob.unobserve(el)
	}
}