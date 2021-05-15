<template>
	<v-card class="px-2 pt-1">
		<v-row align-content="center">
			<v-col cols="10">
				<tag-select 
					:propSelected="pieceFilter.tagNames"
					@changed-tags="pieceFilter.tagNames = $event"
					>
				</tag-select>
			</v-col>
			<v-col cols="1">
				<v-btn fab small>
					<v-icon @click="$emit('search')" >mdi-magnify</v-icon>
				</v-btn>
			</v-col>
		</v-row>
		
		<!-- <v-row class="mx-2">
			<v-col md="3">
				<v-text-field
				clearable
				v-model="pieceFilter.name"
				label="Nome da Peça"
				hint="Pesquise pelo nome da peça!"
				/>
			</v-col>
			<v-col md="5">
				<tag-select 
				:propSelected="pieceFilter.tagNames"
				@changed-tags="pieceFilter.tagNames = $event"
				>
				</tag-select>
			</v-col>
			<v-col md="4">	
				<v-radio-group
				v-model="pieceFilter.mustHaveAllTagNames"
				>
					<v-row>
						<v-col md="6">
							<v-radio
							label="Deve conter uma das tags"
							:value="false"
							></v-radio>
						</v-col>
						<v-col md="6">
							<v-radio
							label="Deve conter todas as tags"
							:value="true"
							></v-radio>
						</v-col>
					</v-row>
				</v-radio-group>
			</v-col>
		</v-row>
		<v-row class="mx-2">
			<v-col md="3">
				<price-input
				:propPriceValue="pieceFilter.priceMin"
				:label="'Valor maior que'"
				:color="priceInputColor"
				@changed-price-value="pieceFilter.priceMin = $event"
				/>
			</v-col>
			<v-col md="3">
				<price-input
				:propPriceValue="pieceFilter.priceMax"
				:label="'Valor menor que'"
				:color="priceInputColor"
				@changed-price-value="pieceFilter.priceMax = $event"
				/>
			</v-col>
			<v-col cols="3">
				<custom-date-picker 
				:propDate="pieceFilter.purchaseDateMin" 
				@changed-date-value="pieceFilter.purchaseDateMin = $event"
				:label="'Adquirido depois de'">
				</custom-date-picker>
			</v-col>
			<v-col cols="3">
				<custom-date-picker 
				:propDate="pieceFilter.purchaseDateMax" 
				@changed-date-value="pieceFilter.purchaseDateMax = $event"
				:label="'Adquirido antes de'">
				</custom-date-picker>
			</v-col>
		</v-row> -->
	</v-card>
</template>

<script>
// import CustomDatePicker from "@/modules/commons/components/CustomDatePicker"
// import PriceInput from "@/modules/commons/components/PriceInput"
import TagSelect from "@/modules/tag/components/TagSelect"
import PieceFilterModel from "@/modules/piece/models/PieceFilterModel"

export default {
	components: {
		// CustomDatePicker,
		// PriceInput,
		TagSelect
	},

	data() {
		return {
			pieceFilter: new PieceFilterModel(),
			priceInputColor: '#1e1e1e'
		}
	},

	created () {
		this.pieceFilter = this.getPieceFilter
	},

	watch: {  
		pieceFilter: function (newPieceFilter) {
			this.$store.commit("SET_PIECE_FILTER", newPieceFilter)
		}	
	},
	
	computed: {
		getPieceFilter () {
			return this.$store.getters.getPieceFilter
		}
	}
};
</script>