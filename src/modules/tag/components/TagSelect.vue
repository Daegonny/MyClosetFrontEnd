<template>
	<v-combobox
	v-model="model"
	multiple
	:search-input.sync="search"
	clearable
	allow-overflow
	label="Tags"
	:delimiters="[',','.',' ']"
	placeholder="Selecione tags relevantes"
	hide-details
	:return-object="false"
	/>
</template>

<script>
export default {
	props: ['propSelected'],
	data() {
		return {
			model: null,
			search: null
		}
	},
	created(){
		console.log(this.propSelected)
		this.model = this.propSelected
		this.$emit('changed-tags', this.tags)
	},
	computed : {
		tags(){
			if (!this.model) return []
			return this.model;
		}
	},
	watch:{
		search (value) {
			if (!value){
				return;
			}	
			this.search = value.clear()
		},
		model (){
			this.$emit('changed-tags', this.tags)
		}
	}
};
</script>