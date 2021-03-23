<template>
	<div class="pa-6">
		<v-card class="px-3">
			<v-card-title>Importar peças ao guarda-Roupa</v-card-title>
			<v-row class="ml-3">
				<v-col md="6">
					<form enctype="multipart/form-data">
						<v-file-input
						:multiple="true"
						name="file"
						clearable
						accept="image/*"
						prepend-icon="mdi-camera"
						v-model="inputFiles"
						label="Selecione peças para importar!"
						:rules="inputFilesRules"
						></v-file-input>
					</form>
				</v-col>
				<v-col md="2">
					<v-btn 
					class="mt-5"
					small
					depressed color="primary"
					:disabled="!canUpload" 
					:loading="uploadLoading"
					@click="upload">
						Importar <v-icon right dark> mdi-cloud-upload </v-icon>
					</v-btn>
				</v-col>
				<v-col md="4">
					<all-registers-crud-actions
						:saveAllLoading="saveAllLoading"
						:canSaveAll="canSaveAll"
						:removeAllLoading="removeAllLoading"
						:canRemoveAll="canRemoveAll"
						@remove-all="removeAll"
						@save-all="saveAll"
					/>
				</v-col>
			</v-row>
		</v-card>
		<piece-card-wrapper :removeAfterSave="true" />	
	</div>
</template>

<script>
import PieceCardWrapper from '@/modules/piece/components/PieceCardWrapper'
import AllRegistersCrudActions from '@/modules/commons/components/AllRegistersCrudActions'
import PieceModel from "@/modules/piece/models/PieceModel.js"	
export default {
	components: {
		PieceCardWrapper,
		AllRegistersCrudActions
	},
	data() {
 
		return {
			msg: '',
			inputFiles: [],
			files: new FormData(),
			images: [],
			uploadLoading: false,
			removeAllLoading: false,
			saveAllLoading: false,
			fileUploadLimit: 12,
			inputFilesRules: [
				files => files.length <= this.fileUploadLimit  || 'O limte de importação é de 12 imagens por vez!'
			]
		};
	},
	created: async function(){
			this.$store.commit("SET_PIECES", [])
		},

	computed: {
		isWaitingAction: function(){
			return this.uploadLoading || this.removeAllLoading || this.saveAllLoading
		},
		canUpload: function() {
			return this.inputFiles.length > 0 && this.inputFiles.length <= this.fileUploadLimit && !this.isWaitingAction
		},
		canRemoveAll: function() {
			return this.getPieces.length > 0 && !this.isWaitingAction
		},
		canSaveAll: function() {
			return this.getPieces.length > 0 && !this.isWaitingAction
		},

		getPieces () {
			return this.$store.getters.getPieces
		}
	},

	methods: {

		fileChange(fileList){
			if (fileList){
				for (let index = 0; index < fileList.length; index++) {
					this.files.append("files", fileList[index], fileList[index].name);   
				}
			}
		},

		async upload() {
			this.uploadLoading = true
			this.fileChange(this.inputFiles)
			await this.$store.dispatch("saveFromFiles", this.files)
			this.inputFiles = []
			this.uploadLoading = false
		},

		async removeAll(){
			this.removeAllLoading = true
			await this.$store.dispatch("removePieces", this.getPieces.map(p => p.id))
			this.removeAllLoading = false	
		},

		async saveAll(){
			this.saveAllLoading = true
			await this.$store.dispatch("savePieces", this.getPieces.map(p => new PieceModel(p)))			
			this.$store.commit("SET_PIECES", [])
			this.saveAllLoading = false
		}

	}
};
</script>
