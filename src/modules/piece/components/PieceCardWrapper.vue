<template>
	<v-card v-if="getPieces.length > 0" class="px-3">
		<v-row justify="start">
			<v-col cols="4" class="pa-1"
				v-for="(piece, index) in getPieces" :key="piece.id">
					<PieceCard :index="index" :piece="piece" />	
			</v-col>
		</v-row>
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
		}
	}
}
</script>