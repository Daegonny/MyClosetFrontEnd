<template>
	<v-row class="mt-2">
		<v-col md="6">
			<v-btn 
			small
			depressed color="error"
			:disabled="!canRemoveAll" 
			:loading="removeAllLoading"
			@click="$emit('remove-all')">
				Remover Tudo <v-icon right dark> mdi-trash-can </v-icon>
			</v-btn>
		</v-col>
		<v-col md="6">
			<v-btn 
			small
			depressed color="success"
			:disabled="!canSaveAll" 
			:loading="saveAllLoading"
			@click="$emit('save-all')">
				Salvar Tudo<v-icon right dark> mdi-floppy </v-icon>
			</v-btn>
			</v-col>
	</v-row>
</template>

<script>
export default {
	props: ['canRemoveAll', 'removeAllLoading', 'canSaveAll', 'saveAllLoading']
};
</script>