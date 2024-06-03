<script setup lang="ts">
import { defineProps } from 'vue'
import type { IGood } from '../typings/goods'

const props = defineProps({
  goods: {
    type: Array<IGood>,
    default: () => []
  }
})

</script>
<template>
  <div class="goods_shelf">
    <ul class="goods_shelf_list">
      <li class="goods_shelf_item" v-for="item in goods" :key="item.id">
        <img :src="item.imgUrl" alt="">
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.goods_shelf {
  

  .goods_shelf_list {
    padding: 0;
    list-style-type: none;
    display: flex;
    gap: .16rem .5333rem ;
    flex-wrap: wrap;

    .goods_shelf_item {
      width: calc((100% - .5333rem)/2);
      height: 7rem;

      img {
        width: 100%;
        height: 5.5rem;
      }

      p {
        font-size: 12px;
      }
    }
  }
}
</style>