<template>
	<div class="pa-6">
		<v-card class="px-3">
			<v-card-title>Filtros</v-card-title>
			<v-row class="mx-2">
				<v-col md="3">
					<v-text-field
					clearable
					v-model="queryFilter.name"
					label="Nome da Peça"
					hint="Pesquise pelo nome da peça!"
					/>
				</v-col>
				<v-col md="5">
					<tag-select 
					:propSelected="queryFilter.tagNames"
					@changed-tags="queryFilter.tagNames = $event"
					>
					</tag-select>
				</v-col>
				<v-col md="4">	
					<v-radio-group
					v-model="queryFilter.mustHaveAllTagNames"
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
					:propPriceValue="queryFilter.priceMin"
					:label="'Valor maior que'"
					:color="priceInputColor"
					@changed-price-value="queryFilter.priceMin = $event"
					/>
				</v-col>
				<v-col md="3">
					<price-input
					:propPriceValue="queryFilter.priceMax"
					:label="'Valor menor que'"
					:color="priceInputColor"
					@changed-price-value="queryFilter.priceMax = $event"
					/>
				</v-col>
				<v-col cols="3">
					<custom-date-picker 
					:propDate="queryFilter.purchaseDateMin" 
					@changed-date-value="queryFilter.purchaseDateMin = $event"
					:label="'Adquirido depois de'">
					</custom-date-picker>
				</v-col>
				<v-col cols="3">
					<custom-date-picker 
					:propDate="queryFilter.purchaseDateMax" 
					@changed-date-value="queryFilter.purchaseDateMax = $event"
					:label="'Adquirido antes de'">
					</custom-date-picker>
				</v-col>
			</v-row>
		</v-card>
		<v-card class="px-3 mt-5">
			<v-row class="mx-2">
			<v-col cols="2">
				<v-card-title>Ações</v-card-title>
			</v-col>
			<v-col cols="4" offset-md="4">
				<all-registers-crud-actions
					:saveAllLoading="saveAllLoading"
					:canSaveAll="canSaveAll"
					:removeAllLoading="removeAllLoading"
					:canRemoveAll="canRemoveAll"
					@remove-all="removeAll"
					@save-all="saveAll"
				/>
			</v-col>
			<v-col md="2">
				<v-btn 
				small
				class="mt-5"
				depressed color="info"
				@click="updateCurrentPage(1)">
					Pesquisar <v-icon right dark> mdi-magnify </v-icon>
				</v-btn>
				</v-col>
			</v-row>
		</v-card>
		<piece-card-wrapper :removeAfterSave="false" />
		<v-card class="px-5 mt-5">
			<div class="text-center">
				<v-pagination
				v-model="currentPage"
				:length="pages"
				@input="updateCurrentPage"
				></v-pagination>
			</div>
		</v-card>
	</div>
</template>

<script>
import PieceCardWrapper from '@/modules/piece/components/PieceCardWrapper'
import AllRegistersCrudActions from '@/modules/commons/components/AllRegistersCrudActions'
import CustomDatePicker from "@/modules/commons/components/CustomDatePicker"
import PriceInput from "@/modules/commons/components/PriceInput"
import TagSelect from "@/modules/tag/components/TagSelect"
import PieceModel from "@/modules/piece/models/PieceModel.js"		

export default {
	components: {
		PieceCardWrapper,
		AllRegistersCrudActions,
		CustomDatePicker,
		PriceInput,
		TagSelect
	},
	data() {
 
		return {
			priceInputColor: '#1e1e1e',
			msg: '',
			resultsPerPage: 12,
			firstPageResult: 0, 
			currentPage: 1,
			images: [],
			queryFilter: {
				name: null,
				purchaseDateMin: null,
				purchaseDateMax: null,
				priceMin: null,
				priceMax: null,
				tagNames: [],
				mustHaveAllTagNames: false
			},
			removeAllLoading: false,
			saveAllLoading: false
		};
	},

	created: async function(){
		await this.fetchPiecesFiltered(this.queryFilter, this.firstPageResult, this.resultsPerPage)
	},

	computed: {
		pages () {
			return Math.ceil(this.getPiecesFilteredRowCount/this.resultsPerPage)
		},
		getPieces () {
			return this.$store.getters.getPieces
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
			await this.fetchPiecesFiltered(this.queryFilter, this.firstPageResult, this.resultsPerPage)
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
