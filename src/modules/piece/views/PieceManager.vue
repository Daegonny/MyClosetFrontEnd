<template>
	<div class="d-flex flex-column pa-2 h-100">
		<v-card class="px-5">
			<div class="text-center">
				<v-pagination
				v-model="currentPage"
				:length="pages"
				@input="updateCurrentPage"
				></v-pagination>
			</div>
		</v-card>
		<PieceCardWrapper class="mt-2 flex-grow-1" :removeAfterSave="false" />
		<PieceActions class="my-2" @clearFilter="updateCurrentPage(1)" />
		<PieceSearchModal @search="updateCurrentPage(1)" />
	</div>
</template>

<script>
import PieceCardWrapper from '@/modules/piece/components/PieceCardWrapper.vue'
import PieceActions from '@/modules/piece/components/PieceActions.vue'
import PieceSearchModal from '@/modules/piece/components/PieceSearchModal.vue'
// import AllRegistersCrudActions from '@/modules/commons/components/AllRegistersCrudActions'
// import PieceFilter from "@/modules/piece/components/PieceFilter.vue"
import PieceModel from '@/modules/piece/models/PieceModel.js'

export default {
	components: {
		PieceCardWrapper,
		PieceActions,
		PieceSearchModal
		// PieceFilter,
		// AllRegistersCrudActions
	},
	data() {
		return {
			msg: '',
			resultsPerPage: 12,
			firstPageResult: 0, 
			currentPage: 1,
			images: [],
			removeAllLoading: false,
			saveAllLoading: false
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
		getTags () {
			return this.$store.getters.getTags
		},
		isWaitingAction: function(){
			return this.removeAllLoading || this.saveAllLoading
		},
		canRemoveAll: function() {
			return this.getPieces.length > 0 && !this.isWaitingAction
		},
		canSaveAll: function() {
			return this.getPieces.length > 0 && !this.isWaitingAction
		}
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

		async removeAll(){
			this.removeAllLoading = true
			await this.$store.dispatch("removePieces", this.getPieces.map(p => p.id))
			this.removeAllLoading = false	
		},

		async saveAll(){
			this.saveAllLoading = true
			await this.$store.dispatch("savePieces", this.getPieces.map(p => new PieceModel(p)))
			this.saveAllLoading = false
		}
	}
};
</script>
