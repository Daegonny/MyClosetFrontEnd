<template>
	<v-card>
		<v-img
			aspect-ratio="1"
			:src='filePath(piece.fullFilePath)'
			@click="piece.isSelected = !piece.isSelected"
		>
			<v-badge
			class="mt-1"
			color="primary"
			icon="mdi-check-bold"
			overlap
			inline
			:hidden="!piece.isSelected"
			@click="greet"
			/>
		</v-img>
		<!-- <v-card-text>
			<v-row>
				<v-col cols="12">
					<v-text-field 
					v-model="piece.name"
					clearable
					label="Nome"
					hint="Identifique essa peça com um nome."
					></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="6">
					<price-input
					:propPriceValue="piece.price"
					:label="'Valor'"
					@changed-price-value="piece.price = $event"
					/>
				</v-col>
				<v-col cols="6">
					<custom-date-picker 
					:propDate="piece.purchase" 
					@changed-date-value="piece.purchase = $event"
					:label="'Data de Aquisição'">
					</custom-date-picker>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" >
					<tag-select 
					:propSelected="piece.tags"
					@changed-tags="piece.tags = $event"
					>
					</tag-select>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="6">
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
							class="mx-2"
							dark
							color="error"
							v-bind="attrs"
							v-on="on"
							:disabled="!canAct" 
							:loading="removeLoading"
							v-on:click="remove(piece.id)"
							>
								Excluir <v-icon right> mdi-trash-can </v-icon>
							</v-btn>
						</template>
						<span>Remover</span>
					</v-tooltip>
				</v-col>
				<v-col cols="6" class="text-right">
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
							class="mx-2"
							dark
							color="success"
							v-bind="attrs"
							v-on="on"
							:disabled="!canAct" 
							:loading="saveLoading"
							v-on:click="save(piece)"
							>
								Salvar <v-icon right> mdi-floppy </v-icon>
							</v-btn>
						</template>
						<span>Salvar Peça</span>
					</v-tooltip>
				</v-col>
			</v-row>
		</v-card-text> -->
	</v-card>
</template>

<script>
import {getFilePath} from "@/utils/methods.js";
import PieceModel from "@/modules/piece/models/PieceModel.js"
// import CustomDatePicker from "@/modules/commons/components/CustomDatePicker"
// import PriceInput from "@/modules/commons/components/PriceInput"
// import TagSelect from "@/modules/tag/components/TagSelect"
export default {
	components: {
		// CustomDatePicker,
		// PriceInput,
		// TagSelect
	},
	props: ['piece', 'removeAfterSave'],
	data() {
			return {
				menuPurchase: false,
				removeLoading: false,
				saveLoading: false
			}
	},
	computed: {
		canAct(){
			return !this.removeLoading && !this.saveLoading
		}
	},
	methods: {
		greet () {
			alert("teste")
		},
		async remove(pieceId){
			this.removeLoading = true
			await this.$store.dispatch("removePiece", {pieceId})
			this.removeLoading = false
		},
		async save(piece){
			this.saveLoading = true
			const removeAfterSave = this.$props.removeAfterSave
			await this.$store.dispatch("savePiece", {pieceModel: new PieceModel(piece), removeAfterSave: removeAfterSave})
			this.saveLoading = false
		},
		filePath(fullFilePath){
			return getFilePath(fullFilePath)
		}
	}
	
};
</script>