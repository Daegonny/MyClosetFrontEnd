<template>
	<v-card>
		<v-img
			aspect-ratio="1"
			:src='filePath(piece.fullFilePath)'
			@click="select"
		>
			<v-badge
			class="mt-1"
			color="primary"
			icon="mdi-check-bold"
			overlap
			inline
			:hidden="!piece.isSelected"
			/>
		</v-img>
	</v-card>
</template>

<script>
import {getFilePath} from "@/utils/methods.js";

export default {
	components: {
	},
	props: ['index', 'piece'],
	methods: {
		filePath(fullFilePath){
			return getFilePath(fullFilePath)
		},
		select (){
			this.piece.isSelected = !this.piece.isSelected 
			if(this.piece.isSelected)
				this.$store.commit("ADD_SELECTED_PIECE", this.piece)
			else
				this.$store.commit("REMOVE_SELECTED_PIECE", this.piece)
		}
	}
	
};
</script>