<template>
	<div>
		<v-btn 
		v-if="!getIsFilterApplied"
		class="text-subtitle-2 text-none" 
		small
		block
		depressed color="info"
		:disabled="!canFilter" 
		@click="openFilterModal">
			Filtrar <v-icon right dark> mdi-filter </v-icon>
		</v-btn>
		<v-btn 
		v-if="getIsFilterApplied"
		class="text-subtitle-2 text-none" 
		small
		block
		depressed color="info"
		:disabled="!canFilter" 
		@click="clearFilter">
			Limpar <v-icon right dark> mdi-filter-off </v-icon>
		</v-btn>
	</div>
</template>

<script>
import PieceFilterModel from "@/modules/piece/models/PieceFilterModel"
export default {
	computed: {
		getIsFilterApplied() {
			return this.$store.getters.getIsFilterApplied
		},
		getPieces () {
			return this.$store.getters.getPieces
		},
		canFilter() {
			return true
		}
	},
	methods: {
		clearFilter() {
			this.$store.commit("SET_IS_FILTER_APPLIED", false)
			this.$store.commit("SET_PIECE_FILTER", new PieceFilterModel())
			this.$emit("clearFilter")
		},
		openFilterModal() {
			this.$store.commit("SET_SHOW_PIECE_FILTER_MODAL", true)
		}
	}
};
</script>