<script setup lang="ts">
import { ref } from 'vue'
import TableChairTab from './TableChairTab.vue'
import SofaTab from './SofaTab.vue'
import SunLoungeTab from './SunLoungeTab.vue'
import HangingSwingTab from './HangingSwingTab.vue'
import GardenNumbrellaTab from './GardenNumbrellaTab.vue'

const activeName = ref('1')

const handleClick = () => {
	activeName.value = 'third'
}
</script>
<template>
	<div class="product_tab">
		<el-button type="primary" @click="handleClick">Primary</el-button>
		
		<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			<el-tab-pane label="Outdoor table chairs" name="1">
				<TableChairTab />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<style scoped lang="scss">
.product_tab {
	:deep .el-tabs__header {
		display: none !important;
	}
}
</style>