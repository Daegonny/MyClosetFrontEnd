<template>
	<v-menu
	v-model="menuOpen"
	:close-on-content-click="true"
	:nudge-right="40"
	transition="scale-transition"
	offset-y
	min-width="290px"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-text-field
			v-model="dateValue"
			:label="label"
			clearable
			readonly
			v-bind="attrs"
			v-on="on"
			></v-text-field>
		</template>
	<v-date-picker
	v-model="dateValue"
	locale="pt-BR"
	:show-current="true"
	color="info"
	@input="menuOpen = false"
	></v-date-picker>
	</v-menu>
</template>

<script>
import {dateTimeToDateString} from "@/utils/methods.js"
export default {
	props: ['propDate', 'label'],
	data() {
		return {
			menuOpen: false,
			dateValue: this.formatDateTime(this.$props.propDate)
		}
	},
	watch:{
		dateValue: function(value){
			this.$emit('changed-date-value', value)
		}
	},
	created(){
		this.$emit('changed-date-value', this.dateValue)
	},
	methods:{
		formatDateTime(dateTime){
			return dateTimeToDateString(dateTime)
		}
	}
};
</script>