<template>
	<v-card class="pa-2">
		<div class="d-flex flex-row justify-space-between">
			<div>
				<ConfirmModal confirmMessage="removeMultiple" @removeMultiple="removeSelected">
					<template v-slot:title>
						Remoção
					</template>
					<template v-slot:text>
						Deseja remover as peças selecionadas?
					</template>
					<template v-slot:button>
						<v-btn
						class="text-subtitle-2 text-none" 
						small
						block
						depressed color="error"
						:loading="isLoadingRemove"
						:disabled="!canRemove" 
						>
							Remover <v-icon right> mdi-trash-can </v-icon>
						</v-btn>
					</template>
				</ConfirmModal>
			</div>
			<div class="ml-1">
				<v-btn
				class="text-subtitle-2 text-none" 
				small
				block
				depressed color="success"
				:loading="isLoadingTag"
				:disabled="!canTag" 
				@click="tagSelected">
					Marcar <v-icon right dark> mdi-tag </v-icon>
				</v-btn>
			</div>
			<div class="ml-1">
				<v-btn 
				class="text-subtitle-2 text-none" 
				small
				block
				depressed color="info"
				:disabled="!canEdit"
				@click="openEditModal">
					Editar <v-icon right dark> mdi-pencil </v-icon>
				</v-btn>
			</div>
		</div>
	</v-card>
</template>

<script>
import ConfirmModal from '@/modules/commons/components/ConfirmModal.vue'

export default {
	components: {
		ConfirmModal
	},
	data() {
		return {
			isLoadingRemove: false,
			isLoadingTag: false
		};
	},
	computed: {
		getSelected() {
			return this.$store.getters.getSelectedPieces
		},
		isLoading() {
			return this.isLoadingRemove || this.isLoadingTag
		},
		canEdit() {
			return this.selectionIsNotEmptAndIsNotLoading
		},
		canTag() {
			return this.selectionIsNotEmptAndIsNotLoading && false
		},
		canRemove() {
			return this.selectionIsNotEmptAndIsNotLoading
		},
		selectionIsNotEmptAndIsNotLoading() {
			return this.getSelected.length > 0 && !this.isLoading
		},
		getPieceFilter () {
			return this.$store.getters.getPieceFilter
		},
		getResultsPerPage () {
			return this.$store.getters.getResultsPerPage
		}, 
		getFirstPageResult () {
			return this.$store.getters.getFirstPageResult
		},
		getCurrentPage (){
			return this.$store.getters.getCurrentPage
		},
		getTotalPages (){
			return this.$store.getters.getTotalPages
		},
		getIsLastPage (){
			return this.$store.getters.getIsLastPage
		}
	},
	methods: {
		async removeSelected () {
			this.isLoadingRemove = true
			await this.$store.dispatch("removePieces", this.getSelected.map(p => p.id))
			this.isLoadingRemove = false;
		},
		tagSelected () {
			this.isLoadingTag = true
			setTimeout(() => {  this.isLoadingTag = false; }, 2000);
		},
		openEditModal() {
			this.$store.commit("SET_SHOW_PIECE_EDIT_MODAL", true)
		}
	}
};
</script>