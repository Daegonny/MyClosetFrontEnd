<template>
	<v-card v-if="getPieces.length > 0" class="px-3">
		<v-row justify="space-around">
			<v-col cols="4" class="pa-1"
				v-for="piece in getPieces" :key="piece.id">
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