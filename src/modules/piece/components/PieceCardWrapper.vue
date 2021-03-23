<template>
	<v-card v-if="getPieces.length > 0" class="px-5 mt-5">
		<v-row>
			<v-col xs="12" sm="12" md="6" lg="4" xl="3" class="d-flex child-flex" v-for="piece in getPieces" :key="piece.id">
				<piece-card :piece="piece" :removeAfterSave="removeAfterSave"/>	
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

	props: ['removeAfterSave'],

	computed: {
		getPieces () {
			return this.$store.getters.getPieces
		}
	}
}
</script>