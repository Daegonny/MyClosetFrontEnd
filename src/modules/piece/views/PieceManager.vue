<template>
	<div class="d-flex flex-column pa-2 h-100">
		<v-card class="d-flex flex-row justify-space-between align-center pa-2">
			<Pagination
				:current="currentPage" 
				:total="pages" 
				@newPage="updateCurrentPage" 
			/>
			<div>
				<v-btn 
				class="text-subtitle-2 text-none" 
				small
				block
				outlined
				depressed
				@click="openUploadModal"
				>
					Adicionar <v-icon right dark> mdi-upload </v-icon>
				</v-btn>
			</div>
			<PieceFilterAction @clearFilter="updateCurrentPage(1)" />
		</v-card>
		<PieceCardWrapper class="mt-2 flex-grow-1" :removeAfterSave="false" />
		<PieceActions class="my-2" @clearFilter="updateCurrentPage(1)" />
		<PieceFilterModal @search="updateCurrentPage(1)" />
		<PieceUploadModal @addedNewPieces="updateCurrentPage(1)" />
		<PieceEditModal />
	</div>
</template>

<script>
import PieceCardWrapper from '@/modules/piece/components/PieceCardWrapper.vue'
import PieceActions from '@/modules/piece/components/PieceActions.vue'
import PieceFilterModal from '@/modules/piece/components/PieceFilterModal.vue'
import PieceUploadModal from '@/modules/piece/components/PieceUploadModal.vue'
import PieceEditModal from '@/modules/piece/components/PieceEditModal.vue'
import PieceFilterAction from '@/modules/piece/components/PieceFilterAction.vue'
import Pagination from '@/modules/commons/components/Pagination.vue'

export default {
	components: {
		PieceCardWrapper,
		Pagination,
		PieceActions,
		PieceEditModal,
		PieceUploadModal,
		PieceFilterModal,
		PieceFilterAction,
	},
	data() {
		return {
			resultsPerPage: 12,
			firstPageResult: 0, 
			currentPage: 1,
			images: [],
		};
	},

	created: async function(){
		await this.fetchPiecesFiltered(this.getPieceFilter, 
			this.firstPageResult, this.resultsPerPage)
	},

	computed: {
		pages () {
			return Math.ceil(this.getPiecesFilteredRowCount/this.resultsPerPage)
		},
		getPieces () {
			return this.$store.getters.getPieces
		},
		getPieceFilter () {
			return this.$store.getters.getPieceFilter
		},
		getPiecesFilteredRowCount () {
			return this.$store.getters.getPiecesFilteredRowCount
		},
	},

	methods: {
		async updateCurrentPage(value){
			this.currentPage = value
			this.firstPageResult = ((this.currentPage - 1) * this.resultsPerPage)
			await this.fetchPiecesFiltered(this.getPieceFilter, this.firstPageResult, this.resultsPerPage)
		},
		async fetchPiecesFiltered(queryFilter, start, quantity){
			await this.$store.dispatch("fetchPiecesFiltered", {queryFilter, start, quantity});
			await this.$store.dispatch("fetchPiecesFilteredRowCount", {queryFilter});
		},
		openUploadModal() {
			this.$store.commit("SET_SHOW_PIECE_UPLOAD_MODAL", true)
		}
	}
};
</script>
