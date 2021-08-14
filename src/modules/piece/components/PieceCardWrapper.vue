<template>
	<v-card v-if="getPieces.length > 0" class="px-3">
		<v-row justify="start">
			<v-col cols="4" class="pa-1"
				v-for="(piece, index) in getPieces" :key="piece.id">
					<PieceCard :index="index" :piece="piece" />	
			</v-col>
		</v-row>
	</v-card>
	<v-card v-else class="d-flex flex-column px-3 justify-center align-center">
		<div v-if="getIsFilterApplied">
			<center>
				<h5>Nenhuma peça encontrada.</h5> 
				<h5>Experimente realizar outro filtro!</h5>
			</center>
		</div>
		<div v-else>
			<center>
				<h5>Você ainda não tem peças.</h5> 
				<h5>Adicione novas peças para começar!</h5>
			</center>
		</div>
	</v-card>
</template>
<script>
import PieceCard from "@/modules/piece/components/PieceCard"
export default {
	components: {
		PieceCard,
	},

	computed: {
		getPieces () {
			return this.$store.getters.getPieces
		},
		getIsFilterApplied() {
			return this.$store.getters.getIsFilterApplied
		},
	}
}
</script>