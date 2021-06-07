<template>
	<vuetify-money
	v-model="priceValue"
	v-bind:clearable="true"
	v-bind:valueWhenIsEmpty="null"
	v-bind:options="moneyOptions"
	v-bind:background-color="color || '#333'"
	v-bind:label="label"
	/>
</template>

<script>
export default {
	props: ['propPriceValue', 'label', 'color'],
	data() {
		return {
			priceValue: null,
			moneyOptions: {
				locale: "pt-BR",
				prefix: "R$",
				suffix: "",
				length: 11,
				precision: 2
			}
		}
	},
	watch:{
		priceValue: function(){
			this.$emit('changed-price-value', this.formatedPrice)
		},
		propPriceValue: function(value){
			this.priceValue = value
		}
	},
	created(){
		this.priceValue = this.propPriceValue
	},
	computed: {
		formatedPrice (){
			return this.isPriceValid ? parseFloat(this.priceValue) : null
		},
		isPriceValid  (){
			return this.priceValue != undefined && this.priceValue != null
		}
	}
};
</script>