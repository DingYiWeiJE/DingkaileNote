<script setup lang="ts">
import {defineProps} from 'vue'
import type {IGood} from '@/typings/good'

const props = defineProps({
  goods: {
    type: Array<IGood>,
    default: () => []
  }
})

</script>
<template>

</template>
<style scoped lang="scss">

</style>