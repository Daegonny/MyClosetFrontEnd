<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		hide-overlay
		center
		persistent
		no-click-animation
		transition="dialog-top-transition"
	>
		<v-card>
			<div class="pa-5 d-flex flex-column justify-space-between">
				<div class="d-flex flex-row align-center justify-space-between">
					<div>
						<v-card-title class="headline">
							Adicionar Peças
						</v-card-title>
					</div>
					<div class="mr-5" @click="close">
						<v-icon> mdi-close </v-icon>
					</div>
				</div>

				<div class="d-flex flex-column flex-grow-1 justify-space-between">
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
							:disabled="!canUpload" 
							:loading="uploadLoading"
							@click="upload"
							>
								Adicionar <v-icon right dark> mdi-upload </v-icon>
							</v-btn>
						</div>
					</div>
				</v-card-actions>
			</div>
		</v-card>
	</v-dialog>
</template>

<script>

export default {
	components: {
	},

	data() {
		return {
			addedNewPieces: false,
			inputFiles: [],
			files: new FormData(),
			uploadLoading: false,
			fileUploadLimit: 50,
			inputFilesRules: [
				files => files.length <= this.fileUploadLimit  || 'O limte de importação é de 12 imagens por vez!'
			]
		}
	},

	computed: {
		dialog: {
			get (){
				return this.$store.getters.getShowPieceUploadModal
			},
			set (newValue) {
				this.$store.commit("SET_SHOW_PIECE_UPLOAD_MODAL", newValue)
			}
		},
		canUpload: function() {
			return this.inputFiles.length > 0 && this.inputFiles.length <= this.fileUploadLimit && !this.isWaitingAction
		}
	},
	methods: {
		close() {
			this.inputFiles = []
			this.$store.commit("SET_SHOW_PIECE_UPLOAD_MODAL", false)
			if(this.addedNewPieces)
				this.$emit("addedNewPieces")
		},
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
			await this.$store.dispatch("saveFromFiles", {files: this.files, quantity: this.inputFiles.length})
			this.inputFiles = []
			this.files = new FormData()
			this.uploadLoading = false
			this.addedNewPieces = true
		},
	}
};
</script>