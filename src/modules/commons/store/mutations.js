export default {
	ADD_OK_MESSAGE(state, message){
		if(isMessageValid(message))
			state.messages.push(createMessage(message, "success"))
	},
	ADD_INFO_MESSAGE(state, message){
		if(isMessageValid(message))
			state.messages.push(createMessage(message, "info"))
	},
	ADD_WARNING_MESSAGE(state, message){
		if(isMessageValid(message))
			state.messages.push(createMessage(message, "warning"))
	},
	ADD_ERROR_MESSAGE(state, message){
		if(isMessageValid(message))
			state.messages.push(createMessage(message, "error", 5000))
	},
	CLEAN_MESSAGES(state){
		state.messages = state.messages.filter((c) => c.show)
	}
}

function isMessageValid(message){
	return message != null && message.trim().length > 0
}

function createMessage(message, color, timeout = 1000) {
	return {
		text: message,
		color: color,
		timeout: timeout,
		show: true
	}
}