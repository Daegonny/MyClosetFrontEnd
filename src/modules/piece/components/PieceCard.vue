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
import PieceModel from "@/modules/piece/models/PieceModel.js"

export default {
	components: {
	},
	props: ['index', 'piece', 'removeAfterSave'],
	data() {
			return {
				menuPurchase: false,
				removeLoading: false,
				saveLoading: false
			}
	},
	computed: {
		canAct(){
			return !this.removeLoading && !this.saveLoading
		}
	},
	methods: {
		async remove(pieceId){
			this.removeLoading = true
			await this.$store.dispatch("removePiece", {pieceId})
			this.removeLoading = false
		},
		async save(piece){
			this.saveLoading = true
			const removeAfterSave = this.$props.removeAfterSave
			await this.$store.dispatch("savePiece", {pieceModel: new PieceModel(piece), removeAfterSave: removeAfterSave})
			this.saveLoading = false
		},
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