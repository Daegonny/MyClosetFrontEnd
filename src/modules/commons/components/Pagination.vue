<template>
	<div class="d-flex flex-row align-center justify-space-between">
		<div @click="updateCurrent(-1)">
			<v-icon>
				mdi-arrow-left
			</v-icon>
		</div>
		<div class="ml-4">
			{{text}}
		</div>
		<div class="ml-4" @click="updateCurrent(1)">
			<v-icon>
				mdi-arrow-right
			</v-icon>
		</div>
	</div>
</template>

<script>
export default {
	props: ['current','total'],
	methods: {
		updateCurrent(value) {
			if(this.current + value > 0 &&  this.current + value <= this.total)
				this.$emit('newPage', this.current + value)
		}
	},
	computed:{
		text() {
			return this.total > 0
				? `${this.current} / ${this.total}`
				: `0 / ${this.total}` 
		}
	}
};
</script>