<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		hide-overlay
		persistent
		no-click-animation
		transition="dialog-top-transition"
	>
		<v-card>
			<div class="pa-5 d-flex flex-column justify-space-between">
				<div class="d-flex flex-row align-center justify-space-between">
					<div>
						<v-card-title class="headline">
							Filtrar Peças
						</v-card-title>
					</div>
					<div class="mr-5" @click="close">
						<v-icon> mdi-close </v-icon>
					</div>
				</div>

				<div class="d-flex flex-column flex-grow-1 justify-space-between">
					<div v-if="dialog">
						<TagSelect 
							:propSelected="pieceFilter.tagNames"
							@changed-tags="pieceFilter.tagNames = $event"
							>
						</TagSelect>
					</div>
					<div>
						<v-radio-group v-model="pieceFilter.mustHaveAllTagNames" hide-details>
							<div class="d-flex flex-row justify-space-between">
								<div>
									<v-radio :value="true">
										<template slot="label">
											<div class="d-flex flex-row align-center mt-2">
												<div>Interseção</div>
												<div class="ml-3"><v-icon>mdi-set-center</v-icon></div>	
											</div>
										</template>
									</v-radio>
								</div>
								<div>
									<v-radio :value="false">
										<template slot="label">
											<div class="d-flex flex-row align-center mt-2">
												<div>União</div>
												<div class="ml-3"><v-icon>mdi-set-all</v-icon></div>	
											</div>
										</template>
									</v-radio>
								</div>
							</div>
						</v-radio-group>
					</div>
					<div>
						<v-text-field
						clearable
						v-model="pieceFilter.name"
						label="Nome"
						hide-details
						/>
					</div>
					<div class="mt-1">
						<price-input
						:propPriceValue="pieceFilter.priceMin"
						:label="'Valor mínimo'"
						:color="priceInputColor"
						@changed-price-value="pieceFilter.priceMin = $event" />
					</div>
					<div>
						<price-input
						:propPriceValue="pieceFilter.priceMax"
						:label="'Valor máximo'"
						:color="priceInputColor"
						@changed-price-value="pieceFilter.priceMax = $event"/>
					</div>
					<div>
						<custom-date-picker 
						:propDate="pieceFilter.purchaseDateMin" 
						@changed-date-value="pieceFilter.purchaseDateMin = $event"
						:label="'Adquirido à partir de'" />
					</div>
					<div>
						<custom-date-picker 
						:propDate="pieceFilter.purchaseDateMax" 
						@changed-date-value="pieceFilter.purchaseDateMax = $event"
						:label="'Adquirido até'"/>
					</div>
				</div>

				<v-card-actions class="d-flex flex-row justify-end">
					<div class="d-flex flex-row">
						<div class="mr-5">
							<v-btn
							class="text-subtitle-2 text-none"  
							small
							block
							depressed color="error"
							@click="close">
								Cancelar <v-icon right dark> mdi-cancel </v-icon>
							</v-btn>
						</div>
						<div>
							<v-btn
							class="text-subtitle-2 text-none"  
							small
							block
							depressed color="info"
							@click="search">
								Filtrar <v-icon right dark> mdi-filter </v-icon>
							</v-btn>
						</div>
					</div>
				</v-card-actions>
			</div>
		</v-card>
	</v-dialog>
</template>

<script>
import CustomDatePicker from "@/modules/commons/components/CustomDatePicker"
import PriceInput from "@/modules/commons/components/PriceInput"
import TagSelect from "@/modules/tag/components/TagSelect"
import PieceFilterModel from "@/modules/piece/models/PieceFilterModel"

export default {
	components: {
		CustomDatePicker,
		PriceInput,
		TagSelect
	},
	created () {
		this.clearFilter()
	},
	data() {
		return {
			pieceFilter: new PieceFilterModel(),
			priceInputColor: '#1e1e1e'
		};
	},
	computed: {
		dialog: {
			get (){
				return this.$store.getters.getShowPieceFilterModal
			},
			set (newValue) {
				this.$store.commit("SET_SHOW_PIECE_FILTER_MODAL", newValue)
			}
		},
		getIsFilterApplied() {
			return this.$store.getters.getIsFilterApplied
		}
	},
	methods: {
		search() {
			this.$store.commit("SET_PIECE_FILTER", this.pieceFilter)
			this.pieceFilter = new PieceFilterModel()
			this.$store.commit("SET_SHOW_PIECE_FILTER_MODAL", false)
			this.$store.commit("SET_IS_FILTER_APPLIED", true)
			this.$emit("search")
		},
		close() {
			this.clearFilter()
			this.$store.commit("SET_SHOW_PIECE_FILTER_MODAL", false)
			this.$store.commit("SET_IS_FILTER_APPLIED", false)
		},
		clearFilter() {
			this.pieceFilter = new PieceFilterModel()
			this.pieceFilter.tagNames = []
			this.$store.commit("SET_PIECE_FILTER", this.pieceFilter)
		}
	}
};
</script>