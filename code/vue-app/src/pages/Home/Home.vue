<script setup lang="ts">
import KingTitle from '../../components/KingTitle.vue'
import ProductCateGories from './ProductCateGories.vue'
import UsageScenari from './UsageScenari.vue'
import ProductMarerial from './ProductMaterial.vue'
import ProductListTab from './ProductListTab/ProductListTab.vue'

</script>

<template>
  <div class="home">
    <div class="home_show">
      <div class="home_show_1">
        <p>
          PROFESSIONAL OUTDOOR
          FURNITURE MANUFACTURER
        </p>

        <el-button 
          class="king_Primary_button"
          round>
          View product list
        </el-button>
      </div>

      
      <h1 class="introductory_title" style="margin-top: 1.2rem;">POPULAR CATEGORIES</h1>
      <P class="introductory_content">Lorem ipsum dolor sit amet consectetur adipisicing elit.</P>
      <ProductCateGories/>
      
      <el-button class="king_minor_button">View product list</el-button>

      <king-title title="Choose according to usage scenari"></king-title>
      <usage-scenari/>

      <king-title title="Choose according to product material"></king-title>
      <ProductMarerial/>

      <h1 class="introductory_title">Popular products</h1>
      <p class="introductory_content">
        Let nature bacome an extension of comfort and fashion
      </p>
      <ProductListTab/>

    </div>

    <div style="width: 10px; height: 2rem;"></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/font/font.scss';
.home {
  .home_show {
    text-align: center;
    padding: 0 .2667rem;
    align-items: center;
    background: url('@/assets/home/home_show_bg.jpg') no-repeat;
    background-size: 100% 5rem;
    width: 100vw;
    .home_show_1 {
      width: 90vw;
      padding-top: 2.1333rem;
      text-align: start;
  
      p {
        width: 5.7rem;
        margin: 0;
        color: white;
        font-weight: 600;
        font-size: .3733rem;
      }
    }
    

    .king_minor_button{
      margin-top: .5333rem;
    }

    

    
  }

  
  .introductory_title{
    margin-top: .2667rem;
    width: 100%;
    color: $primaryDeepColor;
    font-size: .4rem;
    font-weight: 600;
    text-align: center;
  }
  .introductory_content{
    width: 100%;
    font-size: $contentFontSize2;
    margin-top: .2667rem;
    text-align: center;
  }
}
</style>