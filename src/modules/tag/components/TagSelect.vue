<template>
	<v-combobox
	v-model="model"
	multiple
	hide-no-data
	hide-selected
	:search-input.sync="search"
	clearable
	chips
	deletable-chips
	item-text="name"
	item-value="name"
	label="Tags"
	placeholder="Selecione tags relevantes"
	></v-combobox>
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