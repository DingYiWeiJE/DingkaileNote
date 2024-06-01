<script setup lang="ts">
import { ref } from 'vue';
import brandImg from '../assets/home/brand_mobile.png'; // 请根据你的项目结构调整路径

const imageSrc = ref(brandImg);
</script>

<template>
  <ul class="navigation_bar">
    <li>
      <img :src="imageSrc" alt="Brand Logo">
    </li>
    <!-- <li><router-link to="/">Home</router-link></li> -->
  </ul>
</template>


<style scoped lang="scss">
.navigation_bar {
  list-style-type: none;
  display: flex;
  gap: 0.5rem;
  padding: .1333rem;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: .8rem;

  li {
    display: flex;
    align-items: center;

    img{
      height: .4rem;
      object-fit: cover;
    }

    a {
      text-decoration: none;
      color: black;
      font-size: 0.5rem;
    }
  }

}
</style>