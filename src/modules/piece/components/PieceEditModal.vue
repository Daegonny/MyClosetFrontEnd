<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		hide-overlay
		persistent
		no-click-animation
		transition="dialog-top-transition"
	>
		<v-card v-if="dialog">
			<div class="pa-5 d-flex flex-column justify-space-between">
				<div class="d-flex flex-row align-center justify-space-between">
					<div>
						<v-card-title class="headline">
							Editar Peça
						</v-card-title>
					</div>
					<div class="mr-5" @click="close">
						<v-icon> mdi-close </v-icon>
					</div>
				</div>

				<div class="d-flex flex-column flex-grow-1 justify-space-between">
					<div class="d-flex flex-row justify-center align-center">
						<div class="w-70">
							<v-img
								aspect-ratio="1"
								:src='filePath(piece.fullFilePath)'
							/>
						</div>
					</div>
					<div class="mt-4">
						<v-text-field 
							v-model="piece.name"
							clearable
							label="Nome"
							hint="Identifique essa peça com um nome."
						/>
					</div>
					<div>
						<price-input
							:propPriceValue="piece.price"
							:label="'Valor'"
							@changed-price-value="piece.price = $event"
						/>
					</div>
					<div>
						<custom-date-picker 
							:propDate="piece.purchase" 
							@changed-date-value="piece.purchase = $event"
							:label="'Data de Aquisição'"
						/>
					</div>
					<div>
						<tag-select
							:propSelected="piece.tagNames"
							@changed-tags="piece.tagNames = $event"
						/>
					</div>
				</div>

				<div class="mt-5 d-flex flex-row justify-space-between align-center flex-grow-1">
					<div>
						<v-btn fab small @click="iterateCurrentPiece(-1)" :disabled="isSinglePieceSelected">
							<v-icon>mdi-arrow-left</v-icon>
						</v-btn>
					</div>
					<div>
						<v-btn 
						class="text-subtitle-2 text-none" 
						small
						block
						:disabled="!canAct"
						:loading="removeLoading"
						@click="remove"
						depressed color="error">
							Remover <v-icon right dark> mdi-trash-can </v-icon>
						</v-btn>
					</div>
					<div>
						<v-btn
						class="text-subtitle-2 text-none"  
						small
						block
						:disabled="!canAct"
						:loading="saveLoading"
						@click="save"
						depressed color="success">
							Salvar <v-icon right dark> mdi-floppy </v-icon>
						</v-btn>
					</div>
					<div>
						<v-btn fab small @click="iterateCurrentPiece(1)" :disabled="isSinglePieceSelected">
							<v-icon>mdi-arrow-right</v-icon>
						</v-btn>
					</div>
				</div>
			</div>
		</v-card>
	</v-dialog>
</template>

<script>
import CustomDatePicker from "@/modules/commons/components/CustomDatePicker"
import PriceInput from "@/modules/commons/components/PriceInput"
import TagSelect from "@/modules/tag/components/TagSelect"
import { getFilePath } from "@/utils/methods.js";

export default {
	components: {
		CustomDatePicker,
		PriceInput,
		TagSelect
	},
	data() {
		return {
			priceInputColor: '#1e1e1e',
			saveLoading: false,
			removeLoading: false
		};
	},
	computed: {
		canAct() {
			return !(this.saveLoading || this.removeLoading)
		},
		dialog: {
			get (){
				return this.$store.getters.getShowPieceEditModal
			},
			set (newValue) {
				this.$store.commit("SET_SHOW_PIECE_EDIT_MODAL", newValue)
			}
		},
		piece: {
			get (){
				return this.$store.getters.getCurrentPiece
			}
		},
		isSinglePieceSelected(){
			return this.$store.getters.getSelectedPieces.length == 1
		}
	},
	methods: {
		async save() {
			this.saveLoading = true
			await this.$store.dispatch("saveCurrentPiece")
			this.saveLoading = false
		},
		async remove(){
			this.removeLoading = true
			await this.$store.dispatch("removePieces", [this.piece.id])
			this.removeLoading = false
		},
		close() {
			this.$store.commit("SET_SHOW_PIECE_EDIT_MODAL", false)
		},
		filePath(fullFilePath){
			return getFilePath(fullFilePath)
		},
		iterateCurrentPiece (increment) {
			this.$store.commit("ITERATE_SELECTED_PIECE_INDEX", increment)
		}
	}
};
</script>