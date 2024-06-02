<script setup lang="ts">

</script>
<template>
	<div class="home_show_profuct_priview">
		<div v-for="(item, i) of 6" :key="i" class="home_show_profuct_priview_item"></div>
	</div>

</template>
<style scoped lang="scss">
.home_show_profuct_priview {
	width: 100%;
	display: grid;
	width: 100%;
	gap: .2667rem;
	grid-template-rows: repeat(5, 4.6rem);
	grid-template-columns: repeat(2, 1fr);
	grid-template-areas:
		"A A"
		"B C"
		"B D"
		"E E"
		"F F"
	;

	.home_show_profuct_priview_item {
		margin-top: .2667rem;
		height: 100%;
		width: 100%;
		background-color: #0e8490;
		border-radius: .1333rem;

		&:nth-of-type(1) {
			grid-area: A
		}

		&:nth-of-type(2) {
			grid-area: B
		}

		&:nth-of-type(3) {
			grid-area: C
		}

		&:nth-of-type(4) {
			grid-area: D
		}

		&:nth-of-type(5) {
			grid-area: E
		}

		&:nth-of-type(6) {
			grid-area: F
		}

	}
}
</style>