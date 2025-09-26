##  v-html

1. **从后台获取富文本内容**：如果你从后端接口获取的是 HTML 字符串，并且需要直接将其渲染为 HTML 格式，可以使用 `v-html`。比如，获取文章内容时，后台返回的可能是带有标签的 HTML 格式内容。

   ```
   html<div v-html="articleContent"></div>
   ```

2. **渲染 HTML 模板**：有时候需要动态生成 HTML 结构并展示出来，这时可以使用 `v-html` 来插入 HTML 代码。

   ```
   html<div v-html="dynamicHtml"></div>
   ```

3. **需要解析和渲染的字符串**：比如用户输入的某些内容需要经过解析并渲染成 HTML，而不是直接作为纯文本显示。

**注意事项：**

+ **替换覆盖：**一旦使用了v-html之后，他的子元素内容都将被v-html引用的html字符串替换掉

- **XSS 攻击的风险**：如果渲染的内容来自用户输入或者不可信的来源，要特别小心防范 XSS（跨站脚本攻击）。你需要确保渲染的 HTML 内容是经过适当清理或过滤的。
- **性能考虑**：过度使用 `v-html` 可能会影响性能，尤其是在内容频繁更新的情况下。Vue 会对内容进行解析和重渲染，可能导致不必要的 DOM 操作。

通常，只有在需要直接插入 HTML 内容时才会使用 `v-html`，而其他情况下尽量使用 Vue 的模板语法来保持数据的安全性和清晰性。



## 生命周期

```js
beforeCreate()

created()

mounted()

beforeUpdate()

updated()

beforeDestroy()

```





## **computed和watch**

+ computed有缓存，data不变则不会重新计算 

+ watch

  + 值类型的数据，可以拿到oldvalue

  + 引用数据类型的数据，只有当整个值的地址发生了变化的时候才会拿到oldvalue
  + 监听引用数据类型时需要加上deep才能监听到内部属性的变化，否则只有当整个值的地址发生变化的时候才会触发；当这个值的层级很深的时候，会影响性能，可以传入deep：2 只侦听两层

  + immediate 属性值可以决定刚刚进页面的时候是否触发

  + 传入一个getter函数会比deep侦听性能更高，并且在没有更改引用地址的情况下也能获取到oldvalue
  + once: true  一次性侦听器



## 事件修饰符

### `.stop` - 阻止事件冒泡

```vue
<!-- 点击按钮时，事件不会冒泡到父元素 -->
<button @click.stop="handleClick">点击我</button>
```



### `.prevent` - 阻止默认行为

```vue
<!-- 阻止表单提交时页面刷新 -->
<form @submit.prevent="handleSubmit">
  <input type="text" v-model="inputValue" />
  <button type="submit">提交</button>
</form>

```

### `.capture` - 使用事件捕获模式

```vue
<!-- 使用事件捕获 -->
<div @click.capture="handleClick">点击我</div>
```

### `.once` - 事件只触发一次

```vue
<!-- 只触发一次的事件 -->
<button @click.once="handleClick">点击我一次</button>
```

### `.throttle` - 节流

```vue
<!-- 节流事件处理，确保在 200ms 内只触发一次 -->
<input @input.throttle="handleInput" />
```

### `.debounce` - 防抖

```vue
<!-- 防抖事件处理 -->
<input @input.debounce="handleInput" />
```

### `.native` - 监听原生事件

```vue
<!-- 监听原生 DOM click 事件 -->
<MyComponent @click.native="handleNativeClick" />
```

### `.exact` - 组合键修饰符

```vue
<!-- 只有按下 "ctrl" 和 "enter" 才会触发 -->
<input @keyup.enter.exact="handleKeyUp" />
```

### `.passive` - 被动事件监听

`.passive` 用于标记事件监听器是被动的，通常用于 `touchstart` 和 `touchmove` 事件。它告知浏览器，事件处理函数不会调用 `event.preventDefault()`，这样可以提升滚动性能。

```vue
<!-- 使用 passive 修饰符 -->
<div @touchstart.passive="handleTouchStart">触摸我</div>
```

### `.self` - 仅在事件目标是当前元素时触发

使用 `.self` 修饰符时，事件只有在目标元素是当前元素时才会触发。即事件会跳过冒泡阶段，直接判断事件是否发生在当前元素上。

```vue
<!-- 只在点击目标元素本身时触发 -->
<div @click.self="handleClick">点击我</div>
```

### `.ctrl`, `.shift`, `.alt`, `.meta` - 键盘修饰符

这些修饰符用于判断事件是否同时按下了特定的键（Ctrl, Shift, Alt, Meta）。它们是对键盘事件的扩展。

```vue
<!-- 只有按下 Ctrl 键时才触发 -->
<button @click.ctrl="handleClick">Ctrl 点击我</button>

<!-- 只有按下 Shift 键时才触发 -->
<button @click.shift="handleClick">Shift 点击我</button>
```

### 示例组合使用

你可以同时使用多个修饰符来实现更复杂的事件行为。

