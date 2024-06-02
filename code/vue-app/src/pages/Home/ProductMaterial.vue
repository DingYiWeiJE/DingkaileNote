<script setup lang="ts">

</script>
<template>
<div class="home_show_4">
        <div v-for="(item, i) of 5" class="home_show_material" :key="i"></div>
      </div>
</template>
<style scoped lang="scss">
.home_show_4{
      display: flex;
      flex-wrap: wrap;
      gap: .1333rem;
      .home_show_material{
        height: 5.6rem;
        width: 100%;
        background: greenyellow;
      }
    }
</style>