<template>
	<v-combobox
	v-model="model"
	multiple
	:search-input.sync="search"
	clearable
	allow-overflow
	label="Tags"
	item-text="name"
	item-value="name"
	:delimiters="[',','.',' ']"
	placeholder="Selecione tags relevantes"
	hide-details
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
		this.model = this.propSelected ? [...this.propSelected.map(p => p.name)] : []
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