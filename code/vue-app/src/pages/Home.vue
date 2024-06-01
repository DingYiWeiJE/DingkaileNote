<script setup lang="ts">

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

      <div class="home_show_2">
        <h1>POPULAR CATEGORIES</h1>
        <P>Lorem ipsum dolor sit amet consectetur adipisicing elit.</P>
        <div class="home_show_profuct_priview">
          <div class="home_show_profuct_priview_item"></div>
          <div class="home_show_profuct_priview_item"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/font/font.scss';
// $titleFont1: pink;

.home {
  .home_show {
    padding: 0 .2667rem;
    align-items: center;
    background: url('../assets/home/home_show_bg.jpg') no-repeat;
    background-size: 100% 5rem;
    width: 100vw;
    .home_show_1 {
      width: 90vw;
      padding-top: 2.1333rem;
  
      p {
        width: 5.7rem;
        margin: 0;
        color: white;
        font-weight: 600;
        font-size: .3733rem;
      }
    }
    .home_show_2{
      margin-top: 1.2rem;
      width: 100%;
      h1{
        width: 100%;
        color: #0e8490;
        font-size: .4rem;
        font-weight: 600;
        text-align: center;
      }
      P{
        width: 100%;
        font-size: $contentFontSize2;
        margin-top: .2667rem;
        text-align: center;
      }

      .home_show_profuct_priview{
        height: 10rem;
        width: 100%;
        .home_show_profuct_priview_item{
          margin-top:.2667rem;
          height: 45%;
          width: 100%;
          background: url('../assets/home/home_show_bg.jpg') no-repeat;
          background-size: 100% 100%;
          border-radius: .1333rem;
        
        }
      }

    }
  }
}
</style>