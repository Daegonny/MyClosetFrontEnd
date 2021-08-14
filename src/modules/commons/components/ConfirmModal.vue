<template>
	<v-dialog
		v-model="dialog"
		persistent
		no-click-animation
		transition="dialog-top-transition">
		<template v-slot:activator="{ on, attrs }">
			<div v-bind="attrs" v-on="on">
				<slot name="button" />
			</div>
		</template>
		<v-card v-if="dialog">
			<div class="pa-5 d-flex flex-column justify-space-between">
				<div class="d-flex flex-row align-center justify-space-between">
					<div>
						<v-card-title class="headline">
						<slot name="title" /> 
						</v-card-title>
					</div>
					<div class="mr-5" @click="dialog = false">
						<v-icon> mdi-close </v-icon>
					</div>
				</div>

				<div class="px-5 py-3">
					<slot name="text" />
				</div>
				
				<v-card-actions class="d-flex flex-row justify-end mt-5">
					<div class="d-flex flex-row">
						<div class="mr-5">
							<v-btn
							class="text-subtitle-2 text-none"  
							small
							block
							depressed color="error"
							@click="dialog = false">
								Cancelar <v-icon right dark> mdi-cancel </v-icon>
							</v-btn>
						</div>
						<div>
							<v-btn
							class="text-subtitle-2 text-none"  
							small
							block
							depressed color="success"
							@click="confirm">
								Confirmar <v-icon right dark> mdi-check </v-icon>
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
	props: ['confirmMessage'],
	data () {
		return {
			dialog: false,
		}
	},
	methods: {
		async confirm(){
			this.dialog = false
			this.$emit(this.confirmMessage)
		}
	}
};
</script>