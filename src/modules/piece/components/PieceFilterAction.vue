<template>
	<div>
		<v-btn 
		v-if="!getIsFilterApplied"
		class="text-subtitle-2 text-none" 
		small
		block
		outlined
		depressed color="info"
		:disabled="!canSearch" 
		@click="openSearchModal">
			Filtrar <v-icon right dark> mdi-filter </v-icon>
		</v-btn>
		<v-btn 
		v-if="getIsFilterApplied"
		class="text-subtitle-2 text-none" 
		small
		block
		outlined
		depressed color="info"
		:disabled="!canSearch" 
		@click="clearFilter">
			Limpar Filtro <v-icon right dark> mdi-filter-off </v-icon>
		</v-btn>
	</div>
</template>

<script>
import PieceFilterModel from "@/modules/piece/models/PieceFilterModel"
export default {
	data() {
		return {
			canSearch: true,
		};
	},
	computed: {
		getIsFilterApplied() {
			return this.$store.getters.getIsFilterApplied
		}
	},
	methods: {
		clearFilter() {
			this.$store.commit("SET_IS_FILTER_APPLIED", false)
			this.$store.commit("SET_PIECE_FILTER", new PieceFilterModel())
			this.$emit("clearFilter")
		},
		openSearchModal() {
			this.$store.commit("SET_SHOW_PIECE_SEARCH_MODAL", true)
		}
	}
};
</script>