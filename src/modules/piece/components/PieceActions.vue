<template>
	<v-card class="px-1">
		<div class="d-flex flex-row justify-space-between pa-1">
			<div>
				<v-btn
				class="text-subtitle-2 text-none" 
				small
				block
				outlined
				depressed color="error"
				:disabled="!canRemoveSelected" 
				:loading="removeSelectedLoading"
				@click="removeSelected">
					Remover <v-icon right dark> mdi-trash-can </v-icon>
				</v-btn>
			</div>
			<div class="ml-1">
				<v-btn
				class="text-subtitle-2 text-none" 
				small
				block
				outlined
				depressed color="success"
				:disabled="!canTagSelected" 
				:loading="tagSelectedLoading"
				@click="tagSelected">
					Marcar <v-icon right dark> mdi-tag </v-icon>
				</v-btn>
			</div>
			<div class="ml-1">
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
					Limpar <v-icon right dark> mdi-filter-off </v-icon>
				</v-btn>
			</div>
		</div>
	</v-card>
</template>

<script>
import PieceFilterModel from "@/modules/piece/models/PieceFilterModel"
export default {
	data() {
		return {
			canRemoveSelected: true,
			removeSelectedLoading: false,
			canTagSelected: true, 
			tagSelectedLoading: false,
			canSearch: true,
		};
	},
	computed: {
		getSelected() {
			return this.$store.getters.getSelectedPieces
		},
		getIsFilterApplied() {
			return this.$store.getters.getIsFilterApplied
		}
	},
	methods: {
		removeSelected () {
			// console.log('removed', this.getSelected)
		},
		tagSelected () {
			// console.log('removed', this.getSelected)
		},
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