```vue
<!-- 只有按下 Ctrl 键时才触发 -->
<button @click.ctrl="handleClick">Ctrl 点击我</button>
```



## 表单修饰符

### `.lazy` 修饰符

数据更新会延迟到输入框失去焦点时触发

```vue
<!-- 只有在输入框失去焦点时，才会更新绑定的数据 -->
<input v-model.lazy="inputValue" />
```

### `.number`

```vue
<!-- 输入的内容会自动转换为数字 -->
<input v-model.number="age" type="number" />
```

### `.trim`

```vue
<!-- 输入内容会自动去除前后空格 -->
<input v-model.trim="inputValue" />
```

### v-model多绑定

```vue
<!-- 子组件 MyComponent.vue -->
<template>
  <input :value="name" @input="$emit('update:name', $event)" />
  <input :value="age" @input="$emit('update:age', $event)" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
};
</script>

```

```vue
<!-- 父组件 -->
<MyComponent 
  v-model:name.lazy="nameValue" 
  v-model:age="ageValue" 
/>

```

如果是用语法糖的写法，就要注册事件`const emit = defineEmits(['update:modelValue', 'update:age'])`

```vue
<script setup>
const props = defineProps({
  modelValue: String,
  age: Number
})
const emit = defineEmits(['update:modelValue', 'update:age'])

function onNameInput(e) {
  emit('update:modelValue', e.target.value)
}

function onAgeInput(e) {
  emit('update:age', Number(e.target.value))
}
</script>

<template>
  <div>
    <input :value="modelValue" @input="onNameInput" placeholder="名字" />
    <input :value="age" @input="onAgeInput" placeholder="年龄" />
  </div>
</template>

```



## 组件通讯

### 父子组件

**defineProps**和**defineEmits**

定义组件

```vue
<template>
  <div>
    <h2>子组件</h2>
    <p>来自父组件的消息: {{ message }}</p>
    <button @click="sendMessageToParent">发送消息到父组件</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 接收父组件传递的 props
const props = defineProps({
  message: String
});

// 定义发出事件的函数
const emit = defineEmits();
const sendMessageToParent = () => {
  emit('updateMessage', 'Hello from Child');
};
</script>
```

使用组件

```vue
<template>
  <div>
    <h1>父组件</h1>
    <p>接收到的子组件消息: {{ messageFromChild }}</p>
    <Child :message="message" @updateMessage="handleMessageUpdate" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Child from './Child.vue';

// 父组件的数据
const message = ref('Hello from Parent');
const messageFromChild = ref('');

// 处理子组件发出的事件
const handleMessageUpdate = (newMessage) => {
  messageFromChild.value = newMessage;
};
</script>

```



### 兄弟组件通信

eventBus.js文件

```js
import Vue from 'vue'

export const EventBus = new Vue()


EventBus.$emit()
EventBus.$off()
```

## nextick的用法

Vue2:

- `this.$nextTick(callback)` 或 `this.$nextTick().then(...)`（2.6+）
- `Vue.nextTick(...)`（全局）

Vue3:

- `import { nextTick } from 'vue'`
- `await nextTick()` 或 `nextTick(cb)`

等待 browser paint: `await nextTick(); await new Promise(requestAnimationFrame)`



插槽



## v-once

`v-once` 告诉 Vue：该节点及其子树只渲染一次，不再响应后续响应式变化

```vue
<div v-once>
    <!-- 假设 expensiveHtml 为静态/只需渲染一次 -->
    <ExpensiveStatic :data="expensiveData" />
</div>
```





## 动态渲染组件

```vue
<template>
  <div>
    <button @click="currentComponent = 'Home'">Home</button>
    <button @click="currentComponent = 'About'">About</button>
    <button @click="currentComponent = 'Profile'">Profile</button>

    <keep-alive>
      <component :is="currentComponent" />
    </keep-alive>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import Profile from './Profile.vue'

const currentComponent = ref('Home')
</script>

```

currentComponent可以是字符串，也可以是组件对象；

### 配置缓存路由页面

```vue
<!-- App.vue -->
<template>
  <div>
    <nav>
      <router-link to="/home">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-link to="/contact">联系</router-link>
    </nav>

    <!-- 缓存路由组件 -->
    <keep-alive :include="['Home', 'About']" :max="2">
      <component :is="currentComponent" />
    </keep-alive>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 动态决定当前渲染的组件
const currentComponent = computed(() => route.meta.componentName)
</script>

```



## 自定义指令

在 `<script setup>` 中，任何以 `v` 开头的驼峰式命名的变量都可以当作自定义指令使用

局部使用

```vue
<script setup>
// 在模板中启用 v-highlight
const vHighlight = {
  mounted: (el) => {
    el.classList.add('is-highlight')
  }
}
</script>

<template>
  <p v-highlight>This sentence is important!</p>
</template>
```

### 全局挂载

```js
const app = createApp({})

// 使 v-highlight 在所有组件中都可用
app.directive('highlight', {
  /* ... */
})
```

### 声明周期钩子

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {}
}
```

