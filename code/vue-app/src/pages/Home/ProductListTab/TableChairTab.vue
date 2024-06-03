<script setup lang="ts">
import GoodsShelf from '../../../components/GoodsShelf.vue';
import type { IGood } from '../../../typings/goods'

const goods: Array<IGood> = new Array(30).fill(null).map((item, i) => {
  return {
      id: i,
      name: 'Table Chair',
      imgUrl: `https://picsum.photos/1000/1000?${i}`,
      description: 'This is a table chair',
  }
});

</script>
<template>
<GoodsShelf :goods="goods"/>
</template>
<style scoped lang="scss">

</style>