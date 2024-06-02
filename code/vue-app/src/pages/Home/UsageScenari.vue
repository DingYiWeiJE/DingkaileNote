<script setup lang="ts">

</script>
<template>
	<div class="home_show_3">
		<div v-for="(item, i) of 5" class="home_show_scenari" :key="i"></div>
	</div>
</template>
<style scoped lang="scss">
.home_show_3 {
	display: grid;
	gap: .1333rem;
	grid-template-rows: repeat(5, 5.6rem);
	grid-template-columns: 100%;

	.home_show_scenari {
		background: pink;
	}
}
</style>