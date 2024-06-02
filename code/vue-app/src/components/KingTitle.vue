<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    title: string
}>();

</script>
<template>
    <h1 class="king_title">
        <span></span>
        {{props.title}}
    </h1>
</template>
<style scoped lang="scss">
@import '@/assets/font/font.scss';
.king_title{
    display: flex;
    height: .8rem;
    text-align: start;
    margin: .5333rem 0;
    font-size: .3733rem;
    line-height: .8rem;
    span{
        display: inline-block;
        height: 100%;
        width: .4rem;
        margin-right: .2667rem;
        background: linear-gradient(to right, 
            $primaryColor 0%, $primaryColor 50%, transparent 50%,
            transparent 80%, 
            $primaryColor 80%, 
            $primaryColor 100%
        );}
    
}

</style>